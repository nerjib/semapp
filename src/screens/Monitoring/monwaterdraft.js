import React from 'react';
import {Button,TextInput,Image, AsyncStorage, View, Text,TouchableOpacity, StyleSheet,ScrollView, KeyboardAvoidingView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
//import RNPickerSelect from 'react-native-picker-select'
//import * as ImagePicker from 'expo-image-picker';
//import Constants from 'expo-constants';
//import * as Permissions from 'expo-permissions';
import ProgressLoader from 'rn-progress-loader';
//import ImageResizer from 'react-native-image-resizer'
//import { Asset } from "expo-asset";
//import * as ImageManipulator from "expo-image-manipulator";
import {Table, Row,Rows} from 'react-native-table-component'

export default class MonWaterDraft extends React.Component{
    constructor(props){
        super(props)
        this.state={
            tableview:'none',
            tableHead: ['Title','Remark','LGA','Image'],
            norecord: '',
            receivedData:'',
            geo:'',
            setback:'',
            cdate:'',
            casing:'',
            casedepth:'',
            casingd:'',
            casingr:'',
            swl:'',
            yielda:'',
            grout: '',
            pumpd: '',
            pumpt: '',
            watera:'',
            color:'',
            taste:'',
            odour:'',
            platformd:'',
            shutter:'',
            stability:'',
            soakpit:'',
            signpost:'',
            cordinate:'',
            pumps:'',
            power: '',
            cable: '',
            earth: '',
            tankpvc:'',
            tankc: '',
            tankcap: '',
            stanchion: '',
            antirust: '',
            reticulated: '',
            island: '',
            fenced: '',
            pic1:'',
            pic2:'',
            pic3:'',
            pic4:'',
            visible: false,
            imgurl1:'',
            imgurl2:'',
            imgurl3:'',
            gentime:''
        }
    }

componentDidMount=()=>{
    AsyncStorage.getItem('MonRep1').then(val=>{
        if (val=='empty'|| val==null){
            this.setState({
                tableview:'none'
            })
            }
            else{
                const datas = JSON.parse(val)
                this.setState({
                    receivedData: datas
                })
        }
        if(val.length>2){
            this.setState({
                tableview: 'flex',
                norecord:''
            })
        }else{
            this.setState({
                tableview: 'none',
                norecord: 'No new record'
            })
        }
    })
}

_handleImagePicked1 = async  pickerResult => {
    return (pickerResult)
    
            let uploadResponse, uploadResult;
        
            
            try {
                this.setState({
                    uploaded:'loading...',
                    visible:true
                });
  //              if (pickerResult) {
                 //  alert(pickerResult)
        //          uploadResponse = await uploadImageAsync(pickerResult,this.props.pid,this.props.mid);
          //        uploadResult = await uploadResponse.json();
                // alert(uploadResult[0].imgurl)
   //                         }else{this.setState({uploaded:'cancelled',visible:false})}
              } 
              catch (e) {
                console.log({ uploadResponse });
                console.log({ uploadResult });
                console.log({ e });
          //      alert('Upload failed, sorry :(');
                this.setState({
                  uploaded:'failed',
                  visible:false
              });
              } finally {
                this.setState({
                  uploading: false,
                  visible:false
                });
              }
            };
/*
handlesend=()=>{
    if(this.state.receivedData.length==0){
        return('No data')
    }

    Object.keys(this.state.receivedData).map(e=>{
        const {pid,title,lga,geo,mid,   setback,    cdate,    casing,    casedepth,    casingd,    casingr,    swl,
            yielda,    grout,    pumpd,    pumpt,    watera,   color,    taste,    odour,
            platformd,   shuttr, stability,    soakpit,    signpost,    cordinate,   pumps,    power,
            cable,    earth,    tankpvc,    tankc,    tankcap,    stanchion,    antirust,
            reticulated,    island,    fenced,    pic1,    pic2,    pic3,
            pic4,   visible,    imgurl1,    imgurl2,    imgurl3, gentime} = this.state.receivedData[e];
   //const  uploadResponse = await uploadImageAsync(imguri1,this.props.pid,this.props.mid);
//return alert(JSON.stringify(async()=>await(this._handleImagePicked(imguri1))))
   //const  uploadResposssssssssssssnse = await uploadImageAsync(imguri1,this.props.pid,this.props.mid);
   //const   uploadResponse =async()=> await uploadImageAsync(imguri1,this.props.pid,this.props.mid);
   //return alert(JSON.stringify(this._handleImagePicked(imguri1)));

   //return alert(JSON.stringify(uploadResponse))
const data = {pid,title,lga,mid,geo,   setback,    cdate,    casing,    casedepth,    casingd,    casingr,    swl,
    yielda,    grout,    pumpd,    pumpt,    watera,   color,    taste,    odour,
    platformd,   shuttr, stability,    soakpit,    signpost,    cordinate,   pumps,    power,
    cable,    earth,    tankpvc,    tankc,    tankcap,    stanchion,    antirust,
    reticulated,    island,    fenced,    pic1,    pic2,    pic3,
    pic4,   visible,    imgurl1,    imgurl2,    imgurl3, gentime
        }
        axios.post('https://ruwassa.herokuapp.com/api/v1/monitorsreports',data)
        .then(res=>{
            this.state.receivedData.shift();
            let updatedData = JSON.stringify(this.state.receivedData)
            AsyncStorage.setItem('MonRep',updatedData);
            this.componentDidMount();
        }).catch(error=>{alert(error)})
    })
}*/
render (){
    let data2 = []
  //  if(this.state.receivedData==''){
Object.keys(this.state.receivedData).map((e,i)=>data2.push([this.state.receivedData[e].title,this.state.receivedData[e].community+' '+this.state.receivedData[e].lga,this.state.receivedData[e].remark,
    <Image onPress={()=>this.handleGo('f')}
    source={{ uri: this.state.receivedData[e].pic1 }}
    style={{ width: 100, height: 100, resizeMode: "contain" }}
  />,<TouchableOpacity onPress={()=>this.handleGo1(i)} style={{width:30, backgroundColor:'blue'}}><Text>{i}</Text></TouchableOpacity> ]))
//} 
  return (
        <ScrollView>
            <Text>{this.state.norecord}</Text>
            <View>
            <ProgressLoader visible={this.state.visible} isModal={true} isHUD={true}
            hudColor={"#000000"} color={"#FFFFFF"}/>
                <Table>
                    <Row data={this.state.tableHead}/>
                    <Rows data={data2}/>
                </Table>
            </View>
                    </ScrollView>
    )
}

handleGo=()=>(
    alert('dd')
)
handleGo1=async e=>{
    const {pid,title,lga,geo,mid,   setback,    cdate,    casing,    casedepth,    casingd,    casingr,    swl,
        yielda,    grout,    pumpd,    pumpt,    watera,   color,    taste,    odour,
        platformd,   shuttr, stability,    soakpit,    signpost,    cordinate,   pumps,    power,
        cable,    earth,    tankpvc,    tankc,    tankcap,    stanchion,    antirust,
        reticulated,    island,    fenced,    pic1,    pic2,    pic3,
        pic4,   visible,    imgurl1,    imgurl2,    imgurl3, gentime} = this.state.receivedData[e];

 await      this.setState({
            pid,title,lga,geo,mid,   setback,    cdate,    casing,    casedepth,    casingd,    casingr,    swl,
        yielda,    grout,    pumpd,    pumpt,    watera,   color,    taste,    odour,
        platformd,   shuttr, stability,    soakpit,    signpost,    cordinate,   pumps,    power,
        cable,    earth,    tankpvc,    tankc,    tankcap,    stanchion,    antirust,
        reticulated,    island,    fenced,    pic1,    pic2,    pic3,
        pic4,   visible,    imgurl1,    imgurl2,    imgurl3, gentime
        })
      // alert(this.state.lga)
this.handleSend(e);
//    this._handleImagePicked(imguri1,e,pid,mid)
/*
let oldData= this.state.receivedData
oldData.splice(e,1)
//alert(JSON.stringify(kkkh))
let newData=JSON.stringify(oldData)
AsyncStorage.setItem('MonRep',newData);
*/
}
handlesend1=()=>{
  //  AsyncStorage.removeItem('MonRep1')
    AsyncStorage.getItem('MonRep1').then(val=>{
        let oldData= JSON.parse(val)
        alert(oldData)
        delete oldData[0]
    let    newData=JSON.stringify(oldData)
    //alert(newData)
    AsyncStorage.setItem('MonRep1',newData)
        //alert(newData)
    })
return (JSON.stringify(this.state.receivedData[0]))
    if(this.state.receivedData.length==0){
        return('No data')
    }

    Object.keys(this.state.receivedData).map(e=>{
        const {   remark,
            imguri1,
            date,
            mid,
            pid}=this.state.receivedData[e];
   //const  uploadResponse = await uploadImageAsync(imguri1,this.props.pid,this.props.mid);
//return alert(JSON.stringify(async()=>await(this._handleImagePicked(imguri1))))
   //const  uploadResposssssssssssssnse = await uploadImageAsync(imguri1,this.props.pid,this.props.mid);
   //const   uploadResponse =async()=> await uploadImageAsync(imguri1,this.props.pid,this.props.mid);
   //((this._handleImagePicked(imguri1)));

    //(async() =>await this._handleImagePicked(imguri1))()

})
}

handleSend=(e)=>{
    this._handlePick(this.state.pic1,e)
}
_handlePick = async (pickerResult,e) => {
    if(pickerResult==''){
      //  return alert('no image 1')
    }
  let uploadResponse, uploadResult, uploadResponse2, uploadResult2,uploadResponse3, uploadResult3,uploadResponse4, uploadResult4;

  try {
    this.setState({
        uploaded:'loading...',
        visible:true
    });
    if (pickerResult) {
   
     //  alert(pickerResult)
      uploadResponse = await uploadImageAsync(pickerResult,1,1);
      uploadResult = await uploadResponse.json();
    // alert(uploadResult[0].imgurl)
     if(uploadResult[0].imgurl!=null){
      //   return alert('1 done')
      this.setState({
                  imguri1:pickerResult,
                     uploaded:'done',
                     visible:false,
                     imgurl1:uploadResult[0].imgurl,
        image: uploadResult.location,
        imgurl1C:'done'
      });

      if(this.state.pic2){
          this.setState({
              uploaded:'loading...',
              visible:true
         })
          uploadResponse = await uploadImageAsync(this.state.pic2,1,1);
          uploadResult = await uploadResponse.json();
       //  alert(uploadResult[0].imgurl)
         if(uploadResult[0].imgurl!=null){
    //  return   alert('2 done')
          this.setState({
                      imguri:pickerResult,
                         uploaded:'done',
                         visible:false,
                         imgurl2:uploadResult[0].imgurl,
            image: uploadResult.location,
            imgurl2C:'done'
          });       
      }     

      }else{
          this.setState({
              imgurl2C:'done'
          })
      }
      if(this.state.pic3){
          this.setState({
              uploaded:'loading...',
              visible:true
         })
          uploadResponse= await uploadImageAsync(this.state.pic3,1,1);
          uploadResult = await uploadResponse.json();
        // alert(uploadResult[0].imgurl)
         if(uploadResult[0].imgurl!=null){
           //return alert('3 done')
          this.setState({
                      imguri3:pickerResult,
                         uploaded:'done',
                         visible:false,
                         imgurl3:uploadResult[0].imgurl,
            image: uploadResult.location,
            imgurl3C:'done'
          });
      }
  }else{
      this.setState({
          imgurl3C:'done'
      })
  }

//          alert(this.props.pid+' uid '+this.props.uid+' sumf'+this.state.summaryfrom+' st '+this.state.summaryto+' sum '+this.state.summary)

//Actions.home();
if(this.state.imgurl1C=='done' & this.state.imgurl2C=='done' & this.state.imgurl3C=='done'){
 const   {
        pid,title,lga,geo,mid,   setback,    cdate,    casing,    casedepth,    casingd,    casingr,    swl,
    yielda,    grout,    pumpd,    pumpt,    watera,   color,    taste,    odour,
    platformd,   shuttr, stability,    soakpit,    signpost,    cordinate,   pumps,    power,
    cable,    earth,    tankpvc,    tankc,    tankcap,    stanchion,    antirust,
    reticulated,    island,    fenced,    pic1,    pic2,    pic3,
    pic4,   visible,    imgurl1,    imgurl2,    imgurl3, gentime
    }= this.state
const data = {
    pid,title,lga,geo,mid,   setback,    cdate,    casing,    casedepth,    casingd,    casingr,    swl,
yielda,    grout,    pumpd,    pumpt,    watera,   color,    taste,    odour,
platformd,   shuttr, stability,    soakpit,    signpost,    cordinate,   pumps,    power,
cable,    earth,    tankpvc,    tankc,    tankcap,    stanchion,    antirust,
reticulated,    island,    fenced,    pic1,    pic2,    pic3,
pic4,   visible,    imgurl1,    imgurl2,    imgurl3, gentime
}
    axios.post('https://ruwassa.herokuapp.com/api/v1/monitorsreports/watereval', data)
    .then(res=>{
     //   this.createPDF();
     let oldData= this.state.receivedData
     oldData.splice(e,1)
     //alert(JSON.stringify(kkkh))
     let newData=JSON.stringify(oldData)
     AsyncStorage.setItem('MonRep1',newData);
     this.componentDidMount();
     //alert('deleted'+e)    
     
        alert('Sent')   
    }).catch(error=>{alert(error)}) 
    

//return alert(JSON.stringify(draftdata))
 // this.createPDF();
//alert('deleted'+e)    
}

  }else{
       
          this.setState({
              imguri:'k',
                 uploaded:'Check your network',
                 visible:false,
                 //imgurl:uploadResult[0].imgurl,
    image: uploadResult.location
  })
      }
    }else{this.setState({uploaded:'cancelled',visible:false})}
  } catch (e) {
  //  console.log({ uploadResponse });
   // console.log({ uploadResult });
    //console.log({ e });
    alert(e)
//      alert('Upload failed, sorry :(');
    this.setState({
      uploaded:'failed',
      visible:false
  });
  } finally {
    this.setState({
      uploading: false,
      visible:false
    });
  }
};


//end
}
async function uploadImageAsync(uri,a,b) {
    // (uri)
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
     
   

