import * as FileSystem from "expo-file-system";

const evaluationFilePath = `${FileSystem.documentDirectory}evaluation.json`;

/**
 * Create the evaluation.json file if it doesn't exist
 * @throws {Error} If there's an error creating the evaluation file.
 */
export const createEvaluationFile = async () => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(evaluationFilePath);
    if (!fileInfo.exists) {
      await FileSystem.writeAsStringAsync(evaluationFilePath, "{}");
      console.log("Evaluation file created successfully!");
    }
  } catch (error) {
    console.log("Error creating evaluation file:", error);
    throw error;
  }
};
/**
 * Delete the evaluation.json file
 * @throws {Error} If there's an error deleting the evaluation file.
 */
export const deleteEvaluationFile = async () => {
    try {
      await FileSystem.deleteAsync(evaluationFilePath);
      console.log('Evaluation file deleted successfully.');
    } catch (error) {
      console.log('Error deleting evaluation file:', error);
      throw error;
    }
  };
/**
 * Retrieve the content of the evaluation file
 * @returns {Object} The evaluation data object.
 * @throws {Error} If there's an error reading the evaluation file.
 */
export const getEvaluationData = async () => {
    try {
      const evaluationContent = await FileSystem.readAsStringAsync(evaluationFilePath);
      const evaluationData = JSON.parse(evaluationContent);
      console.log(evaluationData)

      return evaluationData;
    } catch (error) {
      console.log("Error reading evaluation file:", error);
      throw error;
    }
  };

/**
 * Increment the positive count for a card key
 * @param {string} cardKey - The key of the card.
 * @throws {Error} If there's an error updating the positive count.
 */
export const incrementPositiveCount = async (cardKey) => {
  try {
    const evaluationContent = await FileSystem.readAsStringAsync(evaluationFilePath);
    const evaluationData = JSON.parse(evaluationContent);

    if (!evaluationData[cardKey]) {
      evaluationData[cardKey] = { positive: 1, negative: 0 };
    } else {
      evaluationData[cardKey].positive++;
    }

    await FileSystem.writeAsStringAsync(evaluationFilePath, JSON.stringify(evaluationData));
    console.log(`Positive count incremented for card "${cardKey}"`);
  } catch (error) {
    console.log(`Error updating positive count for card "${cardKey}":`, error);
    throw error;
  }
};

/**
 * Increment the negative count for a card key
 * @param {string} cardKey - The key of the card.
 * @throws {Error} If there's an error updating the negative count.
 */
export const incrementNegativeCount = async (cardKey) => {
  try {
    const evaluationContent = await FileSystem.readAsStringAsync(evaluationFilePath);
    const evaluationData = JSON.parse(evaluationContent);

    if (!evaluationData[cardKey]) {
      evaluationData[cardKey] = { positive: 0, negative: 1 };
    } else {
      evaluationData[cardKey].negative++;
    }

    await FileSystem.writeAsStringAsync(evaluationFilePath, JSON.stringify(evaluationData));
    console.log(`Negative count incremented for card "${cardKey}"`);
  } catch (error) {
    console.log(`Error updating negative count for card "${cardKey}":`, error);
    throw error;
  }
};

// Call the createEvaluationFile function at the beginning to ensure the file is created
createEvaluationFile();

// Export the functions for use in other components/modules
