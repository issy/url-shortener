async function formSubmit() {
    const searchBar = document.getElementById("input-bar")
    let url = searchBar.value;
    console.log(url);
    payload = { "target_url": url }
    // Make web request
    response = await fetch('/add-link', { method: 'post', body: JSON.stringify(payload) })
    data = await response.json();
    const elements = ['output-box', 'copy-button'];
    elements.forEach(name => {
        element = document.getElementById(name);
        if (element.classList.contains("invisible")) {
            element.classList.replace("invisible", name);
        }
    });
    outputBox = document.getElementById("output-box");
    outputBox.innerHTML = data.url;
}

function copyToClipboard() {
    var copyText = document.getElementById("output-box");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

copyBobBtn.addEventListener('click', function (event) {
    textBox =
        copyTextToClipboard('Bob');
});


copyJaneBtn.addEventListener('click', function (event) {
    copyTextToClipboard('Jane');
});