import React, { useState, useEffect } from "react";
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
import { createDeckFile } from "../services/DeckLocalStorage";
import { saveNewCard, retrieveData } from "../services/CardLocalStorage";
import DropdownMenu from "../components/DropDownMenu";

function CreateDeckScreen() {
  const [notion, setNotion] = useState("");
  const [definition, setDefinition] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deckName, setDeckName] = useState("");
  const [selectedDeck, setSelectedDeck] = useState(null); // State to store the selected deck

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleDeckSelection = (deck) => {
    setSelectedDeck(deck);
    // Additional logic to handle the selected deck if needed
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
    if (!selectedDeck) {
      alert("Please select a deck");
      return;
    }

    try {
      setIsSaving(true);

      // Save the card
      await saveNewCard(selectedDeck, {
        [sanitizedNotion]: sanitizedDefinition,
      });

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

      // Update the selected deck
      setSelectedDeck(deckName);
    } catch (error) {
      alert("Error creating the deck. Please try again.");
      console.log(error, deckName);
    }
  };

  const handleRetrieveData = async () => {
    if (!selectedDeck) {
      alert("Please select a deck");
      return;
    }

    try {
      const deckData = await retrieveData(selectedDeck);
      console.log(`Retrieved data for deck "${selectedDeck}":`, deckData);
      // Do something with the retrieved data
    } catch (error) {
      alert(`Error retrieving data for deck "${selectedDeck}". Please try again.`);
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
          <DropdownMenu
            selectedDeck={selectedDeck}
            onDeckSelection={handleDeckSelection}
          />

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
            color="#087E8A"
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
          <Button
            title="Retrieve Data"
            color="#1f8ded"
            accessibilityLabel="Button to retrieve data for the selected deck"
            onPress={handleRetrieveData}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default CreateDeckScreen;
