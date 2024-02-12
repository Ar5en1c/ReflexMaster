import React, { useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";

export default function LoadingScreen() {
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    "ProtestStrike-Regular": require("../assets/ProtestStrike-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync(); // Prevent the splash screen from hiding

      if (fontsLoaded) {
        setTimeout(async () => {
          await SplashScreen.hideAsync(); // Hide the splash screen
          navigation.navigate("Home");
        }, 2000); // Wait for 2 seconds
      }
    }

    prepare();
  }, [fontsLoaded, navigation]);

  if (!fontsLoaded) {
    return null; // Return null while loading fonts to avoid flickering
  }

  return (
    <LinearGradient
      colors={["#0000FF", "#8A2BE2", "#fff"]}
      style={styles.container}
      start={[0, 1]}
      end={[1, 0]}
    >
      <Text style={styles.text}>ReflexMaster</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 36,
    fontFamily: "ProtestStrike-Regular",
    color: "#FFFFFF",
  },
});
