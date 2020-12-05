import React from 'react';
import {Button,Keyboard,Image,Dimensions,KeyboardAvoidingView, ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import Geolo from '../geo'
//import RNPickerSelect from 'react-native-picker-select'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import ProgressLoader from 'rn-progress-loader' ;
import * as ImageManipulator from "expo-image-manipulator";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
 import * as Print from 'expo-print'
import * as MediaLibrary from 'expo-media-library'
import ruwasa from './ruwassa.png' ;
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Picker} from '@react-native-community/picker'



export default class DailyForm extends React.Component{
constructor(props){
    super(props)
    this.state={
            gps:'',
            summary:'',
            summaryfrom:'',
            summaryto: '',
            pStatus:'',
            siteStatus:'ongoing',
            activity:'',
            outcome:'',
            date:'',
            image: null,
        file:'',
        type:'',
        imguri:'kk',
        imguri2:'',
        uploading: false,
        uploaded:'',
        uploadedimg:'',
        imgurl:'',
        imgurl2:'',
        compliance:'',
        followup:'',
        conclusion:'',
        visible: false,
        thirdparty:'',
        thirdname:'',
        thirdview:'none',
        imgurlC:'',
        imgurl2C:'',
        title:'',
        uname:'',
        phone:'',
        email:'',
        thirdremark:'',
        hpbhdisplay:'none',
        Solardisplay:'none',
        sandisplay:'none',
        gendispaly: 'flex'
    }

    this.createPDF=this.createPDF.bind(this)

}

handleConclusion=(text)=>{
    this.setState({
        conclusion: text
    })
}

handleFollowup=(text)=>{
    this.setState({
        followup: text
    })
}
handleCompliance=(text)=>{
    this.setState({
        compliance: text
    })
}

handleDateChange=(text)=>{
    this.setState({date:text})
}
handleActivityChange=(text)=>{
    this.setState({activity:text})
}
handleOutcomeChange=(text)=>{
    this.setState({outcome:text})
}

    handleGps=(gps)=>{
        this.setState({
            gps
        })
    }

    handleSummary=(text)=>{
        this.setState({
            summary: text
        })
    }
    handleSummaryfrom=(text)=>{
        this.setState({
            summaryfrom: text
        })}
    handleSummaryto=(text)=>{
        this.setState({
            summaryto: text
        })}
    handleConclusion=(text)=>{
        this.setState({
            conclusion: text
        })
    }
    
    handleFollowup=(text)=>{
        this.setState({
            followup: text
        })
    }
    handleCompliance=(text)=>{
        this.setState({
            compliance: text
        })
    }
    handleStatus=(value)=>{
        //      alert(value)
              this.setState({
                  siteStatus:value
               })
           }

           handleStage=(value)=>{
            //    alert(value)
                this.setState({
                    pStatus:value
                })
            }
            handleThird=(value)=>{
                this.setState({
                    thirdparty: value
                })
                if(value=='yes'){
                    this.setState({
                        thirdview: 'flex'
                    })
                }else{
                    this.setState({
                        thirdview: 'none'
                    })
                }
            }
            componentDidMount(){
         const {params} =  this.props.route


if(params.title=='Force Lift'){
    this.setState({
        hpbhdisplay:'flex',
        Solardisplay: 'none',
        sandisplay: 'none',
        gendispaly:'none'

    })
}else if(params.title=='Motorized Solar Borehole'){
    this.setState({
        hpbhdisplay:'none',
        Solardisplay: 'flex',
        sandisplay: 'none',
        gendispaly:'none'

    })
}else if(params.title=='Sanitation'){
    this.setState({
        hpbhdisplay:'none',
        Solardisplay: 'none',
        sandisplay: 'flex',
        gendispaly:'none'

    })
}else if(params.title=='Community Borehole'){
    this.setState({
        hpbhdisplay:'flex',
        Solardisplay: 'none',
        sandisplay: 'none',
        gendispaly:'none'

    })
}
else{
    this.setState({
        gendispaly:'flex'
    })
}

//     this.getPermissionAsync();
           AsyncStorage.getItem('uname').then(val=>{
                this.setState({
                    uname: val.replace(/[^a-zA-Z]/g,"")
                })
           })
           AsyncStorage.getItem('email').then(val=>{
            this.setState({
                email: val.replace(/[^a-zA-Z]/g,"")
            })
       })
       AsyncStorage.getItem('phone').then(val=>{
        this.setState({
            phone: val.replace(/[^a-zA-Z]/g,"")
        })
   })
             
            }

