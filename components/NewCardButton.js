import React from "react";
import { IconButton } from "react-native-paper";
import { StyleSheet, View, Dimensions } from "react-native";

const NewCardButton = ({ onPress }) => {
  const windowWidth = Dimensions.get("window").width;
  const buttonSize = Math.min(60, windowWidth * 0.1);

  return (
    <View style={styles.container}>
      {/* Yes button */}
      <View style={[styles.buttonContainer, styles.bottomLeft]}>
        <IconButton
          icon="check"
          iconColor={global.AppTheme.onValidate}
          accessibilityLabel="Validate"
          size={buttonSize}
          onPress={()=>onPress(true)}
          style={[styles.validate, {backgroundColor : global.AppTheme.validate}]}
        />
      </View>

      {/* No button */}
      <View style={[styles.buttonContainer, styles.bottomRight]}>
        <IconButton
          icon="close"
          iconColor={global.AppTheme.onInValidate}
          accessibilityLabel="Invalidate"
          size={buttonSize}
          onPress={()=>onPress(false)}
          style={[styles.Invalidate, {backgroundColor : global.AppTheme.inValidate}]}
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
    borderRadius: 60,
  },
  Invalidate: {
    borderRadius: 60,
  },
});

export default NewCardButton;
