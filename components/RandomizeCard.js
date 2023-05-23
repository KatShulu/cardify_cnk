import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import FlashCard from './FlashCard';
import NewCardButton from './NewCardButton';
import { retrieveData } from '../services/HandleCardLocalStorage';

const RandomizeCard = () => {
  const [deck, setDeck] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const selectRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    setCurrentCardIndex(randomIndex);
    setIsFlipped(false); // Set the new card to the word side
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const data = await retrieveData();
      setDeck(data);
    };

    fetchData();
  }, [currentCardIndex]);

  useEffect(() => {
    if (deck.length > 0 && currentCardIndex === null) {
      selectRandomCard();
    }
  }, [deck, currentCardIndex]);

  if (deck.length === 0) {
    return <View>{/* Handle case when the deck is empty */}</View>;
  }

  const handleFlipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <View>
      {currentCardIndex !== null ? (
        <FlashCard
          word={Object.keys(deck[currentCardIndex])[0]}
          definition={Object.values(deck[currentCardIndex])[0]}
          isFlipped={isFlipped}
          handleFlipCard={handleFlipCard}
        />
      ) : null}
      <NewCardButton onPress={selectRandomCard} />
    </View>
  );
};

export default RandomizeCard;
