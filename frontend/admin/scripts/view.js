function showView(viewId) {
    const views = document.querySelectorAll('.view');
    views.forEach(view => {
        view.classList.remove('active');
    });
    const activeView = document.getElementById(viewId);
    if (activeView) {
        activeView.classList.add('active');
    }
}

function hideAllViews() {
    const views = document.querySelectorAll('.view');
    views.forEach(view => {
        view.classList.remove('active');
    });
}
