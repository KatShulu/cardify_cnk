import React, { useState, useEffect } from "react";
import { Menu, Divider, Text } from "react-native-paper";
import { IconButton } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { getDeckFiles } from "../services/DeckLocalStorage";

const DropdownMenu = ({ selectedDeck, onDeckSelection }) => {
  const [visible, setVisible] = useState(false);
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    retrieveDeckNames();
  }, [selectedDeck]); // Update decks state whenever selectedDeck changes

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

  const handleDeckSelection = (deck) => {
    onDeckSelection(deck);
    closeMenu();
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <View style={styles.menuContainer}>
            <IconButton
              icon="menu"
              onPress={openMenu}
              color="white"
              size={30}
              style={styles.iconButton}
            />
            {selectedDeck && <Text style={styles.selectedDeckText}>{selectedDeck}</Text>}
          </View>
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
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999,
  },
  menuContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 10,
  },
  selectedDeckText: {
    marginLeft: 10,
    color: "white",
  },
  menuItem: {
    flex: 1,
    alignContent: "center",
    marginTop: 3,
    marginRight: 5,
  },
});

export default DropdownMenu;
