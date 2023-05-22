import * as React from 'react';
import { Button } from 'react-native-paper';

const NewCardButton = ({ onPress }) => (
  <Button mode="contained-tonal" onPress={onPress}>
    New Card
  </Button>
);

export default NewCardButton;
