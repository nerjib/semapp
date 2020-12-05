import React, {component } from 'react';
import {BackHandler, Text,TouchableOpacity,ScrollView, Button, StyleSheet, View} from 'react-native'
//import RNPickerSelect from 'react-native-picker-select'
//import RNExitApp from 'react-native-exit-app'
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage'


const FireLesson=({navigation})=>{
//    alert(props.userid)    
  

    const goToTask=()=>{
        navigation.navigate('yout')
     //   Actions.projects()
    }
    const goToDrafts=()=>{
        // Actions.draft()
        Actions.eg()
     }
    const goToDrafts1=()=>{
        navigation.navigate('yout')

      //  Actions.draft()
       //Actions.sol()
    }
    const goToDrafts2=()=>{
        navigation.navigate('yout')

     //   Actions.draft2()
       //Actions.sol()
    }

    const FlatListSeparator=()=>{
        return(
            <View style={{height:1.0, backgroundColor:'green', width:'100%'}}/>
        )
        };

    return(
        <ScrollView style={styles.scrl}>

        <View style={styles.container}>
        
        <FlatListSeparator/>

<TouchableOpacity style={styles.row} onPress={()=>{navigation.navigate('Fire Lesson 1')}}>

<Text style={styles.txt}>Lessson 1: Types of fire accidents</Text>
</TouchableOpacity>
<FlatListSeparator/>

<TouchableOpacity style={styles.row} onPress={()=>{alert('You must finish lesson 1 to unlock lesson 2')}}>
<Text style={styles.txt}>Lesson 2: Handling domestic fire outbreak</Text>
</TouchableOpacity>
<FlatListSeparator/>

<TouchableOpacity style={styles.row} onPress={()=>{alert('You must finish lesson 2 to unlock lesson 3')}}>

<Text style={styles.txt}>Lesson 3: Handling wild fire outbreak</Text>
</TouchableOpacity>
<FlatListSeparator/>

<TouchableOpacity style={styles.row} onPress={()=>{alert('You must finish lesson 3 to unlock lesson 4')}}>

<Text style={styles.txt}>Lesson 4: Exercises</Text>
</TouchableOpacity>
<FlatListSeparator/>




      <View style={{height:40}}/>
     </View>
     </ScrollView>

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
       // height:'10%',
        marginTop: 20,
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
/*
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
*/
export default FireLesson