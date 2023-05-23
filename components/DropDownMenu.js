import * as React from "react";
import { Menu, Divider } from "react-native-paper";
import { IconButton } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const DropdownMenu = ({ options }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon="menu"
            onPress={openMenu}
            color="white"
            size={30}
            style={styles.iconButton}
          />
        }
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999,
  },
  iconButton: {
    marginLeft: 10,
  },
  menuItem: {
    flex: 1,
    alignContent: 'center',
    marginTop: 3,
    marginRight: 5,
  },
});

export default DropdownMenu;
