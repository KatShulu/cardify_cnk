import React, { useState, useEffect } from "react";
import { Menu, Divider, Text, IconButton } from "react-native-paper";
import { StyleSheet, View, Dimensions } from "react-native";
import { getDeckFiles } from "../services/DeckLocalStorage";

const DropdownMenu = ({ selectedDeck, onDeckSelection }) => {
  const [visible, setVisible] = useState(false);
  const [decks, setDecks] = useState([]);


  useEffect(() => {
    retrieveDeckNames();
  }, [selectedDeck]);
  const retrieveDeckNames = async () => {
    try {
      const directoryContent = await getDeckFiles();
      setDecks(directoryContent.map((filename) => filename.replace(".json", "")));
    } catch (error) {
      console.log("Error retrieving decks:", error);
    }
  };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const anchorPosition = { x: 200, y: 160 }; // Coordonnées fixes pour l'ancre du menu

  const screenWidth = Dimensions.get('window').width;
  const containerMargin = screenWidth * 0.03;
  const menuButtonMarginTop = screenWidth * 0.02;

  const handleDeckSelection = (deck) => {
    onDeckSelection(deck);
    closeMenu();
  };

  return (
    <View style={[styles.container, { marginLeft: containerMargin }]}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={{
          x: anchorPosition.x,
          y: anchorPosition.y,
        }}
      >
        {decks.map((deck, index) => (
          <React.Fragment key={index}>
            <Menu.Item
              onPress={() => handleDeckSelection(deck)}
              title={deck}
              style={styles.menuItem}
            />
            {index !== decks.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Menu>
      <View style={[styles.menuButton, { marginTop: menuButtonMarginTop }]}>
        <Text style={styles.menuText}>Choose your Deck</Text>
        <IconButton
          icon="menu"
          onPress={openMenu}
          color="white"
          size={30}
          style={styles.iconButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    zIndex: 999,
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F5F5F5",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  menuText: {
    marginRight: 5,
  },
  iconButton: {
    marginLeft: 5,
  },
  selectedDeckText: {
    marginLeft: 10,
    color: "white",
  },
  selectedDeckText: {
    marginLeft: 10,
    color: "white",
  },
  menuItem: {
    flex: 1,
    alignContent: "center",
    marginTop: 3,
  },
});

export default DropdownMenu;
