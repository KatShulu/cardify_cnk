import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { TextInput } from "react-native-paper";
import {
  saveNewCard,
  retrieveData,
  deleteData,
} from "../services/HandleCardLocalStorage.js";

function CreateDeckScreen() {
  const [notion, setNotion] = useState("");
  const [definition, setDefinition] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const saveCard = async () => {
    // Sanitize the inputs
    const sanitizedNotion = sanitizeInput(notion);
    const sanitizedDefinition = sanitizeInput(definition);

    // Check if both inputs are filled
    if (!sanitizedNotion || !sanitizedDefinition) {
      // Handle case when either input is empty
      alert("Please fill in both Notion and Definition");
      return;
    }

    try {
      setIsSaving(true);

      // Save the card
      await saveNewCard(JSON.stringify({ [sanitizedNotion]: sanitizedDefinition }));

      // Clear the inputs
      setNotion("");
      setDefinition("");

      // Dismiss the keyboard
      Keyboard.dismiss();
    } catch (error) {
      alert("Error saving the card. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const sanitizeInput = (input) => {
    return input.trim();
  };

  const isSaveDisabled = !notion || !definition || isSaving;

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust the offset if needed
        enabled
      >
        <View>
          <Text>🎴 Now create your own Cards!</Text>

          <TextInput
            label="Notion"
            value={notion}
            placeholder="Enter your word or notion here"
            onChangeText={(newText) => setNotion(newText)}
          />
          <TextInput
            label="Definition"
            value={definition}
            placeholder="Enter what you would like to learn and remember"
            onChangeText={(newText) => setDefinition(newText)}
            multiline={true}
          />

          <Button
            title="Save Card"
            color="#841584"
            accessibilityLabel="Button to save your card in your local storage button"
            onPress={saveCard}
            disabled={isSaveDisabled}
          />
          <Button
            title="Delete deck"
            color="#849586"
            accessibilityLabel="Button to delete your deck in your local storage button"
            onPress={deleteData}
          />
          <Button
            title="Show deck"
            color="#844243"
            accessibilityLabel="Button to show your deck in your local storage button"
            onPress={retrieveData}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default CreateDeckScreen;
