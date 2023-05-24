import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Title } from "react-native-paper";
import {getDeckFiles} from "../services/DeckLocalStorage";

export default function CollectionsScreen() {

  const [decks, setDecks] = useState([]);

  useEffect(() => {
    // Récupérer les données des decks au montage du composant
    const fetchData = async () => {
      const data = await getDeckFiles();
      console.log(data)
      setDecks(data);
    };

    fetchData();
  }, []);

  
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        {decks.map((deck, index) => (
          <TouchableOpacity key={index}>
            <View style={styles.box}>
              <Title style={styles.title}>{deck.name}</Title>
              <Text style={styles.text} numberOfLines={2}>
                {deck.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
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
    borderColor: "#F5F5F5",
    borderWidth: 2,
    width: "100%",
    height: 400,
    marginBottom: 10,
    overflow: "hidden",
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
