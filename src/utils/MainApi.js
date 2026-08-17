const BASE_URL = "https://api.news-explorer.projects.luistellez.com";

function getHeaders(jwt) {
  const headers = {
    "Content-Type": "application/json",
  };
  const token = jwt || localStorage.getItem("jwt");
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return headers;
}

function checkResponse(res) {
  return res
    .json()
    .catch(() => ({}))
    .then((data) => {
      if (res.ok) {
        return data;
      }
      const error = new Error(data.message || `Error: ${res.status}`);
      error.status = res.status;
      return Promise.reject(error);
    });
}

class MainApiClass {
  constructor(url) {
    this._url = url;
  }

  signUp(email, password, name) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email, password, name }),
    }).then((res) => {
      if (res.status === 400) {
        throw new Error(
          "Formato de correo electrónico o contraseña incorrecto"
        );
      }
      if (res.status === 409) {
        throw new Error("Esta cuenta ya existe");
      }
      if (!res.ok) {
        throw new Error("Ha ocurrido un error inesperado");
      }
      return res.json();
    });
  }

  signIn(email, password) {
    if (!email || !password) {
      return Promise.reject(
        new Error("Por favor ingresa email y contraseña válidos")
      );
    }
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.status === 400) {
          throw new Error("Email invalido o formato de contraseña incorrecto");
        }
        if (res.status === 401) {
          throw new Error("Email o contraseña incorrectos");
        }
        if (res.status === 404) {
          throw new Error("Usuario no encontrado");
        }
        if (!res.ok) {
          throw new Error("Ha ocurrido un error inesperado");
        }
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
        }
        return data;
      });
  }

  validateToken(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: getHeaders(jwt),
    }).then((res) => {
      if (res.status === 401) {
        throw new Error("Token invalido");
      }
      if (!res.ok) {
        throw new Error("Ha ocurrido un error inesperado");
      }
      return res.json();
    });
  }

  getSavedArticles(jwt) {
    return fetch(`${this._url}/articles`, {
      method: "GET",
      headers: getHeaders(jwt),
    }).then(checkResponse);
  }

  compareArticles(jwt, title) {
    return fetch(`${this._url}/articles/compare`, {
      method: "POST",
      headers: getHeaders(jwt),
      body: JSON.stringify({ title }),
    }).then(checkResponse);
  }

  saveArticle(jwt, { keyword, title, text, date, source, link, image }) {
    return fetch(`${this._url}/articles`, {
      method: "POST",
      headers: getHeaders(jwt),
      body: JSON.stringify({ keyword, title, text, date, source, link, image }),
    }).then(checkResponse);
  }

  deleteArticle(jwt, id) {
    return fetch(`${this._url}/articles/${id}`, {
      method: "DELETE",
      headers: getHeaders(jwt),
    }).then(checkResponse);
  }
}

const MainApi = new MainApiClass(BASE_URL);
export default MainApi;