            async createPDF () {
                const {params} =  this.props.route
                try{   
                   let options = {
                     html: `<HTML>
                     <head>
                            <style>
                                table,th,td {border: 1px solid black}
                                table{border-collapse: collapse;}
                            </style>
                        </head>
                    <img src=${ruwasa}></img><img style='width:60px; margin-left:150; margin-right:150px'  src=${ruwasa}></img><img style='width:60px;' src='uk.png'></img>
                            <div style="margin-left:15%;text-align:'right'">
                    <b>KADUNA FIELD OFFICE: WASH DAILY PROGRESS REPORT</b>
                    </div>
                    <table style='width:90%'>
                    <thead>
                    <tr>
                    <th colspan=6>NAME: ${params.title}</th></tr>
                    </thead>
                    <tbody>
                    <tr>
                    <td> <b>LGA:</b>${params.lga}</td><td><b>Contractor: </b>${params.company}</td>
                    <td><b>Lot No:</b>${params.lot}</td><td colspan=3><b>Date</b> ${new Date()}<br/>GPS ${this.state.gps}</td>
                    </tr>
                    <tr>
                    <td> <b>Date:</b></td><td colspan=3><b>Activity</b></td><td colspan=2><b>Output/Outcome</b></td>
                    </tr>
                    <tr>
                    <td>${this.state.date} </td>${this.state.activity}<td colspan=3></td>
                    <td colspan=2>${this.state.outcome}</td>
                    </tr>
                   
                    <tr>
                    <td colspan=3> <img width='150' height='150' src=${this.state.imguri}></img></td>
                    <td colspan=3><img width='150' height='150' src=${this.state.imguri2}></img></td>
                    </tr>
                    <tr>
                    <td colspan=6> <b>Is work progressing according to plan?</b>${this.state.compliance}</td>
                    </tr>
                    <tr>
                    <td colspan=6><b>Is third party consultant on site?</b> ${this.state.thirdparty+' '+ this.state.thirdname}</td>
                    </tr>
                    <tr>
                    <td colspan=6><b>Remark by by third party</b> ${this.state.thirdremark}</td>
                    </tr>
                    <tr>
                    <td colspan=6><b>Conclusion and recommendation:</b> ${ this.state.conclusion}</td>
                    </tr>
                    <tr>
                    <td colspan=6><b>Name of Supervisor:</b> ${this.state.uname} <br/><b>Report generated on:</b> ${ new Date()}<br/>
                    <b>Phone: ${ this.state.phone}</b><b> Email: ${ this.state.email} </b>
                    </td>
                    </tr>                  
                    
                    
                        </tbody>
                    </table>
                    
                    </body>
                    </HTML>
      `,
      fileName: 'test',
      directory: 'Documents',
    };
 
    //let file = await RNHTMLtoPDF.convert(options)
    let file = await Print.printToFileAsync(options)
      const permission = await MediaLibrary.requestPermissionsAsync();
      if(permission.granted){
       // await MediaLibrary.createAssetAsync(file.uri)
        let myfile= await MediaLibrary.createAssetAsync(file.uri,'jiy')
        //  alert(myfile.uri)
          await MediaLibrary.createAlbumAsync('ruwassa reports',myfile)
      }
    // console.log(file.filePath);
  // alert(file.uri);
  
}catch(e){
  alert(e)
}
}

