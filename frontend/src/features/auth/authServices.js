const BASE_URL = 'http://localhost:5000/api/v1/user/';

const register = async (userData) => {
  const res = await fetch(BASE_URL + 'register', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  if (res.ok) {
    localStorage.setItem('user', JSON.stringify(result.payload));
    return result;
  } else {
    throw result;
  }
};

const login = async (userData) => {
  const res = await fetch(BASE_URL + 'login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  if (res.ok) {
    localStorage.setItem('user', JSON.stringify(result.payload));
    return result;
  } else {
    throw result;
  }
};

const logout = async () => {
  const res = await fetch(BASE_URL + 'logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  if (res.ok) {
    localStorage.removeItem('user');
    return result;
  } else {
    throw result;
  }
};

export default {
  register,
  login,
  logout,
};
