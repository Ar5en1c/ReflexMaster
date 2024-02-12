import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingScreen from "./app/LoadingScreen";
import HomeScreen from "./app/HomeScreen";
import SpeedTapChallengeScreen from "./app/SpeedTapChallengeScreen";
import ColoredWordChallenge from "./app/ColoredWordChallengeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SpeedTapChallenge"
          component={SpeedTapChallengeScreen}
        />
        <Stack.Screen
          name="ColorPopChallenge"
          component={ColoredWordChallenge}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
