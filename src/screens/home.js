import React, {Component, useState, useEffect} from 'react';
import { StyleSheet,Text, Dimensions,View,FlatList, ScrollView,TouchableOpacity } from 'react-native';
import axios from 'axios';
//import { Actions } from 'react-native-router-flux';
import * as Contacts from 'expo-contacts';

const { width } = Dimensions.get('screen');


const HomePage=({navigation})=>{
  const [contacts, setContacts]= useState([{phoneNumbers:[{number:10}], name:'yykhjh', phoneNumbers:[{number:110}], name:'2yykhjh',phoneNumbers:[{number: 6578}], name:'yykhjh'}])
  const [contacts1, setContacts1]= useState(7)


  const loadContact=async()=>{

    const {status}= await  Contacts.requestPermissionsAsync();
    if (status=== 'granted'){
        const { data }= await Contacts.getContactsAsync({
            fields: [Contacts.Fields.PhoneNumbers,Contacts.Fields.Emails]
        });
     // setContacts(data)
        if (data.length>0){
    //      alert('ff')
           // alert(JSON.stringify(data[0]))
        //  alert(JSON.stringify(data))
        setContacts(data)
 //           AsyncStorage.setItem('contacts',JSON.stringify(data))     
        }
}
    

}


//useEffect(()=>setContacts(yy=>[{phoneNumbers:[{number:10}], name:'yykhjh', phoneNumbers:[{number:110}], name:'2yykhjh',phoneNumbers:[{number:JSON.stringify(yy)}], name:'yykhjh'}]),[])
useEffect( async ()=>  loadContact(),[])


const FlatListSeparator=()=>{
  return(
      <View style={{height:0.5, backgroundColor:'green', width:'100%'}}/>
  )
  };
  
const search=(e)=>{
 // alert(e.replace(/ /g, ""))
  if((e.replace(/ /g, "")[0])=='+='){
//alert(e.replace(/'+234'/,0))
  }
  navigation.navigate('chatt',{me: e.replace(/ /g, "")})
}

  return (
    <View style={{flex:1}}>
      <View style={{ flexDirection:'row',
       alignSelf:'auto', marginTop:50}}>
       <TouchableOpacity onPress={()=>{alert('jf nfj')}} style={{backgroundColor:'grey', width:'50%', height:50, alignItems:'center', alignContent:'center'}}>
          <Text>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('mainmenu')}} style={{backgroundColor:'grey', width:'50%', height:50, alignItems:'center', alignContent:'center'}}>
          <Text>ME </Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={{height:40}}>
            <Text>
                Search
            </Text>
        
        </TouchableOpacity>
                   
        
    <FlatList
          data={contacts}
          ItemSeparatorComponent={FlatListSeparator}
          renderItem={({item})=>(
              <View style={{height:40}}>
                  {item.phoneNumbers &&
                      <TouchableOpacity  onPress={()=>{search(item.phoneNumbers[0].number)}} style={{ height:'100%'}}>
                  <Text>{item.name}</Text>
                  </TouchableOpacity>
          }
              </View>
          )}
          />
      

    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    width: '90%',    
  },
 
});

export default HomePage;
