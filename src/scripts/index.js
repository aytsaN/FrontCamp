import "../style/style.css";

(async () => {

async function getSources(url) {
  let response = await fetch(`${url}`);
  return await response.json();
}

const apiKey = 'adb1c21889ad46df8aacb6d566c97770';
	const listNews = document.querySelector('#nav');
  await getSources(`https://newsapi.org/v1/sources`)
		.then(dataSources => {
	  	let navList = dataSources.sources.reduce((acc, item) => {
	  		 return acc += `<div id="${item.id}" class="source-item">${item.name.length > 10 ? item.name.substring(0,10)+'..' : item.name}
						<span class="tooltiptext">${item.name}</span>
	  		 </div>`
				}, '');
				listNews.innerHTML = navList;
  });

  listNews.addEventListener('click', async (e) => {
  	if (e.target.className === 'source-item') {
    	await getSources(`https://newsapi.org/v1/articles?source=${e.target.id}&apiKey=${apiKey}`)
    		.then(scroll(0, listNews.offsetHeight))
    		.then(dataArticles => {
    			let articleSection = document.querySelector('#section');
    			let articlesList = dataArticles.articles.reduce((acc, item) => {
			  		return acc += `<a href="${item.url}"><article class="article" ${item.urlToImage ? `style="background-image: url('${item.urlToImage}');"` : ''}>
			  		<h3 class="article-title">${item.title ? item.title : ''}</h3>
			  		<p class="article-descr">${item.description ? item.description : ''}
				  		<time>${item.publishedAt ? item.publishedAt.substring(0,10) : ''}</time>
				  		<span class="author">${item.author ? item.author : ''}</span>
				  	</p>
			  		</article></a>`
						}, '');
    			articleSection.innerHTML = articlesList;
    		});
  	}
  })
 })()

