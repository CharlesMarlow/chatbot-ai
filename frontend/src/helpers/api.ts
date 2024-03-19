import axios from 'axios';

export const loginUser = async (email: string, password: string) => {
  const res = axios.post('/user/login', {
    email,
    password,
  });

  if ((await res).status !== 200) {
    throw new Error('Unable to login');
  }

  const data = (await res).data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = axios.get('/user/auth-status');

  if ((await res).status !== 200) {
    throw new Error('Unable to authenticate');
  }

  const data = (await res).data;
  return data;
};
