import React from 'react';
import {Button,TextInput,Image,  View, Text,TouchableOpacity, StyleSheet,ScrollView, KeyboardAvoidingView} from 'react-native';
//import {Actions} from 'react-native-router-flux';
import axios from 'axios';
//import Constants from 'expo-constants';
//import * as Permissions from 'expo-permissions';
import ProgressLoader from 'rn-progress-loader';
//import ImageResizer from 'react-native-image-resizer'
//import { Asset } from "expo-asset";
//import * as ImageManipulator from "expo-image-manipulator";
import {Table, Row,Rows} from 'react-native-table-component'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class GenRepDraft extends React.Component{
    constructor(props){
        super(props)
        this.state={
            tableview:'none',
            tableHead: ['Title','LGA','Image'],
            norecord: '',
            receivedData:'',
            functionality:'',
            problem:'',
            problemduration:'',
            remark:'',
            cause:'',
            setback:'',
      structure:'',
      cdate:'',
      usage:'',
      restoration:'',
      distance:'',
      area:'',
      pitarea:'',
      compartment:'',
      urinals:'',
      nourinals:'',
      tiled: '',
      laterinet: '',
      tilequality: '',
        tilec:'',
      nobasins:'',
      washbasins:'',
      physicallyaid:'',
      door:'',
      gauge:'',
      antirust:'',
      subs:'',
      slabs:'',
      pit:'',
      crack:'',
      crackt: '',
      defect: '',
      sdefect: '',
      rendered:'',
      sandblast: '',
      artwork: '',
      tank: '',
      tankembeded: '',
      tankcap: '',
      tankc: '',
      soakpit: '',
      urinalpit:'',
      pic1:'',
      pic2:'',
      pic3:'',
      pic4:'',
      imgurl1:'',
      imgurl2:'',
      imgurl3:'',
      imgurl4:'',      
      imgurl1C:'',
      imgurl2C:'',
      imgurl3C:'',
      imgurl4C:'',
            visible:false,
            cordinate:''
        }
    }

componentDidMount=()=>{
    AsyncStorage.getItem('GenRep').then(val=>{
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

/*handlesend=()=>{
    if(this.state.receivedData.length==0){
        return('No data')
    }

    Object.keys(this.state.receivedData).map(e=>{
        const {pid,community, title,lga,mid, mon,
            setback, structure,cdate,usage,restoration,distance,
            area, pitarea,compartment,urinals,nourinals,tiled,laterinet,
            tilequality,  tilec,nobasins,washbasins,physicallyaid,door,gauge,antirust,
            subs,slabs,pit,crack,crackt,defect,sdefect,rendered,sandblast,artwork,
            tank,tankembeded,tankcap,tankc,soakpit,urinalpit,pic1,pic2,pic3,pic4,imgurl1,
            imgurl2,imgurl3,imgurl4} = this.state.receivedData[e];
   //const  uploadResponse = await uploadImageAsync(imguri1,this.props.pid,this.props.mid);
//return alert(JSON.stringify(async()=>await(this._handleImagePicked(imguri1))))
   //const  uploadResposssssssssssssnse = await uploadImageAsync(imguri1,this.props.pid,this.props.mid);
   //const   uploadResponse =async()=> await uploadImageAsync(imguri1,this.props.pid,this.props.mid);
   //return alert(JSON.stringify(this._handleImagePicked(imguri1)));

   //return alert(JSON.stringify(uploadResponse))
const data = {pid,community, title,lga,mid, mon,
    setback, structure,cdate,usage,restoration,distance,
    area, pitarea,compartment,urinals,nourinals,tiled,laterinet,
    tilequality,  tilec,nobasins,washbasins,physicallyaid,door,gauge,antirust,
    subs,slabs,pit,crack,crackt,defect,sdefect,rendered,sandblast,artwork,
    tank,tankembeded,tankcap,tankc,soakpit,urinalpit,pic1,pic2,pic3,pic4,imgurl1,
    imgurl2,imgurl3,imgurl4
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
  />,<TouchableOpacity onPress={()=>this.handleGo1(i)} style={{height:'30%', backgroundColor:'green'}}><Text>{'Send'}</Text></TouchableOpacity> ]))
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
    const {pid,community, title,lga,mid, mon,
        functionality,problem,problemduration,remark,cause,
        setback, structure,cdate,usage,restoration,distance,
        area, pitarea,compartment,urinals,nourinals,tiled,laterinet,
        tilequality,  tilec,nobasins,washbasins,physicallyaid,door,gauge,antirust,
        subs,slabs,pit,crack,crackt,defect,sdefect,rendered,sandblast,artwork,
        tank,tankembeded,tankcap,tankc,soakpit,urinalpit,pic1,pic2,pic3,pic4,imgurl1,
        imgurl2,imgurl3,imgurl4, gentime, cordinate} = this.state.receivedData[e];
//co
 await      this.setState({
    pid,community, title,lga,mid, mon,
    functionality,problem,problemduration,remark,cause,
    setback, structure,cdate,usage,restoration,distance,
    area, pitarea,compartment,urinals,nourinals,tiled,laterinet,
    tilequality,  tilec,nobasins,washbasins,physicallyaid,door,gauge,antirust,
    subs,slabs,pit,crack,crackt,defect,sdefect,rendered,sandblast,artwork,
    tank,tankembeded,tankcap,tankc,soakpit,urinalpit,pic1,pic2,pic3,pic4,imgurl1,
    imgurl2,imgurl3,imgurl4, gentime, cordinate
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
  if(this.state.pic4){
    this.setState({
        uploaded:'loading...',
        visible:true
   })
    uploadResponse= await uploadImageAsync(this.state.pic4,1,1);
    uploadResult = await uploadResponse.json();
  // alert(uploadResult[0].imgurl)
   if(uploadResult[0].imgurl!=null){
     //return alert('3 done')
    this.setState({
                imguri4:pickerResult,
                   uploaded:'done',
                   visible:false,
                   imgurl4:uploadResult[0].imgurl,
      image: uploadResult.location,
      imgurl4C:'done'
    });
}
}else{
this.setState({
    imgurl4C:'done'
})
}

//          alert(this.props.pid+' uid '+this.props.uid+' sumf'+this.state.summaryfrom+' st '+this.state.summaryto+' sum '+this.state.summary)

//Actions.home();
if(this.state.imgurl1C=='done' & this.state.imgurl2C=='done' & this.state.imgurl3C=='done' & this.state.imgurl4C=='done'){
 const {
    pid,community, title,lga,mid, mon,
    functionality,problem,problemduration,remark,cause,
    setback, structure,cdate,usage,restoration,distance,
    area, pitarea,compartment,urinals,nourinals,tiled,laterinet,
    tilequality,  tilec,nobasins,washbasins,physicallyaid,door,gauge,antirust,
    subs,slabs,pit,crack,crackt,defect,sdefect,rendered,sandblast,artwork,
    tank,tankembeded,tankcap,tankc,soakpit,urinalpit,imgurl1,
    imgurl2,imgurl3,imgurl4, gentime, cordinate
        } =this.state
        const data = {
            pid,community, title,lga,mid, mon,
            functionality,problem,problemduration,remark,cause,
            setback, structure,cdate,usage,restoration,distance,
            area, pitarea,compartment,urinals,nourinals,tiled,laterinet,
            tilequality,  tilec,nobasins,washbasins,physicallyaid,door,gauge,antirust,
            subs,slabs,pit,crack,crackt,defect,sdefect,rendered,sandblast,artwork,
            tank,tankembeded,tankcap,tankc,soakpit,urinalpit,imgurl1,
            imgurl2,imgurl3,imgurl4, gentime,cordinate
                }
//return alert(JSON.stringify(draftdata))
 // this.createPDF();
 axios.post('https://ruwassa.herokuapp.com/api/v1/reports/followupreports', data)
.then(res=>{
 //   this.createPDF();
 let oldData= this.state.receivedData
 oldData.splice(e,1)
 //alert(JSON.stringify(kkkh))
 let newData=JSON.stringify(oldData)
 AsyncStorage.setItem('GenRep',newData);
 this.componentDidMount();
 //alert('deleted'+e)    
 
    alert('Sent')   
}).catch(error=>{alert(error)}) 

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
     
   

