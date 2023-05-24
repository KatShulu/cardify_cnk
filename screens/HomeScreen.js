import React from 'react';
import { StyleSheet, View } from 'react-native';
import RandomizeCard from '../components/RandomizeCard';
import DropdownMenu from '../components/DropDownMenu';

export default function Home() {

  return (
    <View style={styles.container}>
      <DropdownMenu />
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
