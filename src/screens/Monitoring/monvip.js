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
  {label: 'Afridev', value:'Afridev'}

]

const radio_props3 = [
    {label: 'Vertical', value:'Vertical'},
    {label: 'Horizontal', value:'Horizontal'}
     
  ]
  const radio_props4 = [
    {label: 'Very good', value:'Very good'},
    {label: 'good', value:'Good'},
    {label: 'Poor', value:'Poor'}  ,
    {label: 'Very poor', value:'Very poor'}
  ]
  const radio_props5 = [
    {label: 'Black', value:'Black'},
    {label: 'Blue', value:'Blue'},
    {label: 'Red', value:'red'},
    {label: 'green', value:'green'},
    {label: 'brown', value:'yellow'},
    {label: 'white', value:'white'},
    {label: 'cream', value:'cream'},
    {label: 'mixed', value:'mixed'},
    {label: 'others', value:'others'}

  ]
  
/*
  const Sanitation=({route})=>{

    return(
        <Text>
            {route.params.lga}
        </Text>
    )
  }
  export default Sanitation
  
  */

export default class Sanitation extends Component {
  constructor(props){
     
    super(props)
    this.state={
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
      gentime:'',
      cordinate:''
    }
    this.createPDF=this.createPDF.bind(this)

  }

  async createPDF () {
    const {params} =this.props.route

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
                      <td>8</td><td>Name/ Address of Project Location</td><td>{}</td>
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
          <table table style="width:90%">
          <thead>
              <tr>
                  <th style="width:5%"></th><th  style="width:40%"> Information</th><th></th>
              </tr>
          </thead>
          <tbody>
      
              <tr>
                  <td>12</td><td>Was Setback to existing structures and contamintion point observed?</td>
                  <td>${this.state.setback}</td>
               </tr>
               <tr>
                   <td>13</td><td>Structure: well oriented and aesthetically ok?</td><td>${this.state.structure}</td>
               </tr>
               <tr>
                  <td>14</td><td>Date of Completeion</td><td>${this.state.cdate}</td>
               </tr>
               <tr>
                  <td>15</td><td>Facility in use?</td><td>${this.state.usage}</td>
              </tr>
              <tr>
                  <td>16</td><td>Site reclamation and restoration done?</td><td>${this.state.restoration}</td>
              </tr>
              <tr>
                  <td>17</td><td>Distance between the 2 blocks</td><td>${this.state.distance}</td>
              </tr>
              <tr>
                  <td>18</td><td>Area of building</td><td>${this.state.area}</td>
              </tr>
              <tr>
                  <td>19</td><td>Area of pits/cesspool to specification</td><td>${this.state.pitarea}</td>
              </tr>
               <tr>
                  <tr>
                      <td>20</td><td>Number of compartment  (on each block)</td><td>${this.state.compartment}</td>
                  </tr>
                  <tr>
                      <td>21</td><td>Urinals?</td><td>${this.state.urinals}</td>
                  </tr>
                  <tr>
                      <td>22</td><td>Number of urinals compartment<i>(on each block)</i></td><td>${this.state.nourinals}</td>
                  </tr>
                  <tr>
                      <td>23</td><td>All wet areas tiled as specified?</td><td>${this.state.tiled}</td>
                  </tr>
                  <tr>
                      <td>24</td><td>Laterine compartments tiled?</td><td>${this.state.laterinet}</td>
                  </tr>
                  <tr>
                      <td>25</td><td>Quality of tiling</td><td>${this.state.tilequality}</td>
                  </tr>
                  <tr>
                      <td>26</td><td>Color of tiles</td><td>${this.state.tilec}</td>
                  </tr>
                  <tr>
                      <td>27</td><td>Number of wash hand basins installed (on each block)</td>
                      <td>${this.state.nobasins}</td>
                  </tr>
                  <tr>
                      <td>28</td><td>Wash hand basins embedded in blockwork?</td><td>${this.state.washbasins}</td>
                  </tr>
                  <tr>
                      <td>29</td><td>Physically challenged aids installed as specified?</td><td>${this.state.physicallyaid}</td>
                  </tr>
                  <tr>
                      <td>30</td><td>Doors to specific size?</td><td>${this.state.door}</td>
                  </tr>
                  <tr>
                      <td>31</td><td>Gauge and type of all metal work as specified?</td><td>${this.state.gauge}</td>
                  </tr>
                  <tr>
                      <td>32</td><td>All metal works treated with anti-rust</td><td>${this.state.antirust}</td>
                  </tr>
                  <tr>
                      <td>33</td><td>Substructure</td><td>${this.state.subs}</td>
                  </tr>
                  <tr>
                      <td>34</td><td>Cover slabs well placed?</td><td>${this.state.slabs}</td>
                  </tr>
                  <tr>
                      <td>35</td><td>Top of pits/cesspool one course above ground level?</td><td>${this.state.pit}</td>
                  </tr>
                  <tr>
                      <td>36</td><td>Cracks on building</td><td>${this.state.crack}</td>
                  </tr>
                  <tr>
                      <td>37</td><td>If 36 is yes, type of crack</td><td>${this.state.crackt}</td>
                  </tr>
                  <tr>
                      <td>38</td><td>Defect on any part of structure?</td><td>${this.state.defect}</td>
                  </tr>
                  <tr>
                      <td>39</td><td>Specify defect</td><td>${this.state.sdefect}</td>
                  </tr>
                  <tr>
                      <td>40</td><td>Internal and external building of  well rendered?</td><td>${this.state.rendered}</td>
                  </tr>
                  <tr>
                      <td>41</td><td>External walls finished with sanblasting?</td><td>${this.state.sandblast}</td>
                  </tr>
                  <tr>
                      <td>42</td><td>Artwork done</td><td>${this.state.artwork}</td>
                  </tr>
                  <tr>
                      <td>43</td><td>Water tank done?</td><td>${this.state.tank}</td>
                  </tr>
                  <tr>
                      <td>44</td><td>Tank embedded in concrete as specified?</td><td>${this.state.tankembeded}</td>
                  </tr>
                  <tr>
                      <td>45</td><td>Size of tank</td><td>${this.state.tankcap}</td>
                  </tr>
                  <tr>
                      <td>46</td><td>Color of tank</td><td>${this.state.tankc}</td>
                  </tr>
                  
               <tr>
                  <td>47</td><td>Soak pit for urinals installed</td><td>${this.state.urinalpit}</td>
               </tr>
                        <tr>
                  <td>48</td><td>Signpost Installed?</td><td>${this.state.signpost}</td>
               </tr>
        <tr>
          <td></td><td><b>Capture</b></td><td><b>Details</b></td>
       </tr>
       <tr>
          <td>49</td><td>Cordinate</td><td>${this.state.cordinate}</td>
       </tr>
       <tr>
          <td>50</td><td>Picture 1 <i>(site Overview)</i></td><td><img width="100" height="100" src='${this.state.pic1}'></img></td>
       </tr>
       <tr>
          <td></td><td>Picture 2 <i>(capture inside of female block showing urinals and compartment)</i></td>
          <td><img width="100" height="100" src='${this.state.pic2}'></img></td>
       </tr>
       <tr>
          <td></td><td>Picture 3<i>(Capture inside  of male block showing urinals and compartments)</i></td>
          <td><img width="100" height="100" src='${this.state.pic3}'></img></td>
       </tr>
       <tr>
          <td></td><td>picture 4 <i>(capture water tank)</i></td><td><img width="100" height="100" src='${this.state.pic4}'></img></td>
      </tr>
      </tbody>
      </table>
      Generated on ${new Date()}
              <b><u> </u></b>
          </body>
      </html>      `,
      fileName: 'test',
      directory: 'Documents',
    };
 
    //let file = await RNHTMLtoPDF.convert(options)
    let file = await Print.printToFileAsync(options)
      const permission = await MediaLibrary.requestPermissionsAsync();
      if(permission.granted){
      //  await MediaLibrary.createAssetAsync(file.uri)
        let myfile= await MediaLibrary.createAssetAsync(file.uri)
        //  alert(myfile.uri)
          await MediaLibrary.createAlbumAsync('ruwassa file',myfile)
   
      }
    // console.log(file.filePath);
   // alert('Sent, PDF copy saved in documents')    

  
}catch(e){
  alert(e)
}
}

savetoDraft=()=>{
    //   if(this.state.imgurl1C=='done' & this.state.imgurl2C=='done' & this.state.imgurl3C=='done'){
          // return alert(JSON.stringify(draftdata))
           AsyncStorage.getItem('MonRep2').then(val=>{
            const {setback, structure,cdate,usage,restoration,distance,
                area, pitarea,compartment,urinals,nourinals,tiled,laterinet,
                tilequality,  tilec,nobasins,washbasins,physicallyaid,door,gauge,antirust,
                subs,slabs,pit,crack,crackt,defect,sdefect,rendered,sandblast,artwork,
                tank,tankembeded,tankcap,tankc,soakpit,urinalpit,pic1,pic2,pic3,pic4,imgurl1,
                imgurl2,imgurl3,imgurl4,cordinate} = this.state
                const {params} = this.props.route
                               const myData=
               {pid:params.pid,gentime:new Date(), community:params.community, title:params.title,lga:params.lga,mid:params.mid, mon:params.mon,
                setback, structure,cdate,usage,restoration,distance,
                area, pitarea,compartment,urinals,nourinals,tiled,laterinet,
                tilequality,  tilec,nobasins,washbasins,physicallyaid,door,gauge,antirust,
                subs,slabs,pit,crack,crackt,defect,sdefect,rendered,sandblast,artwork,
                tank,tankembeded,tankcap,tankc,soakpit,urinalpit,pic1,pic2,pic3,pic4,imgurl1,
                imgurl2,imgurl3,imgurl4,cordinate
               }
             
               if(val=='empty' || val==null){
                   alert('emp')
                   AsyncStorage.setItem('MonRep2', JSON.stringify([myData]))
                   this.createPDF()
                   alert('Saved in draft, pdf file saved in documents')
                }else{
                 //  alert(JSON.stringify(val))
       
                   const myDraftData = JSON.parse(val);
                  // alert(myDraftData)
                   myDraftData.push(myData)
                   AsyncStorage.setItem('MonRep2',JSON.stringify(myDraftData))
                   this.createPDF()
   
                   alert('saved in draft, PDF saved in document')
       
               }
           })
   }
   
   handleGps=(gps)=>{
    this.setState({
        cordinate:gps
    })
}
  render() {
    const {params} =this.props.route

    return(
      <ScrollView style={styles.container}>
      <View>
    <Text>VIP{params.lga}</Text>
          <Geolo onGps={this.handleGps}/>

            <Text>Was setback to existing structures and contamintion point observed?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({setback:value})}}
        />
        <Text>Strucuture: well oriented and aesthetically ok?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({structure:value})}}
        />
            <Text>Date of Completion</Text>
            <TextInput style={styles.box} onChangeText={(value)=>{this.setState({cdate:value})}}/>
           
            <Text>Facility in use</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({usage:value})}}
        />
          <Text>Site reclamation and restoration done?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({restoration:value})}}
        />
          <Text>Distance between the two blocks (Metres)</Text>
               <TextInput style={styles.box}
        onChangeText={(value)=>{this.setState({distance:value})}}
        />
          <Text>Area of building</Text>
               <TextInput style={styles.box}
        onChangeText={(value)=>{this.setState({area:value})}}
        />
          <Text>Area of pits/cesspool to specification?</Text>
               <TextInput style={styles.box}
        onChangeText={(value)=>{this.setState({pitarea:value})}}
        />
          <Text>Urinals?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({urinals:value})}}
        />
        <Text>Number of  compartments (on each block)</Text>
               <TextInput style={styles.box}
        onChangeText={(value)=>{this.setState({compartment:value})}}
        />
          <Text>Number of urinals compartments (on each block)</Text>
               <TextInput style={styles.box}
        onChangeText={(value)=>{this.setState({nourinals:value})}}
        />
          <Text>All wet areas tiled as specified?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({tiled:value})}}
        />
          <Text>Latirine compartment tiled?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({laterinet:value})}}
        />
          <Text>Quality of Tiling</Text>
               <RadioForm 
        radio_props={radio_props4}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({tilequality:value})}}
        />
          <Text>Color of tiles</Text>
               <RadioForm 
        radio_props={radio_props5}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({tilec:value})}}
        />
             <Text>Number of wash hand basins installed(on each blocks)</Text>
               <TextInput style={styles.box}
        onChangeText={(value)=>{this.setState({nobasins:value})}}
        />
            <Text>Wash hand basins embedded in blockwork?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({washbasins:value})}}
        />
             <Text>Physically challenged aids installed as specified?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({physicallyaid:value})}}
        />
             <Text>Doors Specified size?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({door:value})}}
        />
     <Text>Gauge and type all of metal works as specified?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({gauge:value})}}
        />
             <Text>All metal work treated with anti-rust</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({antirust:value})}}
        />
             <Text>Substructure was filled with weak concreate?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({subs:value})}}
        />
             <Text>Cover slabs well placed?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({slabs:value})}}
        />
             <Text>Top of pits/cesspool one course above ground?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({pit:value})}}
        />
             <Text>Cracks on building?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({crack:value})}}
        />
             <Text>if yes type of crack</Text>
               <RadioForm 
        radio_props={radio_props3}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({crackt:value})}}
        />
             <Text>defect on any part of the structure</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({defect:value})}}
        />
             <Text>specify defect</Text>
               <TextInput style={styles.box}
        onChangeText={(value)=>{this.setState({sdefect:value})}}
        />
             <Text>Internal and external of building well rendered?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({rendered:value})}}
        />
             <Text>External walls finished with sandblasting?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({sandblast:value})}}
        />
             <Text>Artwork done</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({artwork:value})}}
        />
             <Text>Water tank done?</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({tank:value})}}
        />
             <Text>embedded in concrete as specified? </Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({tankembeded:value})}}
        />
             <Text>Size of tank?</Text>
               <TextInput style={styles.box}
        onChangeText={(value)=>{this.setState({tankcap:value})}}
        />
             <Text>Colour of tank</Text>
               <RadioForm 
        radio_props={radio_props5}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({tankc:value})}}
        />
         
              <Text>Soak pit for urinals?</Text>
               <RadioForm 
 animation={false}       radio_props={radio_props}
        formHorizontal={true}
        labelHorizontal={false}
        initial={-1}
        animation={false}
        onPress={(value)=>{this.setState({urinalpit:value})}}
        />  
              <Text>Signpost installed</Text>
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
       <Image source={{uri: this.state.pic4}}
       style={{width: 70, height: 100}} />


</View>
<View style={{marginBottom:20}}>
<Button style={{margin:4}}  onPress={this._takePhoto}   title="Capture site overview showing the two blocks" />
</View>
<View style={{marginBottom:20}}>
 <Button  style={{marginTo:4}}  onPress={this._takePhoto2}  title="Capture inside female block"/>
 </View>
 <View style={{marginBottom:20}}>
  <Button    onPress={this._takePhoto3}   title="Capture inside male block" />
  </View>
  <View style={{marginBottom:20}}>
  <Button    onPress={this._takePhoto4}   title="Capture water tank" />
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

  _takePhoto4 = async () => {
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

  this._handleImagePicked4(pickerResult);
     // const manipResult = await this._CompressImg(pickerResult.uri)
    

    }
  };

  
  _handleImagePicked4 = async pickerResult => {

    try {
      this.setState({
          uploaded:'',
          visible:false
      });

      if (!pickerResult.cancelled) {
        const manipResult = await this._CompressImg(pickerResult.uri)

this.setState({
pic4:manipResult,
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
      this.setState({gentime: new Date()})
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
const {setback, structure,cdate,usage,restoration,distance,
area, pitarea,compartment,urinals,nourinals,tiled,laterinet,
tilequality,  tilec,nobasins,washbasins,physicallyaid,door,gauge,antirust,
subs,slabs,pit,crack,crackt,defect,sdefect,rendered,sandblast,artwork,
tank,tankembeded,tankcap,tankc,soakpit,urinalpit,pic1,pic2,pic3,pic4,imgurl1,
imgurl2,imgurl3,imgurl4, gentime, cordinate} = this.state
const {params} =this.props.route

const data=
{ pid:params.pid,mon:params.mon,mid:params.mid, setback, structure,cdate,usage,restoration,distance,
    area, pitarea,compartment,urinals,nourinals,tiled,laterinet,
    tilequality,  tilec,nobasins,washbasins,physicallyaid,door,gauge,antirust,
    subs,slabs,pit,crack,crackt,defect,sdefect,rendered,sandblast,artwork,
    tank,tankembeded,tankcap,tankc,soakpit,urinalpit,pic1,pic2,pic3,pic4,imgurl1,
    imgurl2,imgurl3,imgurl4, gentime,cordinate
}
//return alert(JSON.stringify(draftdata))
axios.post('https://ruwassa.herokuapp.com/api/v1/monitorsreports/sanitationeval', data)
.then(res=>{
    this.createPDF();
    alert('Sent, PDF copy saved in documents')   
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