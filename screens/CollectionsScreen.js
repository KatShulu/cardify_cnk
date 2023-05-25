import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Title } from "react-native-paper";
import { getDeckFilesNames } from "../services/DeckLocalStorage";

const windowWidth = Dimensions.get("window").width;

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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        </ScrollView>
      </View>
    );
  };

  return renderDecks();
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
    width: (windowWidth - 40) / 2, // Diviser la largeur de l'écran par 2 pour obtenir 2 colonnes
    height: 200,
    marginBottom: 10,
    overflow: "hidden",
    backgroundColor: "#087E8A",
    borderColor: "#3C3C3C",
    borderWidth: 2,
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
