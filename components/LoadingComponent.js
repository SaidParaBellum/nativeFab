import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#B91C1C" />
      <Text style={styles.loadingText}>Загрузка...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoadingComponent;
