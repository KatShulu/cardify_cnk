import React, { useRef, useEffect } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const FlashCard = ({ word, definition, isFlipped, handleFlipCard }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
        cardRef.current.flipInY(500);
    }
  }, [isFlipped]);
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <TouchableWithoutFeedback onPress={handleFlipCard}>
          <Animatable.View ref={cardRef} style={styles.card}>
            <Card.Content style={styles.content}>
              {!isFlipped ? (
                <Title style={styles.wordText}>{word}</Title>
              ) : (
                <Paragraph style={styles.definitionText}>{definition}</Paragraph>
              )}
            </Card.Content>
          </Animatable.View>
        </TouchableWithoutFeedback>
      </View>
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
    backgroundColor: '#841584',
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
    color: '#fff',
  },
  definitionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
});

export default FlashCard;
