// RandomizeCard.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import FlashCard from './FlashCard';
import NewCardButton from './NewCardButton';
import { retrieveCardInDeck } from '../services/CardLocalStorage';
import {incrementPositiveCount, incrementNegativeCount, getEvaluationData} from "../services/EvalLocalStorage"

const RandomizeCard = ({ selectedDeck }) => {
  const [deck, setDeck] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    setCurrentCardIndex(randomIndex);
    setIsFlipped(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deckData = await retrieveCardInDeck(selectedDeck);
        setDeck(deckData);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.log(`Error retrieving data for deck "${selectedDeck}":`, error);
      }
    };

    if (selectedDeck) {
      setIsLoading(true);
      fetchData();
    }
  }, [selectedDeck]);

  useEffect(() => {
    if (deck.length > 0) {
      selectRandomCard();
    }
  }, [deck]);

  const handleFlipCard = () => {
    setIsFlipped((prevState) => !prevState);
  };

  //Show an other card an stock if the user clicked the "i know"/"idon't know"
  const handleCardValidation = (isValidated) =>{
    selectRandomCard()
    const wordAndDeck = `${selectedDeck}/${word}`;
    isValidated? incrementPositiveCount(wordAndDeck) : incrementNegativeCount(wordAndDeck)
  }
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (deck.length === 0){
    return (
      <View style={styles.errorContainer}>
        <Text>Le deck sélectionné est vide.</Text>
      </View>
    );
  }else if (error || currentCardIndex === null) {
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
      <FlashCard
        word={word}
        definition={definition}
        isFlipped={isFlipped}
        handleFlipCard={handleFlipCard}
      />
      <NewCardButton onPress={handleCardValidation} />
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
