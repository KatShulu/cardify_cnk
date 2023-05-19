import React from "react";
import { StyleSheet, View } from "react-native";
import FlashCard from "../components/FlashCard";

export default function Home() {
  return (
    <View style={styles.container}>
      <FlashCard
        word="Démo"
        definition="Présentation de l'avancée du projet par le groupe devant ses collègues ou les clients. On présente les fonctionnalités principales, la maquette, les améliorations à venir... Attention à l'effet démo, prévoir un flash mob si l'app crashe" />
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
