import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
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
      alert(deckName + "deleted !");
      alert(deckName + "deleted !");
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
            onPress={() => console.log("Update")}
            style={styles.update}
          />
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="trash-can-outline"
            iconColor={global.AppTheme.onMenuBackground}
            accessibilityLabel="Delete"
            size={25}
            onPress={() => console.log("Delete")}
            style={styles.deleteCard}
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
      <Modal
        visible={isModalVisible}
        onRequestClose={closeModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalBackground}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: global.AppTheme.menuBackground },
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
    marginTop: 15,
    overflow: "hidden",
    borderWidth: 2,
    elevation: 8,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  modalBackground: {
    flex: 1,
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
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  boxCard: {
    borderRadius: 8,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "70%",
    marginBottom: 10,
    overflow: "scroll",
    borderWidth: 2,
    elevation: 8,
  },
  textContainer: {
    width: '100%',
    paddingVertical: 5,
    },
  keyText: {
    fontWeight: "bold",
  },
  valueText: {
    flexWrap: "wrap",
    textAlign: 'left'
  },
  update: {
    backgroundColor: "#82C1A6",
    borderWidth: 0,
    borderRadius: 8,
    width: "90%",
    height: 45,
  },
  deleteCard: {
    backgroundColor: "#FF5A60",
    borderWidth: 0,
    borderRadius: 8,
    width: "80%",
    height: 45,
    marginLeft: 10,
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
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    marginBottom: -25,
  },
  deleteText: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: -10,
    color: "#F32013",
  },
  deleteButton: {
    marginLeft: 10,
  },
});
