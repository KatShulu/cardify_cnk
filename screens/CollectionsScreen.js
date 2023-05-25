import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { IconButton, Title } from "react-native-paper";
import { getDeckFilesNames } from "../services/DeckLocalStorage";

export default function CollectionsScreen() {
  const [decks, setDecks] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Récupérer les données des decks au montage du composant
    const fetchData = async () => {
      const data = await getDeckFilesNames();
      setDecks(data);
    };

    fetchData();
  }, []);

  const withoutExtension = (filename) => {
    return filename.replace(".json", "");
  };

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  const renderDeckItem = ({ item }) => (
    <TouchableOpacity onPress={openModal}>
      <View style={styles.box}>
        <Title style={styles.title}>{withoutExtension(item)}</Title>
        <Text style={styles.text} numberOfLines={2}></Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={decks}
        renderItem={renderDeckItem}
        keyExtractor={(index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.column}
      />
      <Modal visible={isModalVisible} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <IconButton
            icon="close"
            iconColor="#000"
            accessibilityLabel="Delete"
            style={styles.deleteButton}
            onPress={closeModal}
          ></IconButton>
          <Text style={styles.list}>"Bonjour"</Text>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  box: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 180,
    height: 200,
    marginBottom: 10,
    overflow: "hidden",
    backgroundColor: "#087E8A",
    borderColor: "#3C3C3C",
    borderWidth: 2,
    elevation: 8,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#F5F5F5",
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#F5F5F5",
    textAlign: "center",
  },
  list: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#000",
    textAlign: "center",
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
