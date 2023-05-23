import * as FileSystem from "expo-file-system";

const filePath = `${FileSystem.documentDirectory}deck.json`;

export const saveData = async (jsonData) => {
  try {
    await FileSystem.writeAsStringAsync(filePath, jsonData);
    console.log("JSON data saved successfully!");
  } catch (error) {
    console.log("Error saving JSON data:", error);
    throw error;
  }
};

export const retrieveData = async () => {
  try {
    const jsonData = await FileSystem.readAsStringAsync(filePath);
    const jsonObject = JSON.parse(jsonData);
    console.log("Retrieved JSON data:", jsonObject);
    return jsonObject;
  } catch (error) {
    console.log("Error retrieving JSON data:", error);
    return [];
  }
};

export const deleteData = async () => {
  try {
    await FileSystem.deleteAsync(filePath);
    console.log("File deleted successfully!");
  } catch (error) {
    console.log("Error deleting file:", error);
    throw error;
  }
};

export const saveNewCard = async (newCard) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    if (fileInfo.exists) {
      const jsonData = await FileSystem.readAsStringAsync(filePath);
      const existingData = JSON.parse(jsonData);
      const combinedData = [...existingData, JSON.parse(newCard)];
      const combinedJsonData = JSON.stringify(combinedData);
      await FileSystem.writeAsStringAsync(filePath, combinedJsonData);
      console.log("New card saved successfully!");
    } else {
      await saveData(`[${newCard}]`);
      console.log("New card saved successfully!");
    }
  } catch (error) {
    console.log("Error saving new card:", error);
    throw error;
  }
};
