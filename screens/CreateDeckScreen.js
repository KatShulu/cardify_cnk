import React, { useState } from "react";
import { Text, View, Button } from "react-native";
import { TextInput } from "react-native-paper";
import * as SecureStore from 'expo-secure-store';


export default function CreateDeckScreen() {
  const [notion, setNotion] = useState("");
  const [definition, setDefinition] = useState("");
  return (
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
          saveCard(notion, definition);
          //TODO: check what these functions do
          // onChangeKey('Your key here');
          // onChangeValue('Your value here');
        }}
      />
    </View>
  );
}

async function saveCard(key, value) {
  await SecureStore.setItemAsync(key, value);
}