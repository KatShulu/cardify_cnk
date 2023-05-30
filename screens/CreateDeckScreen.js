import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MD3LightTheme, MD3DarkTheme, TextInput, Title } from "react-native-paper";
import DropdownMenu from "../components/DropDownMenu";

function CreateDeckScreen() {

  const [notion, setNotion] = useState("");
  const [definition, setDefinition] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deckName, setDeckName] = useState("");
  const [selectedDeck, setSelectedDeck] = useState(null); // State to store the selected deck

  // Creates a local variable theme to adapt the inputs colors to the app theme
  const theme = {
    ...MD3LightTheme,
    roundness: 2,
    colors: {
      ...MD3LightTheme.colors,
      primary: '#3498db',
      secondary: '#f1c40f',
      tertiary: '#a1b2c3',
    },
    ...MD3DarkTheme,
    roundness: 2,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#3498db',
      secondary: '#f1c40f',
      tertiary: '#a1b2c3',
    },
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleDeckSelection = (deck) => {
    setSelectedDeck(deck);
    // Additional logic to handle the selected deck if needed
  };

  const saveCard = async () => {
    // Sanitize the inputs to avoid security issues like injections
    const sanitizedNotion = sanitizeInput(notion);
    const sanitizedDefinition = sanitizeInput(definition);

    // Check if both inputs are filled
    if (!sanitizedNotion || !sanitizedDefinition) {
      // Handle case when one input is empty
      alert("Please fill in both Notion and Definition");
      return;
    }
    if (!selectedDeck) {
      alert("Please select a deck");
      return;
    }

    try {
      setIsSaving(true);

      // Save the card in the selected deck
      await saveNewCardInDeck(selectedDeck, {
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
    // Can't save a card if a deck is not selected
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
      const deckData = await retrieveCardInDeck(selectedDeck);
      console.log(`Retrieved data for deck "${selectedDeck}":`, deckData);
      // Do something with the retrieved data
    } catch (error) {
      alert(
        `Error retrieving data for deck "${selectedDeck}". Please try again.`
      );
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
        // Adjusts the offset if needed
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        enabled
      >
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>

          <Title style={styles.title}>Now create your own Cards!</Title>
            <DropdownMenu
              selectedDeck={selectedDeck}
              onDeckSelection={handleDeckSelection}
            />
            <View>
              <TextInput
                label="Notion"
                value={notion}
                placeholder="Enter your word or notion here"
                onChangeText={(newText) => setNotion(newText)}
              />
              <TextInput
                label="Definition"
                value={definition}
                placeholder="Enter what you would like to learn and remember about this notion"
                onChangeText={(newText) => setDefinition(newText)}
                multiline={true}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Save Card"
                color="#087E8A"
                accessibilityLabel="Button to save your card in your local storage button"
                onPress={saveCard}
                disabled={isSaveDisabled}
              />
            </View>
          </View>
          <View style={styles.card}>
            <Title style={styles.title}>Create a new Deck here:</Title>
            <TextInput
              label="Deck Name"
              value={deckName}
              placeholder="Enter the name of the deck"
              onChangeText={(newText) => setDeckName(newText)}
            />

          <View style={styles.buttonContainer}>
            <Button
              title="Create Deck"
              color="#087E8A"
              accessibilityLabel="Button to create a new deck in your local storage button"
              onPress={createNewDeck}
            />
          </View>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "lightgrey",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  buttonContainer: {
    marginBottom: 16,
  },
});

export default CreateDeckScreen;
