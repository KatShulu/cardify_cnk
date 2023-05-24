import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Title } from "react-native-paper";

export default function CollectionsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <TouchableOpacity>
          <View style={styles.box}>
            <Title style={styles.title}>Name Deck #1</Title>
            <Text style={styles.text} numberOfLines={2}>
              Description of Deck
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.box}>
            <Title style={styles.title}>Name Deck #2</Title>
            <Text style={styles.text} numberOfLines={2}>
              Description of Deck
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.box}>
            <Title style={styles.title}>Name Deck #3</Title>
            <Text style={styles.text} numberOfLines={2}>
              Description of Deck
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.column}>
        <TouchableOpacity>
          <View style={styles.box}>
            <Title style={styles.title}>Name Deck #4</Title>
            <Text style={styles.text} numberOfLines={2}>
              Description of Deck
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.box}>
            <Title style={styles.title}>Name Deck #5</Title>
            <Text style={styles.text} numberOfLines={2}>
              Description of Deck
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.box}>
            <Title style={styles.title}>Name Deck #6</Title>
            <Text style={styles.text} numberOfLines={2}>
              Description of Deck
            </Text>
          </View>
        </TouchableOpacity>
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
    height: 200,
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
