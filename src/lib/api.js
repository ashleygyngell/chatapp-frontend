import axios from 'axios';
import { baseUrl } from '../config.js';

// const baseUrl = 'http://127.0.0.1:8000';

// ----------- User API Calls ---------------

export const getUserCredentials = () => {
  return axios.get(`${baseUrl}/authentication/credentials/`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  });
};

export const registerUser = (user) => {
  return axios.post(`${baseUrl}/authentication/register/`, user);
};

export const loginUser = (user) => {
  return axios.post(`${baseUrl}/authentication/login/`, user);
};

export const getUserFromId = (id) => {
  return axios.get(`${baseUrl}/authentication/allusers/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  });
};

export const getAllUsers = () => {
  return axios.get(`${baseUrl}/authentication/allusers/`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  });
};

// ----------- Chat API Calls ---------------

export const createChat = (chat) => {
  return axios.post(`${baseUrl}/chatrooms/createchat/`, chat, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  });
};

export const getChat = (id) => {
  return axios.get(`${baseUrl}/chat/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  });
};

export const getChatroom = (id) => {
  return axios.get(`${baseUrl}/chatrooms/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  });
};

export const getAllChatrooms = () => {
  return axios.get(
    `${baseUrl}/chatrooms/allchatrooms/${localStorage.getItem('userId')}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    }
  );
};

export const sendMessage = (senderId, message) => {
  console.log('sent', senderId, message);
  return axios.post(`${baseUrl}/chat/${senderId}/sendmessage`, message, {
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  });
};
