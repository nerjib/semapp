import React, { Component } from 'react';
 
import {
  Text,
  TouchableHighlight,
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Picker} from '@react-native-community/picker'
//import { WebView} from 'react-native-webview'
 import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
//import RNHTMLtoPDF from 'react-native-html-to-pdf';
 import * as Print from 'expo-print'
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import ProgressLoader from 'rn-progress-loader'
import * as ImageManipulator from "expo-image-manipulator";
import axios from 'axios';
import Geolo from  '../geo'


const radio_props = [
  {label: 'yes', value:'yes'},
  {label: 'no', value:'no'}
]
const radio_props2 = [
  {label: 'Indian Mark II', value:'Indian Mark II'},
  {label: 'Indian Mark III', value:'Indian Mark III'},
  {label: 'Afridev', value:'Afridev'},
  {label: 'Grundfos (SQflex+CU200)', value:'Grundfos'},
  {label: 'others', value:'others'}


]

const radio_props3 = [
    {label: 'Solar', value:'Solar'},
    {label: 'Windmill', value:'Windmill'},
    {label: 'Generator', value:'Generator'},
    {label: 'Public Power Supply', value:'Public Power Supply'}
  
  ]
  const radio_props4 = [
    {label: 'Yes to specification', value:'Yes to specification'},
    {label: 'Yes not to specificaton', value:'Yes not to specification'},
    {label: 'No', value:'No'}  
  ]
  const radio_props5 = [
    {label: 'Black', value:'Black'},
    {label: 'Blue', value:'Blue'},
    {label: 'Red', value:'red'},
    {label: 'green', value:'green'},
    {label: 'yellow', value:'yellow'},
    {label: 'white', value:'white'}

  ]
  
  
  
