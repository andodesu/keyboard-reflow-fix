// ==SillyTavern Extension==
// name: Keyboard Reflow Fix
// version: 1.1.0
// description: Eliminates Android keyboard collapse delay by bypassing viewport debounce.
// author: you
// ==/SillyTavern Extension==

(function () {
    let lastHeight = window.innerHeight;

    function forceSTLayoutNow() {
        document.body.classList.remove('keyboard-open');
        document.body.classList.add('keyboard-closed');

        window.dispatchEvent(new Event('resize'));
    }

    if (window.visualViewport) {
        visualViewport.addEventListener('resize', () => {
            const h = visualViewport.height;

            // Detect keyboard close (height jumps back up)
            if (h > lastHeight * 0.9) {
                // Force immediate “stable state”
                forceSTLayoutNow();

                // Run again next frame to beat ST debounce
                requestAnimationFrame(forceSTLayoutNow);
            }

            lastHeight = h;
        });
    }

    // Extra fallback: catch focus loss instantly
    document.addEventListener('focusout', (e) => {
        if (e.target && e.target.matches('#send_textarea')) {
            setTimeout(forceSTLayoutNow, 0);
        }
    }, true);

    console.log('[ST Keyboard Fix v1.1] active');
})();