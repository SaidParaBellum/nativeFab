import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://d189-94-158-59-201.ngrok-free.app/accounts';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = async (token) => {
  if (token) {
    await AsyncStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    await AsyncStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};

export const login = async (data) => {
  const response = await api.post('/login/', data);
  return response.data;
};


export const register = async (data) => {
  const response = await api.post('/register/', data);
  return response.data;
};

export default api;
