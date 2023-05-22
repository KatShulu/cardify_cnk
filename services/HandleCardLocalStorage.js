import * as FileSystem from "expo-file-system";

const filePath = FileSystem.documentDirectory + 'deck.json';

export const saveData = async (jsonData) => {
  try {
    await FileSystem.writeAsStringAsync(filePath, jsonData);
    console.log("JSON data saved successfully!");
  } catch (error) {
    console.log("Error saving JSON data:", error);
  }
};
export const retrieveData = async () => {
  try {
    const jsonData = await FileSystem.readAsStringAsync(filePath);
    const jsonObject = JSON.parse(jsonData);
    console.log("Retrieved JSON data:", jsonObject);
  } catch (error) {
    console.log("Error retrieving JSON data:", error);
  }
};
export const deleteData = async () => {
  try {
    await FileSystem.deleteAsync(filePath);
    console.log("File deleted successfully!");
  } catch (error) {
    console.log("Error deleting file:", error);
  }
};
