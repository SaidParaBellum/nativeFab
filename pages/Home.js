import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient'; 

const Home = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient colors={['#B91C1C', '#000']} style={styles.gradientContainer}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.text}>Добро пожаловать на главную страницу!</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Exercises')}
          >
            <Text style={styles.buttonText}>Перейти к упражнениям</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('TrainingRequest')}
          >
            <Text style={styles.buttonText}>Перейти к запросам на тренировку</Text>
          </TouchableOpacity>
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
  container: {
    width: '85%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 15,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#B91C1C',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Home;
