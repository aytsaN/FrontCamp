import { Content } from "./Content";

export class Sourses extends Content {
    constructor(data) {
        super();
        this.element = document.querySelector('#header-navigation');
        this.content = data.sources.reduce((acc, item) => {
            return acc += `<div id="${item.id}" class="source-item">${item.name.length > 10 ? item.name.substring(0,10)+'..' : item.name}
						    <span class="tooltiptext">${item.name}</span>
						</div>`;
        }, '');
    }
}