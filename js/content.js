if (document.querySelector("input[type='password']") === null
    || document.querySelector("input[type='password']").value.length === 0 ) {
    chrome.runtime.sendMessage(null);
} else if (document.querySelector("input[type='password']").value.length < 6) {
    chrome.runtime.sendMessage("short");
} else {
    chrome.runtime.sendMessage(document.querySelector("input[type='password']").value);
    delete(element);
}