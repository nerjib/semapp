import React,{useEffect, useState} from 'react'
import {View,Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native'
import { Actions } from 'react-native-router-flux';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const OpenEvents =( {route,uid,navigation})=> {
  let [events, setEvents] = useState(route.params.events)


  const OpenReport=()=>{
    let isSubscribed = true;
if(isSubscribed){
     //     AsyncStorage.getItem('userid').then((val)=>{

            axios.get('https://kd-sema.herokuapp.com/api/v1/reports/getuserdraft/'+12)
            .then(res=>{
             //   alert(JSON.stringify(res.data))
                AsyncStorage.setItem('openevents',JSON.stringify(res.data))
            }).catch(err=>{console.log(err)})
           
                 //   })

      
               AsyncStorage.getItem('openevents').then(res=>
                // alert(JSON.parse(res).lengt)
                     setEvent(JSON.parse(res))
             )
                
    };
      return () => (isSubscribed = false);

    }

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
         setEvents(JSON.parse(res))
   )}
,[])


    const FlatListSeparator=()=>{
        return(
            <View style={{height:0.5, backgroundColor:'green', width:'100%'}}/>
        )
        };

        const gotoReportchat = (uid,rid) => {
           navigation.navigate('Update Event',{uid,rid})
        }

    //    useEffect(()=>alert(JSON.stringify(route.params.events)),[])
    return(
        <View style={styles.container}>
            <ScrollView>

            <Text>{'fffff '+uid}</Text>
            {Object.keys(events).map(e=>
            <View key={e}>  
                  <FlatListSeparator/>
                <TouchableOpacity  style={styles.row} onPress = {()=>gotoReportchat(12, events[e].id)}>
                    <Text>
                    <Text style={styles.txt}>{ events[e].event }</Text>
                        <Text style={styles.txt}>{' '+events[e].lga }</Text>
                        <Text style={styles.txt}>{ ' '+events[e].place }</Text>

                 <Text  style={styles.txt2}>{// ' '+new Date(open[e].rtime).getDate()+'-'+new Date(open[e].rtime).getMonth()+'-'+new Date(open[e].rtime).getFullYear()
                   }</Text>
                 
                </Text>
                </TouchableOpacity>
                </View>
                
            )}
                  
            
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: "center",
      textAlign: "center",
    },
    container:{
      display:'flex',
      justifyContent:"flex-start",
     // alignItems: "flex-start",
      marginLeft: 10
      
    },
    updbtn:{
      backgroundColor:'#00c3f9',
      width:150,
      borderRadius:7,
      height:50,
      margin:5,
      justifyContent: 'center'
  },
  txt:{
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 20
  },
  txt2:{
      justifyContent:'flex-end',
    alignContent: 'flex-end',
    textAlign: 'right',
    fontSize: 20,
    
  },
  row:{
      flexDirection:'row',
      height: 60
  },
    btn:{
      marginBottom:'10px',
      margin: '30px',
      padding:'40px'
    },
    box:{
      margin:10,
      height:60,
      borderColor: 'grey',
      borderWidth:5,
      borderBottomWidth:2,
      width: 150,
      marginRight:20,
      borderRadius:4,
      justifyContent:'center',
      alignContent: 'center'
    }
  });

export default OpenEvents