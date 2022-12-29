// Constants declaration
/* const NEWS_URL = "https://newsapi.org/v2"; */
const PROXY_URL = "https://nomoreparties.co/news/v2";
const API_KEY = "ed4390ffc54146c7a2ff5ea1673c8b01";

// Function to get news
async function getNews(keyword) {
  const sevenDaysAgo = new Date(
    Date.now() - 7 * 24 * 3600 * 1000
  ).toDateString();
  const today = new Date().toDateString();

  return await fetch(
    `${PROXY_URL}/everything?q=${keyword}&from=${sevenDaysAgo}&to=${today}&pageSize=100&apiKey=${API_KEY}`,
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

export default getNews;
