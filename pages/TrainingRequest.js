import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TrainingRequest = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Здесь будут заявки на тренировку!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default TrainingRequest;
