// ==SillyTavern Extension==
// name: No-Resize Mobile Mode
// version: 1.0.0
// description: Removes keyboard-induced layout resizing to eliminate Android WebView delay.
// author: you
// ==/SillyTavern Extension==

(function () {
    console.log('[No-Resize Mode] active');

    function lockLayout() {
        const chat = document.querySelector('#chat');
        const input = document.querySelector('#send_textarea');
        const form = document.querySelector('#send_form');

        if (!chat || !input) return;

        // Stop ST from animating or resizing layout
        document.body.style.overflow = 'hidden';

        // Lock chat container sizing behavior
        chat.style.height = '100%';
        chat.style.maxHeight = '100%';
        chat.style.overflow = 'auto';

        // Prevent input bar from triggering layout shifts
        if (form) {
            form.style.position = 'sticky';
            form.style.bottom = '0px';
        }

        // Kill any flex-based resizing behaviour
        const wrappers = document.querySelectorAll(
            '#chat-wrapper, #chat-container, .chat, .chat-container'
        );

        wrappers.forEach(el => {
            el.style.height = '100%';
            el.style.minHeight = '0';
            el.style.maxHeight = '100%';
        });
    }

    function disableViewportResizing() {
        // Override resize events that trigger ST layout recalculation
        window.addEventListener('resize', (e) => {
            e.stopImmediatePropagation?.();
        }, true);

        if (window.visualViewport) {
            visualViewport.addEventListener('resize', (e) => {
                e.stopImmediatePropagation?.();
            }, true);
        }
    }

    function init() {
        lockLayout();
        disableViewportResizing();

        // Re-apply after ST finishes loading
        const observer = new MutationObserver(lockLayout);
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    init();
})();