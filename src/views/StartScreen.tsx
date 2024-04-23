import React from "react";
import { View, Text, Button } from "react-native";


export default function StartScreen({ navigation }: any) {
    

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to the Game!</Text>
            <Button
                title="Start Game"
                onPress={() => navigation.navigate('GameScreen')}
            />
            <Button
                title="View Scores"
                onPress={() => navigation.navigate('ScoreScreen')}
            />
        </View>
    );
}
