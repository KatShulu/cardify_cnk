import React from 'react';
import { StyleSheet, View } from 'react-native';
import RandomizeCard from '../components/RandomizeCard';
import DropdownMenu from '../components/DropDownMenu';

export default function Home() {
  const options = [
    { title: 'Deck 1', onPress: () => console.log('Option 1 selected') },
    { title: 'Deck 2', onPress: () => console.log('Option 2 selected') },
    { title: 'Deck 3', onPress: () => console.log('Option 3 selected') },
  ];

  return (
    <View style={styles.container}>
      <DropdownMenu options={options} />
      <RandomizeCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
