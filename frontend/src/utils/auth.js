// const baseUrl = 'https://api.kuzora-petr.nomoredomains.work';
const baseUrl = 'https://localhost:8080';

const handlePromise = (res) => {
  if (res.ok) {
    return res.json();
  };

  return Promise.reject(`Ошибка при получении объекта ${res.status}`);
}

export  const signUp = (newUserData) => {
  return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(newUserData)
    })
    .then((res) => {
      return handlePromise(res);
  })
}

export const signIn = (UserData) => {
  return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(UserData)
    })
    .then((res) => {
      return handlePromise(res);
  })
}

export const signOut = () => {
  return fetch(`${baseUrl}/logout`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify()
    })
    .then((res) => {
      return handlePromise(res);
  })
}
