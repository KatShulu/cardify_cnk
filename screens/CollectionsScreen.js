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
import { retrieveCardInDeck } from "../services/CardLocalStorage";
import NewCardButton from "../components/NewCardButton";

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

  const withoutExtension = (filename) => {
    return filename.replace(".json", "");
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
      <View style={[styles.box, {backgroundColor : global.AppTheme.card, borderColor : global.AppTheme.onCard }]}>
        <Title style={[styles.title, {color: global.AppTheme.onCard}]}>{withoutExtension(item)}</Title>
        <Text style={[styles.text, {color :global.AppTheme.onMenuBackground}]} numberOfLines={2}></Text>
      </View>
    </TouchableOpacity>
  );

  const renderCardsItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={[styles.boxCard,{backgroundColor : global.AppTheme.menuBackground}]}>
        <View style={styles.textContainer}>
          {Object.entries(item).map(([key, value]) => (
            <Text key={key} style={[styles.text, {color :global.AppTheme.onMenuBackground}]}>
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
            style={styles.validate}
          />
        </View>
        <View style={styles.buttonContainer}>
          <IconButton
            icon="trash-can-outline"
            iconColor={global.AppTheme.onMenuBackground}
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
        <View style={[styles.modalContainer, {backgroundColor : global.AppTheme.appBackground}]}>
          <IconButton
            icon="close"
            iconColor={global.AppTheme.onMenuBackground}
            size={30}
            accessibilityLabel="Close"
            style={styles.deleteButton}
            onPress={closeModal}
          ></IconButton>
          <FlatList data={cards} renderItem={renderCardsItem} numColumns={1} />
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
  modalContainer: {
    flex: 1,
    paddingTop: 70,
  },
  cardContainer:{
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
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  boxCard: {
    marginTop: 40,
    width: "70%",
    height: "auto",
    borderRadius: 8,
  },
  keyText: {
    fontWeight: "bold",
  },
});
