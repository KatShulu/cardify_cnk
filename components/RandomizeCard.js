import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import FlashCard from './FlashCard';
import NewCardButton from './NewCardButton';
import { retrieveData } from '../services/HandleCardLocalStorage';

const RandomizeCard = () => {
  const [deck, setDeck] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // Function to select a random card from the deck
  const selectRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    setCurrentCardIndex(randomIndex);
    setIsFlipped(false); // Set the new card to the word side
  };

  useEffect(() => {
    // Fetch data from storage when the component mounts
    const fetchData = async () => {
      try {
        const data = await retrieveData();
        setDeck(data);
      } catch (error) {
        console.log('Error retrieving data:', error); // Avoid logging sensitive information
        // Handle the error gracefully without exposing sensitive information
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Select a random card when the deck changes
    if (deck.length > 0) {
      selectRandomCard();
    }
  }, [deck]);

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  if (deck.length === 0 || currentCardIndex === null) {
    // Handle case when the deck is empty or no current card index
    return <View>{/* Display an appropriate message or loading state */}</View>;
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

export default RandomizeCard;
