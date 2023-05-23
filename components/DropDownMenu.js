import * as React from "react";
import { Menu, Divider, Text } from "react-native-paper";
import { IconButton } from "react-native-paper";
import { StyleSheet, View, Dimensions } from "react-native";

const DropdownMenu = ({ options }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const anchorPosition = { x: 200, y: 160 }; // Coordonnées fixes pour l'ancre du menu

  const screenWidth = Dimensions.get('window').width;
  const containerMargin = screenWidth * 0.03;
  const menuButtonMarginTop = screenWidth * 0.02;

  return (
    <View style={[styles.container, { marginLeft: containerMargin }]}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={{
          x: anchorPosition.x,
          y: anchorPosition.y,
        }}
      >
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <Menu.Item
              onPress={option.onPress}
              title={option.title}
              style={styles.menuItem}
            />
            {index !== options.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Menu>
      <View style={[styles.menuButton, { marginTop: menuButtonMarginTop }]}>
        <Text style={styles.menuText}>Choose your Deck</Text>
        <IconButton
          icon="menu"
          onPress={openMenu}
          color="white"
          size={30}
          style={styles.iconButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    zIndex: 999,
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F5F5F5",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  menuText: {
    marginRight: 5,
  },
  iconButton: {
    marginLeft: 5,
  },
  menuItem: {
    flex: 1,
    alignContent: "center",
    marginTop: 3,
  },
});

export default DropdownMenu;
