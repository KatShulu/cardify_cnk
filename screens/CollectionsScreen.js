import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Title } from "react-native-paper";

export default function CollectionsScreen() {
  return (
    <View>
      <View style={styles.box}>
        <Title style={styles.title}>Recent Decks</Title>
        <Text style={styles.text}>Placeholder for recent decks</Text>
      </View>
      <View  style={styles.box}>
        <Title style={styles.title}>My Collections</Title>
        <Text style={styles.text}>Placeholder for Your Collections</Text>
      </View>
      <View  style={styles.box}>
        <Title style={styles.title}>Public Collections</Title>
        <Text style={styles.text}>Placeholder for Public Collections</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#087E8A",
    borderColor: "#F5F5F5",
    borderWidth: 2,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#F5F5F5"
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#F5F5F5"
  }
});