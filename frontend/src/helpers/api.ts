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

export const sendChatRequest = async (message: string) => {
  const res = axios.post('/chat/new', {
    message,
  });

  if ((await res).status !== 200) {
    throw new Error('Unable to send chat');
  }

  const data = (await res).data;
  return data;
};

export const getUserChats = async () => {
  const res = axios.get('/chat/all-chats');

  if ((await res).status !== 200) {
    throw new Error('Unable to get user chats');
  }

  const data = (await res).data;
  return data;
};

export const deleteUserChats = async () => {
  const res = axios.delete('/chat/delete');

  if ((await res).status !== 200) {
    throw new Error('Unable to delete user chats');
  }

  const data = (await res).data;
  return data;
};

export const userLogout = async () => {
  const res = axios.get('/user/logout');

  if ((await res).status !== 200) {
    throw new Error('Unable to logout user');
  }

  const data = (await res).data;
  return data;
};

export const userSignup = async (
  name: string,
  email: string,
  password: string
) => {
  const res = axios.post('/user/signup', { name, email, password });

  if ((await res).status !== 201) {
    throw new Error('Unable to signup user');
  }

  const data = (await res).data;
  return data;
};
