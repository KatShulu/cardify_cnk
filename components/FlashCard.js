import React, { useRef, useEffect } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Dimensions } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const FlashCard = ({ word, definition, isFlipped, handleFlipCard }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.flipInY(500);
    }
  }, [isFlipped]);

  const windowWidth = Dimensions.get('window').width;
  const cardWidth = Math.min(350, windowWidth * 0.8);

  return (
    <View style={styles.cardContainer}>
      <TouchableWithoutFeedback onPress={handleFlipCard}>
        <Animatable.View ref={cardRef} style={[styles.card, { width: cardWidth }]}>
          <Card.Content style={styles.content}>
            {!isFlipped ? (
              <Title style={styles.text}>{word}</Title>
            ) : (
              <Paragraph style={styles.text}>{definition}</Paragraph>
            )}
          </Card.Content>
        </Animatable.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  card: {
    height: 500,
    borderRadius: 8,
    backgroundColor: '#087E8A',
    elevation: 8,
    borderWidth: 5,
    borderColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
  },
});

export default FlashCard;
