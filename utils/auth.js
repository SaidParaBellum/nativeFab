import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('auth_token');  
    console.log('Получен токен:', token);  
    return token;  
  } catch (error) {
    console.error('Ошибка при получении токена:', error);
    return null; 
  }
};
