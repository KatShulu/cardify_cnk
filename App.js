import React, {useState} from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import {
  Provider as PaperProvider,
  BottomNavigation,
  Appbar,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LearnScreen from "./screens/LearnScreen.js";
import CreateDeckScreen from "./screens/CreateDeckScreen.js";
import CollectionsScreen from "./screens/CollectionsScreen.js";
import ProfilScreen from "./screens/ProfileScreen.js"

export default function App() {
  // Initializing the state for the current tab index
  const [index, setIndex] = useState(0);
  // Defining the routes for the Bottom Navigation Tabbar
  const routes = [
    { key: "LearnScreen", title: "Learn", icon: "card-bulleted" },
    { key: "CreateDeckScreen", title: "Create", icon: "card-plus"},
    { key: "CollectionsScreen", title: "Collections", icon: "cards"},
    { key: "ProfilScreen", title: "Profile", icon: "account-cowboy-hat"},
  ];
  // Mapping the screens to their respective keys in the Bottom Navigation Tabbar
  const renderScene = BottomNavigation.SceneMap({
    LearnScreen: LearnScreen,
    CreateDeckScreen: CreateDeckScreen,
    CollectionsScreen: CollectionsScreen,
    ProfilScreen : ProfilScreen,
  });
  // Rendering the proper icon for each tab
  const renderIcon = ({ route, color }) => {
    return <Icon name={route.icon} size={30} color={color} />;
  };
  // Handling tab press and updating the current index state accordingly
  const handleTabPress = (newIndex) => {
    setIndex(newIndex);
  };
  // Defining the accessibility label to be read by screen reader for each tab
  const accessibilityLabel = (route) => {
    return `Go to ${route.title}`;
  };
  // Defining options for the screen reader
  const screenReaderOptions = {
    announceCurrentState: true,
    backgroundColor: "#F5F5F5",
  };
  return (
    <PaperProvider>
      <NavigationContainer>
        <Appbar.Header>
          <Appbar.Content title="Cardify" />
        </Appbar.Header>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={handleTabPress}
          renderScene={renderScene}
          renderIcon={renderIcon}
          labeled={true}
          accessibilityRole="tablist"
          accessibilityLabel="Navigation tabs"
          screenReaderOptions={screenReaderOptions}
          getAccessibilityLabel={accessibilityLabel}
        />
      </NavigationContainer>
    </PaperProvider>
  );
}
