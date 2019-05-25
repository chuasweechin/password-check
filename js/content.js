(
    function () {
        let pwElement = document.querySelector("input[type='password']");

        if (pwElement === null) {
        chrome.runtime.sendMessage(null);

        } else if (pwElement.value.length === 0 ) {
            chrome.runtime.sendMessage(null);

        } else if (pwElement.value.length < 6) {
            chrome.runtime.sendMessage("short");

        } else {
            chrome.runtime.sendMessage(pwElement.value);
        }
    }
)();