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
  saveData,
  retrieveData,
  deleteData,
} from "../services/HandleCardLocalStorage.js";

export default function CreateDeckScreen() {
  const [notion, setNotion] = useState("");
  const [definition, setDefinition] = useState("");

  const dismissKeyboard = () => {
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
            onPress={() => {
              saveData(JSON.stringify({ key: notion, value: definition }));
              console.log(retrieveData());
              Keyboard.dismiss();
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
