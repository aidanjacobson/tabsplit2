function promptForText(question, defaultValue="") {
    switchToInputPage(textInputPage);
    textInputText.innerText = question;
    textInput.value = defaultValue;
    textInput.focus();

    return new Promise((resolve, reject) => {
        textInput.addEventListener("change", function() {
            resolve(textInput.value);
            switchToContentPage();
        });

        textInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                resolve(textInput.value);
                switchToContentPage();
            }
        });
    });
}