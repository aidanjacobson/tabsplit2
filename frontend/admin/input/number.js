function promptForNumber(question, defaultValue="") {
    switchToInputPage(numberInputPage);
    numberInputText.innerText = question;
    numberInput.value = defaultValue;
    numberInput.focus();

    return new Promise((resolve, reject) => {
        numberInput.addEventListener("change", function() {
            resolve(numberInput.value);
            switchToContentPage();
        });

        numberInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                resolve(numberInput.value);
                switchToContentPage();
            }
        });
    });
}