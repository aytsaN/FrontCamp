import "../styles/style.css";

import { config } from "./config";
import { RequestSources, RequestNews } from "./getUrl";
import { Data } from "./Data";
import { Sourses } from "./SourcesContent";
import { News } from "./NewsContent";

(async () => {

    const requestSources = new RequestSources();
    const request = new Data(requestSources);
    const dataSources = await request.data();
    const sources = new Sourses(dataSources);
    sources.addContentDocument();

    sources.element.addEventListener('click', async (e) => {
        if (e.target.className === 'source-item') {
            const requestNews = new RequestNews(e.target.id, config.apiKey);
            const request = new Data(requestNews);
            const dataNews = await request.data();
            if (dataNews) {
                const news = new News(dataNews);
                news.addContentDocument();
            }
        }
    });
})()