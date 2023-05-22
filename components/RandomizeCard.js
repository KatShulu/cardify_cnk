import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import FlashCard from './FlashCard';
import deckData from '../flashcardDeck.json';
import NewCardButton from './NewCardButton';

const RandomizeCard = () => {
  const [deck, setDeck] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(null);

  useEffect(() => {
    loadDeck();
  }, []);

  const loadDeck = () => {
    setDeck(deckData);
  };

  const selectRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    setCurrentCardIndex(randomIndex);
  };

  const generateNewCard = () => {
    selectRandomCard();
  };

  useEffect(() => {
    if (deck.length > 0 && currentCardIndex === null) {
      selectRandomCard();
    }
  }, [deck]);

  if (deck.length === 0) {
    return <View>{/* Handle case when the deck is empty */}</View>;
  }

  if (currentCardIndex === null) {
    return null; // Return null until the first card is selected
  }

  const currentCard = deck[currentCardIndex];

  return (
    <View>
      <FlashCard word={currentCard.word} definition={currentCard.definition} />
      <NewCardButton onPress={generateNewCard} />
    </View>
  );
};

export default RandomizeCard;
