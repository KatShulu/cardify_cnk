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

export default function CreateDeckScreen() {
  const [notion, setNotion] = useState("");
  const [definition, setDefinition] = useState("");

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const saveCard = async () => {
    await saveNewCard(JSON.stringify({ [notion]: definition }));
    await retrieveData();
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
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
