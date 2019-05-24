if (document.querySelector("input[type='password']") === null ||
        document.querySelector("input[type='password']").value.length === 0) {
    chrome.runtime.sendMessage(null);
} else {
    chrome.runtime.sendMessage(document.querySelector("input[type='password']").value);
}