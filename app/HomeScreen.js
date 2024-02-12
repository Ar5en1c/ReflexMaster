import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ReflexMaster</Text>
      <View style={styles.choicesContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SpeedTapChallenge")}
        >
          <Image
            source={require("../assets/touch-screen.png")}
            style={[styles.buttonImage, { tintColor: "white" }]}
          />
          <Text style={styles.buttonText}>Speed Tap Challenge</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ColorPopChallenge")}
        >
          <Image
            source={require("../assets/abstract.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Color Pop Challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F3",
  },
  title: {
    fontSize: 36,
    fontFamily: "ProtestStrike-Regular",
    // fontWeight: "bold",
    marginBottom: 60,
    color: "#333",
  },
  choicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 25,
    margin: 10,
    width: 150, // Adjust for square shape
    height: 150, // Adjust for square shape
    alignItems: "center",
    justifyContent: "center", // Ensure image and text are centered
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  buttonImage: {
    width: 60, // Adjust based on your image's aspect ratio
    height: 60, // Adjust based on your image's aspect ratio
    marginBottom: 20, // Space between image and text
  },
  buttonText: {
    fontSize: 14, // Adjust based on space available
    fontFamily: "ProtestStrike-Regular",
    color: "#ffffff",
    fontWeight: "400",
    textAlign: "center", // Ensure text is centered below the image
  },
});

export default HomeScreen;
