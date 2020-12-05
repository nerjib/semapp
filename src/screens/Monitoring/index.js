import React, {component } from 'react';
import {BackHandler, Text,TouchableOpacity,ScrollView, Button, StyleSheet, View} from 'react-native'
//import RNPickerSelect from 'react-native-picker-select'
//import RNExitApp from 'react-native-exit-app'
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage'


const MonHome=({navigation})=>{
//    alert(props.userid)

    
  

    const goToProjects=()=>{
        navigation.navigate('projects')
     //   Actions.projects()
    }
    const goToDrafts=()=>{
        // Actions.draft()
        Actions.eg()
     }
    const goToDrafts1=()=>{
        navigation.navigate('monwaterdraft')

      //  Actions.draft()
       //Actions.sol()
    }
    const goToDrafts2=()=>{
        navigation.navigate('monsandraft')

     //   Actions.draft2()
       //Actions.sol()
    }

    return(
        <ScrollView style={styles.scrl}>

        <View style={styles.container}>

         <TouchableOpacity style={styles.btn} onPress={()=>{goToProjects()}}>
         <Text style={styles.txt}
         > Projects</Text>
     </TouchableOpacity>
    
{/*}
     <TouchableOpacity style={styles.btn} onPress={()=>{goToDrafts()}}>
         <Text style={styles.txt}
         > Draft</Text>
    </TouchableOpacity>*/}
     <TouchableOpacity style={styles.btn} onPress={()=>{goToDrafts1()}}>
         <Text style={styles.txt}
         > Draft for water facilities</Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.btn} onPress={()=>{goToDrafts2()}}>
         <Text style={styles.txt}
         > Draft for VIP facilities</Text>
     </TouchableOpacity>


      <View style={{height:40}}/>
     </View>
     </ScrollView>

    )
}
const styles=StyleSheet.create({
    
    container:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        //height:'100%',
        width:'100%',
        marginTop:30,
      //  marginBottom:30

    },
    scrl:{
        backgroundColor: 'white',

    },
    btn:{
       marginTop:10,
        marginLeft:30,
        marginRight:30,
        padding:25,
        backgroundColor:'#00dff2',
        color: 'white',
        borderRadius:4,
         height:'15%',
         alignItems:'center',
         width:'60%',
         justifyContent:'center'

    },
    
    txt:{
        fontSize:18,
        paddingBottom:10,
        color:'white',
        
        alignItems:'center',
        textAlign:'center'

    }

})

export default MonHome