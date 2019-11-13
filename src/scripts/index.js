import "../style/style.css";

import { config } from "./config";

(async () => {

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

    class Data {
        constructor(url) {
            this.url = url.getUrl();
            this.data = async () => {
                let response = await fetch(this.url);
                return response.json();
            }
        }
    }


    class Content {

        addContentDocument() {
            this.element.innerHTML = this.content;
        }
    }

    class Sourses extends Content {
        constructor(data) {
            super();
            this.element = document.querySelector('#nav');
            this.content = data.sources.reduce((acc, item) => {
                return acc += `<div id="${item.id}" class="source-item">${item.name.length > 10 ? item.name.substring(0,10)+'..' : item.name}
									<span class="tooltiptext">${item.name}</span>
				  		 </div>`
            }, '');
        }
    }

    class News extends Content {
        constructor(data) {
            super();
            this.element = document.querySelector('#section');
            this.content = data.articles.reduce((acc, item) => {
                return acc += `<a href="${item.url}"><article class="article" ${item.urlToImage ? `style="background-image: url('${item.urlToImage}');"` : ''}>
									  <h3 class="article-title">${item.title ? item.title : ''}</h3>
										<p class="article-descr">${item.description ? item.description : ''}
											<time>${item.publishedAt ? item.publishedAt.substring(0,10) : ''}</time>
											<span class="author">${item.author ? item.author : ''}</span>
										</p>
									 </article></a>`
            }, '');
        }
    }


    const requestSources = new RequestSources();
    const request = new Data(requestSources);
    const dataSources = await request.data();
    const sources = new Sourses(dataSources);
    sources.addContentDocument();

    sources.element.addEventListener('click', async (e) => {
        if (e.target.className === 'source-item') {
            const requestArticles = new RequestNews(e.target.id, config.apiKey);
            const request = new Data(requestArticles);
            const dataNews = await request.data();
            if (dataNews) {
                const news = new News(dataNews);
                news.addContentDocument();
            }
        }
    });
})()