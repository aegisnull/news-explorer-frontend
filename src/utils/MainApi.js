const MainApiConfig = {
  baseUrl: "https://api.aegisnews.students.nomoredomainssbs.ru",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
  },
};

class MainApiClass {
  constructor(config) {
    this._url = config.baseUrl;
    this._headers = config.headers;
  }

  signUp(email, password, name) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    }).then((res) => {
      if (res.status === 400) {
        throw new Error("Formato de correo electrónico o contraseña incorrecto");
      } else if (res.status === 409) {
        throw new Error("Esta cuenta ya existe");
      }
      return res.json();
    });
  }

  // авторизация
  signIn(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.status === 400) {
          throw new Error("No se encontró el usuario con este correo electrónico");
        } else if (res.status === 401) {
          throw new Error("Datos ingresados no son correctos");
        } else if (res.status === 404) {
          throw new Error(
            "No se encontró el usuario con este correo electrónico o la contraseña es incorrecta"
          );
        }
        return res.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          this._headers = {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwt")}`,
          };
        }

        return data;
      });
  }

  getUserData(jwt) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      if (res.status !== 200) {
        throw new Error("Ha ocurrido un error inesperado");
      }
      return res.json();
    });
  }
  getSavedArticles(jwt) {
    return fetch(`${this._url}/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      return res.json();
    });
  }

  postArticle(jwt, { keyword, title, text, date, source, link, image }) {
    return fetch(`${this._url}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ keyword, title, text, date, source, link, image }),
    }).then((res) => {
      return res.json();
    });
  }

  deleteArticle(jwt, id) {
    return fetch(`${this._url}/articles/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      return res.json();
    });
  }
}
const MainApi = new MainApiClass(MainApiConfig);
export default MainApi;