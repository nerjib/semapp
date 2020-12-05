import React,{useEffect, useState} from "react";
import {View} from 'react-native'
//import {AsyncStorage} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { createDrawerNavigator } from "@react-navigation/drawer";

import { OnboardingStackNavigator,
  LoginStackNavigator,
   ContactStackNavigator, 
   MainStackNavigator, 
   SettingsStackNavigator,
    EmergencyStackNavigator,
  MonitoringStackNavigator,
SupervisionStackNavigator,
TrainingStackNavigator,
ProfileStackNavigator } from "./StackNavigator";

const Drawer = createDrawerNavigator();

let tt=4
const DrawerNavigator = () => {
  let [acc, setAcc]=useState('')
  let [type, setType]=useState('')
  let [supervisor, setSupervisor]=useState('')


  

const setValues=()=>{
  let isSubscribed = true;
  setInterval(

    async()=> {
      await AsyncStorage.getItem('login').then(async(val)=>{
        await setAcc(val)
     })
     try{
     await AsyncStorage.getItem('type').then(async(val)=>{
      // alert(val)
      
         await   setType(val)
       
       
     })
     }catch(e){
       alert(e)
     }      
    }, 1000
    
  )
  return () => (isSubscribed = false);
  
}

useEffect(()=>{

  setValues()
  
},[])



//useEffect(()=>getValues())
//getValues
return (
    <Drawer.Navigator   style={{ flex: 1 }}  >
      <Drawer.Screen name="Home" component={MainStackNavigator}/>
    {type==='monitor' && <Drawer.Screen name="Monitoring and evaluation" component={MonitoringStackNavigator}/>}
{type ==='supervisor' && <Drawer.Screen name='Supervision' component={SupervisionStackNavigator}/> }
     <Drawer.Screen name="Training center" component={TrainingStackNavigator}/>
      <Drawer.Screen name="Hotlines" component={ContactStackNavigator} />
    {acc !=='granted1' && <Drawer.Screen name={"Login"} component={LoginStackNavigator}/>}
     {(acc ==='granted1' && type=='supervisor') && <Drawer.Screen name="My profile" component={ProfileStackNavigator}/>}
    </Drawer.Navigator>
  );
}

const HH = ()=>{

  useEffect(()=>{alert('home')},[])

  return(
    <View>
      
    </View>
  )
  
}

export default DrawerNavigator;