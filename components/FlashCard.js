import React, { useState, useRef } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const FlashCard = ({ word, definition, side }) => {
  const [flipped, setFlipped] = useState(side);
  const cardRef = useRef(null);

  const handleFlipCard = () => {
    setFlipped(!flipped);
    if (cardRef.current) {
      cardRef.current.flipInY(500);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleFlipCard}>
        <View style={styles.cardContainer}>
          <Animatable.View ref={cardRef} style={styles.card}>
            <Card.Content style={styles.content}>
              {!flipped ? (
                <Title style={styles.wordText}>{word}</Title>
              ) : (
                <Paragraph style={styles.definitionText}>{definition}</Paragraph>
              )}
            </Card.Content>
          </Animatable.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: 'auto', 
    marginBottom: 'auto',
  },
  card: {
    width: 318,
    height: 382,
    borderRadius: 8,
    backgroundColor: '#9c27b0',
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  wordText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
  },
  definitionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
});

export default FlashCard;
