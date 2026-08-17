const PROXY_URL = "https://nomoreparties.co/news/v2";
const API_KEY =
  process.env.NEXT_PUBLIC_NEWS_API_KEY || "ed4390ffc54146c7a2ff5ea1673c8b01";

function toIsoDate(date) {
  return date.toISOString().slice(0, 10);
}

async function getNews(keyword) {
  const today = new Date();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const query = encodeURIComponent(keyword.trim());

  const res = await fetch(
    `${PROXY_URL}/everything?q=${query}&from=${toIsoDate(
      sevenDaysAgo
    )}&to=${toIsoDate(today)}&pageSize=100&apiKey=${API_KEY}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("No se pudieron obtener las noticias");
  }

  const data = await res.json();
  return data.articles || [];
}

export default getNews;
