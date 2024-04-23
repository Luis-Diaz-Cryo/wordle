import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GameContext } from "../context/GameContext";

export default function ScoreScreen({ navigation }: any) {
  const { listScore, getGame } = useContext(GameContext);

  useEffect(() => {
    getGame();
  }, []);

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('StartScreen')}>
        <Text style={styles.backButtonText}>Back to Start</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Scores</Text>
      <View style={styles.scoreList}>
        {listScore.map((score, index) => (
          <View key={index} style={styles.scoreItem}>
            <Text style={styles.scoreText}>{`${score.name}: ${score.score}`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
  },
  scoreList: {
    alignSelf: "stretch",
    paddingHorizontal: 20,
  },
  scoreItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  scoreText: {
    fontSize: 18,
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
