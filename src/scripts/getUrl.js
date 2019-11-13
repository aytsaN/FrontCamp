class RequestSources {

    getUrl() {
        return 'https://newsapi.org/v1/sources';
    }
}

class RequestNews {
    constructor(target, apiKey) {
        this.getUrl = () => `https://newsapi.org/v1/articles?source=${target}&apiKey=${apiKey}`;
    }
}

export { RequestSources, RequestNews };