import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
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

  const renderDeckItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.box}>
        <Title style={styles.title}>{withoutExtension(item)}</Title>
        <Text style={styles.text} numberOfLines={2}></Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={renderDeckItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.column}
        />
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
