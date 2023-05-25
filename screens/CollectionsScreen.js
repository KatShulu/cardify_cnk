import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Title } from "react-native-paper";
import { getDeckFilesNames } from "../services/DeckLocalStorage";

export default function CollectionsScreen() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    // Récupérer les données des decks au montage du composant
    const fetchData = async () => {
      const data = await getDeckFilesNames();
      setDecks(data);
    };

    fetchData();
  }, []);

  const withoutExtension = (filename) => {
    return filename.replace(".json", "");
  };

  const renderDecks = () => {
    const halfLength = Math.ceil(decks.length / 2);
    const firstHalf = decks.slice(0, halfLength);
    const secondHalf = decks.slice(halfLength);

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          {firstHalf.map((deck, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.box}>
                <Title style={styles.title}>{withoutExtension(deck)}</Title>
                <Text style={styles.text} numberOfLines={2}></Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.column}>
          {secondHalf.map((deck, index) => (
            <TouchableOpacity key={index}>
              <View style={styles.box}>
                <Title style={styles.title}>{withoutExtension(deck)}</Title>
                <Text style={styles.text} numberOfLines={2}></Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return renderDecks();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  column: {
    flex: 1,
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
    backgroundColor: "#087E8A",
    borderColor: "#3C3C3C",
    borderWidth: 2,
    width: 180,
    height: 180,
    marginBottom: 10,
    overflow: "hidden",
    shadowColor: "black",
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#F5F5F5",
    textAlign: "center",
  },
});
