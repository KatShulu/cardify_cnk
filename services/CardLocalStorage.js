import * as FileSystem from "expo-file-system";

const deckFolderPath = `${FileSystem.documentDirectory}decks/`;

/**
 * Retrieve deck data from a file.
 * @param {string} deckName - The name of the deck.
 * @returns {Array} The retrieved deck data.
 */
export const retrieveCardInDeck = async (deckName) => {
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

/**
 * Save a new card to a deck.
 * @param {string} deckName - The name of the deck.
 * @param {object} newCard - The new card to be saved.
 * @throws {Error} If there's an error saving the new card.
 */
export const saveNewCardInDeck = async (deckName, newCard) => {
  try {
    const deckFilePath = getDeckFilePath(deckName);
    const fileInfo = await FileSystem.getInfoAsync(deckFilePath);
    const existingData = fileInfo.exists
      ? await retrieveCardInDeck(deckName)
      : [];

    const combinedData = [...existingData, newCard];
    const combinedJsonData = JSON.stringify(combinedData);

    await FileSystem.writeAsStringAsync(deckFilePath, combinedJsonData);
    console.log(`New card saved successfully for deck "${deckName}"!`);
  } catch (error) {
    console.log(`Error saving new card for deck "${deckName}":`, error);
    throw error;
  }
};
export const updateCardInDeck = async (deckName, key, newName, newDef) => {
  try {
    const deckFilePath = getDeckFilePath(deckName);
    const fileInfo = await FileSystem.getInfoAsync(deckFilePath);

    if (!fileInfo.exists) {
      console.log(`Deck "${deckName}" does not exist. Cannot update card.`);
      return;
    }

    const existingData = await retrieveCardInDeck(deckName);
    const updatedData = existingData.map((card) => {
      const cardKey = Object.keys(card)[0];
      const cardValue = Object.values(card)[0];
      if (cardKey === key) {
        const updatedCard = {
          [newName]: newDef
        };
        return Object.fromEntries(Object.entries(updatedCard));
      }
      return card;
    });

    const updatedJsonData = JSON.stringify(updatedData);
    await FileSystem.writeAsStringAsync(deckFilePath, updatedJsonData);
    console.log(`Card updated successfully in deck "${deckName}"!`);
  } catch (error) {
    console.log(`Error updating card:`, error);
    throw error;
  }
};



/**
 * Delete a card from a deck.
 * @param {string} deckName - The name of the deck.
 * @param {string} key - The key of the card to be deleted.
 * @throws {Error} If there's an error deleting the card.
 */
export const deleteCardInDeck = async (deckName, key) => {
  try {
    const deckFilePath = getDeckFilePath(deckName);
    const fileInfo = await FileSystem.getInfoAsync(deckFilePath);

    if (!fileInfo.exists) {
      console.log(`Deck "${deckName}" does not exist. No cards to delete.`);
      return;
    }

    const existingData = await retrieveCardInDeck(deckName);
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

/**
 * Get the file path for a deck.
 * @param {string} deckName - The name of the deck.
 * @returns {string} The file path for the deck.
 */
const getDeckFilePath = (deckName) => {
  return `${deckFolderPath}${deckName}.json`;
};
