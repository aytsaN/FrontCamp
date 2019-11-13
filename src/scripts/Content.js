export class Content {
    constructor() {
        this.isEmpty = function(data) { return data ? data : '' };
    }

    addContentDocument() {
        this.element.innerHTML = this.content;
    }
}