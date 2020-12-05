import React from 'react';
import axios from 'axios';
import {View,Button, Text,ScrollView,TouchableOpacity, Image, StyleSheet} from 'react-native'
//import { Actions } from 'react-native-router-flux';
import ProgressLoader from 'rn-progress-loader'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage'
  
export default class DraftedMsg extends React.Component{
    constructor(props){
        super(props)
        this.state={
            draftedMessage:'',
            uploaded:'',
            imgurl:'',
            porjectdetails:'',
            visible: false,
            imguri:'',
            imguri2:'',
            imgurl:'',
            imgurl2:'',
            imgurl1C:'',
            imgurl2C:''
        }
    }
    componentDidMount= ()=>{
        const {params} = this.props.route
        AsyncStorage.getItem(params.draft).then(val=>{
                if (val=='empty'||val==null){
                  return    this.props.navigation.navigate('Supervision')

                }

          this.setState({ draftedMessage: JSON.parse(val),
         //    imguri:JSON.parse(val)[0].uri,
             // imguri2:(JSON.parse(val))[0].uri2
            })
           // alert (JSON.string(val))
            axios.get('https://ruwassa.herokuapp.com/api/v1/projects/details/'+this.state.draftedMessage.pid)
            .then(res=>{
                    this.setState({
                        porjectdetails: res.data[0],
                                         
                    })
            })
        })

    }
handleSend=()=>{
    const {params} = this.props.route

  if (this.state.draftedMessage==''){
 return   alert('You cant send an empty report')
  }else{
            if(this.state.uploaded !='done'){
                alert('upload Image first')
            }
    else{
    axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+this.state.draftedMessage.uid)
    .then(res=>{
            if (res.data[0].active=='active'){
               // this._handleImagePicked1(this.state.imguri)
            
   const data={
pid: this.state.draftedMessage.pid,
uid: this.state.draftedMessage.uid,
summary: this.state.draftedMessage.summary,
summaryfrom: this.state.draftedMessage.summaryfrom,
summaryto: this.state.draftedMessage.summaryto,
conclusion: this.state.draftedMessage.conclusion,
followup: this.state.draftedMessage.followup,
compliance: this.state.draftedMessage.compliance,
gps: this.state.draftedMessage.gps,
pstatus: this.state.draftedMessage.stage,
sitestatus: this.state.draftedMessage.status,
sitegps: this.state.draftedMessage.gps,
imgurl: this.state.imgurl,
activity: this.state.draftedMessage.activity,
activitydate: this.state.draftedMessage.date,
activityoutcome: this.state.draftedMessage.outcome,
uri2: this.state.draftedMessage.imguri2,
thirdname: this.state.draftedMessage.thirdname,
thirdparty: this.state.draftedMessage.thirdparty
    }
axios.post('https://ruwassa.herokuapp.com/api/v1/reports',data)
.then(res=>{alert('sent')
    AsyncStorage.setItem(params.draft,'empty');
    AsyncStorage.setItem('draftrec'+params.draft,'empty')


    const obj2={
      pstatus:this.state.draftedMessage.stage,
      sitegps: this.state.draftedMessage.gps,
      sitestatus: this.state.draftedMessage.status
  }
  axios.put('https://ruwassa.herokuapp.com/api/v1/projects/pstatus/'+this.state.draftedMessage.pid,obj2)
      .then(res1=>{
        this.props.navigation.navigate('Supervision')
    }).catch(error=>{alert('err '+error.message)})
  
    this.props.navigation.navigate('Supervision')
}
).catch(error=>{(console.log(error.message))})


}else{
  AsyncStorage.setItem('login','denied');
  alert('you dont have access')
return    this.props.navigation.navigate('Login')
}
}).catch(error=>{alert(error.message)})
  }
}
}

handleDeleteDraft=()=>{
    const {params} = this.props.route

 AsyncStorage.setItem(params.draft,'empty');
 this.props.navigation.navigate('Supervision')
}
    