export default class SMBH extends Component {
  constructor(props){
    super(props)
    this.state={
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
      pumps:'Grundfos',
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
      imgurl1C:'',
      imgurl2C:'',
      imgurl3C:'',
      gentime:'',
      otheroption:'',
      otherstyle:'none'

    }
    
    this.createPDF=this.createPDF.bind(this)
  }
  async createPDF () {
      const {params} = this.props.route
 try{   
    let options = {
      html: `<html>
      <head>
          <style>
              table,th,td {border: 1px solid black}
              table{border-collapse: collapse;}
              img {width:10px, height:10px}
          </style>
      </head>
      <body>
      <div style="margin-left:15%;text-align:'right'"><b>(VERIFICATION) SMBH FACILITY FORM</b></div>
      <div><b>General</b></div>
           <table style="width:90%">
              <thead>
                  <tr>
                      <th style="width:5%" >SN</th><th style="width:40%">Description</th><th>Site Information</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>1</td><td>State</td><td>Kaduna</td>
                  </tr>
                  <tr>
                      <td>2</td><td>LGA</td><td>${params.lga}</td>
                  </tr>
                  <tr>
                      <td>3</td><td>Council Ward</td><td>${params.ward}</td>
                  </tr>
  
                  <tr>
                      <td>4</td><td>Reporters ID</td><td>-</td>
                  </tr>
                  <tr>
                      <td>5</td><td>Reporters Name</td><td>${params.mon}</td>
                  </tr>
  
                  <tr>
                      <td>6</td><td>Lot</td><td>${params.lot}</td>
                  </tr>
                  <tr>
                      <td>7</td><td>Community Name</td><td>${params.community}</td>
                  </tr>
                  <tr>
                      <td>8</td><td>Name/ Address of Project Location</td><td>${this.state.address}</td>
                  </tr>
                  <tr>
                      <td>9</td><td>Contractor Code</td><td>-</td>
                  </tr>
  
                  <tr>
                      <td>10</td><td>Name of Contractor</td><td>${params.company}</td>
                  </tr>
                  <tr>
                      <td>11</td><td>Type of Facility</td><td>${params.title}</td>
                  </tr>
  
              </tbody>
          </table>
          <br/>
  <table style="width:90%">
      <thead>
          <tr>
              <th style="width:5%"></th><th style="width:40%">Borehole Information</th><th></th>
          </tr>
      </thead>
      <tbody>
          <tr>
             <td>12</td><td>Was geophysical survey done? (sight survey result)</td>
             <td>${this.state.geo}</td>
          </tr>
          <tr>
              <td>13</td><td>Was Setback to existing structures and contamintion point observed?</td>
              <td>${this.state.setback}</td>
           </tr>
           <tr>
              <td>14</td><td>Date of Completeion</td><td>${this.state.cdate}</td>
           </tr>
           <tr>
              <td>15</td><td>Material of casing/screen (inches)</td><td>${this.state.casing}</td>
           </tr>
           <tr>
              <td>16</td><td>Diameter of Casing/screen (inches)</td><td>${this.state.casingd}</td>
           </tr>
           <tr>
              <td>17</td><td>Casing/screen pressure rating(bar)</td><td>${this.state.casingr}</td>
           </tr>
           <tr>
              <td>18</td><td>Cased depth of the borehole/well(M)</td><td>${this.state.casedepth}</td>
           </tr>
           <tr>
              <td>19</td><td>Estimated SWL(Meters)</td><td>${this.state.swl}</td>
           </tr>
           <tr>
              <td>20</td><td>Borehole/well yield sustained? (stroke test)</td><td>${this.state.yielda}</td>
           </tr>
           <tr>
              <td>21</td><td>Grouting done?</td><td>${this.state.grout}</td>
           </tr>
           <tr>
              <td>22</td><td>Depth of pump Installation(meters)</td><td>${this.state.pumpd}</td>
           </tr>
           <tr>
              <td>23</td><td>Type of pump Installed</td><td>${this.state.pumpt}</td>
           </tr>
           <tr>
           <td>24</td><td>Pump security installed </td><td>${this.state.pumps}</td>
        </tr>
        <tr>
           <td>25</td><td>Power Source</td><td>${this.state.power}</td>
        </tr>
        
        <tr>
           <td>26</td><td>Cable Installed complete with joining kit</td><td>${this.state.cable}</td>
        </tr>
        <tr>
           <td>27</td><td>Earthing done</td><td>${this.state.earth}</td>
        </tr>

           <tr>
              <td>28</td><td>Water quality analysis carried out by the contractor? </td>
              <td>${this.state.watera}</td>
           </tr>
           <tr>
              <td>29</td><td>Color (sight water/ask beneficiaries)</td><td>${this.state.color}</td>
           </tr>
           <tr>
              <td>30</td><td>Taste (taste</td><td>${this.state.taste}</td>
           </tr>
           <tr>
              <td>31</td><td>Odour (smell water/ask beneficiaries)</td><td>${this.state.odour}</td>
           </tr>
           <tr>
           <td>32</td><td>Storage tanks PVC?</td><td>${this.state.tankpvc}</td>
        </tr>
        <tr>
           <td>33</td><td>Colour of storage tank</td><td>${this.state.tankc}</td>
        </tr>
        <tr>
           <td>34</td><td>Capacity of storage tank</td><td>${this.state.tankcap}</td>
        </tr>
        <tr>
           <td>35</td><td> Height of stanchion (metres)</td><td>${this.state.stanchion}</td>
        </tr>
        <tr>
           <td>36</td><td>Stanchion structural stable?</td><td>${this.state.stability}</td>
        </tr>
        <tr>
           <td>37</td><td>Stanchion treated with anti-rust</td><td>${this.state.antirust}</td>
        </tr>
        <tr>
           <td>38</td><td>Reticulated?</td><td>${this.state.reticulated}</td>
        </tr>
        <tr>
           <td>39</td><td>Tap Islands done?</td><td>${this.state.island}</td>
        </tr>
           <tr>
              <td>40</td><td>Soak pit</td><td>${this.state.soakpit}</td>
           </tr>
           <tr>
           <td>41</td><td>Facility fenced ?</td><td>${this.state.fenced}</td>
        </tr>
           <tr>
              <td>42</td><td>Signpost installed</td><td>${this.state.signpost}</td>
           </tr>
    <tr>
      <td></td><td><b>Capture</b></td><td><b>Details</b></td>
   </tr>
   <tr>
      <td>43</td><td>Cordinate</td><td>${this.state.cordinate}</td>
   </tr>
   <tr>
      <td>44</td><td>Picture 1 (site Overview)</td><td><img width="100" height="100" src='${this.state.pic1}'></img></td>
   </tr>
   <tr>
      <td></td><td>Picture 2 (capture tank and panels)</td><td><img width="100" height="100" src='${this.state.pic2}'></img></td>
   </tr>
   <tr>
      <td></td><td>Picture 3(Tap island with water running)</td><td><img width="100" height="100" src='${this.state.pic3}'></img></td>
   </tr>
  </tbody>
  </table>
  Generated on ${new Date()}
          <b><u> </u></b>
      </body>
  </html>
      `,
      fileName: 'test',
      directory: 'Documents',
    };
 
    //let file = await RNHTMLtoPDF.convert(options)
    let file = await Print.printToFileAsync(options)
      const permission = await MediaLibrary.requestPermissionsAsync();
      if(permission.granted){
       let myfile= await MediaLibrary.createAssetAsync(file.uri,'jiy')
     //  alert(myfile.uri)
       await MediaLibrary.createAlbumAsync('ruwassa file',myfile)

      //  await MediaLibrary.addAssetsToAlbumAsync(file.uri,'testing')

     //   await MediaLibrary.createAssetAsync(file.uri,'testing')
      }
    // console.log(file.filePath);
  // alert(file.uri);
  
}catch(e){
  alert(e)
}
}
savetoDraft=()=>{
 //   if(this.state.imgurl1C=='done' & this.state.imgurl2C=='done' & this.state.imgurl3C=='done'){
       // return alert(JSON.stringify(draftdata))
        AsyncStorage.getItem('MonRep1').then(val=>{
            const {geo,   setback,    cdate,    casing,    casedepth,    casingd,    casingr,    swl,
                yielda,    grout,    pumpd,    pumpt,    watera,   color,    taste,    odour,
                platformd,   shuttr, stability,    soakpit,    signpost,    cordinate,   pumps,    power,
                cable,    earth,    tankpvc,    tankc,    tankcap,    stanchion,    antirust,
                reticulated,    island,    fenced,    pic1,    pic2,    pic3,
                pic4,   visible,    imgurl1,    imgurl2,    imgurl3} = this.state
                const {params}= this.props.route
            const myData=
            {pid:params.pid,community:params.community,gentime:new Date(), title:params.title,
                lga:params.lga,mid:params.mid, mon:params.mon,  geo,   setback,    cdate,    casing,    casedepth,    casingd,    casingr,    swl,
                yielda,    grout,    pumpd,    pumpt,    watera,   color,    taste,    odour,
                platformd,   shuttr, stability,    soakpit,    signpost,    cordinate,   pumps,    power,
                cable,    earth,    tankpvc,    tankc,    tankcap,    stanchion,    antirust,
                reticulated,    island,    fenced,    pic1,    pic2,    pic3,
                pic4,   visible,    imgurl1,    imgurl2,    imgurl3
            }
          
            if(val=='empty' || val==null){
                alert('emp')
                AsyncStorage.setItem('MonRep1', JSON.stringify([myData]))
                this.createPDF()
                alert('Saved in draft, pdf file saved in documents')
            }else{
              //  alert(JSON.stringify(val))
    
                const myDraftData = JSON.parse(val);
               // alert(myDraftData)
                myDraftData.push(myData)
                AsyncStorage.setItem('MonRep1',JSON.stringify(myDraftData))
                this.createPDF()

                alert('Saved in draft, pdf file saved in documents')
    
            }
        })
}
handleGps=(gps)=>{
    this.setState({
        cordinate:gps
    })
}

pumpty=(value)=>{
  if(value=='others'){
      this.setState({
        pumps:value,
        otherstyle: 'flex'
      })
  }
  else{
    this.setState({
      pumps:value,
    otherstyle:'none'})

  }
}
Otherpumpty=(value)=>{
      this.setState({
        pumps:value,
      
      })
  }
  render() {
      const {params} = this.props.route
    return(
      <ScrollView style={styles.container}>
      <View>
    <Geolo onGps={this.handleGps}/>

    <Text>{params.title}</Text>
            <Text>Was geophysical survey done?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({geo:value})}}
        />
            <Text>Was setback to existing structures and contamintion point observed?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({setback:value})}}
        />
            <Text>Date of Completion</Text>
            <TextInput style={styles.box} onChangeText={(value)=>{this.setState({cdate:value})}}/>
           
            <Text>Material of Casing/screen (uPVC)?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({casing:value})}}
        />
                <Text>Diameter of Casing/screen (inches)</Text>
              <TextInput style={styles.box} onChangeText={(value)=>{this.setState({casingd:value})}}/>
              <Text>Casing/Screen pressure rating (bar)</Text>
              <TextInput style={styles.box} onChangeText={(value)=>{this.setState({casingr:value})}}/>
              <Text>Cased depth of the borehole/well (M))</Text>
              <TextInput style={styles.box} onChangeText={(value)=>{this.setState({casedepth:value})}}/>
              <Text>Estimated SWL(Meters)</Text>
              <TextInput style={styles.box} onChangeText={(value)=>{this.setState({swl:value})}}/>
              <Text> Borehole/Yield sustained? (stroke test)</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({yielda:value})}}
        />
             <Text>Grouting done?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({grout:value})}}
        />
              <Text>Depth of pump Installation</Text>
              <TextInput style={styles.box} onChangeText={(value)=>{this.setState({pumpd:value})}}/>
              <Text>Type of Pump Install</Text>
           {/*}    <RadioForm 
        radio_props={radio_props2}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={this.pumpty}
    /> */}
        <Picker style={{borderWidth:4,borderColor:'gray', height: 50, width: 200}} selectedValue = {this.state.pumps}  onValueChange = {this.pumpty}>
        <Picker.Item label = {'others'} value = "others" />              
               <Picker.Item label = {'Indian Mark II'} value = "Indian Mark II" />
               <Picker.Item label = {'Indian Mark III'} value = "Indian Mark III" />
               <Picker.Item label = {'Afridev'} value = "Afridev" />
               <Picker.Item label = {'Grundfos'} value = "Grundfos" />
          </Picker>
          <View style={{display:this.state.otherstyle}}>
          <Text>Other type of pump</Text>
 <TextInput style={styles.box} onChangeText={this.Otherpumpty}/>

 </View>
