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
import DeckCompletion from "../components/DeckCompletion";
import ProfileSettingsContent from "../components/ProfileSettingsContent";

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
        const validatedCards = Object.values(deckData).filter(
          (card) => card.positive >= 1
        ).length;
        const completion = `${validatedCards}/${totalCards}`;
        const percentage =
          totalCards > 0 ? (validatedCards / totalCards) * 100 : 0;
        progress[deckName] = { completion, percentage: percentage.toFixed(2) };
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
      <View
        style={[
          styles.profileBox,
          {
            borderColor: global.AppTheme.accentColor,
            backgroundColor: global.AppTheme.menuBackground,
          },
        ]}
      >
        <View style={[styles.cardIn]}>
          <View>
            <Text
              style={[
                styles.profileText,
                { color: global.AppTheme.onMenuBackground },
              ]}
            >
              Jean-Mi
            </Text>
          </View>
          <Image
            style={styles.image}
            source={{ uri: "https://picsum.photos/200/301" }}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={[
            styles.profileBoxShadow,
            {
              backgroundColor: global.AppTheme.menuBackground,
              borderBottomColor: global.AppTheme.accentColor,
            },
          ]}
          onPress={toggleStatistics}
        >
          <View style={styles.cardIn}>
            <View style={styles["ml-15"]}>
              <Text
                style={[
                  styles.cardHeader,
                  { color: global.AppTheme.onMenuBackground },
                ]}
              >
                Statistics
              </Text>
            </View>
            <View>
              <Icon
                style={[
                  styles.icons,
                  { color: global.AppTheme.onMenuBackground },
                ]}
                size={sizeIcon}
                name="medal"
              />
            </View>
          </View>
        </TouchableOpacity>

        {statisticsVisible && (
          <View>
            {Object.entries(deckProgress).map(([deckName, progress]) => (
              <DeckCompletion
                key={deckName}
                deckName={deckName}
                completion={progress.completion}
                percentage={progress.percentage}
              />
            ))}
          </View>
        )}
        <TouchableOpacity
          style={[
            styles.profileBoxShadow,
            {
              backgroundColor: global.AppTheme.menuBackground,
              borderBottomColor: global.AppTheme.accentColor,
            },
          ]}
          onPress={toggleProfileSettings}
        >
          <View style={styles.cardIn}>
            <View style={styles["ml-15"]}>
              <Text
                style={[
                  styles.cardHeader,
                  { color: global.AppTheme.onMenuBackground },
                ]}
              >
                Profile settings
              </Text>
            </View>
            <Icon
              style={[
                styles.icons,
                { color: global.AppTheme.onMenuBackground },
              ]}
              size={sizeIcon}
              name="cog"
            />
          </View>
        </TouchableOpacity>
        {profileSettingsVisible && (
          <TouchableOpacity>
            <ProfileSettingsContent />
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardIn: {
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    fontSize: 25,
    fontWeight: "bold",
  },
  profileText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileBox: {
    margin: 15,
    elevation: 9,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  profileBoxShadow: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderBottomWidth: 3,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
