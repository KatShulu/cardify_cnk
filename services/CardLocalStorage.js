import * as FileSystem from "expo-file-system";

const deckFolderPath = `${FileSystem.documentDirectory}decks/`;

export const saveData = async (deckName, jsonData) => {
  const deckFilePath = getDeckFilePath(deckName);

  try {
    await FileSystem.writeAsStringAsync(deckFilePath, jsonData);
    console.log(`JSON data saved successfully for deck "${deckName}"!`);
  } catch (error) {
    console.log(`Error saving JSON data for deck "${deckName}":`, error);
    throw error;
  }
};

export const retrieveData = async (deckName) => {
  const deckFilePath = getDeckFilePath(deckName);

  try {
    const jsonData = await FileSystem.readAsStringAsync(deckFilePath);
    const deckData = JSON.parse(jsonData);
    console.log(`Retrieved JSON data for deck "${deckName}":`, deckData);
    return deckData;
  } catch (error) {
    console.log(`Error retrieving JSON data for deck "${deckName}":`, error);
    return [];
  }
};

export const deleteData = async (deckName) => {
  const deckFilePath = getDeckFilePath(deckName);

  try {
    await FileSystem.deleteAsync(deckFilePath);
    console.log(`Deck "${deckName}" deleted successfully!`);
  } catch (error) {
    console.log(`Error deleting deck "${deckName}":`, error);
    throw error;
  }
};

export const saveNewCard = async (deckName, newCard) => {
  try {
    const deckFilePath = getDeckFilePath(deckName);
    const fileInfo = await FileSystem.getInfoAsync(deckFilePath);
    const existingData = fileInfo.exists ? await retrieveData(deckName) : [];

    const combinedData = [...existingData, newCard];
    const combinedJsonData = JSON.stringify(combinedData);

    await FileSystem.writeAsStringAsync(deckFilePath, combinedJsonData);
    console.log(`New card saved successfully for deck "${deckName}"!`);
  } catch (error) {
    console.log(`Error saving new card for deck "${deckName}":`, error);
    throw error;
  }
};

export const deleteCard = async (deckName, key) => {
  try {
    const deckFilePath = getDeckFilePath(deckName);
    const fileInfo = await FileSystem.getInfoAsync(deckFilePath);

    if (!fileInfo.exists) {
      console.log(`Deck "${deckName}" does not exist. No cards to delete.`);
      return;
    }

    const existingData = await retrieveData(deckName);
    const filteredData = existingData.filter((card) => {
      const cardKey = Object.keys(card)[0];
      return cardKey !== key;
    });

    const updatedJsonData = JSON.stringify(filteredData);
    await FileSystem.writeAsStringAsync(deckFilePath, updatedJsonData);
    console.log(
      `Card with key "${key}" deleted successfully from deck "${deckName}"!`
    );
  } catch (error) {
    console.log(`Error deleting card from deck "${deckName}":`, error);
    throw error;
  }
};

const getDeckFilePath = (deckName) => {
  return `${deckFolderPath}${deckName}.json`;
};
