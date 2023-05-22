import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import FlashCard from './FlashCard';
import deckData from '../flashcardDeck.json';
import NewCardButton from './NewCardButton';

const RandomizeCard = () => {
  const [deck, setDeck] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentCard = deck[currentCardIndex];

  const selectRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    setCurrentCardIndex(randomIndex);
    setIsFlipped(false); // Set the new card to the word side
  };

  useEffect(() => {
    setDeck(deckData);
    if (deck.length > 0 && currentCardIndex === null) {
      selectRandomCard();
    }
  }, [deck]);

  if (deck.length === 0) {
    return <View>{/* Handle case when the deck is empty */}</View>;
  }

  if (currentCardIndex === null) {
    return null;
  }

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
    
  };

  return (
    <View>
      <FlashCard
        word={currentCard.word}
        definition={currentCard.definition}
        isFlipped={isFlipped}
        handleFlipCard={handleFlipCard}
      />
      <NewCardButton onPress={selectRandomCard} />
    </View>
  );
};

export default RandomizeCard;
