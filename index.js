// ==SillyTavern Extension==
// name: Keyboard Instant Collapse Fix (Lite)
// version: 1.2.0
// description: Removes debounce delay on keyboard close by forcing immediate layout update.
// author: you
// ==/SillyTavern Extension==

(function () {
    function triggerInstantLayout() {
        // Force ST to recalculate immediately
        window.dispatchEvent(new Event('resize'));

        // Extra nudge for visualViewport systems
        if (window.visualViewport) {
            window.dispatchEvent(new Event('resize'));
        }
    }

    if (window.visualViewport) {
        visualViewport.addEventListener('resize', () => {
            const vh = visualViewport.height;
            const wh = window.innerHeight;

            // Keyboard likely closed
            if (vh > wh * 0.9) {
                triggerInstantLayout();
            }
        });
    }

    // fallback
    document.addEventListener('focusout', (e) => {
        if (e.target?.matches?.('#send_textarea')) {
            setTimeout(triggerInstantLayout, 0);
        }
    }, true);

    console.log('[ST Keyboard Fix Lite] active');
})();