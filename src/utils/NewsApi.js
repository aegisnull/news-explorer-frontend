import {
  PAGE_SIZE,
  SEARCH_INTERVAL,
  API_KEY,
  NEWS_URL,
  PROXY_URL,
} from "./config";

class NewsApi {
  constructor(options) {
    this.headers = options.headers;
    this._apiKey = options.apiKey;
    this._today = options.today;
    this._lastWeek = options.lastWeek;
    this._newsUrl = options.newsUrl;
    this._proxy = options.proxy;
    this._pageSize = options.pageSize;
    this._endpoint = options.endpoint;
  }

  search(keyword) {
    return fetch(
      `${this._proxy}` +
        `${this._endpoint}` +
        `q=${keyword}&` +
        `apiKey=${this._apiKey}&` +
        `from=${this._lastWeek.toISOString()}&` +
        `to=${this._today.toISOString()}&` +
        `pageSize=${this._pageSize}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => data.articles);
  }
}

const newsApi = new NewsApi({
  newsUrl: NEWS_URL,
  apiKey: API_KEY,
  today: new Date(),
  lastWeek: new Date(Date.now() - SEARCH_INTERVAL),
  practicumUrl: PROXY_URL,
  pageSize: PAGE_SIZE,
  endpoint: "/everything?",
});

export default newsApi;