            handleSaveToDraft= async()=>{
                const {params} =  this.props.route

               /* alert('gps '+this.state.gps+' Statge' +this.state.pStatus+' site '+ this.state.siteStatus+' from '+this.state.summaryfrom+' summaryto '+this.state.summaryto+
                ' summary '+this.state.summary+' acti '+ this.state.activity+ ' date '+this.state.date+' outcome '+ this.state.outcome+' uri'+
                this.state.imguri+' pid '+this.props.pid+' uid '+this.props.uid+' coclusion '+this.state.conclusion+' followup '+ this.state.followup+' compliance '+
                this.state.compliance)
                */
             //  return alert(this.state.imguri2)
                if(this.state.uploadedimg !='done'){
               alert('you did not take photo')
           }else if(this.state.gps==''){
                alert('please turn on your gps')
           }else if(this.state.pStatus==''){
            alert('please select project stage')
       }
           else{
                const draft={
                    gps:this.state.gps,
                    stage: this.state.pStatus,
                    status:this.state.siteStatus,
                    summaryfrom: this.state.summaryfrom,
                    summaryto: this.state.summaryto,
                    summary: this.state.summary,
                    activity: this.state.activity,
                    date: this.state.date,
                    outcome:this.state.outcome,
                    uri: this.state.imguri,
                    pid: params.pid,
                    uid: params.uid,
                    conclusion:this.state.conclusion,
                    followup:this.state.followup,
                    compliance: this.state.compliance,
                    uri2: this.state.imguri2,
                    thirdname: this.state.thirdname,
                    thirdparty: this.state.thirdparty,
                    thirdremark: this.state.thirdremark
                }


//imm doing this to beat time
AsyncStorage.getItem('1').then((val1)=>{
  //  alert('val1 '+val1)
    if(val1=='empty'||val1==null){
      //  alert('val1 '+val1)
        AsyncStorage.setItem('1',JSON.stringify(draft))
        AsyncStorage.setItem('draftrec1','this.props.pid')
    }
    else {
        AsyncStorage.getItem('2').then(val2=>{
            if(val2=='empty'||val2==null){
                AsyncStorage.setItem('2',JSON.stringify(draft))
                AsyncStorage.setItem('draftrec2','this.props.pid')

            }else{
                
                AsyncStorage.getItem('3').then(val3=>{
                    if(val3=='empty'||val3==null){
                        AsyncStorage.setItem('3',JSON.stringify(draft))
                        AsyncStorage.setItem('draftrec3','this.props.pid')
                    }else{
                        AsyncStorage.getItem('4').then(val4=>{
                            if(val4=='empty'||val4==null){
                                AsyncStorage.setItem('4',JSON.stringify(draft))
                                AsyncStorage.setItem('draftrec4','this.props.pid')
                            }else{
                                AsyncStorage.getItem('5').then(val5=>{
                                    if(val5=='empty'||val5==null){
                                        AsyncStorage.setItem('5',JSON.stringify(draft))
                                        AsyncStorage.setItem('draftrec5','this.props.pid')
                                    }else{
                                        alert('draft is full')
                                    }
                                })
                            }
                        })
                   
                   
                    }
                })
            
            }
        
        })

    }
})
this.createPDF()
alert('Saved in draft, pdf has been saved in document')
this.props.navigation.navigate('Supervision');

           }
          
   }

  
                   
