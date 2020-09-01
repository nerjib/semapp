import React, {Component, useState, useEffect} from 'react';
import { StyleSheet,Text,TextInput, Dimensions,View,FlatList, ScrollView,TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import * as Contacts from 'expo-contacts';



const Settings =({navigation, route})=>{

    
const FlatListSeparator=()=>{
    return(
        <View style={{height:0.5, backgroundColor:'green', width:'100%'}}/>
    )
    };

    return(
        <View style={{flex:1, marginTop:'10%'}}>
                           {FlatListSeparator()}

           <TouchableOpacity onPress={()=>{navigation.navigate('products')}} style={{height:40}}>
               <Text style={{height:40}}>
                   My Products
               </Text>
               {FlatListSeparator()}

           </TouchableOpacity>
           <TouchableOpacity style={{height:40}}>
               <Text style={{height:40}}>
                   Account
               </Text>
               {FlatListSeparator()}

           </TouchableOpacity>
           <TouchableOpacity style={{height:40}}>
               <Text style={{height:40}}>
                   Settings
               </Text>
               {FlatListSeparator()}

           </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    container:{
        flex:1,
        paddingTop:45,
        backgroundColor: '#f0f0f4',
      /*  flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00e9f9',
        height: '100%',
        width:'100%'*/
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
})

export default Settings;