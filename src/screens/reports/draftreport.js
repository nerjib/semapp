import React, {useState, useEffect} from "react";
import { View,AsyncStorage, Button, Text, StyleSheet, TouchableOpacity, TextInput, Picker, Image, ScrollView } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import ProgressLoader from 'rn-progress-loader' ;
import * as ImageManipulator from "expo-image-manipulator";
//import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
// import * as Print from 'expo-print'
import * as MediaLibrary from 'expo-media-library'
import * as Permissions from 'expo-permissions';
import axios from 'axios'

import {Eng, Hau} from '../../constant/eng'
//import { set } from "react-native-reanimated";
import Geolo from '../geo'


const DraftReport = ({navigation, uid}) => {
    let [lang, setLang] = useState(lang=Eng)
    let [incidence, setIncidence] = useState('Fire')
    let [imguri, setImgUri] = useState('')

    let [imguri2, setImgUri2] = useState('')
    let [gps, setGPS] = useState('')
    let [imgurl, setImgUrl] = useState('')
    let [area, setArea] = useState('')
    let [contact2, setContact2] = useState('')
    let [comment, setComment] = useState('')
    let [lga, setLGA] = useState('Birnin Gwari')
    let [visibility, setVisibility] = useState(false)
  let [cause, setCause] = useState('')
  let [ward, setWard] = useState('')
  let [place, setPlace] = useState('')
  let [event, setEvent] = useState('')
  let [causedescri, setCausedescr] = useState('')  




const lgas=['Birnin Gwari','Giwa','Igabi','Ikara','Jaba','Jemaa','Kachia','Kaduna North','Kaduna South','Kagarko',
  'Kajuru','Kaura','Kauru','Kubau','Kudan','Lere','Makarfi','Sabon Gari', 'Sanga','Soba','Zangon Kataf','Zaria']


 
useEffect(()=>setImgUri2(''),[])
const Langu = () => {
  setInterval(
    ()=> {
      AsyncStorage.getItem('lang').then((val)=>{
        if(val=='Eng'){
          setLang(Eng)
    
        }else{
          setLang(Hau)
        }
      })
    
    },
    1000
  );
}
useEffect(()=>Langu(),[])
useEffect(()=>{AsyncStorage.getItem('login').then(v=>{
 // alert(v)
})},[])


const about = e => navigation.navigate(e)

const updateIncident =(e)=>{
  setIncidence(e)
}
const updateLGA =(e)=>{
    setLGA(e)
  }
const changeArea =(e)=>{
  setArea(e)
}
const changeContact = (e) => {
  setContact2(e)
}
const changeCause = (e) => {
 // alert(e)
  setCause(e)
}
const changeplace = (e) => {
  //alert(e)

  setPlace(e)
}

const changeCausedescr = (e) => {
  //alert(e)

  setCausedescr(e)
}
const changeEvent = (e) => {
  //alert(e)

  setEvent(e)
}
const changeWard = (e) => {
  //alert(e)

  setWard(e)
}
const _takePhoto = async () => {


  // return alert('jjk')
   const {
     status: cameraPerm
   } = await Permissions.askAsync(Permissions.CAMERA);
 
   const {
     status: cameraRollPerm
   } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
 
   // only if user allows permission to camera AND camera roll
   if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
     let pickerResult = await ImagePicker.launchCameraAsync({
       allowsEditing: false,
       aspect: [4, 3],
     });
 
      //  let hg= await  MediaLibrary.getAlbumAsync('ruwassa reports')
   //alert(myfile.uri)
  // alert(pickerResult.uri)
       //1     setImgUri(pickerResult.uri)
          //1    _CompressImg(pickerResult.uri);
 _handleImagePicked(pickerResult);
   }
 };

 const _handleImagePicked = async pickerResult => {      
  try {
  
    if (!pickerResult.cancelled) {
     //   alert(pickerResult.uri)
      const manipResult = await _CompressImg(pickerResult.uri)
setImgUri(manipResult)
    }else{}
  } catch (e) {
  } finally {
  }
};



 const _CompressImg = async (a) => {
  const manipResult = await ImageManipulator.manipulateAsync(
    a,
    [{ rotate: 0 }],
    { compress: 0.1, format: ImageManipulator.SaveFormat.jpeg },
  );
//   alert(manipResult.uri);
let myfile= await MediaLibrary.createAssetAsync(manipResult.uri,'jiy')
//  alert(myfile.uri)
// await MediaLibrary.createAlbumAsync('ruwassa reports/.images',myfile)

 setImgUri2(myfile.uri)
  return myfile.uri
};


const handleDraft = async() =>{
  if(event && imguri){
  alert('draft')
  AsyncStorage.getItem('DraftReport').then(val=>{

    const myData=
    {
     imguri,
     imguri2,
     gps,
     imgurl,
     area,
     contact2,
     comment,lga,
     cause,
     ward,
     place,
     event,
     causedescri
    }
  
    if(val=='empty' || val==null){
        alert('emp')
        AsyncStorage.setItem('DraftReport', JSON.stringify([myData]))
      //  this.createPDF()
        alert('Saved in draft, pdf file saved in documents')
    }else{
      //  alert(JSON.stringify(val))

        const myDraftData = JSON.parse(val);
       // alert(myDraftData)
        myDraftData.push(myData)
        AsyncStorage.setItem('DraftReport',JSON.stringify(myDraftData))
        this.createPDF()

        alert('Saved in draft, pdf file saved in documents')

    }
})
}else{
  alert('Cant submit incomplete report')
}
}

