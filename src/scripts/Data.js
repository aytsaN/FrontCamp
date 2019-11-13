export class Data {
    constructor(url) {
        this.url = url.getUrl();
        this.data = async () => {
            let response = await fetch(this.url);
            return response.json();
        }
    }
}