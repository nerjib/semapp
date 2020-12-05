import React,{Component, useState, useEffect, useRef }  from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import ProgressLoader from 'rn-progress-loader' ;

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage'




const Login =({navigation})=>{
let [email, setEmail]= useState('')
let [password, setPassword] = useState('')
let [id, setId] = useState('')
let [visible, setVisible] = useState('')
const [expoPushToken, setExpoPushToken] = useState('');
const [notification, setNotification] = useState(false);
const notificationListener = useRef();
const responseListener = useRef();



useEffect(()=>{
    AsyncStorage.getItem('login').then((val)=>{
        if(val=='granted'){
            navigation.navigate('Home');
        }
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

 const   login=async()=>{
 

setVisible(true)

//AsyncStorage.setItem('email', a)
//AsyncStorage.setItem('pass', JSON.stringify(pts))
const data = {
    phone: email,
    pword: password
}

axios.get('https://ruwassa.herokuapp.com/api/v1/users/signin/'+email)
.then(async res=>{
 // await AsyncStorage.removeItem('type')
 setVisible(false)
 if((res.data[0].phone===password && res.data[0].active==='active')){
  //alert(JSON.stringify(res.data[0].type))
  try{
 await AsyncStorage.setItem('type', (res.data[0].type))
 await AsyncStorage.setItem('uid', JSON.stringify(res.data[0].id))
 await AsyncStorage.setItem('mon', JSON.stringify(res.data[0].First_name+' '+ res.data[0].last_name))
 await AsyncStorage.setItem('login','granted1')
 navigation.navigate('Home');
  }catch(e){
    setVisible(false)
    alert(e)
  }

  }
  else{
    setVisible(false)
    alert('Phone number not did not match')
  }

}).catch(async e=>{
  try{
    axios.get('https://ruwassa.herokuapp.com/api/v1/monitors/signin/'+email)
    .then(async res=>{
      setVisible(false)
      if((res.data[0].phone===password && res.data[0].type==='monitor')){
     //   alert((res.data[0].type))
       await AsyncStorage.setItem('type', (res.data[0].type))
       await AsyncStorage.setItem('uid', JSON.stringify(res.data[0].id))
       await AsyncStorage.setItem('mon', JSON.stringify(res.data[0].First_name+' '+ res.data[0].last_name))
       await AsyncStorage.setItem('login','granted1')
       navigation.navigate('Home');

        }
        else{
          setVisible(false)
          alert('Phone number not did not match')
        }
      
    // alert(JSON.stringify(res))
    }).catch(e=>{
      setVisible(false)
      alert(e)})
  }catch(e){
    setVisible(false)
    alert(e)
  }
  //alert('error')

})


//return alert(email)


/*
axios.post('https://kd-sema.herokuapp.com/api/v1/users/login',data)
    .then(async res=>{
        await getPushToken(res.data[0].id).then(async g=>{


                 //   alert(expoPushToken)

        })

            setVisible(false)
       AsyncStorage.setItem('userid', JSON.stringify(res.data[0].id))
       AsyncStorage.setItem('uname', JSON.stringify(res.data[0].first_name+' '+res.data[0].last_name))
       AsyncStorage.setItem('email', JSON.stringify(res.data[0].email))
       AsyncStorage.setItem('phone', JSON.stringify(res.data[0].phone_no))
      AsyncStorage.setItem('login','granted')
     navigation.navigate('Home');
      // alert(res.data[0].id)
  
          }  
            ).catch(error=>{
                setVisible(false)
                alert(error
                    +'You have no access to this platform, check your details and try again')
        })
           //alert('wrong combination')
        
  */      
        }

  const      check=()=>{
            AsyncStorage.getItem('email').then((val)=>alert(val))
            AsyncStorage.getItem('pass').then((val)=>alert(val))
        Actions.async();
        }

return (
    <View style={styles.container}>
    <TextInput style={styles.input}
    underlineColorAndroid ="transparent"
    placeholder="Phone number"
                onChangeText={handleChangeEmail}
    />

    <TextInput style={styles.input} 
    underlineColorAndroid ="transparent"
    placeholder="Password"
    onChangeText={handleChangePass}
    secureTextEntry={true}
      // password={true}         
    />  
    <TouchableOpacity style={styles.submitbutton}
    onPress={login}>
    <Text style={styles.text}> Signin</Text>

    </TouchableOpacity>
   <View style={{flexDirection:'row', marginLeft:10}}>
       <Text>
        <Text>I don't have account </Text>
   {//}     <Text onPress={()=>{navigation.navigate('Signup')}} style={{color:'green'}}>Sign Up</Text>
  }  </Text>
   </View>
    <ProgressLoader visible={visible} isModal={true} isHUD={true}
    hudColor={"#000000"} color={"#FFFFFF"}/>
    
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
        height:42,
        alignItems:'center',
        borderRadius:7,
        backgroundColor:'#00a1ff',
        color: 'white',
         justifyContent:'center'
    },
    text:{
        color:'white',
        fontSize:25,
        
    }

})

export default Login







