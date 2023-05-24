import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import RandomizeCard from "../components/RandomizeCard";
import DropdownMenu from "../components/DropDownMenu";

export default function Home() {
  const [selectedDeck, setSelectedDeck] = useState(null); // State to store the selected deck

  const handleDeckSelection = (deck) => {
    setSelectedDeck(deck);
    // Additional logic to handle the selected deck if needed
  };
  return (
    <View style={styles.container}>
      <DropdownMenu
        selectedDeck={selectedDeck}
        onDeckSelection={handleDeckSelection}
      />
      {selectedDeck?<RandomizeCard selectedDeck={selectedDeck} />:<Text>pas de deck select</Text>}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
