if (document.querySelector("input[type='password']").value !== null) {
    element = document.querySelector("input[type='password']")
}

if (element === null || element.value.length === 0 ) {
    chrome.runtime.sendMessage(null);
} else if (element.value.length < 6) {
    chrome.runtime.sendMessage("short");
} else {
    chrome.runtime.sendMessage(element.value);
}