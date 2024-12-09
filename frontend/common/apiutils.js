class API {
    apiPath = null;

    constructor() {
        this.apiPath = '/api';
        this.baseURL = urlJoin(window.location.origin, this.apiPath);
    }

    async get(path) {
        const response = await fetch(urlJoin(this.baseURL, path));
        return await response.json();
    }

    async post(path, data) {
        const response = await fetch(urlJoin(this.baseURL, path), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }


}

function urlJoin(...args) {
    function removeSlashEnds(str) {
        return str.replace(/^\/|\/$/g, '');
    }

    return args.map(removeSlashEnds).join('/');
}

var api = new API();