import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Keyboard from "../components/Keyboard";
import { keys, CLEAR, ENTER, colors } from "../components/Keyboard/constants";
import { GameContext } from "../context/GameContext";

const tries = 6;

const copyArray = (arr) => {
  return [...arr.map((rows) => [...rows])];
};

export default function GameScreen({ navigation }: any) {
  const { wordSelected, saveGame, listScore } = useContext(GameContext);
  const word = wordSelected;
  const letters = word.split("");

  const [rows, setRows] = useState(new Array(tries).fill(new Array(letters.length).fill("")));
  const [curRow, setCurRow] = useState(0);
  const [curCol, setCurCol] = useState(0);
  const [gameState, setGameState] = useState("playing");

  useEffect(() => {
    if (curRow > 0) {
      checkGameState();
    }
  }, [curRow]);

  const checkGameState = () => {
    if (checkWon()) {
      const points = calculatePoints();
      Alert.alert(`Congratulations! You have won with ${points} points`);
      setGameState("won");
      saveGame({ name: "Player", score: points });
    } else if (checkLoss()) {
      Alert.alert("You have Lost");
      setGameState("lost");
    }
  };

  const calculatePoints = () => {
    const remainingTries = tries - curRow;
    const points = remainingTries * 100;
    return points;
  };

  const checkWon = () => {
    const row = rows[curRow - 1];
    return row.every((letter, i) => letter === letters[i]);
  };

  const checkLoss = () => {
    return curRow === rows.length;
  };

  const onKeyPressed = (key) => {
    if (gameState !== "playing") {
      return;
    }
    const updatedRows = copyArray(rows);

    if (key === CLEAR) {
      if (curCol > 0) {
        const prevCol = curCol - 1;
        updatedRows[curRow][prevCol] = "";
        setRows(updatedRows);
        setCurCol(prevCol);
      }
      return;
    }

    if (key === ENTER) {
      if (curCol === rows[0].length) {
        setCurRow(curRow + 1);
        setCurCol(0);
      }
      return;
    }
    if (curCol < rows[0].length) {
      updatedRows[curRow][curCol] = key;
      setRows(updatedRows);
      setCurCol(curCol + 1);
    }
  };

  const getCellBGColor = (letter, row, col) => {
    if (row >= curRow) {
      return colors.black;
    }

    if (letter === letters[col]) {
      return colors.primary;
    }
    if (letters.includes(letter)) {
      return colors.secondary;
    }
    return colors.darkgrey;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('StartScreen')}>
        <Text style={styles.backButtonText}>Back to Start</Text>
      </TouchableOpacity>
      <ScrollView style={styles.map} >
        {rows.map((row, i) => (
          <View key={`row-${i}`} style={styles.row}>
            {row.map((cell, j) => (
              <View
                key={`cell-${i}-${j}`}
                style={[
                  styles.cell,
                  {
                    backgroundColor: getCellBGColor(cell, i, j),
                  },
                ]}
              >
                <Text style={styles.cellText}>{cell.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <KeyboardAvoidingView behavior="padding">
        <Keyboard onKeyPressed={onKeyPressed} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A3A3D",
  },
  map: {
    marginTop:50,
    alignSelf: "stretch",
    flex: 1,
  },
  row: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "center",
  },
  cell: {
    borderWidth: 3,
    borderColor: "black",
    flex: 1,
    aspectRatio: 1,
    margin: 3,
    maxWidth: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    fontSize: 28,
    color: "white",
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 999,
    backgroundColor:"grey"
  },
  backButtonText: {
    fontSize: 16,
    color: 'white',
  },
});
