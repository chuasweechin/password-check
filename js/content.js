function checkForValidPasswordField (elements) {
    for (let i = 0; i < elements.length; i++) {
        const elementStyle = window.getComputedStyle(elements[i]);

        if ( elementStyle.display !== "none" && elementStyle.visibility !== "hidden" &&
                    !(elementStyle.top.split('px')[0] < 0) && !(elementStyle.left.split('px')[0] < 0) &&
                            !(elementStyle.right.split('px')[0] < 0) && !(elementStyle.bottom.split('px')[0] < 0) ) {
            return elements[i];
        }
    }
    return null;
}

(
    function () {
        try {
            // scan DOM for password field
            let pwElement = checkForValidPasswordField(document.querySelectorAll("input[type='password']"));

            if (pwElement === null && window.frames.length > 0) {
                for (let i = 0; i < window.frames.length; i++) {
                    pwElement = checkForValidPasswordField(window.frames[0].document.querySelectorAll("input[type='password']"));
                    if (pwElement !== null) { break; }
                }
            }

            // return results
            if (pwElement === null) {
                chrome.runtime.sendMessage("empty");
            } else if (pwElement.value.length === 0) {
                chrome.runtime.sendMessage("empty");
            } else if (pwElement.value.length < 6) {
                chrome.runtime.sendMessage("short");
            } else {
                chrome.runtime.sendMessage(pwElement.value);
            }

        } catch {
            chrome.runtime.sendMessage("error");
        }
    }
)();