    render(){
        let facility=['Community Borehole', 'Motorized Solar Borehole', 'Force Lift', 'Sanitation']

        return(
            <ScrollView >

    <View >
        <View><Geolo onGps={this.handleGps}/></View>
    <View style={styles.header}>
{/*
        <View><Text style={styles.txt1}>LGA:{this.state.data.lga}</Text></View>
        <View><Text style={styles.txt1} >Contractor:{this.state.data.contractor}</Text></View>      
        <View><Text style={styles.txt1}>LOT:{this.state.data.lot}</Text></View>
        <View><Text style={styles.txt1}>Supervisor Id: {this.props.uid}</Text></View>
        <View><Text style={styles.txt1}>Stage: {this.state.pStatus}</Text></View>
*/
}
    </View>



<View style={{display: this.state.gendispaly}}>
     <Text style={styles.txtstatus}>Project Stage</Text>
     <Picker style={{borderWidth:4,borderColor:'gray', height: 50, width: 150}}
  selectedValue = {this.state.pStatus}  onValueChange={this.handleStage}>

<Picker.Item label='Taking Over Site' value='TOS'/>
<Picker.Item label='Geophysical Survey (Water) ' value='GS'/>
<Picker.Item label='Drilling (Water) ' value='Drilling'/>
<Picker.Item label='Excavation (VIP)' value='Excavation'/>
<Picker.Item label='Sub-Structure (VIP) ' value='SubS' />
<Picker.Item label='Super-Structure (VIP) ' value='SuperS' />
<Picker.Item label='Fittings and Finishing (VIP) ' value='Finishing'/>
<Picker.Item label='Painting (VIP) ' value='artwork'/>
<Picker.Item label='Pumping Test (Water)' value='PT' />
<Picker.Item label='Pump Installation (Water)' value='PI'/>
<Picker.Item label='Platforming (Water)' value='Platforming'/>
<Picker.Item label='Foundation for Stanchion (Solar)' value= 'FS'/>
<Picker.Item label='Erection of Stanchion (Solar)' value='ES' />
<Picker.Item label='Installation of Solar Pump/Panel ' value='ISP'/>
<Picker.Item label='Reticulation (Solar)'value='Reticulation'/>
<Picker.Item label='Platforming and Installation' value='Platforming2'/>
<Picker.Item label='Platforming,Installation & Signboard' value='CR'/>
<Picker.Item label='Installation of Solar Security Light ' value='ISP'/>
<Picker.Item label='Sign Board ' value='CR'/>  
<Picker.Item label='Hand Over' value='FR'/> 
<Picker.Item label='Final on from site' value='FR'/>
           </Picker>
</View>
    
    <View >

    <View style={{display:this.state.hpbhdisplay}}>
         <Text style={styles.txtstatus}>Project Stage</Text>
         <Picker style={{borderWidth:4,borderColor:'gray', height: 50, width: 150}}
  selectedValue = {this.state.stage}  onValueChange={this.handleStage}>
    <Picker.Item label='Taking Over Site'  value='TOS'/>
      <Picker.Item label='Geophysical Survey ' value='GS'/>
      <Picker.Item label='Drilling ' value='Drilling'/>
      <Picker.Item label='Pumping Test' value='PT'/>
      <Picker.Item label='Pump Installation ' value='PI'/>
      <Picker.Item label='Platforming' value='Platforming'/>
      <Picker.Item label='Platforming and Installation' value='Platforming2'/>
      <Picker.Item label='Platforming,Installation & Signboard' value='CR'/>
      <Picker.Item label='Hand Over' value='FR'/> 
      <Picker.Item label='Final on from site' value='FR'/>     
    </Picker>
    </View>
    
<View style={{display:this.state.Solardisplay}}>
         <Text style={styles.txtstatus}>Project Stage</Text>
         <Picker style={{borderWidth:4,borderColor:'gray', height: 50, width: 150}}
  selectedValue = {this.state.stage}  onValueChange={this.handleStage}>
    <Picker.Item label='Taking Over Site'  value='TOS'/>
    <Picker.Item label='Geophysical Survey ' value='GS'/>
    <Picker.Item label='Drilling  ' value='Drilling'/>
    <Picker.Item label='Pumping Test ' value='PT'/>
    <Picker.Item label='Foundation for Stanchion  ' value='FS'/>
    <Picker.Item label='Erection of Stanchion ' value='ES'/>
    <Picker.Item label='Installation of Solar Pump/Panel ' value='ISP'/>
    <Picker.Item label='Reticulation ' value='Reticulation'/>
    <Picker.Item label='Tap Island ' value='Reticulation'/>
    <Picker.Item label='Installation of Solar Security Light ' value='ISP'/>
    <Picker.Item label='Sign Board ' value='CR'/>  

    <Picker.Item label='Hand Over' value='FR'/> 
    <Picker.Item  label='Final on from site' value='FR'/>      
   </Picker>
    </View>
    

<View style={{display:this.state.sandisplay}}>
<Picker style={{borderWidth:4,borderColor:'gray', height: 50, width: 150}}
  selectedValue = {this.state.stage}  onValueChange={this.handleStage}>
    <Picker.Item label='Taking Over Site'  value='TOS'/>
      <Picker.Item label='Excavation ' value='Excavation'/>
      <Picker.Item label='Sub-Structure  ' value='SubS'/>
      <Picker.Item label='Super-Structure' value='SuperS'/>
      <Picker.Item label='Fittings and Finishing ' value='Finishing'/>
      <Picker.Item label='Painting ' value='artwork'/>  
      <Picker.Item label='Sign Board ' value='CR'/>  

      <Picker.Item label='Hand Over' value='FR'/> 
      <Picker.Item label='Final on from site' value='FR'/>    
</Picker>

     </View>

     <View>
   {/*}      <Text style={styles.txtstatus}>Project Status</Text>
     <RNPickerSelect style={{color:'red'}} onValueChange={this.handleStatus}
    items={[
        {label:'Ongoin',  value:'ongoing'},
        {label:'Completed ', value:'completed'},
        {label:'Abandoned ', value:'abandoned'}         
    ]}
    />
*/}
     </View>
{/*
        <View>
     <Text  style={styles.txt}>Summary of planned activities for the week</Text>
     </View>
     
     <KeyboardAvoidingView behavior='padding' enabled keyboardVerticalOffset={0} >
     <View style={styles.row}>
     <View style={styles.rowdate}>
     < TextInput placeholder='Date From dd/mm/yyyy'  value={this.state.summaryfrom}
      onChangeText={this.handleSummaryfrom} style={styles.box}/>
     </View>
     <View style={styles.rowdate}>
     < TextInput placeholder='Date To dd/mm/yyyy' value={this.state.summaryto} onChangeText={this.handleSummaryto}
      style={styles.box}/>
     </View>
     </View>
     </KeyboardAvoidingView>
     <KeyboardAvoidingView behavior='padding' enabled keyboardVerticalOffset={0}>
     <View>
         <TextInput multiline maxLength={200} placeholder='Summary' value={this.state.summary} onChangeText={this.handleSummary} 
         style={styles.box1} required />
     </View>
     </KeyboardAvoidingView  >*/
     }

      </View>
      
   {/*   
      <View style={styles.btnview}>
          <TouchableOpacity onPress={this.handledraft} style={styles.updbtn}><Text style={styles.btntxt}>Save as draft</Text></TouchableOpacity>
      </View>
*/
   }
    </View>
    <Text style={styles.txt}>Date</Text>
                <TextInput onChangeText={this.handleDateChange} value={this.state.date} style={styles.box} placeholder='dd/mm/yyyy'/>
    
                <Text style={styles.txt}>Activity</Text>
                <TextInput onChangeText={this.handleActivityChange} value={this.state.activity} multiline maxLength={150} style={styles.box1} placeholder=''/>
             
                <Text style={styles.txt}>Outcome</Text>
                <TextInput onChangeText={this.handleOutcomeChange} value={this.state.outcome} multiline maxLength={150} style={styles.box1} placeholder=''/>
       <View>
       <Button
          onPress={this._takePhoto}
          title="Take Photo"
        />
 <ProgressLoader visible={this.state.visible} isModal={true} isHUD={true}
            hudColor={"#000000"} color={"#FFFFFF"}/>
<View style={styles.row}>
        <Text>Status: {this.state.uploaded}</Text>
         <Image source={{uri: this.state.imguri}}
       style={{width: 150, height: 150}} />
        <Image source={{uri: this.state.imguri2}}
       style={{width: 150, height: 150}} />
</View>
       </View>
       
      

       <View>
             <Text style={styles.txt}>Conclusion and Recommendation</Text>
        <View style={styles.row}>
             <TextInput multiline placeholder='Conclusion' value={this.state.conclusion} onChangeText={this.handleConclusion} 
             style={styles.box1}/>
         </View>
         </View>
{/*
         <View>
             <Text style={styles.txt}>Planned Follow-up activities for next week</Text>
        <View style={styles.row}>
             <TextInput placeholder='Follow up' value={this.state.followup} onChangeText={this.handleFollowup} 
             style={styles.box1}/>
         </View>
         </View>
*/
}
         <View>
             <Text style={styles.txt}>Is work Progressing according to submitted plan?</Text>
        <View style={styles.row}>
             <TextInput placeholder='Compliance' value={this.state.compliance} onChangeText={this.handleCompliance} 
             style={styles.box1}/>
         </View>
         </View>
     
         <Text>Is third party on site?</Text>
               <RadioForm 
        radio_props={[{label: 'yes', value:'yes'},
        {label: 'no', value:'no'}          
        ]}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={true}
        onPress={this.handleThird}
        />
        <View style={{display:this.state.thirdview}}>
        <TextInput placeholder='Name of third party officer' value={this.state.thirdname} onChangeText={(value)=>this.setState({thirdname:value})} 
             style={styles.box1}/>
             <View style={styles.row}>
             <TextInput placeholder='Remark by third party' value={this.state.thirdremark} onChangeText={(value)=>{this.setState({thirdremark:value})}} 
             style={styles.box1}/>
         </View>

<Button
          onPress={this._takePhoto2}
          title="Capture third party"
        />
        </View>

<View style={styles.row}>
<Text>   {this.state.uploaded}</Text>

      <View style={styles.btnview}>
          <TouchableOpacity onPress={this.handleSaveToDraft} style={styles.updbtn}><Text style={styles.btntxt}>Save to Draft</Text></TouchableOpacity>
      </View>

<View >
      <View style={styles.btnview}>
          <TouchableOpacity onPress={this.handleSend} style={styles.updbtn}><Text style={styles.btntxt}>Send Report</Text></TouchableOpacity>
      </View>

</View>
</View>


    <View style={{height:60}}/>
    </ScrollView>

        )
    }

