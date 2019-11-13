import "../style/style.css";

(async () => {

    class Request {
        constructor(url) {
            this.url = url;
        }

        async getResponse() {
            let response = await fetch(this.url);
            return response.json();
        }
    }

    class Sourses {
        constructor(data) {
            this.listNews = document.querySelector('#nav');
            this.content = data.sources.reduce((acc, item) => {
                return acc += `<div id="${item.id}" class="source-item">${item.name.length > 10 ? item.name.substring(0,10)+'..' : item.name}
						<span class="tooltiptext">${item.name}</span>
	  		 </div>`
            }, '');
        }


        addSources() {
            this.listNews.innerHTML = this.content;
        }

    }


    class News {
        constructor(data) {
            this.articleSection = document.querySelector('#section');
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

        addNews() {
            this.articleSection.innerHTML = this.content;
        }
    }


    const sourceUrl = 'https://newsapi.org/v1/sources';

    const apiKey = 'adb1c21889ad46df8aacb6d566c97770';

    const requestSources = new Request(sourceUrl);
    const dataSources = await requestSources.getResponse();
    const sources = new Sourses(dataSources);
    sources.addSources();
    sources.listNews.addEventListener('click', async (e) => {
        if (e.target.className === 'source-item') {
            const articlesUrl = `https://newsapi.org/v1/articles?source=${e.target.id}&apiKey=${apiKey}`;
            const requestArticles = new Request(articlesUrl);
            const dataNews = await requestArticles.getResponse();
            if (dataNews) {
                const news = new News(dataNews);
                news.addNews();
            }
        }
    });



})()