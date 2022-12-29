// Description: temporary use of the Practicum API for authorization and registration of users on the site.

const BaseUrl = "https://register.nomoreparties.co";
const Headers = { "Content-Type": "application/json" };

function register(user) {
  return fetch(BaseUrl + "/signup", {
    headers: Headers,
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  }).then(checkResponse);
}

function authenticate(user) {
  return fetch(BaseUrl + "/signin", {
    headers: Headers,
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  }).then(checkResponse);
}

/* function validateToken(token) {
  return fetch(BaseUrl + "/users/me", {
    headers: { ...Headers, Authorization: "Bearer " + token },
    method: "GET",
  }).then(checkResponse);
} */

function getUserInfo() {
  return fetch(BaseUrl + "/users/me", {
    headers: {
      ...Headers,
      Authorization: "Bearer " + localStorage.getItem("jwt"),
    },
    method: "GET",
  }).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export { register, authenticate /* validateToken */, getUserInfo };