<Text>Pump security</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={this.pumptype}
        /> 

<Text>Power source</Text>
               <RadioForm 
        radio_props={radio_props3}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({power:value})}}
        />            
        
<Text>cable installed complte with jointting kit?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({cable:value})}}
        />            
        
<Text>Earthing done?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({earth:value})}}
        />            
           <Text>Water quality analysis carried out by the contractor?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({watera:value})}}
        /> 
          <Text>Color (sight/ask beneficiatiaries)</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({color:value})}}
        /> 
          <Text>Taste (taste/ask beneficiaries)</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({taste:value})}}
        /> 
          <Text>Odour (smell/ask beneficiaries)</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({odour:value})}}
        /> 
        <Text>Storage tank PVC</Text>
               <RadioForm 
        radio_props={radio_props4}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({tankpvc:value})}}
        />  
        
<Text>Capacity of storage tank (litres)</Text>
               <TextInput style={styles.box}
        onChangeText={(value)=>{this.setState({tankcap:value})}}
        />       
        <Text>Color of storage tank</Text>
               <RadioForm 
        radio_props={radio_props5}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({tankc:value})}}
        />       
          <Text>Height of stanchion</Text>
          <TextInput style={styles.box} onChangeText={(value)=>{this.setState({stanchion:value})}}/>

          <Text>Stanchion structurally stable?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({stability:value})}}
        />
              <Text>Stanchion treated with anti-rust?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({antirust:value})}}
        />
        <Text>Reticulated</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({reticulated:value})}}
        />  
        <Text>Tap Island done?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({island:value})}}
        />  

              <Text>Soak pit?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({soakpit:value})}}
        />
        <Text>Fenced</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({fenced:value})}}
        />  
              <Text>Signpost</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({signpost:value})}}
        />
         <View style={styles.row}>
         <Image source={{uri: this.state.pic1}}
       style={{width: 70, height: 100}} />
         <Image source={{uri: this.state.pic2}}
       style={{width: 70, height: 100}} />
  <Image source={{uri: this.state.pic3}}
       style={{width: 70, height: 100}} />

