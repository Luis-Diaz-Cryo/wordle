import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import GameScreen from "../views/GameScreen";
import { GameProvider } from "../context/GameContext";
import ScoreScreen from "../views/ScoreScreen";
import StartScreen from "../views/StartScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation(){

    return(
        <NavigationContainer>
            <GameProvider>
            <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
                headerShown:false
            }}
            >
                <Stack.Screen name="StartScreen" component={StartScreen}/>
                <Stack.Screen name="GameScreen" component={GameScreen} />
                <Stack.Screen name="ScoreScreen" component={ScoreScreen} />
                
            </Stack.Navigator>    
            </GameProvider>      
        </NavigationContainer>
        
    )
}

