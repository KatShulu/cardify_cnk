import React, { useRef, useEffect } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Dimensions, Text } from 'react-native';
import { Card } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

const FlashCard = ({ word, definition, isFlipped, handleFlipCard }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.flipInY(500).catch(error => {
        console.log('Error animating card:', error);
        // Perform error handling here, such as displaying a fallback UI
      });
    }
  }, [isFlipped]);

  const windowWidth = Dimensions.get('window').width;
  const cardWidth = Math.min(350, windowWidth * 0.8);

  return (
    <View style={styles.cardContainer}>
      <TouchableWithoutFeedback onPress={handleFlipCard}>
        <Animatable.View ref={cardRef} style={[styles.card, { width: cardWidth }, {borderColor: global.AppTheme.onCard, backgroundColor: global.AppTheme.card}]}>
          <Card.Content style={styles.content}>
            {!isFlipped ? (
              <Text style={[styles.text, {color: global.AppTheme.onCard}]}>{word}</Text>
            ) : (
              <Text style={[styles.text, {color: global.AppTheme.onCard}]}>{definition}</Text>
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
    elevation: 8,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default FlashCard;
