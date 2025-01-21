import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';

const Auth = () => {
  return (
    <View style={styles.container}>
      <LoginComponent />
      <RegisterComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 20,
  },
});

export default Auth;
