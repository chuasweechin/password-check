(
    function () {
        let pwElement = null

        if (window.frames[0] === undefined) {
            pwElement = document.querySelector("input[type='password']");
        } else {
            pwElement = window.frames[0].document.querySelector("input[type='password']");
        }

        if (pwElement === null) {
            chrome.runtime.sendMessage(null);
        } else if (pwElement.value.length === 0) {
            chrome.runtime.sendMessage(null);
        } else if (pwElement.value.length < 6) {
            chrome.runtime.sendMessage("short");
        } else {
            chrome.runtime.sendMessage(pwElement.value);
        }
    }
)();