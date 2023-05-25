import React, { useState, useEffect } from "react";
import { Menu, Divider, Text, IconButton } from "react-native-paper";
import { StyleSheet, View, Dimensions } from "react-native";
import { getDeckFilesNames } from "../services/DeckLocalStorage";

// Creating a dropdown menu component to select a deck when creating a card
const DropdownMenu = ({ selectedDeck, onDeckSelection }) => {
  const screenWidth = Dimensions.get("window").width;
  const menuButtonMarginTop = screenWidth * 0.0;

  const [visible, setVisible] = useState(false);
  const [decks, setDecks] = useState([]);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  // This only triggers the effect when `selectedDeck` is changed
  useEffect(() => {
    retrieveDeckNames();
  }, [selectedDeck]);

  // Retrieves the Decks' Names to show as selectable options in the menu
  const retrieveDeckNames = async () => {
    try {
      const directoryContent = await getDeckFilesNames();
      setDecks(
        directoryContent.map((filename) => filename.replace(".json", ""))
      );
    } catch (error) {
      console.error("Error retrieving decks:", error);
    }
  };

  // When a deck is selected, it shows the deck's name and closes the menu
  const handleDeckSelection = (deck) => {
    onDeckSelection(deck);
    closeMenu();
  };

  return (
    <View style={[styles.menuButton, { marginTop: menuButtonMarginTop }]}>
      <Text style={styles.menuText}>{selectedDeck || "Choose your Deck"}</Text>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon="menu"
            onPress={openMenu}
            color="white"
            size={30}
            style={styles.iconButton}
            accessibilityLabel="Open Menu"
          />
        }
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
    </View>
  );
};

const styles = StyleSheet.create({
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
  menuItem: {
    flex: 1,
    alignContent: "center",
    marginTop: 3,
  },
});

export default DropdownMenu;
