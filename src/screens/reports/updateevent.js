import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet,AsyncStorage, ScrollView, TextInput,Image,TouchableOpacity, Button} from 'react-native'
 import axios from 'axios'
 import * as ImagePicker from 'expo-image-picker';
 import ProgressLoader from 'rn-progress-loader' ;
 import * as ImageManipulator from "expo-image-manipulator";
 //import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
 // import * as Print from 'expo-print'
 import * as MediaLibrary from 'expo-media-library'
 import * as Permissions from 'expo-permissions';
 import RNSimData from 'react-native-sim-data'
 import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'


const UpdateEvents = ({rid,uid}) => {
    let [visible, setVisibility] = useState(false)
    let [killed, setKilled] = useState(0)
    let [killedmen, setKilledmen] =useState(0)
    let [killedwomen, setKilledwomen] =useState(0)
    let [killedchildren, setKilledchildren] =useState(0)
    let [killedelder, setKilledelder] = useState(0)
    let [missing, setMissing] = useState(0)
    let [missingmen, setMissingmen] = useState(0)
    let [missingwomen, setMissingwomen] = useState(0)
    let [missingchildren ,setMissingchildren] = useState(0)
    let [missingelder ,setMissingelder] = useState(0)
    let [injured ,setInjured] = useState(0)
    let [injuredmen ,setInjuredmen] = useState(0)
    let [injuredwomen ,setInjuredwomen] = useState(0)
    let [injuredchildren ,setInjuredchildren] = useState(0)
    let [injuredelder ,setInjuredelder] = useState(0)
    let [affected ,setAffected] = useState(0)
    let [affectedmen ,setAffectedmen] = useState(0)
    let [affectedwomen ,setAffectedwomen] = useState(0)
    let [affectedchildren ,setAffectedchildren] = useState(0)
    let [affectedelder ,setAffectedelder] = useState(0)
    let [affectedfamilies ,setAffectedfamilies] = useState(0)
    let [victim ,setVictim] = useState(0)
    let [victimsmen ,setVictimsmen] = useState(0)
    let [victimswomen ,setVictimswomen] = useState(0)
    let [victimselder ,setVictimselder] = useState(0)
    let [victimschildren ,setVictimschildren] = useState(0)
    let [victimsfamilies ,setVictimsfamilies] = useState(0)
    let [transferred ,setTransferred] = useState(0)
    let [transferredchildren ,setTransferredchildren] = useState(0)
    let [transferredelder ,setTransferredelder] = useState(0)
    let [transferredfamilies ,setTransferredfamilies] = useState(0)
    let [transferredmen ,setTransferredmen] = useState(0)
    let [transferredwomen ,setTransferredwomen] = useState(0)
    let [evacuated ,setEvacuated] = useState(0)
    let [evacuatedchildren ,setEvacuatedchildren] = useState(0)
    let [evacuatedelder ,setEvacuatedelder] = useState(0)
    let [evacuatedfamilies ,setEvacuatedfamilies] = useState(0)
    let [evacuatedmen ,setEvacuatedmen] = useState(0)
    let [evacuatedwomen ,setEvacuatedwomen] = useState(0)
    let [housesdestroyed ,setHousesdestroyed] = useState(0)
    let [housesdestroyedbrick ,setHousesdestroyedbrick] = useState(0)
    let [housesdestroyedwood ,setHousesdestroyedwood] = useState(0)
    let [housesdamaged ,setHousesdamaged] = useState(0)
    let [housesdamagedbrick ,setHousesdamagedbrick] = useState(0)
    let [housesdamagedwood ,setHousesdamagedwood] = useState(0)
    let [schoolsdamaged ,setSchoolsdamaged] = useState(0)
    let [schoolsdamagedclass ,setSchoolsdamagedclass] = useState(0)
    let [schoolsdamagedstudents ,setSchoolsdamagedstudents] = useState(0)
    let [schoolsdestroyed ,setSchoolsdestroyed] = useState(0)
    let [schoolsdestroyedclass ,setSchoolsdestroyedclass] = useState(0)
    let [schoolsdestroyedstudents ,setSchoolsdestroyedstudents] = useState(0)
    let [hospitaldamaged, setHospitaldamaged] = useState(0)
    let [hospitaldestroyed,setHospitaldestroyed] = useState(0)
    let [healthpostsdamaged, setHealthpostsdamaged] = useState(0)
    let [healthpostsdestroyed, setHealthpostsdestroyed] = useState(0)
    let [religiousbuildingsdamaged, setReligiousbuildingsdamaged] = useState(0)
    let [religiousbuildingsdestroyed, setReligiousbuildingsdestroyed] = useState(0)
    let [publicbuildingdestroyed, setPublicbuildingdestroyed] = useState(0)
    let [publicbuildingdamage, setPublicbuildingdamage] = useState(0)
    let [costdamagesdolar, setCostdamagesdolar] = useState(0)
    let [costdamageslocal, setCostdamageslocal] = useState(0)
    let [hectarescropsdamaged, setHectarescropsdamaged] = useState(0)
    let [hectarescropsdestroyed, setHectarescropsdestroyed] = useState(0)
    let [heardsofcattle, setHeardsofcattle] = useState(0)
    let [damagedroads, setDamagedroads] = useState(0)
    let [destroyed, setDestroyed] = useState(0)
    let [affectedroads, setAffectedroads] = useState(0)
    let [bridgesdamaged, setBridgesdamaged] = useState(0)
    let [bridgesdestroyed, setBridgesdestroyed] = useState(0)
    let [watersourcesaffected, setWatersourcesaffected] = useState(0)
    let [wellsdamaged, setWellsdamaged] = useState(0)
    let [wellsdestroyed, setWellsdestroyed] = useState(0)
    let [otherdamages, setOtherdamages] = useState(0)
    let [transport, setTransport] = useState(0)
    let [communication, setCommunication] = useState(0)
    let [relief, setRelief] = useState(0)
    let [tourism, setTourism] = useState(0)
    let [agriculture, setAgriculture] = useState(0)
    let [watersuply, setWatersuply] = useState(0)
    let [sewerage, setSewerage] = useState(0)
    let [minery, setMinery] = useState(0)
    let [energy, setEnergy] = useState(0)
    let [industrial, setindustrial] = useState(0)
    let [education, seteducation] = useState(0)
    let [commerce, setcommerce] = useState(0)
    let [othersector, setOthersector] = useState(0)
    let [health, setHealth] = useState(0)
    let [fisheries, setFisheries] = useState(0) 
     let [comment, setComment] = useState(0)
     let [magnitude, setMagnitude] = useState(0)
     let [latitude, setLatitude] = useState(0)
     let [longitude, setLongitude] = useState(0)
     let [glidenumber, setGlidenumber] = useState(0)
     let [healthcentersdamaged, sethealthcentersdamaged] = useState(0)
     let [healthcentersdestroyed, sethealthcentersdestroyed] = useState(0)
    let [killedView, setKilledView]= useState('none')
    let [missingView, setMissingView]= useState('none')
    let [injuredView, setInjuredView]= useState('none')
    let [affectedView, setAffectedView]= useState('none')
    let [victimView, setVictimView]= useState('none')
    let [transferredView, setTransferredView]= useState('none')
    let [evacuatedView, setEvacuatedView]= useState('none')
    let [housesDestroyView, setHousesDestroyView]= useState('none')
    let [housesDamagesView, setHousesDamagesView]= useState('none')
    let [schooldestroyedView, setSchooldestroyedView]= useState('none')
    let [schoolDamagedView, setSchoolDamagedView]= useState('none')











    const handlekilled =(e)=>{
            setKilled(e)
            if(e=='yes'){
               setKilledView('flex')
            }else{
              setKilledView('none')
            }
        
      }
      const handlekilledmen =(e)=>{
        setKilledmen(e)
  }
  const handlekilledwomen =(e)=>{
    setKilledwomen(e)
}
const handlekilledchildre =(e)=>{
    setKilledchildren(e)
}
const handlekilledelder =(e)=>{
    setKilledelder(e)
}

 const handleMissing = (e)=>{
    setMissing(e)
    if(e=='yes'){
       setMissingView('flex')
    }else{
      setMissingView('none')
    }
}
 const handleMissingMen = (e)=>{
     alert(e)
   // setMissingmen(e.replace(/[^0-9]/g,''))
   alert(e.replace(/[^0-9]/g,''))

}
const handleMissingelder = (e)=>{
    setMissingelder(e)
}
const handleMissingchildren = (e)=>{
    setMissingchildren(e)
}
const handleMissingwomen = (e)=>{
    setMissingwomen(e)
}

const handleInjured = (e)=>{
    setInjured(e)
    if(e=='yes'){
       setInjuredView('flex')
    }else{
      setInjuredView('none')
    }
}

const handleInjuredchildren = (e)=>{
    setInjuredchildren(e)
}
const handleInjuredelder = (e)=>{
    setInjuredelder(e)
}
const handleInjuredmen = (e)=>{
    setInjuredmen(e)
}
const handleInjuredwomen = (e)=>{
    setInjuredwomen(e)
}

const handleAffected = (e)=>{
    setAffected(e)
    if(e=='yes'){
       setAffectedView('flex')
    }else{
      setAffectedView('none')
    }
}
const handleAffectedchildren = (e)=>{
    setAffectedchildren(e)
}

const handleAffectedelder = (e)=>{
    setAffectedelder(e)
}

const handleAffectedfamilies = (e)=>{
    setAffectedfamilies(e)
}

const handleAffectedmen = (e)=>{
    setAffectedmen(e)
}
const handleAffectedwomen = (e)=>{
    setAffectedwomen(e)
}

const handleVictim = (e)=>{
    setVictim(e)
    if(e=='yes'){
       setVictimView('flex')
    }else{
      setVictimView('none')
    }
}
const handleVictimschildren = (e)=>{
    setVictimschildren(e)
}

const handleVictimselder = (e)=>{
    setVictimselder(e)
}

const handleVictimsfamilies = (e)=>{
    setVictimsfamilies(e)
}

const handleVictimsmen = (e)=>{
    setVictimsmen(e)
}
const handleVictimswomen = (e)=>{
    setVictimswomen(e)
}

const handleTransferred = (e)=>{
    setTransferred(e)
    if(e=='yes'){
        setTransferredView('flex')
     }else{
       setTransferredView('none')
     }
}
const handleTransferredchildren = (e)=>{
    setTransferredchildren(e)
}

const handleTransferredelder = (e)=>{
    setTransferredelder(e)
}

const handleTransferredfamilies = (e)=>{
    setTransferredfamilies(e)
}

const handleTransferredmen = (e)=>{
    setTransferredmen(e)
}
const handleTransferredwomen = (e)=>{
    setTransferredwomen(e)
}

const handleEvacuated = (e)=>{
    setEvacuated(e)
    if(e=='yes'){
        setEvacuatedView('flex')
     }else{
       setEvacuatedView('none')
     }
}
const handleEvacuatedchildren = (e)=>{
    setEvacuatedchildren(e)
}

const handleEvacuatedelder = (e)=>{
    setEvacuatedelder(e)
}

const handleEvacuatedfamilies = (e)=>{
    setEvacuatedfamilies(e)
}

const handleEvacuatedmen = (e)=>{
    setEvacuatedmen(e)
}
const handleEvacuatedwomen = (e)=>{
    setEvacuatedwomen(e)
}

const handleHousedestroyed = (e)=>{
    if(e=='yes'){
        setHousesDestroyView('flex')
     }else{
       setHousesDestroyView('none')
     }
}
const handleHousedamaged = (e)=>{
    if(e=='yes'){
        setHousesDamagesView('flex')
     }else{
       setHousesDamagesView('none')
     }
}
const handleSchoolDestroyed = (e)=>{
    if(e=='yes'){
        setSchooldestroyedView('flex')
     }else{
       setSchooldestroyedView('none')
     }
}
const handleSchoolDamaged = (e)=>{
    
    if(e=='yes'){
        setSchoolDamagedView('flex')
     }else{
       setSchoolDamagedView('none')
     }
}

const handleSend = () =>{
    setVisibility(true)
    let data={
  rid,
uid,
killed,
killedmen,
killedwomen,
killedchildren,
killedelder,
missing,
missingmen,
missingwomen,
missingchildren,
missingelder,
injured,
injuredmen,
injuredwomen,
injuredchildren,
injuredelder,
magnitude,
latitude,
longitude,
glidenumber,
affected,
affectedfamilies,
affectedmen,
affectedwomen, 
affectedchildren,
affectedelder,
victim,
victimfamilies: victimsfamilies,
victimsmen,
victimswomen,
victimschildren,
victimselder,
transferred,
transferredfamilies,
transferredmen,
transferredwomen,
transferredchildren,
transferredelder,
evacuated,
evacuatedfamilies,
evacuatedmen,
evacuatedwomen,
evacuatedchildren,
evacuatedelder,
housesdestroyed,
housesdestroyedbrick,
housesdestroyedwood,
housesdamaged,
housesdamagedbrick,
housesdamagedwood,
schoolsdestroyed,
schoolsdestroyedclass,
schoolsdestroyedstudents,
schoolsdamaged,
schoolsdamagedclass,
schoolsdamagedstudents,
hospitaldestroyed,
hospitaldamaged,
healthcentersdestroyed,
healthcentersdamaged,
healthpostsdestroyed,
healthpostsdamaged,
religiousbuildingsdestroyed,
religiousbuildingsdamaged,
publicbuildingdestroyed,
publicbuildingdamage,
costdamageslocal,
costdamagesdolar,
hectarescropsdamaged,
hectarescropsdestroyed,
heardsofcattle,
damagedroads,
destroyed,
affectedroads,
bridgesdestroyed,
bridgesdamaged,
watersourcesaffected,
wellsdestroyed,
wellsdamaged,
otherdamages,
transport,
communication,
relief,
tourism,
agriculture,
watersuply,
sewerage,
minery,
energy,
industrial,
education,
commerce,
othersector,
health,
fisheries,
comment             

    }
    

axios.post('https://kd-sema.herokuapp.com/api/v1/reports/followup',data)
.then(res=>{
    setVisibility(false)
    alert('Sent')
}).catch(e=>
    {
    setVisibility(false)
    alert(e)
})


}

const View1=(e,k)=>{
    set`${k}`('none')
}

    return(
        <ScrollView>
        <View style={styles.container}>
        <ProgressLoader visible={visible} isModal={true} isHUD={true}
              hudColor={"#000000"} color={"#FFFFFF"}/>

      

      
              
        <Text style={styles.txt}> Killed</Text> 
        <RadioForm 
        radio_props={[{label: 'yes', value:'yes'},
        {label: 'no', value:'no'}          
        ]}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={true}
        onPress={handlekilled}
        />
        <View style={{width:'100%', display:killedView}}>
<TextInput  style={styles.box} placeholder='Men' keyboardType='numeric' value={killedmen} onChangeText={handlekilledmen}/>
<TextInput  style={styles.box} placeholder='Women' keyboardType='numeric'  onChangeText={handlekilledwomen}/>
<TextInput  style={styles.box} placeholder='Children' keyboardType='numeric'  onChangeText={handlekilledchildre}/>
<TextInput  style={styles.box} placeholder='Elders' keyboardType='numeric' onChangeText={handlekilledelder}/>
</View>


     
        <Text style={styles.txt}> Missing</Text> 
        <RadioForm 
        radio_props={[{label: 'yes', value:'yes'},
        {label: 'no', value:'no'}          
        ]}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={true}
        onPress={handleMissing}
        />
        <View style={{width:'100%', display:missingView}}>
<TextInput  style={styles.box} placeholder='Men' keyboardType='numeric'  onChangeText={handleMissingMen}/>
<TextInput  style={styles.box} placeholder='Women' keyboardType='numeric'  onChangeText={handleMissingwomen}/>
<TextInput  style={styles.box} placeholder='Children' keyboardType='numeric' onChangeText={handleMissingchildren}/>
<TextInput  style={styles.box} placeholder='Elders' keyboardType='numeric'  onChangeText={handleMissingelder}/>
</View>

        <Text style={styles.txt}> Injured</Text> 
        <RadioForm 
        radio_props={[{label: 'yes', value:'yes'},
        {label: 'no', value:'no'}          
        ]}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={true}
        onPress={handleInjured}
        />
        <View style={{width:'100%', display:injuredView}}>
<TextInput  style={styles.box} placeholder='Men' keyboardType='numeric'  onChangeText={handleInjuredmen}/>
<TextInput  style={styles.box} placeholder='Women' keyboardType='numeric' onChangeText={handleInjuredwomen}/>
<TextInput  style={styles.box} placeholder='Children' keyboardType='numeric'  onChangeText={handleInjuredchildren}/>
<TextInput  style={styles.box} placeholder='Elders' keyboardType='numeric' onChangeText={handleInjuredelder}/>
</View>


        <Text style={styles.txt}> Affected</Text> 
        <RadioForm 
        radio_props={[{label: 'yes', value:'yes'},
        {label: 'no', value:'no'}          
        ]}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={true}
        onPress={handleAffected}
        />
        <View style={{width:'100%', display: affectedView}}>
<TextInput  style={styles.box} placeholder='Families' keyboardType='numeric'  onChangeText={handleAffectedfamilies}/>
<TextInput  style={styles.box} placeholder='Men' keyboardType='numeric' onChangeText={handleAffectedmen}/>
<TextInput  style={styles.box} placeholder='Women' keyboardType='numeric' onChangeText={handleAffectedwomen}/>
<TextInput  style={styles.box} placeholder='Children' keyboardType='numeric'  onChangeText={handleAffectedchildren}/>
<TextInput  style={styles.box} placeholder='Elders' keyboardType='numeric'  onChangeText={handleAffectedelder}/>
</View>



        <Text style={styles.txt}> Victim</Text> 
        <RadioForm 
        radio_props={[{label: 'yes', value:'yes'},
        {label: 'no', value:'no'}          
        ]}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={true}
        onPress={handleVictim}
        />
        <View style={{width:'100%', display: victimView}}>
<TextInput  style={styles.box} placeholder='Families' keyboardType='numeric'  onChangeText={handleVictimsfamilies}/>
<TextInput  style={styles.box} placeholder='Men' keyboardType='numeric'  onChangeText={handleVictimsmen}/>
<TextInput  style={styles.box} placeholder='Women' keyboardType='numeric' onChangeText={handleVictimswomen}/>
<TextInput  style={styles.box} placeholder='Children' keyboardType='numeric' onChangeText={handleVictimschildren}/>
<TextInput  style={styles.box} placeholder='Elders' keyboardType='numeric' onChangeText={handleVictimselder}/>
</View>



        <Text style={styles.txt}> Transferred</Text> 
        <RadioForm 
        radio_props={[{label: 'yes', value:'yes'},
        {label: 'no', value:'no'}          
        ]}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={true}
        onPress={handleTransferred}
        />
        <View style={{width:'100%', display:transferredView}}>
<TextInput  style={styles.box} placeholder='Families' keyboardType='numeric' onChangeText={handleTransferredfamilies}/>
<TextInput  style={styles.box} placeholder='Men' keyboardType='numeric'  onChangeText={handleTransferredmen}/>
<TextInput  style={styles.box} placeholder='Women' keyboardType='numeric' onChangeText={handleTransferredwomen}/>
<TextInput  style={styles.box} placeholder='Children' keyboardType='numeric' onChangeText={handleTransferredchildren}/>
<TextInput  style={styles.box} placeholder='Elders' keyboardType='numeric' onChangeText={handleTransferredelder}/>
</View>


        <Text style={styles.txt}> Evacuated</Text> 
        <RadioForm 
        radio_props={[{label: 'yes', value:'yes'},
        {label: 'no', value:'no'}          
        ]}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={true}
        onPress={handleEvacuated}
        />
        <View style={{width:'100%', display:evacuatedView}}>
<TextInput  style={styles.box} placeholder='Families' keyboardType='numeric' onChangeText={handleEvacuatedfamilies}/>
<TextInput  style={styles.box} placeholder='Men' keyboardType='numeric' onChangeText={handleEvacuatedmen}/>
<TextInput  style={styles.box} placeholder='Women' keyboardType='numeric'  onChangeText={handleEvacuatedwomen}/>
<TextInput  style={styles.box} placeholder='Children' keyboardType='numeric' onChangeText={handleEvacuatedchildren}/>
<TextInput  style={styles.box} placeholder='Elders' keyboardType='numeric' onChangeText={handleEvacuatedelder}/>
</View>


        <Text style={styles.txt}> Houses Destroyed</Text> 
        <RadioForm 
        radio_props={[{label: 'yes', value:'yes'},
        {label: 'no', value:'no'}          
        ]}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={true}
        onPress={handleHousedestroyed}
        />
        <View style={{width:'100%', display:housesDestroyView}}>
<TextInput  style={styles.box} keyboardType='numeric' placeholder='Brick/Concrete'  />
<TextInput  style={styles.box} keyboardType='numeric' placeholder='Wood/Bamboo'/>
</View>


        <Text style={styles.txt}> Houses Damaged</Text> 
        <RadioForm 
        radio_props={[{label: 'yes', value:'yes'},
        {label: 'no', value:'no'}          
        ]}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={true}
        onPress={handleHousedamaged}
        />
        <View style={{width:'100%', display:housesDamagesView}}>
<TextInput  style={styles.box} keyboardType='numeric' placeholder='Brick/Concrete'/>
<TextInput  style={styles.box} keyboardType='numeric' placeholder='Wood/Bamboo'/>
</View>

        <Text style={styles.txt}> Schools Destroyed</Text> 
        <RadioForm 
        radio_props={[{label: 'yes', value:'yes'},
        {label: 'no', value:'no'}          
        ]}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={true}
        onPress={handleSchoolDestroyed}
        />
        <View style={{width:'100%', display:schooldestroyedView}}>
<TextInput  style={styles.box} keyboardType='numeric' placeholder='Classrooms'/>
<TextInput  style={styles.box} keyboardType='numeric' placeholder='Students'/>
</View>

        <Text style={styles.txt}> Schools Damaged</Text> 
        <RadioForm 
        radio_props={[{label: 'yes', value:'yes'},
        {label: 'no', value:'no'}          
        ]}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={true}
        onPress={handleSchoolDamaged}
        />
        <View style={{width:'100%', display:schoolDamagedView}}>
<TextInput  style={styles.box} keyboardType='numeric' placeholder='Classrooms'/>
<TextInput  style={styles.box} keyboardType='numeric' placeholder='Students'/>
</View>

<TouchableOpacity style={styles.updbtn} onPress={handleSend}>
    <Text>send</Text>
</TouchableOpacity>

                </View>
            </ScrollView>

    )

}

const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: "flex-start",
      textAlign: "center",
      width:"90%"
  
    },
    container:{
      display:'flex',
      justifyContent:"flex-start",
      alignItems: "flex-start",
      width:"90%"
      
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
    btn:{
      marginBottom:'10px',
      margin: '30px',
      padding:'40px'
    },
    box:{
      margin:10,
      height:60,
      borderColor: 'grey',
      borderWidth:1,
      borderBottomWidth:2,
      width: "90%",
      marginRight:20,
      borderRadius:4,
      justifyContent:'center',
      alignContent: 'center'
    }
  });
  
  
export default UpdateEvents