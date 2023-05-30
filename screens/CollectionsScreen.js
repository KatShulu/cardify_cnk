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
import {
  deleteDeckByName,
  getDeckFilesNames,
} from "../services/DeckLocalStorage";
import { retrieveCardInDeck } from "../services/CardLocalStorage";

export default function CollectionsScreen() {
  const [decks, setDecks] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [cards, setCards] = useState(null);
  const [selectedDeck, setSelectedDeck] = useState(null);

  useEffect(() => {
    // Récupérer les données des decks au montage du composant
    const fetchData = async () => {
      const data = await getDeckFilesNames();
      setDecks(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const noJson = withoutExtension(selectedDeck);
        const deckData = await retrieveCardInDeck(noJson);
        setCards(deckData);
        console.log(deckData);
      } catch (error) {
        console.log(`Error retrieving data for deck "${noJson}":`, error);
      }
    };
    if (selectedDeck) {
      fetchData();
    }
  }, [selectedDeck]);

  const handleDeleteDeck = async (deckName) => {
    try {
      await deleteDeckByName(deckName);
      // Mettez à jour la liste des decks après la suppression
      const updatedDecks = decks.filter((deck) => deck !== deckName);
      setDecks(updatedDecks);
    } catch (error) {
      console.log(`Error deleting deck "${deckName}":`, error);
    }
  };

  const withoutExtension = (filename) => {
    if (filename) {
      return filename.replace(".json", "");
    }
    return "";
  };

  const openModal = (deck) => {
    setSelectedDeck(deck);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderDeckItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <View style={styles.box}>
        <Title style={styles.title}>{withoutExtension(item)}</Title>
        <Text style={styles.text} numberOfLines={2}></Text>
      </View>
    </TouchableOpacity>
  );

  const renderCardsItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.boxCard}>
        <View style={styles.textContainer}>
          {Object.entries(item).map(([key, value]) => (
            <Text key={key} style={styles.text}>
              <Text style={styles.keyText}>{key} : </Text>
              <Text style={styles.valueText}>{"\n" + value}</Text>
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="lead-pencil"
            iconColor="#000"
            accessibilityLabel="Update"
            size={25}
            onPress={() => console.log("Update")}
            style={styles.validate}
          />
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="trash-can-outline"
            iconColor="#000"
            accessibilityLabel="Delete"
            size={25}
            onPress={() => console.log("Delete")}
            style={styles.Invalidate}
          />
        </View>
      </View>
    </View>
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
            size={30}
            accessibilityLabel="Close"
            style={styles.closeButton}
            onPress={closeModal}
          ></IconButton>
          <FlatList data={cards} renderItem={renderCardsItem} numColumns={1} />
        <View style={styles.deleteContainer}>
        <Text style={styles.deleteText}>Delete Deck</Text>
        </View>
        <IconButton
          icon="trash-can-outline"
          iconColor="#000"
          size={30}
          onPress={() => handleDeleteDeck(withoutExtension(selectedDeck))}
          accessibilityLabel="DeleteButton"
          style={styles.deleteButton}
          ></IconButton>
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
    color: "#F5F5F5",
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "lightgrey",
    paddingTop: 70,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  buttonsContainer: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  buttonContainer: {
    marginLeft: 5,
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  deleteButton: {
    position: "absolute",
    top: 20,
    right: 170,
  },
  deleteContainer: {
    position: 'absolute',
    top: 10,
    right: 130,
    alignItems: "center",
  },
  deleteText: {
    marginRight: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  boxCard: {
    backgroundColor: "#087E8A",
    marginTop: 40,
    width: "70%",
    height: "auto",
    borderRadius: 8,
  },
  keyText: {
    fontWeight: "bold",
  },
});
