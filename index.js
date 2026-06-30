(function () {
    const CHAT_SELECTOR = '#chat';
    const INPUT_SELECTOR = '#send_textarea';

    function forceReflow() {
        const chat = document.querySelector(CHAT_SELECTOR);
        const input = document.querySelector(INPUT_SELECTOR);

        if (!chat || !input) return;

        // Temporarily disable transitions to avoid lagged animation feel
        chat.style.transition = 'none';
        input.style.transition = 'none';

        // Force layout recalculation immediately
        requestAnimationFrame(() => {
            chat.style.height = '';
            chat.style.transform = 'translateZ(0)';
        });
    }

    function isKeyboardClosed() {
        if (!window.visualViewport) return false;
        return visualViewport.height > window.innerHeight * 0.9;
    }

    // Android keyboard close detection (best signal)
    if (window.visualViewport) {
        visualViewport.addEventListener('resize', () => {
            if (isKeyboardClosed()) {
                forceReflow();
            }
        });
    }

    // Fallback: input blur event (keyboard dismissed)
    document.addEventListener('blur', (e) => {
        if (e.target && e.target.matches(INPUT_SELECTOR)) {
            setTimeout(forceReflow, 0);
        }
    }, true);

    console.log('[ST Keyboard Reflow Fix] loaded');
})();