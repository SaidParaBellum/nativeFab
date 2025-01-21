import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { login, setAuthToken } from '../api'; 
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  

  const handleLogin = async () => {
    try {
      const data = await login({ username, password }); 
      await setAuthToken(data.access);
      console.log(data.access);
      setMessage('Вход выполнен успешно!');

      navigation.navigate('Home');
    } catch (error) {
      setMessage('Ошибка входа: ' + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <LinearGradient colors={['#B91C1C', '#000']} style={styles.gradientContainer}>
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <Text style={styles.header}>Добро пожаловать!</Text>

          {message ? <Text style={styles.message}>{message}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Имя пользователя"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#ccc"
          />

          <TextInput
            style={styles.input}
            placeholder="Пароль"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#ccc"
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Войти</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Нет аккаунта?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '85%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 15,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#B91C1C',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  message: {
    marginTop: 10,
    color: 'yellow',
    textAlign: 'center',
  },
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#fff',
  },
  registerLink: {
    color: '#B91C1C',
    fontWeight: 'bold',
  },
});

export default LoginComponent;
