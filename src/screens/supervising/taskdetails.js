import React, {useEffect, useState} from 'react';
import {Text, View,ScrollView, TouchableOpacity, StyleSheet, Button, Image,} from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';


const TaskDetails =({navigation, route})=>{
    let [ tasks, setTask] = useState([])
    let [localSup, setLocalSup] = useState(route.params.lgsup)
    let [title, setTitle] = useState(route.params.title)
    let [ward, setWard] = useState(route.params.ward)
    let [community, setCommunity] = useState(route.params.community)
    let [lga, setLga] = useState(route.params.lga)

    let [stateSup, setStateSup] = useState(route.params.statesup)
    let [lgsup, setLgSup] = useState(route.params.lgsup)

    let [facility, setFacility] = useState(route.params.facility)
    let [contractor, setContractor] =  useState(route.params.contractor)
    let [pid, setPid] = useState(route.params.pid)
    let [phase, setPhase] = useState(route.params.phase)
    let [statePhone, setStatePhone] = useState('')
    let [lgPhone, setLgPhone] =  useState('')
    let [contractoPhone, setContractorPhone]= useState('')

   
    useEffect(()=>{
       let {params}=route
        axios.get('https://ruwassa.herokuapp.com/api/v1/projects/'+params.pid)
        .then(res=>{
            setTask(res.data)
            
    
              axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+res.data[0].state_id)
    .then(res=>{
        setStatePhone(res.data[0].phone)
          
    }).catch(error=>{console.log(error.message)})
    
    axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+res.data[0].local_id)
    .then(res=>{
        setLgPhone(res.data[0].phone)
          
         
    }).catch(error=>{console.log(error.message)})
    
    
              axios.get('https://ruwassa.herokuapp.com/api/v1/contractors/'+res.data[0].contractor_id)
              .then(res1=>{
                  setContractorPhone(res1.data[0].phone)
                  
             
     }).catch(error=>{console.log(error.message)})
    
        })

    },[])

   const goToWeeklyForm=(pid)=>{
        navigation.navigate('weeklyform1',{pid,uid:route.params.uid,title,lga,
            community,company:contractor,lot:route.params.lot})
    }
  const  goToReportForm=(pid)=>{
      
    navigation.navigate('dailyreport',{pid,uid:route.params.uid,title,lga,
        community,company:contractor,lot:route.params.lot})
   //     Actions.form({pid,uid:route.params.uid})    
    }
    

    return(
        <ScrollView style={{backgroundColor:'#00e9f9'}}>

        <View >
            <View style={styles.row}>
            <Text style={styles.title}>Project Title: </Text><Text style={styles.info}> {title}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.title}>Phase: </Text><Text style={styles.info}> {phase}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.title}>Ward </Text><Text style={styles.info}>{ward}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.title}>Community: </Text><Text style={styles.info}>{community}</Text>
            </View>
            {//tasks.length>0 &&       <View style={styles.row}>
            //<Text style={styles.title}>Facility: </Text><Text style={styles.info}>{tasks[0].facility}</Text>
            //</View>
        }
         
         
         
         {tasks.length>0 &&   <View style={styles.row}>
             <Text>
            <Text style={styles.title}>Location: </Text>
            <Text style={styles.info}>{tasks[0].location}</Text>
            </Text>
            </View>}
            <View style={styles.row}>
            <Text>
            <Text style={styles.title}>LGA </Text>
            <Text style={styles.info}>{lga}</Text>
            </Text>
            </View>
            {tasks.length>0 &&   <View style={styles.row}>
            <Text style={styles.title}>Started on: </Text><Text style={styles.info}> {new Date((tasks[0].started).substring(1,20))+' '}</Text>
            </View>}
            {tasks.length>0 &&       <View style={styles.row}>
            <Text style={styles.title}>Status: </Text><Text style={styles.info}>{tasks[0].status}</Text>
            </View>}
            <View style={styles.row}>
            <Text style={styles.title}>Contractor: </Text><Text style={styles.info}>{contractor}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.title}>Contractor Phone:</Text><Text style={styles.info}> { contractoPhone}</Text>
            </View> 
            <View style={styles.row}>
            <Text style={styles.title}>State Supervisor:</Text><Text style={styles.info}> { stateSup}</Text>
            </View> 
            <View style={styles.row}>
            <Text style={styles.title}>State Supervisor Phone:</Text><Text style={styles.info}> { statePhone}</Text>
            </View> 
            <View style={styles.row}>
            <Text style={styles.title}>Local Supervisor: </Text><Text style={styles.info}>{lgsup}</Text>
            </View>
            <View style={styles.row}>
            <Text style={styles.title}>Local Supervisor Phone:</Text><Text style={styles.info}> { lgPhone}</Text>
            </View> 
            {tasks.length>0 &&    <View style={styles.row}>
            <Text style={styles.title}>Last Remark: </Text><Text style={styles.info}>{tasks[0].remark}</Text>
            </View>}
            <View style={styles.row}>
            <View style={styles.updateview}>
                <TouchableOpacity onPress={()=>goToReportForm(route.params.pid)} style={styles.updatebtn} ><Text style={{fontSize:17,color:'white',marginTop:5}}>Daily Report</Text></TouchableOpacity>
            </View>
            <View style={styles.updateview}>
                <TouchableOpacity onPress={()=>goToWeeklyForm(route.params.pid)} style={styles.updatebtn} ><Text style={{textAlign:'center', fontSize:17,color:'white',marginTop:5}}>Weekly Report</Text></TouchableOpacity>
            </View>
            </View>
            <View style={{height:40}}/>
    
        </View>        
    
        </ScrollView>

    )


}

export default TaskDetails







const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        margin:10
    },
    title:{
        fontSize:19,
        color:'red'

    },
    info:{
        fontSize:19,
        color:'black'
    },
    updateview:{
        flexDirection:'column',
        borderRadius:8,
        alignContent:'center',
        alignItems:'center',
        marginTop:40
        
    },
    updatebtn:{
        
        width:100,
        height:60,
        borderRadius:8,
        alignContent:'center',
        alignItems:'center',
        backgroundColor: '#00b4f9',
        margin:10
      
        
    }

})