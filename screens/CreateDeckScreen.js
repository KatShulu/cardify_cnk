import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";

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
    </View>
  );
}