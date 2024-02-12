import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const SpeedTapChallengeScreen = () => {
  const [stage, setStage] = useState("intro");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleTouch = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (stage === "intro" || stage === "early" || stage === "result") {
      setStage("wait");
      timerRef.current = setTimeout(() => {
        setStage("tap");
        setStartTime(Date.now());
      }, Math.floor(Math.random() * 2000) + 1000);
    } else if (stage === "tap") {
      setEndTime(Date.now());
      setStage("result");
    } else if (stage === "wait") {
      setStage("early");
    }
  };

  const renderContent = () => {
    switch (stage) {
      case "intro":
      case "early":
      case "result":
        return (
          <>
            <Image
              source={
                stage === "intro"
                  ? require("../assets/touch-screen.png")
                  : require("../assets/clock.png")
              }
              style={[styles.icon, { tintColor: "white" }]}
            />
            <View style={styles.textBlock}>
              <Text style={styles.text}>
                {stage === "intro"
                  ? "Tap when the screen turns green,"
                  : stage === "early"
                  ? "Too Soon!"
                  : `${endTime - startTime}ms`}
              </Text>
              <Text style={styles.smallText}>
                {stage === "intro"
                  ? "Tap anywhere to start!"
                  : stage === "early"
                  ? "Tap anywhere to try again."
                  : "Tap to try again."}
              </Text>
            </View>
          </>
        );
      case "wait":
        return (
          <>
            <Image
              source={require("../assets/ellipsis.png")}
              style={[styles.icon, { tintColor: "white" }]}
            />
            <Text style={[styles.text, { color: "white" }]}>
              Wait for Green
            </Text>
          </>
        );
      case "tap":
        return (
          <>
            <Image
              source={require("../assets/ellipsis.png")}
              style={[styles.icon, { tintColor: "white" }]}
            />
            <Text style={[styles.text, { color: "white" }]}>Tap Now!</Text>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor:
            stage === "tap"
              ? "rgb(75, 219, 106)"
              : stage === "wait"
              ? "rgb(206, 38, 54)"
              : "rgb(43, 135, 209)",
        },
      ]}
      onPress={handleTouch}
      activeOpacity={1}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 36,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    color: "#fff", // Ensure text is white for visibility
  },
  smallText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    color: "#fff", // Ensure small text is white for visibility
  },
  icon: {
    width: 100,
    height: 100,
    tintColor: null, // Reset tintColor to use the original color of the icon or set to "white" for white icons
  },
  textBlock: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SpeedTapChallengeScreen;
