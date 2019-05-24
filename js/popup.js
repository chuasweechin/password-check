const checkButton = document.getElementById('checkButton');

checkButton.onclick = function(element) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          { file: 'js/content.js' }
      );
    });

    chrome.runtime.onMessage.addListener(async function (message) {
        if (message === null) {
             alert("\u26A0 No password detected!");
        } else {
            try {
                let found = false;

                const hash =  hexString(await digestMessage(message));
                const firstPartialHash = hash.substring(0, 5);
                const secondPartialHash = hash.substring(5, hash.length);

                const response = await fetch(`https://api.pwnedpasswords.com/range/${ firstPartialHash }`);
                const data = await response.text()
                const result = data.split('\n');

                for (let i = 0; i < result.length; i++) {
                    const [resultHash, resultAppearanceCount] = [...result[i].split(':')];

                    if (resultHash.toLowerCase() === secondPartialHash.toLowerCase() ) {
                        alert(`\u2620 Oh no, your password is not secure! It has already been seen ${ formatNumber(resultAppearanceCount.trim()) } times.\n\nThis password has previously appeared in a data breach and should never be used. If you've ever used it anywhere before, change it now!`)
                        found = true;

                        break;
                    }
                }

                if (found === false) {
                    alert(`\u2714 Good news, your password is safe!`)
                }
            } catch (e) {
                console.log(e);
            }

        }
    });
};