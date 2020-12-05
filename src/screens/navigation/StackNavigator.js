import React, {useEffect,useState} from "react";
import {AsyncStorage} from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
//import { Icon } from 'react-native-elements';

import Home from "../../screens/home";

import About from "../../screens/About";
import Contact from "../../screens/Contact";
import LanguageSettings from "../settings";
import Signin from "../signIn";
import Login from "../login";

import Signup from "../signup";
import OnBoarding from  '../onBoarding'

import { Router, Scene } from 'react-native-router-flux';
import SignOut from "../signout";
import HomePage from "../Homepage/home";
import {AdMobBanner, AdMobRewarded} from  'expo'
import MonHome from "../Monitoring";
import Projects from "../Monitoring/projects";
import HPBH from "../Monitoring/monhpbh";
import SMBH from "../Monitoring/monsmbh";
import Sanitation from "../Monitoring/monvip";
import MonWaterDraft from "../Monitoring/monwaterdraft";
import MonSanDraft from "../Monitoring/monsandraft";
import SupHome from "../supervising";
import Task from "../supervising/task";
import TaskDetails from "../supervising/taskdetails";
import DailyForm from "../supervising/dailyform";
import Drafts from "../supervising/draft";
import DraftedMsg from "../supervising/draftDetails";
import WeeklyForm1 from "../supervising/weeklyform1";
import WeeklyForm2 from "../supervising/weeklyform2";
import WeeklyForm3 from "../supervising/weeklyform3";
import WeeklyForm4 from "../supervising/weeklyform4";
import AllProjects from "../Homepage/projects";
import GeneralReport from "../Homepage/generalReports";
import GenRepDraft from "../Homepage/genreportdraft";
import Yout from "../training/yout";
import TrainingHome from "../training";
import Profile from "../profile";
import HPBHLesson from "../training/hpbh/hpbhlesson";
import HPBHlesson1 from "../training/hpbh/lesson1";
import Report from "../reports/reports";
import DraftReport from "../reports/draftreport";
import OpenEvents from "../reports/openevents";
import UpdateEvents from "../reports/updateevent";
import FireLesson from "../training/Fire/firelesson";
import Firelesson1 from "../training/Fire/firelesson1";
import DraftedDraft from "../reports/drafteddrafts";


const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
  };
const MainStackNavigator = () => {
  let [acc, setAcc] = useState('About')
const ass = () =>{
  AsyncStorage.getItem('login').then((val)=>{
    setAcc(val)
})
}
useEffect(()=>{ass},[])
    return (
  
/*
      <Stack.Navigator
        screenOptions={screenOptionStyle}
      >
       <Stack.Screen name='Onboarding' component={OnBoarding}/>
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={HomePage}  />
        <Stack.Screen name="Report" component={Report}  />


      </Stack.Navigator>
*/

/*<Router>
     <Scene key='root'>  
     <Scene key='Home'  component={HomePage}  title='Home' />
     <Scene key='Projects'  component={AllProjects}  title='Home' />

     <Scene key='Signin' component={Login} title='Signin'  type='reset'  left={()=>null}/>
        <Scene key='Logout' component={SignOut} title='Signout'  type='reset'  left={()=>null}/>
      <Scene key='Signin1' component={Signin} title='Signin'  type='reset'  left={()=>null}/>

        <Scene key='Signup' component={Signup} title='Signup'  type='reset'  left={()=>null}/>
          
         </Scene>
    </Router>   */
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Report" component={DraftReport} />
      <Stack.Screen name="OpenEvents" component={OpenEvents} />
      <Stack.Screen name="Update Event"  component={UpdateEvents} />
      <Stack.Screen name="Events Draft" component={DraftedDraft} />


<Stack.Screen name="Signin" component={Login} />
<Stack.Screen name="GenReport" component={GeneralReport} />
<Stack.Screen name="GenDraft" component={GenRepDraft} />


<Stack.Screen name="Signup" component={Signup} />

</Stack.Navigator>

         );
  }

  const LoginStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />

      </Stack.Navigator>
    );
  }
  const MonitoringStackNavigator= () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Monitoring and evaluation" component={MonHome} />
        <Stack.Screen name="projects" component={Projects} />
        <Stack.Screen name="monhpbh" component={HPBH} />
        <Stack.Screen name="monsmbh" component={SMBH} />
        <Stack.Screen name="monvip" component={Sanitation} />
        <Stack.Screen name="monwaterdraft" component={MonWaterDraft} />
        <Stack.Screen name="monsandraft" component={MonSanDraft} />


      </Stack.Navigator>
    );
  }
  const SupervisionStackNavigator= () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Supervision" component={SupHome} />
        <Stack.Screen name="task" component={Task} />
        <Stack.Screen name="taskdetails" component={TaskDetails} />
        <Stack.Screen name="dailyreport" component={DailyForm} />
        <Stack.Screen name="draft" component={Drafts} />
        <Stack.Screen name="draftmsg" component={DraftedMsg} />
        <Stack.Screen name="weeklyform1" component={WeeklyForm1} />
        <Stack.Screen name="weeklyform2" component={WeeklyForm2} />
        <Stack.Screen name="weeklyform3" component={WeeklyForm3} />
        <Stack.Screen name="weeklyform4" component={WeeklyForm4} />

      </Stack.Navigator>
    );
  }
  const OnboardingStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Onboarding" component={Login} />
      </Stack.Navigator>
    );
  }
  const SettingsStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Language settings" component={LanguageSettings} />
      </Stack.Navigator>
    );
  }

  const ContactStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Hotlines" component={Contact} />
      </Stack.Navigator>
    );
    
  }

  const TrainingStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
                <Stack.Screen name="Training center" component={TrainingHome} />
                <Stack.Screen name="yout" component={Yout} />
                <Stack.Screen name="Fire Training" component={FireLesson} />
                <Stack.Screen name="Fire Lesson 1" component={Firelesson1} />




      </Stack.Navigator>
    );
    
  }

  const EmergencyStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Emergency Tips" component={Contact} />
      </Stack.Navigator>
    );
  }
  const ProfileStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    );
  }

export {LoginStackNavigator,
   MainStackNavigator, 
   ContactStackNavigator,
    SettingsStackNavigator, 
    EmergencyStackNavigator,
     OnboardingStackNavigator,
    MonitoringStackNavigator,
  SupervisionStackNavigator,
TrainingStackNavigator,
ProfileStackNavigator };