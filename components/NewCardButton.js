import * as React from "react";
import { IconButton } from "react-native-paper";
import { StyleSheet, View, Dimensions } from "react-native";

const NewCardButton = ({ onPress }) => {
  const windowWidth = Dimensions.get('window').width;
  const buttonSize = Math.min(60, windowWidth * 0.1);

  return (
    <View style={styles.container}>
      <View style={[styles.buttonContainer, styles.bottomLeft]}>
        <IconButton
          icon="check"
          iconColor="#F5F5F5"
          size={buttonSize}
          onPress={onPress}
          style={styles.validate}
        />
      </View>
      <View style={[styles.buttonContainer, styles.bottomRight]}>
        <IconButton
          icon="close"
          iconColor="#F5F5F5"
          size={buttonSize}
          onPress={onPress}
          style={styles.cancel}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: -40,
  },
  buttonContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomLeft: {
    bottom: -35,
    left: 0,
  },
  bottomRight: {
    bottom: -35,
    right: 0,
  },
  validate: {
    backgroundColor: "#82C1A6",
    borderRadius: 60,
  },
  cancel: {
    borderRadius: 60,
    backgroundColor: "#FF5A60",
  },
});

export default NewCardButton;
