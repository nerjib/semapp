import React, {Component, useState, useEffect} from 'react';
import { StyleSheet,Text, TextInput, Dimensions,View,FlatList, ScrollView,TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
//import * as Contacts from 'expo-contacts';
import {Eng, Hau} from '../../constant/eng'
import { AdMobBanner} from 'expo-ads-admob';
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomePage =({navigation, route})=>{
    let [lang, setLang] = useState(lang=Eng)
    let [uid, setUid] = useState(1)
    let [inbox, setInbox] = useState(0)
    let [open, setOpen] = useState('')
    let [closed, setClosed] = useState('')
    let [feedback, setFeedback] = useState('')
    let [events, setOpenEvent] = useState([])
    let [followup, setFollowup] = useState([])
    let [login, setLogin] = useState('')









    

    const OpenReport=()=>{
      let isSubscribed = true;
if(isSubscribed){
    setInterval(
          ()=> {
       //     AsyncStorage.getItem('userid').then((val)=>{

              axios.get('https://kd-sema.herokuapp.com/api/v1/reports/getuserdraft/'+12)
              .then(res=>{
               //   alert(JSON.stringify(res.data))
                  AsyncStorage.setItem('openevents',JSON.stringify(res.data))
              }).catch(err=>{console.log(err)})
             
               

                axios.get('https://kd-sema.herokuapp.com/api/v1/reports/followup/'+12)
                .then(res=>{
                  //  alert(res.data)
                    AsyncStorage.setItem('followup',JSON.stringify(res.data))
                }).catch(err=>{console.log(err)})



         //   })

        
                 AsyncStorage.getItem('openevents').then(res=>
                  // alert(JSON.parse(res).lengt)
                       setOpenEvent(JSON.parse(res))
               )
               AsyncStorage.getItem('followup').then(res=>
                // alert(JSON.parse(res).lengt)
                     setFollowup(JSON.parse(res))
             )
         
          } 
                   ,
         10000
        )
      };
        return () => (isSubscribed = false);

      }




  //  useEffect(()=>setInterval(OpenReport,1000),[])

    useEffect(()=>{
      OpenReport()
      let isSubscribed = true;
      AsyncStorage.getItem('userid').then(res=>
     isSubscribed?  setUid(res) : null
    )
    AsyncStorage.getItem('login').then(val=>{
      // alert(JSON.parse(val)[0].title)
     //  const projectsVal = JSON.parse(val)
     setLogin(val)
   })

    return () => (isSubscribed = false);
  },[])
  

  useEffect(()=>{
    //alert('ff')
       axios.get('https://kd-sema.herokuapp.com/api/v1/reports/getuserdraft/'+12)
    .then(res=>{
     //   alert(JSON.stringify(res.data))
        AsyncStorage.setItem('openevents',JSON.stringify(res.data))
    }).catch(err=>{console.log(err)})
    
         //   })
    
    
       AsyncStorage.getItem('openevents').then(res=>
        // alert(JSON.parse(res).lengt)
             setOpenEvent(JSON.parse(res))
       )}
    ,[])

const FlatListSeparator=()=>{
    return(
        <View style={{height:1.0, backgroundColor:'green', width:'100%'}}/>
    )
    };

  const  bannerError=()=> {
      console.log("An error");
      return;

    }



    return(

        <View  >

              <View style={styles.container} >
    
              <FlatListSeparator/>

     <TouchableOpacity style={styles.row} onPress={()=>{navigation.navigate('Report')}}>

<Text style={styles.txt}>Send Emergency Report</Text>
     </TouchableOpacity>
     <FlatListSeparator/>

     <TouchableOpacity style={styles.row} onPress={()=>{navigation.navigate('Hotlines')}}>
<Text style={styles.txt}>Emergency Tips</Text>
     </TouchableOpacity>
     <FlatListSeparator/>

     <TouchableOpacity style={styles.row} onPress={()=>{navigation.navigate('OpenEvents',{events})}}>
    <Text style={styles.txt}>Active Events  </Text>
    {events.length>0 && <Text>{events.length}</Text>}
     </TouchableOpacity>
     <FlatListSeparator/>


     <TouchableOpacity style={styles.row} onPress={()=>{navigation.navigate('Hotlines')}}>

<Text style={styles.txt}>Emergency Help Lines</Text>
     </TouchableOpacity>
     <FlatListSeparator/>
     <TouchableOpacity style={styles.row} onPress={()=>{navigation.navigate('Events Draft')}}>

<Text style={styles.txt}>Drafts</Text>
     </TouchableOpacity>
     <FlatListSeparator/>

      
     <AdMobBanner
         bannerSize="fullBanner"
    //      adUnitID="ca-app-pub-3940256099942544/6300978111"
    adUnitID="ca-app-pub-8955030052748042~9280376499"
          // Test ID, Replace with your-admob-unit-id
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={bannerError}
        />

         </View>

        </View>
    )
}

const styles = StyleSheet.create ({
    center: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",
       textAlign: "center",
      height:'100%'
      },
      container:{
        display:'flex',
        justifyContent:"center",
        alignItems: "flex-start",
        height: '100%',
        margin:10
      },    
      row:{
        height:'10%',
        marginTop: 10,
        flexDirection: 'row'
    },
    txt:{
        marginLeft: 5,
        fontSize:20,
    },
    header:{
        fontSize: 25,
        textAlign:'left',
        margin:10,
        fontWeight:'bold'
    },
    box:{
        margin:10,
        height:40,
        borderColor: 'grey',
        borderBottomWidth:3,
        width:'90%',
        marginRight:20,
        borderRadius:4
    },
    box1:{
        margin:10,
        height:60,
        borderColor: 'grey',
        borderWidth:1,
        borderBottomWidth:2,
        width:'90%',
        marginRight:20,
        display:'flex',
        borderRadius:4
    },
    box3:{height:200, width:'50%', borderRadius:10,  alignSelf:'center',
     backgroundColor:'#004f54'},
     box2:{height:250, width:'90%',paddingTop:20, alignContent:'center', borderRadius:0,  alignSelf:'center',
      backgroundColor:'grey'},
})
export default  HomePage;