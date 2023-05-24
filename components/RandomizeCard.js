// RandomizeCard.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import FlashCard from './FlashCard';
import NewCardButton from './NewCardButton';
import { retrieveData } from '../services/CardLocalStorage';

const RandomizeCard = ({ selectedDeck }) => {
  const [deck, setDeck] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Step 1: Function to select a random card from the deck
  const selectRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    setCurrentCardIndex(randomIndex);
    setIsFlipped(false); // Set the new card to the word side
  };

  useEffect(() => {
    // Step 2: Fetch deck data from local storage
    const fetchData = async () => {
      try {
        const deckData = await retrieveData(selectedDeck);
        setDeck(deckData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.log(`Error retrieving data for deck "${selectedDeck}":`, error);
      }
    };

    // Trigger data fetching when selected deck changes
    if (selectedDeck) {
      setIsLoading(true);
      fetchData();
    }
  }, [selectedDeck]);

  useEffect(() => {
    // Step 3: Select a random card when the deck changes
    if (deck.length > 0) {
      selectRandomCard();
    }
  }, [deck]);

  const handleFlipCard = () => {
    setIsFlipped((prevState) => !prevState);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || deck.length === 0 || currentCardIndex === null) {
    // Handle case when the deck is empty or no current card index
    return (
      <View style={styles.errorContainer}>
        <Text>Error: Unable to load deck.</Text>
      </View>
    );
  }

  const currentCard = deck[currentCardIndex];
  const word = Object.keys(currentCard)[0];
  const definition = Object.values(currentCard)[0];

  return (
    <View>
      {/* Display the FlashCard component with the current card */}
      <FlashCard
        word={word}
        definition={definition}
        isFlipped={isFlipped}
        handleFlipCard={handleFlipCard}
      />
      {/* Display the NewCardButton component for selecting a new random card */}
      <NewCardButton onPress={selectRandomCard} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RandomizeCard;
