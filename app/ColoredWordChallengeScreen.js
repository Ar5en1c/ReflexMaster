import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const extendedColors = {
  Red: "#ff0000",
  Green: "#008000",
  Blue: "#0000ff",
  Yellow: "#ffff00",
  Orange: "#ffa500",
  Purple: "#800080",
  Cyan: "#00ffff",
  Brown: "#a52a2a",
  Black: "#000000",
  Grey: "#808080",
  Pink: "#ffc0cb",
  Teal: "#008080",
};

const getRandomColor = (excludeColor) => {
  let colorEntries = Object.entries(extendedColors).filter(
    ([name]) => name !== excludeColor
  );
  const randomIndex = Math.floor(Math.random() * colorEntries.length);
  return colorEntries[randomIndex][1];
};

const ColoredWordTest = () => {
  const [options, setOptions] = useState([]);
  const [colorWord, setColorWord] = useState("");
  const [tries, setTries] = useState(1);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameOver) {
      generateTest();
    }
  }, [tries, gameOver]);

  const generateTest = () => {
    const colorNames = Object.keys(extendedColors);
    const correctColorWord =
      colorNames[Math.floor(Math.random() * colorNames.length)];
    let selectedColorNames = colorNames
      .filter((name) => name !== correctColorWord)
      .sort(() => 0.5 - Math.random())
      .slice(0, 8);
    selectedColorNames = [...selectedColorNames, correctColorWord].sort(
      () => 0.5 - Math.random()
    );

    const optionsWithColors = selectedColorNames.map((name) => ({
      name,
      color: extendedColors[name],
    }));

    setColorWord(correctColorWord);
    setOptions(optionsWithColors);
    setReactionTimes([...reactionTimes, new Date().getTime()]);
  };

  const handleAnswer = (selectedOption) => {
    if (selectedOption.name === colorWord) {
      if (tries < 5) {
        setTries(tries + 1);
      } else {
        setGameOver(true);
      }
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setTries(1);
    setGameOver(false);
    setReactionTimes([]);
  };

  const calculateAverageTime = () => {
    const total = reactionTimes.reduce(
      (acc, time, index, array) =>
        index < array.length - 1 ? acc + (array[index + 1] - time) : acc,
      0
    );
    return total / (reactionTimes.length - 1);
  };

  return (
    <View style={styles.container}>
      {gameOver ? (
        <>
          <Text style={styles.text}>Game Over</Text>
          <Text style={styles.smalltext}>
            Average Reaction Time: {calculateAverageTime().toFixed(2)} ms
          </Text>
          <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={[styles.text, { color: getRandomColor(colorWord) }]}>
            {colorWord}
          </Text>
          <View style={styles.choicesContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.colorOption, { backgroundColor: option.color }]}
                onPress={() => handleAnswer(option)}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 52,
    fontWeight: "900",
    margin: 20,
  },
  smalltext: {
    fontSize: 24,
    fontWeight: "400",
    // margin: 20,
  },
  choicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  colorOption: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 50,
  },
  restartButton: {
    backgroundColor: "#007bff",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 25,
    margin: 10,
    width: "80%",
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
  buttonText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    padding: 10,
  },
});

export default ColoredWordTest;
