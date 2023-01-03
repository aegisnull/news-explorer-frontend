// Description: temporary use of the Practicum API for authorization and registration of users on the site.

const BaseUrl = "https://register.nomoreparties.co";
//const BaseUrl = "https://api.aegisnews.students.nomoredomainssbs.ru";
const Headers = { "Content-Type": "application/json" };

function register(user) {
  return fetch(BaseUrl + "/signup", {
    headers: Headers,
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      name: user.name
    }),
  }).then(checkResponse);
}

function authenticate(user) {
  return fetch(BaseUrl + "/signin", {
    headers: Headers,
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password
    }),
  }).then(checkResponse);
}

function validateToken(token) {
  return fetch(BaseUrl + "/users/me", {
    headers: { ...Headers, Authorization: "Bearer " + token },
    method: "GET",
  }).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

function saveNews(token, news) {
  return fetch(BaseUrl + "/articles", {
    headers: { ...Headers, Authorization: "Bearer " + token },
    method: "POST",
    body: JSON.stringify({
      keyword: news.keyword,
      title: news.title,
      text: news.text,
      date: news.date,
      source: news.source,
      link: news.link,
      image: news.image
    }),
  }).then(checkResponse);
}

function getNews(token) {
  return fetch(BaseUrl + "/articles", {
    headers: { ...Headers, Authorization: "Bearer " + token },
    method: "GET",
  }).then(checkResponse);
}

function deleteNews(token, id) {
  return fetch(BaseUrl + "/articles/" + id, {
    headers: { ...Headers, Authorization: "Bearer " + token },
    method: "DELETE",
  }).then(checkResponse);
}

export { register, authenticate, validateToken, saveNews, getNews, deleteNews };
