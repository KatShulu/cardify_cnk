import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { getDeckFilesNames } from "../services/DeckLocalStorage";
import { getEvaluationDataForDeck } from "../services/EvalLocalStorage";

export default function Profile() {
  const sizeIcon = 30;
  const [statisticsVisible, setStatisticsVisible] = useState(false);
  const [profileSettingsVisible, setProfileSettingsVisible] = useState(false);
  const [deckProgress, setDeckProgress] = useState({});

  const toggleStatistics = () => {
    setStatisticsVisible(!statisticsVisible);
  };

  const toggleProfileSettings = () => {
    setProfileSettingsVisible(!profileSettingsVisible);
  };

  const fetchDeckProgress = async () => {
    try {
      const deckFiles = await getDeckFilesNames();
      const progress = {};
  
      for (const deckFile of deckFiles) {
        
        const deckName = deckFile.replace(".json", "");
        const deckData = await getEvaluationDataForDeck(deckName);
        
        const totalCards = Object.keys(deckData).length;
        const validatedCards = Object.values(deckData).filter((card) => card.positive >= 1).length;
        const percentage = totalCards > 0 ? (validatedCards / totalCards) * 100 : 0;
        progress[deckName] = percentage.toFixed(2);
        console.log(deckData)
      }
  
      setDeckProgress(progress);
    } catch (error) {
      console.log("Error fetching deck progress:", error);
    }
  };
  
  
  useEffect(() => {
    fetchDeckProgress();
  }, []);

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
      <ScrollView>
        <TouchableOpacity
          style={styles.profileBoxShadow}
          onPress={toggleStatistics}
        >
          <View style={styles.cardIn}>
            <View style={styles["ml-15"]}>
              <Text style={styles.cardHeader}>Statistics</Text>
            </View>
            <View>
              <Icon style={styles.icons} size={sizeIcon} name="medal" />
            </View>
          </View>
        </TouchableOpacity>

        {statisticsVisible && (
          <View style={styles.dropdownContent}>
            {Object.entries(deckProgress).map(([deckName, percentage]) => (
              <View key={deckName}>
                <Text>{deckName}</Text>
                <View style={styles.progressContainer}>
                  <View
                    style={[styles.progressBar, { width: `${percentage}%` }]}
                  />
                </View>
                <Text>{`${percentage}%`}</Text>
              </View>
            ))}
          </View>
        )}
        <TouchableOpacity
          style={styles.profileBoxShadow}
          onPress={toggleProfileSettings}
        >
          <View style={styles.cardIn}>
            <View style={styles["ml-15"]}>
              <Text style={styles.cardHeader}>Profile settings</Text>
            </View>
            <Icon
              style={styles.icons}
              size={sizeIcon}
              name="cog"
            />
          </View>
          {profileSettingsVisible && (
            <View style={styles.dropdownContent}>
              <Text>Profile settings content goes here</Text>
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>
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
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icons: {
    marginHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
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
  dropdownContent: {
    backgroundColor: "lightgray",
    padding: 10,
    marginTop: 10,
  },
  progressContainer: {
    height: 10,
    width: "100%",
    backgroundColor: "lightgray",
    borderRadius: 5,
    marginTop: 5,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "green",
    borderRadius: 5,
  },
});
