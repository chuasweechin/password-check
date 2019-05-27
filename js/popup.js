const checkButton = document.getElementById('checkButton');

chrome.runtime.onMessage.addListener(async function (message) {
    if (message === "empty") {
         alert("\u26A0  There are no available password to check. Please fill in your password on the web page.");
    } else if (message === "short") {
         alert("\u26A0  Your password is too short.");
    } else {
        try {
            let found = false;

            const hash =  hexString(await digestMessage(message));
            const partialHash = hash.substring(5, hash.length);

            const response = await fetch(`https://api.pwnedpasswords.com/range/${ hash.substring(0, 5) }`);
            const data = await response.text()
            const result = data.split('\n');

            for (let i = 0; i < result.length; i++) {
                const [resultHash, resultAppearanceCount] = [...result[i].split(':')];

                if (resultHash.toLowerCase() === partialHash.toLowerCase() ) {
                    alert(`\u2620  Oh no, your password is not secure! It has already been seen ${ formatNumber(resultAppearanceCount.trim()) } times.\n\nThis password has previously appeared in a data breach and should never be used. If you've ever used it anywhere before, change it now!`)
                    found = true;

                    break;
                }
            }

            if (found === false) {
                alert(`\u2714 Good news! Your password is safe.`)
            }
        } catch {
            alert("\u26A0  An error has occur with the extension. Please try again later.");
        }

    }
});


checkButton.onclick = function(element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          { file: 'js/content.js' }
      );
    });
};