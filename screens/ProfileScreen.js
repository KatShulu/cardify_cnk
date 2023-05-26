import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export default function Profile() {
    const sizeIcon = 30
  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <View style={styles.cardIn}>
          <View>
            <Text style={styles.profileText}>Jean-Mi</Text>
          </View>
          <Image
            style={styles.image}
            source={{ uri: "https://picsum.photos/200/301" }}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.profileBoxShadow}>
        <View style={styles.cardIn}>
          <View style={styles["ml-15"]}>
            <Text style={styles.cardHeader}>Statistics</Text>
          </View>
          <View>
            <Icon
              style={styles.icons}
              size={sizeIcon}
              name="medal"
            />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileBoxShadow}>
        <View style={styles.cardIn}>
          <View style={styles["ml-15"]}>
            <Text style={styles.cardHeader}>Profile settings</Text>
          </View>
          <Icon
              style={styles.icons}
              size={sizeIcon}
              name="content-save-settings"
            />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  cardIn: {
    fontSize: 20,
    paddingVertical: 10,
    padding : 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icons: {
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  profileBox: {
    margin: 15,
    elevation: 4,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      height: StyleSheet.hairlineWidth,
    },
    borderRadius: 10,
  },
  profileBoxShadow: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  image: {
    height: 80,
    width: 80,
    backgroundColor: "gray",
    borderRadius: 40,
  },
});
