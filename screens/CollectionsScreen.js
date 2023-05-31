import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
  TextInput,
} from "react-native";
import { IconButton, Title } from "react-native-paper";
import {
  deleteDeckByName,
  getDeckFilesNames,
} from "../services/DeckLocalStorage";
import {
  retrieveCardInDeck,
  deleteCardInDeck,
  updateCardInDeck
} from "../services/CardLocalStorage";

export default function CollectionsScreen() {
  const [decks, setDecks] = useState([]);
  const [isGestionModalVisible, setGestionModalVisible] = useState(false);
  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);

  const [cards, setCards] = useState(null);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [modifiedCard, setModifiedCard] = useState(null);
  const [newWord, setNewWord] = useState("");
  const [newDefinition, setNewDefinition] = useState("");

  useEffect(() => {
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
      const updatedDecks = decks.filter((deck) => deck !== deckName);
      setDecks(updatedDecks);
      alert(`Deck ${deckName} deleted!`);
    } catch (error) {
      console.log(`Error deleting deck "${deckName}":`, error);
    }
  };

  const handleDeleteCard = async (deckName, key) => {
    try {
      await deleteCardInDeck(deckName, key);
      const updatedCards = cards.filter((card) => {
        const cardKey = Object.keys(card)[0];
        return cardKey !== key;
      });
      setCards(updatedCards);
      alert(`Card with key ${key} deleted from deck ${deckName}!`);
    } catch (error) {
      console.log(`Error deleting card from deck "${deckName}":`, error);
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
    setGestionModalVisible(true);
  };

  const closeModal = () => {
    setGestionModalVisible(false);
  };

  const renderDeckItem = ({ item }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <View
        style={[
          styles.box,
          {
            backgroundColor: global.AppTheme.card,
            borderColor: global.AppTheme.onCard,
          },
        ]}
      >
        <Title style={[styles.title, { color: global.AppTheme.onCard }]}>
          {withoutExtension(item)}
        </Title>
        <Text
          style={[styles.text, { color: global.AppTheme.onMenuBackground }]}
          numberOfLines={2}
        ></Text>
      </View>
    </TouchableOpacity>
  );

  const renderCardsItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View
        style={[
          styles.boxCard,
          { backgroundColor: global.AppTheme.menuBackground },
        ]}
      >
        <View style={styles.textContainer}>
          {Object.entries(item).map(([key, value]) => (
            <Text
              key={key}
              style={[styles.text, { color: global.AppTheme.onMenuBackground }]}
            >
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
            iconColor={global.AppTheme.onMenuBackground}
            accessibilityLabel="Update"
            size={25}
            onPress={() => handleUpdateCard(item)}
            style={styles.validate}
          />
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="trash-can-outline"
            iconColor={global.AppTheme.onMenuBackground}
            accessibilityLabel="Delete"
            size={25}
            onPress={() =>
              handleDeleteCard(
                withoutExtension(selectedDeck),
                Object.keys(item)[0]
              )
            }
            style={styles.Invalidate}
          />
        </View>
      </View>
    </View>
  );

  const handleUpdateCard = (card) => {
    setModifiedCard(card);
    setNewWord("");
    setNewDefinition("");
    setUpdateModalVisible(true); // Set the update modal visible
  };

  const updateCard = async () => {
    try {
      const deckName = withoutExtension(selectedDeck);
      const cardKey = Object.keys(modifiedCard)[0];
      const updatedCard = {
        [cardKey]: {
          word: newWord,
          definition: newDefinition,
        },
      };
  
      await updateCardInDeck(deckName, cardKey, updatedCard);
  
      // Update the local state with the updated card
      const updatedCards = cards.map((card) => {
        const existingKey = Object.keys(card)[0];
        if (existingKey === cardKey) {
          return updatedCard;
        }
        return card;
      });
      setCards(updatedCards);
  
      // Close the modal after updating the card
      setModifiedCard(null);
      setNewWord("");
      setNewDefinition("");
    } catch (error) {
      console.log(`Error updating card:`, error);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <FlatList
        data={decks}
        renderItem={renderDeckItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.column}
      />
      <Modal
        visible={isGestionModalVisible}
        onRequestClose={closeModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalBackground}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: global.AppTheme.appBackground },
            ]}
          >
            <IconButton
              icon="close"
              iconColor={global.AppTheme.onMenuBackground}
              size={30}
              accessibilityLabel="Close"
              style={styles.closeButton}
              onPress={closeModal}
            />

            <FlatList
              data={cards}
              renderItem={renderCardsItem}
              numColumns={1}
            />

            <View style={styles.deleteBar}>
              <Text style={styles.deleteText}>Delete deck</Text>
              <IconButton
                icon="trash-can-outline"
                iconColor="red"
                size={30}
                onPress={() => handleDeleteDeck(withoutExtension(selectedDeck))}
                accessibilityLabel="DeleteButton"
                style={styles.deleteButton}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* New Modal for Card Modification */}
      <Modal
        visible={modifiedCard !== null}
        onRequestClose={() => {
          setModifiedCard(null);
          setNewWord("");
          setNewDefinition("");
        }}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalBackground}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: global.AppTheme.appBackground },
            ]}
          >
            <IconButton
              icon="close"
              iconColor={global.AppTheme.onMenuBackground}
              size={30}
              accessibilityLabel="Close"
              style={styles.closeButton}
              onPress={() => {
                setModifiedCard(null);
                setNewWord("");
                setNewDefinition("");
                setUpdateModalVisible(false); // Close the update modal
              }}
            />
            <Text style={styles.updateLabel}>Update Card</Text>
            <TextInput
              style={styles.input}
              value={newWord}
              onChangeText={setNewWord}
              placeholder="New Word"
            />
            <TextInput
              style={styles.input}
              value={newDefinition}
              onChangeText={setNewDefinition}
              placeholder="New Definition"
            />
            <TouchableOpacity style={styles.updateButton} onPress={updateCard}>
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "70%",
    padding: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 500, // Set the desired maximum width here
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  boxCard: {
    borderRadius: 8,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "80%",
    marginBottom: 10,
    overflow: "scroll",
    borderWidth: 2,
    elevation: 8,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
  keyText: {
    fontWeight: "bold",
  },
  valueText: {
    flexWrap: "wrap",
  },
  validate: {
    backgroundColor: "#00A440",
    borderWidth: 0,
    borderRadius: 0,
    width: "100%",
    height: 45,
  },
  invalidate: {
    backgroundColor: "#F32013",
    borderWidth: 0,
    borderRadius: 0,
    width: "100%",
    height: 45,
  },
  closeButton: {
    alignSelf: "flex-end",
    margin: -10,
    elevation: 5,
  },
  cardsContainer: {
    maxHeight: "70%",
    flexGrow: 0,
  },
  deleteBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  deleteText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    color: "red",
  },
  deleteButton: {
    alignSelf: "flex-end",
    margin: -10,
    elevation: 5,
  },
  updateLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingLeft: 10,
  },
  updateButton: {
    width: "100%",
    height: 40,
    borderRadius: 4,
    backgroundColor: "#00A440",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  updateButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
