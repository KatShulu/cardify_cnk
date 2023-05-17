import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import FlashCard from "../components/FlashCard";

export default function Home() {
  return (
    <View style={styles.container}>
      <FlashCard word="Bonjour" definition="Salutation utilisée pour dire hello" />
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
