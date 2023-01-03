// Description: temporary use of the Practicum API for authorization and registration of users on the site.

//const BaseUrl = "https://register.nomoreparties.co";
const BaseUrl = "https://api.aegisnews.students.nomoredomainssbs.ru";
const Headers = { "Content-Type": "application/json" };

async function register(user: {
  email: string,
  password: string,
  name: string,
}): Promise<{ token: string }> {
  try {
    const res = await fetch(BaseUrl + "/signup", {
      headers: Headers,
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        name: user.name,
      }),
    });
    return checkResponse(res);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to register user");
  }
}

async function authenticate(user: {
  email: string,
  password: string,
}): Promise<{ token: string }> {
  try {
    const res = await fetch(BaseUrl + "/signin", {
      headers: Headers,
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        password: user.password
      }),
    });
    return checkResponse(res);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to authenticate user");
  }
}

async function validateToken(
  token: string
): Promise<{ name: string, email: string }> {
  try {
    const res = await fetch(BaseUrl + "/users/me", {
      headers: { ...Headers, Authorization: "Bearer " + token },
      method: "GET",
    });
    return checkResponse(res);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to validate token");
  }
}

async function checkResponse(res: Response): Promise<any> {
  if (res.ok) {
    return res.json();
  } else {
    const error = await res.text();
    throw new Error(`Error ${res.status}: ${error}`);
  }
}

async function saveNews(
  token: string,
  news: {
    keyword: string,
    title: string,
    text: string,
    date: string,
    source: string,
    link: string,
    image: string,
  }
): Promise<void> {
  try {
    const res = await fetch(BaseUrl + "/articles", {
      headers: { ...Headers, Authorization: "Bearer " + token },
      method: "POST",
      body: JSON.stringify({
        keyword: news.keyword,
        title: news.title,
        text: news.text,
        date: news.date,
        source: news.source,
        link: news.link,
        image: news.image,
      }),
    });
    return checkResponse(res);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to save news");
  }
}

async function getNews(token: string): Promise<
  {
    keyword: string,
    title: string,
    text: string,
    date: string,
    source: string,
    link: string,
    image: string,
  }[]
> {
  try {
    const res = await fetch(BaseUrl + "/articles", {
      headers: { ...Headers, Authorization: "Bearer " + token },
      method: "GET",
    });
    return checkResponse(res);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get news");
  }
}

async function deleteNews(token: string, id: string): Promise<void> {
  try {
    const res = await fetch(BaseUrl + "/articles/" + id, {
      headers: { ...Headers, Authorization: "Bearer " + token },
      method: "DELETE",
    });
    return checkResponse(res);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete news");
  }
}

export { register, authenticate, validateToken, saveNews, getNews, deleteNews };
