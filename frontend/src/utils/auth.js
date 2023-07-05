const baseUrl = 'https://auth.nomoreparties.co'

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
      body: JSON.stringify(UserData)
    })
    .then((res) => {
      return handlePromise(res);
  })
}

export const validateUser = (jwt) => {
  return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`
      }
    })
    .then((res) => {
      return handlePromise(res);
  })
}