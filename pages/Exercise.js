import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Modal, TouchableOpacity, Image, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchExercises } from "../store/actions/exerciseActions";

const Exercise = () => {
  const dispatch = useDispatch();
  const { exercises, loading, error } = useSelector((state) => state.exercise);


  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch]);

  const openModal = (exercise) => {
    setSelectedExercise(exercise);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedExercise(null);
  };

  if (loading) return <Text style={styles.text}>Загрузка...</Text>;
  if (error) return <Text style={styles.text}>Ошибка: {error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <Text style={styles.item}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />


      {selectedExercise && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedExercise.name}</Text>
              <Image source={{ uri: selectedExercise.photo }} style={styles.exerciseImage} />
              <Text style={styles.modalDescription}>{selectedExercise.description}</Text>
              <Text style={styles.modalCalories}>Калории: {selectedExercise.calories_burned}</Text>
              <Text style={styles.modalCategory}>Категория: {selectedExercise.category}</Text>
              <Text style={styles.modalDifficulty}>Уровень сложности: {selectedExercise.difficulty_level}</Text>
              {selectedExercise.has_video && (
                <Button
                  title="Посмотреть видео"
                  onPress={() => {
                    alert("Видео: " + selectedExercise.video);
                  }}
                />
              )}
              <Button title="Закрыть" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  text: { fontSize: 18, textAlign: "center", marginVertical: 20 },
  item: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#ddd", fontSize: 16, fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
  modalCalories: {
    fontSize: 16,
    color: "#888",
  },
  modalCategory: {
    fontSize: 16,
    color: "#888",
  },
  modalDifficulty: {
    fontSize: 16,
    color: "#888",
  },
  exerciseImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: "contain",
  },
});

export default Exercise;
