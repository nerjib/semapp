import React,{Component, useState, useEffect, useRef }  from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import ProgressLoader from 'rn-progress-loader' ;
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';



export default class Signin extends React.Component {
state={
email:'',
password:'',
id:'',
visible: false,
expoPushToken:'',
notification: false,

}

    
componentDidMount=()=>{
//    this.pushfunction()
/*    AsyncStorage.getItem('login').then((val)=>{
        if(val=='granted'){
            this.props.navigation.navigate('Home');
        }
    })*/
}
handleChangeEmail =(text)=>{
this.setState({
email:text
})
}
   handleChangePass = (text)=>{
       this.setState({
           password:text
       })
   }
  goToHome=(userid)=>{
    Actions.Home({userid})
}
    saveUserId=async userId=>{
        try {
            await AsyncStorage.setItem('userId', userId);
        }catch(error) {
            alert(error.message)
        }
    }

 pushfunction= ()=>{
    const notificationListener = useRef();
    const responseListener = useRef();
        
    registerForPushNotificationsAsync().then(token => {
        alert(token)
        setState({expoPushToken:token})
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setState({notification})
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };

}

login=async(a,b)=>{

this.setState({
//    visible:true
})
const data = {
    phone: a,
    pword: b
}

axios.get('https://ruwassa.herokuapp.com/api/v1/users/signin/'+a)
.then(res=>{
  alert(JSON.stringify(res))
  if((res.data[0].phone===b && res.data[0].active==='active')){
    const userDetails={
        id: res.data[0].id,
    }
  }

}).catch(e=>{alert('error')})
//return alert(b)
/*
axios.post('https://kd-sema.herokuapp.com/api/v1/users/login',data)
    .then(res=>{
      this.setState({
        visible:false
    })
   alert('dd')
       AsyncStorage.setItem('userid', JSON.stringify(res.data[0].id))
       AsyncStorage.setItem('uname', JSON.stringify(res.data[0].first_name+' '+res.data[0].last_name))
       AsyncStorage.setItem('email', JSON.stringify(res.data[0].email))
       AsyncStorage.setItem('phone', JSON.stringify(res.data[0].phone_no))
      AsyncStorage.setItem('login','granted')
      this.props.navigation.navigate('Home');
      // alert(res.data[0].id)
  
   }  
    ).catch(error=>{
      alert(error)
        this.setState({
            visible:false
        })
        alert('You have no access to this platform, check your details and try again')
})
   //alert('wrong combination')

*/
}

check=()=>{
    AsyncStorage.getItem('email').then((val)=>alert(val))
    AsyncStorage.getItem('pass').then((val)=>alert(val))
Actions.async();
}
render(){
    return(
        <View style={styles.container}>
            <TextInput style={styles.input}
            underlineColorAndroid ="transparent"
            placeholder="Phone number1"
                        onChangeText={this.handleChangeEmail}
            />

            <TextInput style={styles.input} 
            underlineColorAndroid ="transparent"
            placeholder="Password"
            onChangeText={this.handleChangePass}
            secureTextEntry={true}
              // password={true}         
            />  
            <TouchableOpacity style={styles.submitbutton}
            onPress={()=>this.login(this.state.email,this.state.password)}>
            <Text style={styles.text}> Signin</Text>

            </TouchableOpacity>
           <View style={{flexDirection:'row', marginLeft:10}}>
               <Text>
                <Text>I don't have account </Text>
             {//}   <Text onPress={()=>{this.props.navigation.navigate('Signup')}} style={{color:'green'}}>Sign Up</Text>
}</Text>
           </View>
            <ProgressLoader visible={this.state.visible} isModal={true} isHUD={true}
            hudColor={"#000000"} color={"#FFFFFF"}/>
            
        </View>
    )
}
}


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