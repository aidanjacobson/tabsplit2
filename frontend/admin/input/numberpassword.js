function promptForNumberPassword(question, defaultValue="") {
    switchToInputPage(numberPasswordInputPage);
    numberPasswordInputText.innerText = question;
    numberPasswordInput.value = defaultValue;
    numberPasswordInput.focus();

    return new Promise((resolve, reject) => {
        numberPasswordInput.addEventListener("change", function() {
            resolve(numberPasswordInput.value);
            switchToContentPage();
        });

        numberPasswordInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                resolve(numberPasswordInput.value);
                switchToContentPage();
            }
        });
    });
}