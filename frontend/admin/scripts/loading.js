var loadingOverlay;

window.addEventListener('load', function() {
    loadingOverlay = document.getElementById("loadingOverlay");
});

function startLoading() {
    loadingOverlay.style.display = "flex";
}

function stopLoading() {
    loadingOverlay.style.display = "none";
}