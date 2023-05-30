import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { deleteEvaluationFile } from "../services/EvalLocalStorage";
import { deleteAllDecks } from "../services/DeckLocalStorage";
import { Divider } from 'react-native-paper';

const ProfileSettingsContent = () => {
  const handleDeleteEvaluationFile = async () => {
    try {
      await deleteEvaluationFile();
      console.log("Evaluation file deleted successfully.");
    } catch (error) {
      console.log("Error deleting evaluation file:", error);
    }
  };

  const handleDeleteAllDecks = async () => {
    try {
      await deleteAllDecks();
      console.log("All decks deleted successfully.");
    } catch (error) {
      console.log("Error deleting all decks:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDeleteEvaluationFile} style={styles.button}>
        <Text style={styles.buttonText}>Delete Evaluation File</Text>
      </TouchableOpacity>
      <Divider style={styles.divider} />
      <TouchableOpacity onPress={handleDeleteAllDecks} style={styles.button}>
        <Text style={styles.buttonText}>Delete All Decks</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileSettingsContent;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightblue",
    backgroundColor : "lightred"
  },
  button: {
    padding: 10,
    backgroundColor: "white",
  
  },
  
  buttonText: {
    fontSize: 16,
  },

});
