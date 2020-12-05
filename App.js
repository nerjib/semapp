
import React, {useEffect, useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/screens/navigation/DrawerNavigator";
import { MainStackNavigator, SettingsStackNavigator, OnboardingStackNavigator } from "./src/screens/navigation/StackNavigator";
import {AsyncStorage} from 'react-native'

 const App = () => {
const [acc, setAcc] = useState('stack') 
  
const Langu=()=>{
  setInterval(
    ()=> {
      AsyncStorage.getItem('login').then((val)=>{
        if(val=='granted'){
          setAcc('drawer')
    
        }else{
          setAcc('stack')
    
        }
      })
    
    },
    1000
  );
}
useEffect(()=>{Langu()},[])



  return (
    <NavigationContainer>
    {/*acc=='drawer' && <DrawerNavigator />}
    {acc=='stack' && <OnboardingStackNavigator />*/}
    <DrawerNavigator />
    </NavigationContainer>
  );
}
export default App