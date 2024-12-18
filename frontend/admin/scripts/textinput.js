function promptForText(question, defaultText = "") {
    return new Promise((resolve) => {
        const previousView = document.querySelector('.view.active');
        const textInputView = document.getElementById('text-input-view');
        const questionElement = document.getElementById('text-input-question');
        const inputElement = textInputView.querySelector('input[type="text"]');

        // Switch to text input view
        previousView.classList.remove('active');
        textInputView.classList.add('active');

        // Populate question and default text
        questionElement.textContent = question;
        inputElement.value = defaultText;
        inputElement.focus();

        // select the text in the input
        inputElement.select();

        // Function to handle resolving the promise
        const resolvePromise = () => {
            resolve(inputElement.value);
            inputElement.removeEventListener('change', resolvePromise);
            inputElement.removeEventListener('keypress', handleKeyPress);
            textInputView.classList.remove('active');
            previousView.classList.add('active');
        };

        // Handle Enter key press
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                resolvePromise();
            }
        };

        // Add event listeners
        inputElement.addEventListener('change', resolvePromise);
        inputElement.addEventListener('keypress', handleKeyPress);
    });
}