render(){
  //alert( this.state.draftedMessage.uri)
  
    return(
        <ScrollView style={{ backgroundColor: '#00e9f9'}}>
        <View style={styles.container} >
        <ProgressLoader visible={this.state.visible} isModal={true} isHUD={true}
            hudColor={"#000000"} color={"#FFFFFF"}/>
            <Text>Project Name: {this.state.porjectdetails.title}</Text>
            <Text>LGA: {this.state.porjectdetails.lga}</Text>
            <Text>Contractor: {this.state.porjectdetails.company}</Text>
            <Text>LOT NO: {this.state.porjectdetails.lot}</Text>
            <Text>GPS Location: {this.state.draftedMessage.gps}</Text>
            <Text>Project Stage: {this.state.draftedMessage.stage}</Text>
            <Text>Project Status: {this.state.draftedMessage.status}</Text>
            <Text>Date: {this.state.draftedMessage.date}</Text>
            <Text>Activity: {this.state.draftedMessage.activity}</Text>
            <Text>Outcome: {this.state.draftedMessage.outcome}</Text>
            <Text>Conclusion: {this.state.draftedMessage.conclusion}</Text>
            <Text>Progressing according to plan: {this.state.draftedMessage.compliance}</Text>        

{/*
            <Text>{this.state.draftedMessage.pid}</Text>
            <Text>{this.state.draftedMessage.gps}</Text>
            <Text>{this.state.draftedMessage.uri}</Text>
            <Text>{this.state.uploaded}</Text>*/
            }
            { /*         this.state.draftedMessage.uri == ''?<View>
              <Button title='Pick another image from camera roll' onPress={this._pickImage}/></View>:this.state.draftedMessage.uri == 'k'? 
        <View><Button onPress={this._pickImage} title='Pick another image from camera roll'/></View>:this.state.uploaded=='failed'?
        <View><Button onPress={this._pickImage} title='Pick another image from camera roll'/>
        <Image source={{uri: this.state.draftedMessage.uri}}  style={{width: 150, height: 150}} />
        </View>:  
        <Image source={{uri: this.state.draftedMessage.uri}}  style={{width: 150, height: 150}} /> 
        */  }
        <View style={styles.row}>
                   <Image source={{uri: this.state.draftedMessage.uri}}  style={{width: 150, height: 150}} /> 
                   <Image source={{uri: this.state.imguri2}}  style={{width: 150, height: 150}} /> 
        </View>
                   <Text>{this.state.uploaded}</Text>
            {  //     <Text>{this.state.draftedMessage.uri}</Text>
}

            <TouchableOpacity style={styles.btn} onPress={this.handleSubmit}>
                <Text style={styles.txt4}>Send</Text>
            </TouchableOpacity>
       {/*     <TouchableOpacity style={styles.btn} onPress={this.handleSend}>
                <Text style={styles.txt4}>Send</Text>
            </TouchableOpacity>
          */}
          <TouchableOpacity style={styles.btn} onPress={this.handleDeleteDraft}>
                <Text style={styles.txt4}>Delete Draft</Text>
            </TouchableOpacity>
            <View style={{height:50}}/>
        </View>
        </ScrollView>
    )
}

