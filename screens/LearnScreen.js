import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useState } from "react";
import RandomizeCard from "../components/RandomizeCard";
import DropdownMenu from "../components/DropDownMenu";

// State to store the selected deck
const useSelectedDeck = () => {
  const [selectedDeck, setSelectedDeck] = useState(null);

  // Additional logic to handle the selected deck if needed
  const handleDeckSelection = (deck) => {
    setSelectedDeck(deck);
  };

  return { selectedDeck, handleDeckSelection };
};

export default function LearnScreen() {
  const { selectedDeck, handleDeckSelection } = useSelectedDeck();

  return (
    <View style={styles.container}>
      <DropdownMenu
        selectedDeck={selectedDeck}
        onDeckSelection={handleDeckSelection}
      />
      {selectedDeck ? (
        <RandomizeCard selectedDeck={selectedDeck} />
      ) : (
        <Text style={{ color: global.AppTheme.onAppBackground }}>Veuillez sélectionner un deck</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
});