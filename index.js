(function () {
    const log = (...args) => console.log('[ST Layout Patch]', ...args);

    function waitForST() {
        return new Promise(resolve => {
            const interval = setInterval(() => {
                // Try to find common ST globals
                const candidates = [
                    window.updateLayout,
                    window.applyLayout,
                    window.drawChat,
                    window.refreshChat
                ];

                const found = candidates.find(fn => typeof fn === 'function');

                if (found) {
                    clearInterval(interval);
                    resolve(found);
                }
            }, 300);
        });
    }

    function wrapLayout(fn) {
        return function (...args) {
            // Run original immediately (no debounce delay injection)
            const result = fn.apply(this, args);

            // Force immediate second pass for Android viewport jitter
            requestAnimationFrame(() => {
                fn.apply(this, args);
            });

            return result;
        };
    }

    async function init() {
        log('Waiting for layout system...');

        const layoutFn = await waitForST();

        if (!layoutFn) {
            log('No layout function found — aborting patch');
            return;
        }

        log('Layout function found — applying patch');

        // Replace function safely (update-safe monkey patch)
        const original = layoutFn;

        const patched = wrapLayout(original);

        // Try common injection points
        if (window.updateLayout) window.updateLayout = patched;
        if (window.applyLayout) window.applyLayout = patched;
        if (window.drawChat) window.drawChat = patched;
        if (window.refreshChat) window.refreshChat = patched;

        log('Patch applied successfully');
    }

    init();
})();