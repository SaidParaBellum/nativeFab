import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { register } from '../api';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const RegisterComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      await register({ username, email, password, user_type: 'student' });
      setMessage('Регистрация успешна! Теперь войдите.');
      setTimeout(() => navigation.navigate('Login'), 2000); 
    } catch (error) {
      setMessage('Ошибка регистрации: ' + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <LinearGradient colors={['#B91C1C', '#000']} style={styles.gradientContainer}>
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <Text style={styles.header}>Зарегистрироваться</Text>

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
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
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

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Уже есть аккаунт?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Войти</Text>
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
  loginContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
  },
  loginLink: {
    color: '#B91C1C',
    fontWeight: 'bold',
  },
});

export default RegisterComponent;
