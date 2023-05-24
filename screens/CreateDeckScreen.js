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
import { saveNewCard, createDeckFile } from "../services/DeckLocalStorage";
import  DropdownMenu from "../components/DropDownMenu";


function CreateDeckScreen() {
  const [notion, setNotion] = useState("");
  const [definition, setDefinition] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deckName, setDeckName] = useState("");

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
      await saveNewCard(deckName, { [sanitizedNotion]: sanitizedDefinition });

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

  const createNewDeck = async () => {
    if (!deckName) {
      alert("Please enter a deck name");
      return;
    }

    try {
      await createDeckFile(deckName);
      alert(`Deck "${deckName}" created successfully!`);
      setDeckName("");
    } catch (error) {
      alert("Error creating the deck. Please try again.");
      console.log(error, deckName)
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
        <DropdownMenu />

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
          <TextInput
            label="Deck Name"
            value={deckName}
            placeholder="Enter the name of the deck"
            onChangeText={(newText) => setDeckName(newText)}
          />

          <Button
            title="Save Card"
            color="#841584"
            accessibilityLabel="Button to save your card in your local storage button"
            onPress={saveCard}
            disabled={isSaveDisabled}
          />
          <Button
            title="Create Deck"
            color="#1f8ded"
            accessibilityLabel="Button to create a new deck in your local storage button"
            onPress={createNewDeck}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default CreateDeckScreen;
