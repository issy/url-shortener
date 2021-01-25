async function formSubmit() {
    const searchBar = document.getElementById("input-bar")
    let url = searchBar.value;
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
    // Insert the new URL
    outputBox = document.getElementById("output-box");
    outputBox.innerHTML = data.url;
}

async function copyTextToClipboard() {
    if (!navigator.clipboard) {
        return;
    }
    textBox = document.getElementById("output-box");
    navigator.clipboard.writeText(textBox.innerHTML);
    button = document.getElementById("copy-button");
    oldText = button.innerHTML;
    button.classList.add("active");
    button.innerHTML = 'Copied!';
    // Sleep for 1 second
    await new Promise(r => setTimeout(r, 1000));
    button.classList.remove("active");
    button.innerHTML = oldText;
}