const handleSend=async()=>{
  //return alert('this.state.imguri')

//setVisibility(true)
           if(gps==''){
                return  alert('please turn on your gps')
              }
              else if(imguri==''){
               return   alert('please capture incidence')
              }
              else{
                setVisibility(true)
              _handleImagePicked1(imguri)
              }        

}

const _handleImagePicked1 = async pickerResult => {
 // return alert(pickerResult)
  let uploadResponse, uploadResult;

  try {
   
    if (pickerResult) {
   //  return  alert(pickerResult)
      uploadResponse = await uploadImageAsync(pickerResult,1,1);
    //  return alert(JSON.stringify( await uploadResponse))
      uploadResult = await uploadResponse.json();
   // return alert((uploadResult.imgurl))
     if(uploadResult.imgurl!=null){
      //alert((uploadResult.imgurl))
     //  await setImgUrl(uploadResult.imgurl)
       
     
     //if(imgurl!= ''){
       //alert(imgurl)
      const   data = {
        gps,
        imgurl: uploadResult.imgurl,
        lga,
        cause,
        ward,
        event,
        descrcause:causedescri,
        sid: uid,
        source:uid,
        state: 'Kaduna',
        block: '',
        place
         }
       
     
          // return(alert((data)))
     await    axios.post('https://kd-sema.herokuapp.com/api/v1/reports/draftreports',data)
         .then(res=>{
        setImgUri ('')
        setImgUrl('')
        setPlace('')
        setEvent('Fire')
        setCause('')
        setCausedescr(false)

             alert('send')
         }).catch(err=>{alert(err)
          setVisibility(false)

        })

    // }
    }
    }else{//this.setState({uploaded:'cancelled',visible:false})
  }
  } catch (e) {
    console.log({ uploadResponse });
    console.log({ uploadResult });
    console.log({ e });
    setVisibility(false)

      alert('Upload failed, sorry :(');
  
  } finally {
    setVisibility(false)

  }
};

const handleGps =(e)=>{
  setGPS(e)
}

const GPS2 = (e)=>{
  setGPS2(e)
}

 return (

      <ScrollView>
      <View style={styles.container}>
      <ProgressLoader visible={visibility} isModal={true} isHUD={true}
            hudColor={"#000000"} color={"#FFFFFF"}/>
       
                  <Text style={{margin:20, fontSize:19}}>Emergency Report Form  </Text>
    <Geolo onGps={handleGps}/>
    
  {//   <Geo2 onGPS2={GPS2}/>
  }

<Text style={styles.txt}> LGA </Text> 
<Picker style={{borderWidth:4,borderColor:'gray', height: 50, width: 150}} selectedValue = {lga}  onValueChange = {updateLGA}>
{lgas.map(e=>
               <Picker.Item label = {e} value = {e} />
  
)}
            </Picker>

<Text style={styles.txt}> Ward </Text> 

<TextInput  style={styles.box}value={ward} onChangeText = {changeWard} placeholder='Ward'/>

              <Text style={styles.txt}> Incident </Text> 
  
        <View>
        <Picker style={{borderWidth:4,borderColor:'gray', height: 50, width: 150}} selectedValue = {event} onValueChange = {changeEvent}>
               <Picker.Item label = 'Fire' value = "Fire" />
               <Picker.Item label = 'Flood' value = "Flood" />
               <Picker.Item label = 'Accident' value = "Accident" />
            </Picker>
            </View>

            <Text style={styles.txt}> Cause </Text> 

<TextInput  style={styles.box}value={cause} onChangeText = {changeCause} placeholder='Cause'/>


              <Text style={styles.txt}> Cause Description </Text> 

<TextInput  style={styles.box}value={causedescri} onChangeText = {changeCausedescr} placeholder='Cause description'/>


              <Text style={styles.txt}> Place </Text> 

<TextInput  style={styles.box}value={place} onChangeText = {changeplace} placeholder='Place'/>

 
    {imguri!='' &&    <Image source={{uri: imguri}}
       style={{width: 150, height: 150}} />}
       
      <Button   title='Picture' onPress={()=>_takePhoto() } />
      <TouchableOpacity style={styles.updbtn} onPress={()=>handleSend() } >
              <Text style={styles.txt}> Send </Text> 
        </TouchableOpacity>
        <TouchableOpacity style={styles.updbtn} onPress={()=>handleDraft() } >
              <Text style={styles.txt}> Save to draft </Text> 
        </TouchableOpacity> 

      </View>
 
      </ScrollView>
  );
};



async function uploadImageAsync(uri,a,b) {
  //return alert(uri+ )
  let apiUrl = 'https://kd-sema.herokuapp.com/api/v1/upload';  
  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];
//alert(fileType)
  let formData = new FormData();
  formData.append('rid',a);
  formData.append('pid', b);
  formData.append('activity',1);
  formData.append('outcome',1);
  formData.append('image', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  return await fetch(apiUrl, options)
 
/**/
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


export default DraftReport;