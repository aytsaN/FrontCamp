import { Content } from "./Content";

export class News extends Content {
    constructor(data) {
        super();
        this.element = document.querySelector('.news-section');
        this.content = data.articles.reduce((acc, item) => {
            return acc += `<a href="${this.isEmpty(item.url)}"><article class="article" ${this.isEmpty(item.urlToImage) ? `style="background-image: url('${item.urlToImage}');"` : ''}>
									  <h3 class="article-title">${this.isEmpty(item.title)}</h3>
										<p class="article-descr">${this.isEmpty(item.description)}
											<time>${this.isEmpty(item.publishedAt) ? item.publishedAt.substring(0,10) : ''}</time>
											<span class="author">${this.isEmpty(item.author)}</span>
										</p>
									 </article></a>`;
        }, '');
    }
}