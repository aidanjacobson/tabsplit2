class API {
    apiPath = null;

    constructor() {
        this.apiPath = '/api';
        this.baseURL = urlJoin(window.location.origin, this.apiPath);
    }

    async get(path) {
        if (typeof loadingOverlay !== 'undefined') {
            startLoading();
        }
        const response = await fetch(urlJoin(this.baseURL, path));
        var out = await response.json();

        if (typeof loadingOverlay !== 'undefined') {
            stopLoading();
        }

        return out;
    }

    async post(path, data) {

        if (typeof loadingOverlay !== 'undefined') {
            startLoading();
        }

        const response = await fetch(urlJoin(this.baseURL, path), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        var out = await response.json();

        if (typeof loadingOverlay !== 'undefined') {
            stopLoading();
        }

        return out;
    }


}

function urlJoin(...args) {
    function removeSlashEnds(str) {
        return str.replace(/^\/|\/$/g, '');
    }

    return args.map(removeSlashEnds).join('/');
}

var api = new API();