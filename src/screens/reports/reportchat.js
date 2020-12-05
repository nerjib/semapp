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

const ReportChat = ({rid,uid}) => {
    let [message, setMessage] = useState('')
    let [imgurl1, setImgurl1] =useState('')
    let [imguri, setImguri] =useState('')
    let [imguri2, setImguri2] =useState('')
    let [chat, setChat] = useState('')
    let [feedback, setFeedback] = useState([])
    let [outbox, setOutbox] = useState([])
    let [visible, setVisible] = useState(false)




/*useEffect(async()=>{
//alert(rid)
let mch=[]

 await AsyncStorage.getItem('feedback').then(val=>{
   // alert(JSON.stringify(val).length)
/*    Object.keys(val).map(e=>{
      if (val[e].rid==rid){
        mch.push(val[e])
      }
      
    // alert(JSON.stringify(mch))

    })
  //})
 // alert(mch)

},[])
*/
const loader=()=>{
  setInterval(
    ()=>{
    axios.get('https://kd-sema.herokuapp.com/api/v1/reports/feedback/'+uid)
.then(res=>{
  //  alert(res.data)
    AsyncStorage.setItem('feedback',JSON.stringify(res.data))
}).catch(err=>{console.log(err)})

/*AsyncStorage.getItem('feedback').then(val=>{
  // alert(JSON.stringify(JSON.parse(val)[0]))
     setChat(JSON.parse(val))
   // alert(JSON.parse(val).length)
      //  mch.push(val[e])
    // 
})*/
}
  ,1000)
}

useEffect(() => {
 // loader()
// return alert(JSON.stringify(RNSimData))
//alert(feedback.length)
axios.get('https://kd-sema.herokuapp.com/api/v1/reports/feedback/'+uid)
.then(res=>{
  //  alert(res.data)
    AsyncStorage.setItem('feedback',JSON.stringify(res.data))
}).catch(err=>{console.log(err)})

AsyncStorage.getItem('feedback').then(val=>{
 // alert(JSON.stringify(JSON.parse(val)[0]))
    setChat(JSON.parse(val))
  // alert(JSON.parse(val).length)
     //  mch.push(val[e])
   // 
})}
,[])
useEffect(()=>{
 // loader()
},[])
useEffect(()=>{

  AsyncStorage.getItem('outbox').then(val=>{
    // alert(val)
     if(val!=null){
     setOutbox(JSON.parse(val))
    }
  })   
},[])

    const changeMsg =(e)=> {
      setMessage(e)
    }
  

    const checkC = async(e)=> {
     // alert(JSON.stringify(chat))
     if(message==''){

       return ('')
     }
     try{
      let hh= await outbox.push({senderid:uid,receiverid:10,rid,message:message,imguri,imguri2})
    // alert(JSON.stringify(outbox))
   await  AsyncStorage.setItem('outbox',JSON.stringify(outbox))
   setMessage('')
   // JSON.parse(JSON.stringify(chat)).push({id:1113,senderid:22,receiverid:88,message:'done##################################################'})
     }catch(e){
       alert(e)
     }

    }
    const checkC2=(e)=>{
     // alert(e)
      AsyncStorage.getItem('outbox').then(val=>{

    //  }
         alert(val)
      })
    }
 const   onSendReport=async()=>{
 //return alert('hhh')
 setVisible(true)
if(message==''){
  setVisible(false)

  return alert('empty message')
}
      let data={
        rid,
        senderid: uid,
        receiverid: 10,
        msg: message,
        imgurl1,
      }
      axios.post('https://kd-sema.herokuapp.com/api/v1/reports/feedback', data)
      .then(res=>{
       //loader
        setVisible(false)
          alert('sent')
          setMessage('')
          setImgurl1('')
          useEffect()

      }).catch(e=>{
        if(e.message=='Network Error'){
          checkC()
          setVisible(false)
          //alert('babu network')
        }
        setVisible(false)

     //   alert(e)
      })

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
     setImguri(pickerResult.uri)
      _CompressImg(pickerResult.uri);
     //this._handleImagePicked();
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
    
     setImguri2(myfile.uri)
      return myfile.uri
    };
    const FlatListSeparator=()=>{
    return (
          <View style={{height:0.5, backgroundColor:'green', width:'100%'}}/>
    )
      };

    return(
        <View style={styles.container}>
            <ScrollView >
            <ProgressLoader visible={visible} isModal={true} isHUD={true}
            hudColor={"#000000"} color={"#FFFFFF"}/>

                          <TouchableOpacity onPress={()=>alert('onSendReport')}><Text>ggCff</Text></TouchableOpacity>
            {feedback &&<View>
                {Object.keys(chat).map((e,i)=>
                chat[e].rid==rid &&
                <View key={i} style={{height:50}}>
                                  <FlatListSeparator/>

                    <Text style={{textAlign: chat[e].rid==rid?'right':'left'}} >
                      <View>
                       <Text style={{fontSize:20}}> {chat[e].message}</Text>
                       </View>
                       <View>
                        <Text style={{color:'gray'}}>{chat[e].time}</Text>
                        </View>
                        </Text>
                    </View>
                )
               }
               </View>}
               {outbox && <View>
                 {Object.keys(outbox).map((e,i)=>
                                 (outbox[e].rid==rid && outbox[e].senderid==uid) &&

                                 <View key={i} style={{height:50}}>
                                    <FlatListSeparator/>
                                    <Text  style={{textAlign: outbox[e].rid==rid?'right':'left'}}>
                   <Text>{outbox[e].message+outbox[e].senderid+' '+uid}</Text>
                   </Text>
                   </View>
                 )}
               </View>}
               <TouchableOpacity onPress={onSendReport} style={styles.updbtn}><Text>Send</Text></TouchableOpacity>

<View style={{height:100}}/>
               
               </ScrollView>
               <ScrollView>
               <View style={styles.footer}>
                
               <View>
                   {imguri!='' &&    <Image source={{uri: imguri}}  style={{width: 150, height: 150}}/>}
                   </View>

                   <TextInput style={{borderWidth:1, height:40, backgroundColor:'white'}} value={message} onChangeText={changeMsg}/>
                   <View style={{flexDirection:'row', justifyContent:'space-evenly'}} >
                   <View style={{flexDirection:'row'}} > 

                   <Button title='attachment' onPress={checkC} style={styles.sendbtn} />   
                   <Button title='attachment' onPress={checkC2} style={styles.sendbtn} />                
             
                   <Button title='camera' onPress={_takePhoto} style={styles.sendbtn} />
                  {//} <TouchableOpacity onPress={onSendReport}><Text>ggCff</Text></TouchableOpacity>
                  }</View>
                   <View  style={{ justifyContent:'flex-end', marginRight:0}}>
                     <TouchableOpacity onPress={()=>onSendReport()} style={styles.updbtn}><Text>Send</Text></TouchableOpacity>
                  
                   </View>
                   </View>  
               </View>
               </ScrollView> 
              
        </View>
    )


}

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
      alignItems: "center",
      textAlign: "center",
    },
    footer:{
        flex:1,
        flexDirection:'column',
     justifyContent:'flex-end',
       marginBottom:20,

//        position:'absolute',
  //      bottom:0,
    //    right:0
    },
    sendbtn:{
        position:'absolute',
        bottom:0,
        right:0
    },
    container:{
      //display:'flex',
      flex:1,
      justifyContent:"flex-start",
     // alignItems: "flex-start",
      marginLeft: 10,
      
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
      height: 80
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
export default ReportChat