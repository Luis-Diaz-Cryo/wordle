import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";

interface ContextProps{
    wordSelected:string,
    getGame: () => Promise<void>,   
    saveGame: (value: any) => Promise<void>,
    listScore: any[]
    
}
export const GameContext = createContext({} as ContextProps );
interface Score{
    name:string,
    score:number
}
export const GameProvider = ({children})=>{

   

    const words =["hello","test","squid","computer","phone","android","apple","windows"]
    const randomNumber = Math.floor(Math.random() * words.length) + 1;
    const [wordSelected,setWorldSelected]= useState(words[randomNumber])
    const [listScore,setListScore] = useState([])

    const saveGame = async (value:any)=>{
        try{
            setListScore([...listScore,value])
            await AsyncStorage.setItem('listScores', JSON.stringify([...listScore,value]));
        }catch (error)
        {
            console.log(error);
            

        }
    }

    const getGame = async () =>{
        try{
            const response = await AsyncStorage.getItem("listScores")

            if (response !== null) setListScore(JSON.parse(response))
            }
        catch{

        }
    }
   
    return <GameContext.Provider 
    value={{ 
        wordSelected,
        getGame,
        saveGame,
        listScore

    }}
    >
        {children}
    </GameContext.Provider>
}