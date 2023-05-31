import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";

const DeckCompletion = ({ deckName, completion, percentage }) => {
  let progressColor;

  switch (true) {
    case percentage < 30:
      progressColor = "red";
      break;
    case percentage >= 30 && percentage <= 60:
      progressColor = "orange";
      break;
    case percentage > 60 && percentage < 100:
      progressColor = "yellow";
      break;
    default:
      progressColor = "green";
      break;
  }

  return (
    <View style={[styles.container, {borderColor: global.AppTheme.accentColor}]}>
      <Text style={[styles.deckName, {color: global.AppTheme.onAppBackground}]}>{deckName}</Text>
      <View style={[styles.progressContainer, {backgroundColor : global.AppTheme.progressionBackround}]}>
        <View
          style={[
            styles.progressBar,
            { width: `${percentage}%`, backgroundColor: progressColor },
          ]}
        />
      </View>
      <Text style={[styles.completion, {color: global.AppTheme.onAppBackground}]}>{completion} validated</Text>
      <Divider />
    </View>
  );
};

export default DeckCompletion;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  deckName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    paddingTop: 5,
  },
  completion: {
    fontSize: 12,
    marginBottom: 5,
    marginTop:5,
  },
  progressContainer: {
    height: 10,
    width: "100%",
    backgroundColor: "lightgray",
    borderRadius: 5,
    marginTop: 5,
  },
  progressBar: {
    height: "100%",
    borderRadius: 5,
  },
});