handleSubmit=async()=>{
    //  alert('ff')
    const { uri, uri2}= this.state.draftedMessage
    await  this.setState({
      imguri: uri,
     imguri2: uri2
    })
        this._handleImagePicked(this.state.draftedMessage) 
  }

  _pickImage = async () => {
  //  alert('g')
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: false,
        aspect: [4, 3],
      });
      this._handleImagePicked(pickerResult);
    }
  };
 
  _handleImagePicked = async pickerResult => {
 // return  alert(this.state.imguri)
    let uploadResponse, uploadResult;

    try {
    
      if (pickerResult.uri) {
        this.setState({
          uploaded:'loading...',
          visible:true
      });
       //   alert(pickerResult.uri)
        uploadResponse = await uploadImageAsync(pickerResult.uri,this.state.draftedMessage.pid,this.state.draftedMessage.uid);
        uploadResult = await uploadResponse.json();
      // alert(uploadResult[0].imgurl)
       if(uploadResult[0].imgurl!=null){
        this.setState({
                    imguri:pickerResult.uri,
                       uploaded:'done',
                       visible:false,
                       imgurl:uploadResult[0].imgurl,
          image: uploadResult.location,
          imgurl1C:'done'
        });
//alert(this.state.imguri2)
        if(this.state.imguri2){
          //alert(this.state.imguri2)

          uploadResponse = await uploadImageAsync(this.state.imguri2,1,1);
          uploadResult = await uploadResponse.json();
    //     alert(uploadResult[0].imgurl)
         if(uploadResult[0].imgurl!=null){
          //   alert(uploadResult[0].imgurl)
          this.setState({
                      imguri:pickerResult,
                         uploaded:'done',
                         visible:false,
                         imgurl2:uploadResult[0].imgurl,
            image: uploadResult.location,
            imgurl2C:'done'
          });
      }      
      }else{2
          this.setState({
              imgurl2C:'done'
          })
      }  
      

   if(this.state.imgurl1C=='done' & this.state.imgurl2C=='done' ){ 
    const {params} = this.props.route

   //  alert('ff')
        axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+this.state.draftedMessage.uid)
        .then(res=>{
                if (res.data[0].active=='active'){
                   // this._handleImagePicked1(this.state.imguri)
      //alert('c')          
       const data={
    pid: this.state.draftedMessage.pid,
    uid: this.state.draftedMessage.uid,
    summary: this.state.draftedMessage.summary,
    summaryfrom: this.state.draftedMessage.summaryfrom,
    summaryto: this.state.draftedMessage.summaryto,
    conclusion: this.state.draftedMessage.conclusion,
    followup: this.state.draftedMessage.followup,
    compliance: this.state.draftedMessage.compliance,
    gps: this.state.draftedMessage.gps,
    pstatus: this.state.draftedMessage.stage,
    sitestatus: this.state.draftedMessage.status,
    sitegps: this.state.draftedMessage.gps,
   // imgurl: uploadResult[0].imgurl,
    activity: this.state.draftedMessage.activity,
    activitydate: this.state.draftedMessage.date,
    activityoutcome: this.state.draftedMessage.outcome,
    imguri2: this.state.draftedMessage.uri2,
    imgurl2: this.state.imgurl2,
        imgurl: this.state.imgurl,
        thirdname:  this.state.draftedMessage.thirdname,
        thirdparty: this.state.draftedMessage.thirdparty,
        thirdremark: this.state.draftedMessage.thirdremark,

        }
    axios.post('https://ruwassa.herokuapp.com/api/v1/reports',data)
    .then(res=>{
      alert('sent')
      AsyncStorage.setItem(params.draft,'empty');
      AsyncStorage.setItem('draftrec'+params.draft,'empty')
      
        const obj2={
          pstatus:this.state.draftedMessage.stage,
          sitegps: this.state.draftedMessage.gps,
          sitestatus: this.state.draftedMessage.status
      }
      axios.put('https://ruwassa.herokuapp.com/api/v1/projects/pstatus/'+this.state.draftedMessage.pid,obj2)
          .then(res1=>{
           // alert('hhh')
             this.props.navigation.navigate('Supervision')
      
          }).catch(error=>{alert('err '+error.message)})
      
          this.props.navigation.navigate('Supervision')
        }
    ).catch(error=>{(alert(error.message))})
    
    
    }else{
      AsyncStorage.setItem('login','denied');
      alert('you dont have access')
    return                this.props.navigation.navigate('Login')

    }
    }).catch(error=>{alert(error.message)})
 //iffff
   }
      }else{
         
            this.setState({
                imguri:'kk',
                   uploaded:'Check your network',
                   //imgurl:uploadResult[0].imgurl,
      image: uploadResult.location
    })
        }

      }else{

//send report without image
//return alert('no Image')
axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+this.state.draftedMessage.uid)
        .then(res=>{
                if (res.data[0].active=='active'){
                   // this._handleImagePicked1(this.state.imguri)
                
       const data={
    pid: this.state.draftedMessage.pid,
    uid: this.state.draftedMessage.uid,
    summary: this.state.draftedMessage.summary,
    summaryfrom: this.state.draftedMessage.summaryfrom,
    summaryto: this.state.draftedMessage.summaryto,
    conclusion: this.state.draftedMessage.conclusion,
    followup: this.state.draftedMessage.followup,
    compliance: this.state.draftedMessage.compliance,
    gps: this.state.draftedMessage.gps,
    pstatus: this.state.draftedMessage.stage,
    sitestatus: this.state.draftedMessage.status,
    sitegps: this.state.draftedMessage.gps,
   // imgurl: uploadResult[0].imgurl,
    activity: this.state.draftedMessage.activity,
    activitydate: this.state.draftedMessage.date,
    activityoutcome: this.state.draftedMessage.outcome,
    imguri2: this.state.draftedMessage.uri2,
    imgurl2: this.state.imgurl2,
        imgurl: this.state.imgurl,
        thirdname:  this.state.draftedMessage.thirdname,
        thirdparty: this.state.draftedMessage.thirdparty,
        thirdremark: this.state.draftedMessage.thirdremark,

        }
    axios.post('https://ruwassa.herokuapp.com/api/v1/reports',data)
    .then(res=>{
      alert('sent')
      AsyncStorage.setItem(this.props.draft,'empty');
      AsyncStorage.setItem('draftrec'+this.props.draft,'empty')
      
        const obj2={
          pstatus:this.state.draftedMessage.stage,
          sitegps: this.state.draftedMessage.gps,
          sitestatus: this.state.draftedMessage.status
      }
      axios.put('https://ruwassa.herokuapp.com/api/v1/projects/pstatus/'+this.state.draftedMessage.pid,obj2)
          .then(res1=>{
            this.props.navigation.navigate('Supervision')
      
          }).catch(error=>{alert('err '+error.message)})
      
          this.props.navigation.navigate('Supervision')
        }
    ).catch(error=>{(console.log(error.message))})
    
    
    }else{
      AsyncStorage.setItem('login','denied');
      alert('you dont have access')
    return                 this.props.navigation.navigate('Login')

    }
    }).catch(error=>{alert(error.message)})
        
        this.setState({uploaded:'cancelled',visible:false})
      
}
    } catch (e) {
//      console.log({ uploadResponse });
 //     console.log({ uploadResult });
   //   console.log({ e });
 //  alert(e+'Upload failed, sorry :(');

 ///sending report with no image atall
 /*
axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+this.state.draftedMessage.uid)
.then(res=>{
        if (res.data[0].active=='active'){
           // this._handleImagePicked1(this.state.imguri)
        
const data={
pid: this.state.draftedMessage.pid,
uid: this.state.draftedMessage.uid,
summary: this.state.draftedMessage.summary,
summaryfrom: this.state.draftedMessage.summaryfrom,
summaryto: this.state.draftedMessage.summaryto,
conclusion: this.state.draftedMessage.conclusion,
followup: this.state.draftedMessage.followup,
compliance: this.state.draftedMessage.compliance,
gps: this.state.draftedMessage.gps,
pstatus: this.state.draftedMessage.stage,
sitestatus: this.state.draftedMessage.status,
sitegps: this.state.draftedMessage.gps,
// imgurl: uploadResult[0].imgurl,
activity: this.state.draftedMessage.activity,
activitydate: this.state.draftedMessage.date,
activityoutcome: this.state.draftedMessage.outcome,
imguri2: this.state.draftedMessage.uri2,
imgurl2: this.state.imgurl2,
imgurl: this.state.imgurl,
thirdname:  this.state.draftedMessage.thirdname,
thirdparty: this.state.draftedMessage.thirdparty,
thirdremark: this.state.draftedMessage.thirdremark,

}
axios.post('https://ruwassa.herokuapp.com/api/v1/reports',data)
.then(res=>{
alert('sent')
AsyncStorage.setItem(this.props.draft,'empty');
AsyncStorage.setItem('draftrec'+this.props.draft,'empty')

const obj2={
  pstatus:this.state.draftedMessage.stage,
  sitegps: this.state.draftedMessage.gps,
  sitestatus: this.state.draftedMessage.status
}
axios.put('https://ruwassa.herokuapp.com/api/v1/projects/pstatus/'+this.state.draftedMessage.pid,obj2)
  .then(res1=>{
      Actions.home({userid:this.props.uid})

  }).catch(error=>{alert('err '+error.message)})

Actions.home();
}
).catch(error=>{(console.log(error.message))})


}else{
AsyncStorage.setItem('login','denied');
alert('you dont have access')
return    Actions.signin()
}
}).catch(error=>{alert(error.message)})
*/
this.setState({uploaded:'cancelled',visible:false})
      this.setState({
        uploaded:'failed',
        visible:false
    });
    } finally {
      this.setState({
        uploading: false
      });
    }
  };  
}

