(function () {
    const style = document.createElement('style');
    style.textContent = `
        #chat,
        #chat-wrapper,
        #chat-container,
        #send_form,
        #send_textarea,
        body,
        html {
            transition: none !important;
            animation: none !important;
        }

        html {
            scroll-behavior: auto !important;
        }
    `;
    document.head.appendChild(style);

    console.log('[ST Keyboard Fix] CSS overrides applied');
})();