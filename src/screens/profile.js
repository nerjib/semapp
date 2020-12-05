import React,{Component, useState, useEffect, useRef }  from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Button, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import ProgressLoader from 'rn-progress-loader' ;

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage'
import profile from '../../asset/profile.png'



const Profile =({navigation})=>{
let [email, setEmail]= useState('')
let [password, setPassword] = useState('')
let [uid, setId] = useState('')
let [fname, setFName] = useState('')
let [lname, setLName] = useState('')
let [oname, setOName] = useState('')
let [bname, setbName] = useState('')
let [actno, setAccno] = useState('')
let [phone, setPhone] = useState('')

let [visible, setVisible] = useState('')
const [expoPushToken, setExpoPushToken] = useState('');
const [notification, setNotification] = useState(false);
const notificationListener = useRef();
const responseListener = useRef();



useEffect(()=>{
    AsyncStorage.getItem('uid').then((val)=>{
                setId(val)
            
                axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+val)
                .then(res=>{
                    setEmail(res.data[0].email)
                    setFName(res.data[0].first_name)
                    setLName(res.data[0].last_name)
                    setOName(res.data[0].other_name)
                    setbName(res.data[0].bank)
                    setAccno(res.data[0].actno)
                    setPhone(res.data[0].phone)


                })

          })

},[])

const handleChangeEmail =(text)=>{
    setEmail(text)

}
const   handleChangePass = (text)=>{
    setPassword(text)
 
   }

const  goToHome=(userid)=>{
    Actions.Home({userid})
}
  
const saveUserId=async userId=>{
        try {
            await AsyncStorage.setItem('userId', userId);
        }catch(error) {
            alert(error.message)
        }
    }

    const getPushToken = async(a) => {
    await    registerForPushNotificationsAsync().then(token => {

        setExpoPushToken(token);
        axios.put('https://kd-sema.herokuapp.com/api/v1/users/pushtoken/'+a,{pushtoken:token})
        .catch(e=>{console.log(e)})

    })
        
       //  await   alert(expoPushToken)
          //  return expoPushToken
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
          //  return (expoPushToken)
        return () => {
          Notifications.removeNotificationSubscription(notificationListener);
          Notifications.removeNotificationSubscription(responseListener);
        };
    }


  const      check=()=>{
            AsyncStorage.getItem('email').then((val)=>alert(val))
            AsyncStorage.getItem('pass').then((val)=>alert(val))
        Actions.async();
        }

return (
    <View style={styles.container}>
        <View style={{justifyContent:'center', alignItems:'center'}}>
  <Image source= {require('../../asset/profile.png')}/>
  </View>
  <View style={{alignItems:'center'}}>
        <Text>Name:{fname +' '+ lname+ ' ' +oname}</Text>
        <Text>Email:{email}</Text>
        <Text>Phone:{phone}</Text>
        <Text>Bank:{bname}</Text>
        <Text>Account Number:{actno}</Text>
        </View>
   
    
</View>

)
    

}


// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title ok',
      body: 'And here is the body gone!',
      data: { data: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  
  async function registerForPushNotificationsAsync() {
    //  alert('jjjjj')
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      alert(token)
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }


const styles = StyleSheet.create({
    container:{
        paddingTop: 23
    },
    input:{
        margin:15,
        height:40,
        borderColor: 'grey',
        borderWidth:1
    },
    submitbutton:{
        padding:10,
        margin:15,
        height:200,
        alignItems:'center',
        borderRadius:100,
        backgroundColor:'#00a1ff',
        color: 'white',
         justifyContent:'center'
    },
    text:{
        color:'white',
        fontSize:25,
        
    }

})

export default Profile