    _takePhoto = async () => {
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
        
        this._handleImagePicked(pickerResult);
      //this._handleImagePicked();
        }
      };

      _takePhoto2 = async () => {
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
    
          this._handleImagePicked2(pickerResult);
        }
      };

      _CompressImg = async (a) => {
        const manipResult = await ImageManipulator.manipulateAsync(
          a,
          [{ rotate: 0 }],
          { compress: 0.1, format: ImageManipulator.SaveFormat.jpeg },
        );
     //   alert(manipResult.uri);
     let myfile= await MediaLibrary.createAssetAsync(manipResult.uri,'jiy')
     //  alert(myfile.uri)
     // await MediaLibrary.createAlbumAsync('ruwassa reports/.images',myfile)

        this.setState({
            //uri:manipResult.uri
        })
        return myfile.uri
      };

      


      _handleImagePicked = async pickerResult => {
      
        try {
          this.setState({
              uploaded:'',
              visible:false
          });
    
          if (!pickerResult.cancelled) {
           //   alert(pickerResult.uri)
            const manipResult = await this._CompressImg(pickerResult.uri)

this.setState({
    imguri:manipResult,
    uploadedimg:'done',
    visible:false
})

          }else{this.setState({uploaded:'cancelled'})}
        } catch (e) {
          console.log({ uploadResponse });
          console.log({ uploadResult });
          console.log({ e });
          alert('Upload failed, sorry :(');
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

      _handleImagePicked2 = async pickerResult => {
      
        try {
          this.setState({
              uploaded:'',
              visible:false
          });
    
          if (!pickerResult.cancelled) {
            const manipResult = await this._CompressImg(pickerResult.uri)

this.setState({
    imguri2:manipResult,
    uploadedimg:'done',
    visible:false
})

          }else{this.setState({uploaded:'cancelled'})}
        } catch (e) {
          console.log({ uploadResponse });
          console.log({ uploadResult });
          console.log({ e });
          alert('Upload failed, sorry :(');
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

      handleSend=async()=>{
        //alert(this.state.imguri)
        const {params} =  this.props.route
        //return alert(params.uid)
        axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+params.uid)
        .then(res=>{
                if (res.data[0].active=='active'){
                    if(this.state.uploadedimg !='done'){
                        alert('You did not take photo')
                    }
                    else if(this.state.gps==''){
                        alert('please turn on your gps')
                    }
                    else if(this.state.pStatus==''){
                        alert('please select project stage')
                    }
                    else{
                    this._handleImagePicked1(this.state.imguri)
                    }
                }else{
                    AsyncStorage.setItem('login','denied');
                    alert('you dont have access')
                    this.props.navigation.navigate('Login');
                }
        }).catch(error=>{alert(error.message)})
            
      }

      _handleImagePicked1 = async pickerResult => {
        let uploadResponse, uploadResult;
        const {params} =  this.props.route
    
        try {
          this.setState({
              uploaded:'loading...',
              visible:true
          });
          if (pickerResult) {
           //  alert(pickerResult)
            uploadResponse = await uploadImageAsync(pickerResult,params.pid,params.uid);
            uploadResult = await uploadResponse.json();
          // alert(uploadResult[0].imgurl)
           if(uploadResult[0].imgurl!=null){
               
            this.setState({
                        imguri:pickerResult,
                           uploaded:'done',
                           visible:false,
                           imgurl:uploadResult[0].imgurl,
              image: uploadResult.location,
              imgurlC:'done'
            });

if(this.state.imguri2){
let uploadResponse2, uploadResult2
    uploadResponse = await uploadImageAsync(this.state.imguri2,1,1);
    uploadResult = await uploadResponse.json();
  // alert(uploadResult[0].imgurl)
   if(uploadResult[0].imgurl!=null){
//       alert(uploadResult[0].imgurl)
    this.setState({
              //  imguri:pickerResult,
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

if(this.state.imgurlC=='done' & this.state.imgurl2C=='done'){
  //          alert(this.props.pid+' uid '+this.props.uid+' sumf'+this.state.summaryfrom+' st '+this.state.summaryto+' sum '+this.state.summary)
  this.setState({
      visible:true
  })    
 // let {params} = this.props.route

  const data={
            pid: params.pid,
            uid: params.uid,
            summaryfrom: this.state.summaryfrom,
            summaryto: this.state.summaryto,
            summary: this.state.summary,
            conclusion: this.state.conclusion,
            followup:this.state.followup,
            compliance: this.state.compliance,
            pstatus: this.state.pStatus,
            sitestatus: this.state.siteStatus,
            sitegps: this.state.gps,
            imgurl: this.state.imgurl,
            gps:this.state.gps,
            activity: this.state.activity,
            activitydate: this.state.date,
            activityoutcome: this.state.outcome,
            imgurl2: this.state.imgurl2,
            thirdname: this.state.thirdname,
            thirdparty: this.state.thirdparty,
            thirdremark: this.state.thirdremark
        }
        axios.post('https://ruwassa.herokuapp.com/api/v1/reports',data)
.then(res=>{//alert('sent')
//    AsyncStorage.setItem(this.props.draft,'empty');
  //  AsyncStorage.setItem('draftrec'+this.props.draft,'empty'
  const obj2={
    pstatus:this.state.pStatus,
    sitegps: this.state.gps,
    sitestatus: this.state.siteStatus
}
axios.put('https://ruwassa.herokuapp.com/api/v1/projects/pstatus/'+params.pid,obj2)
    .then(res1=>{
        this.createPDF()
        this.setState({
            visible:false
        })   
       alert('Sent, pdf has been saved in document')  
       this.props.navigation.navigate('Supervision');
      

    }).catch(error=>{
        this.setState({
            visible:false
        })   
        alert('err '+error.message)})
        this.props.navigation.navigate('Supervision');
    }
)
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
    box3:{
        margin:10,
        height:60,
        borderColor: 'grey',
        borderWidth:5,
        borderBottomWidth:2,
        width:'50%',
        marginRight:20,
        display:'flex',
        borderRadius:4,
        color:'red'
    },
    txt:{
      fontSize:20,
      marginTop:15,
      marginLeft:5,
      marginRight:2
    },
    txt1:{
        fontSize:15,
        marginTop:15,
        marginLeft:5,
        marginRight:2
      },
    txtstatus:{
        fontSize:20,
        marginTop:15,
        marginLeft:5,
        marginRight:2,
        alignItems:'center',
        alignSelf:'center'
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
        height:50,
        margin:5
    },
    btnview:{
        flexDirection:'column',
        alignItems:'center',
        marginTop:50
    },
    btntxt:{
        color:'white',
        textAlign:'center',
        fontSize:20
    },
    img:{
        backgroundColor:"#00b1b0",
        margin:1
    },
    head:{
        flexDirection:'column',
        flex:1,
        alignItems:'flex-start',
        alignContent:'flex-start',
    }

})