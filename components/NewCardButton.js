import * as React from "react";
import { Button, IconButton } from "react-native-paper";
import { StyleSheet } from "react-native";
import { View } from "react-native-animatable";

const NewCardButton = ({ onPress }) => (
  <View style={styles.contain}>
     <IconButton
      icon="check"
      color="white"
      size={40}
      onPress={onPress}
      style={styles.validate}
    />
    
    <IconButton
      icon="close"
      color="white"
      size={40}
      onPress={onPress}
      style={styles.cancel}
    />
  </View>
);

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  validate: {
    backgroundColor: "#7AA95C",
    width: 80,
    height: 80,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  cancel: {
    width: 80,
    height: 80,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A7001E",
  },
});

export default NewCardButton;