async function uploadImageAsync(uri,a,b) {
  let apiUrl = 'https://ruwassa.herokuapp.com/api/v1/activityform';

  
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

  return fetch(apiUrl, options)
 

}

const styles = StyleSheet.create ({
    container:{
        flex:1,
        paddingTop:20,
        backgroundColor: '#f0f0f4',
        padding:10
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
        borderWidth:2,
        width:'40%',
        marginRight:20,
        borderRadius:4
    },
    box1:{
        margin:10,
        height:100,
        borderColor: 'grey',
        borderWidth:1,
        borderBottomWidth:2,
        width:'90%',
        marginRight:20,
        display:'flex',
        borderRadius:4
    },
    txt:{
      fontSize:20,
      marginTop:15,
      marginLeft:5,
      marginRight:2
    },
    txtbtn:{
        textAlign:'center',
        fontSize:20,
        marginTop:4,
        marginLeft:5,
        marginRight:2
      },
      txtbtn1:{
        textAlign:'center',
        fontSize:15,
        marginTop:4,
        marginLeft:5,
        marginRight:2
      },
    
    row:{
        flexDirection:'row',
        alignContent:'stretch',
        alignSelf:'auto'

    },
    updbtn:{
        backgroundColor:'#00c3f9',
        width:150,
        borderRadius:7,
        height:40
    },
    updbtn2:{
        backgroundColor:'#00c3f9',
        width:150,
        borderRadius:7,
        height:40
    },
    updbt1:{
        margin:10,
        backgroundColor:'grey',
        width:'90%',
        borderRadius:0,
        height:40
    },
    container:{
      flex:1,
      flexDirection: 'column',
    //  justifyContent: 'center',
      //alignItems: 'center',
      backgroundColor: '#00e9f9',
      //height:'100%',
      width:'100%',
      margin:30,
    //  marginBottom:30
  
  },
  
    btn:{
      marginTop:10,
       marginLeft:10,
       marginRight:20,
       padding:25,
       backgroundColor:'#00a1ff',
       color: 'white',
       borderRadius:4,
        height:'5%',
        alignItems:'center',
        width:'50%',
        justifyContent:'center'
  
   },
   txt4:{
    fontSize:18,
    paddingBottom:10,
    color:'white',
    
    alignItems:'center',
    textAlign:'center'

}
})