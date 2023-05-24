import * as FileSystem from "expo-file-system";

const deckFolderPath = `${FileSystem.documentDirectory}decks/`;

const getDeckFilePath = (deckName) => {
  return `${deckFolderPath}${deckName}.json`;
};

// Create the decks directory if it doesn't exist
const createDeckDirectory = async () => {
  try {
    const directoryInfo = await FileSystem.getInfoAsync(deckFolderPath);
    if (!directoryInfo.exists) {
      await FileSystem.makeDirectoryAsync(deckFolderPath, { intermediates: true });
      console.log("Decks directory created successfully!");
    }
  } catch (error) {
    console.log("Error creating decks directory:", error);
    throw error;
  }
};

// Create an empty deck file if it doesn't exist
export const createDeckFile = async (deckName) => {
  const deckFilePath = getDeckFilePath(deckName);
  
  try {
    const fileInfo = await FileSystem.getInfoAsync(deckFilePath);
    if (!fileInfo.exists) {
      await FileSystem.writeAsStringAsync(deckFilePath, "[]");
      console.log(`Deck file "${deckName}.json" created successfully!`);
    }
  } catch (error) {
    console.log(`Error creating deck file "${deckName}.json":`, error);
    throw error;
  }
};

// Call the createDeckDirectory function at the beginning to ensure the directory is created
createDeckDirectory();

// Delete all decks
export const deleteAllDecks = async () => {
    try {
      const directoryContent = await FileSystem.readDirectoryAsync(deckFolderPath);
      const deckFiles = directoryContent.filter((filename) => filename.endsWith(".json"));
      for (const deckFile of deckFiles) {
        const deckFilePath = `${deckFolderPath}${deckFile}`;
        await FileSystem.deleteAsync(deckFilePath);
        console.log(`Deck file "${deckFile}" deleted successfully!`);
      }
    } catch (error) {
      console.log("Error deleting decks:", error);
      throw error;
    }
  };
  
  // Delete a deck by name
  export const deleteDeckByName = async (deckName) => {
    try {
      const deckFilePath = getDeckFilePath(deckName);
      await FileSystem.deleteAsync(deckFilePath);
      console.log(`Deck "${deckName}" deleted successfully!`);
    } catch (error) {
      console.log(`Error deleting deck "${deckName}":`, error);
      throw error;
    }
  };
export const getDeckFiles = async () => {
    try {
      const directoryContent = await FileSystem.readDirectoryAsync(deckFolderPath);
      const deckFiles = directoryContent.filter((filename) => filename.endsWith("json"))
      return deckFiles
    } catch (error) {
        console.log(`Error retrieving decks "${deckName}":`, error);
        throw error;
    }
}
//deleteAllDecks()
getDeckFiles()