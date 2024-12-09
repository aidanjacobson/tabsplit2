function switchToInputPage(inputPage) {
    content.hide();
    inputs.show();
    Array.from(inputs.children).forEach(function(p) {
        p.hide();
    });
    inputPage.show();
}

function switchToContentPage() {
    inputs.hide();
    Array.from(inputs.children).forEach(function(p) {
        p.hide();
    });
    content.show();
}