</View>
<View style={{marginBottom:20}}>
<Button style={{margin:4}}  onPress={this._takePhoto}   title="Capture site overview" />
</View>
<View style={{marginBottom:20}}>
 <Button  style={{marginTo:4}}  onPress={this._takePhoto2}  title="Capture Tank and Panel"/>
 </View>
 <View style={{marginBottom:20}}>
  <Button    onPress={this._takePhoto3}   title="Capture tap island with tap running" />
  </View>
       
        <TouchableHighlight style={styles.btnview} onPress={this.createPDF}>
          <Text>Create PDF</Text>
        </TouchableHighlight>
        <View >
          <TouchableOpacity onPress={this.handleSend} style={styles.updbtn}><Text style={styles.btntxt}>Send Report</Text></TouchableOpacity>
      </View>
      <View >
          <TouchableOpacity onPress={this.savetoDraft} style={styles.updbtn}><Text style={styles.btntxt}>Save to draft</Text></TouchableOpacity>
      </View>
      <ProgressLoader visible={this.state.visible} isModal={true} isHUD={true}
            hudColor={"#000000"} color={"#FFFFFF"}/>
              </View>
      <View style={{height:50}}/>
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

  this._handleImagePicked(pickerResult);
     // const manipResult = await this._CompressImg(pickerResult.uri)
    

    }
  };

  
  _handleImagePicked = async pickerResult => {

    try {
      this.setState({
          uploaded:'',
          visible:false
      });

      if (!pickerResult.cancelled) {
        const manipResult = await this._CompressImg(pickerResult.uri)

this.setState({
pic1:manipResult,
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
     // const manipResult = await this._CompressImg(pickerResult.uri)
    

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
pic2:manipResult,
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

  _takePhoto3 = async () => {
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

  this._handleImagePicked3(pickerResult);
     // const manipResult = await this._CompressImg(pickerResult.uri)
    

    }
  };

  
  _handleImagePicked3 = async pickerResult => {

    try {
      this.setState({
          uploaded:'',
          visible:false
      });

      if (!pickerResult.cancelled) {
        const manipResult = await this._CompressImg(pickerResult.uri)

this.setState({
pic3:manipResult,
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


  _CompressImg = async (a) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      a,
      [{ rotate: 0 }],
      { compress: 0.1, format: ImageManipulator.SaveFormat.jpeg },
    );
 //   alert(manipResult.uri);
    this.setState({
        uri:manipResult.uri
    })
    return manipResult.uri
  };


  handleSend=()=>{
      this.setState({
          gentime: new Date()
      })
      this._handlePick(this.state.pic1)
  }
  _handlePick = async pickerResult => {
      if(pickerResult==''){
          return alert('no image 1')
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
const {geo,   setback,    cdate,    casing,    casedepth,    casingd,    casingr,    swl,
    yielda,    grout,    pumpd,    pumpt,    watera,   color,    taste,    odour,
    platformd,   shuttr, stability,    soakpit,    signpost,    cordinate,   pumps,    power,
    cable,    earth,    tankpvc,    tankc,    tankcap,    stanchion,    antirust,
    reticulated,    island,    fenced,    pic1,    pic2,    pic3,
    pic4,   visible,    imgurl1,    imgurl2,    imgurl3,gentime} = this.state
    const {params}= this.props.route
const data=
{   pid:params.pid,mid:params.mid,mon:params.mon,gentime,geo,   setback,    cdate,    casing,    casedepth,    casingd,    casingr,    swl,
    yielda,    grout,    pumpd,    pumpt,    watera,   color,    taste,    odour,
    platformd,   shuttr, stability,    soakpit,    signpost,    cordinate,   pumps,    power,
    cable,    earth,    tankpvc,    tankc,    tankcap,    stanchion,    antirust,
    reticulated,    island,    fenced,    pic1,    pic2,    pic3,
    pic4,   visible,    imgurl1,    imgurl2,    imgurl3
}
//return alert(JSON.stringify(draftdata))
axios.post('https://ruwassa.herokuapp.com/api/v1/monitorsreports/watereval', data)
.then(res=>{
    this.createPDF();
    alert('Sent, PDF copy saved in documents')   
}).catch(error=>{alert(error)}) 

  //  this.createPDF();
//alert('PDF created')    
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
      flexDirection: 'column',
      marginLeft:15
    /*  justifyContent: 'center',
    /*  alignItems: 'center',
    /*  backgroundColor: '#00e9f9',
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
      marginTop:50,
      backgroundColor:'#00fb03',
      height:50

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