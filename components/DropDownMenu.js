import React, { useState, useEffect } from "react";
import { Menu, Divider, Text, IconButton } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import {
  createDeckFile,
  getDeckFilesNames,
} from "../services/DeckLocalStorage";

const DropdownMenu = ({ selectedDeck, onDeckSelection, isAbsolute }) => {
  const menuContainerStyle = isAbsolute ? styles.container : null;
  const menuItemStyle = isAbsolute ? styles.absoluteMenuItem : styles.flexMenuItem;

  const [visible, setVisible] = useState(false);
  const [decks, setDecks] = useState([]);
  const [menuButtonClicked, setMenuButtonClicked] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  useEffect(() => {
    if (menuButtonClicked) {
      retrieveDeckNames();
      setMenuButtonClicked(false);
    }
  }, [menuButtonClicked]);

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

  const handleDeckSelection = (deck) => {
    onDeckSelection(deck);
    closeMenu();
  };

  const handleMenuButtonClick = () => {
    setMenuButtonClicked(true);
    openMenu();
  };

  return (
    <View style={menuContainerStyle}>
      <View style={[styles.menuButton, { borderColor: global.AppTheme.onMenuBackground }]}>
        <Text style={styles.menuText}>{selectedDeck || "Choose your Deck"}</Text>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <IconButton
              icon="menu"
              onPress={handleMenuButtonClick}
              color={global.AppTheme.onMenuBackground}
              size={30}
              style={styles.iconButton}
              accessibilityLabel="Open Menu"
            />
          }
        >
          {decks.map((deck, index) => (
            <View key={index} style={menuItemStyle}>
              <Menu.Item
                onPress={() => handleDeckSelection(deck)}
                title={deck}
              />
              {index !== decks.length - 1 && <Divider />}
            </View>
          ))}
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    marginTop: 20,
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
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
    marginTop: 3,
  },
});

const LearnScreen = () => {
  const [selectedDeck, setSelectedDeck] = useState(null);

  const handleDeckSelection = (deck) => {
    setSelectedDeck(deck);
  };

  return (
    <View style={styles.container}>
      <DropdownMenu
        selectedDeck={selectedDeck}
        onDeckSelection={handleDeckSelection}
        isAbsolute={false}
      />
      {selectedDeck ? (
        <RandomizeCard selectedDeck={selectedDeck} />
      ) : (
        <Text style={{ color: global.AppTheme.onAppBackground }}>
          Veuillez sélectionner un deck
        </Text>
      )}
    </View>
    
  );
};

export default DropdownMenu;