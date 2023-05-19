import React, {useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  Provider as PaperProvider,
  BottomNavigation,
  Appbar,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "./screens/HomeScreen.js";
import CreateDeckScreen from "./screens/CreateDeckScreen.js";
import CollectionsScreen from "./screens/CollectionsScreen.js";

export default function App() {
  // Initializing state for the current tab index
  const [index, setIndex] = useState(0);
  // Defining the routes for the Bottom Navigation Tabbar
  const routes = [
    { key: "HomeScreen", title: "Learn", icon: "card-bulleted" },
    { key: "CreateDeckScreen", title: "Create", icon: "card-plus"},
    { key: "CollectionsScreen", title: "Collections", icon: "cards"},

  ];
  // Mapping the screens to their respective keys in the Bottom Navigation Tabbar
  const renderScene = BottomNavigation.SceneMap({
    HomeScreen: HomeScreen,
    CreateDeckScreen: CreateDeckScreen,
    CollectionsScreen: CollectionsScreen,
  });
  // Rendering the icon for each tab
  const renderIcon = ({ route, color }) => {
    return <Icon name={route.icon} size={30} color={color} />;
  };
  // Handling tab press and updating the current index state
  const handleTabPress = (newIndex) => {
    setIndex(newIndex);
  };
  // Defining accessibility label for each tab
  const accessibilityLabel = (route) => {
    return `Go to ${route.title}`;
  };
  // Defining screen reader options
  const screenReaderOptions = {
    announceCurrentState: true,
    backgroundColor: "#F5F5F5",
  };
  // Rendering the app with PaperProvider, NavigationContainer and BottomNavigation
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
          barStyle={{ backgroundColor: "#F5F5F5" }}
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
