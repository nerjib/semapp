import React from 'react';
import {Text,TextInput,View, KeyboardAvoidingView,Image, Button, StyleSheet, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'
import {Actions} from 'react-native-router-flux'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import ProgressLoader from 'rn-progress-loader'
import * as ImageManipulator from "expo-image-manipulator";


export default class Activityform extends React.Component{
constructor(props){
    super(props)
    this.state={
        date:'',
        activity:'',
        outcome:'',
        aid:'',
        Activities:[],
        image: null,
        file:'',
        type:'',
        imguri:'k',
        uploading: false,
        uploaded:'',
        imgurl:'',
        visible: false
    }
}

 loader(){
  //const {params} = this.props.route
//return alert(params.rid)
    axios.get('https://ruwassa.herokuapp.com/api/v1/reports/activity/weekly/'+this.props.rid)
    .then(res=>{this.setState({
            Activities:res.data
    })
   // console.log('aid '+res.data[0].id)
}).catch(error=>{console.log(error.message)});

}


  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }
componentDidMount(){
    this.inInterval= setInterval( ()=>this.loader(),1000);
    this.getPermissionAsync();
 
}
componentWillUnmount(){
    clearInterval(this.inInterval)
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
handleSave=()=>{
  /*
const obj={
    pid: this.props.pid,
    date:this.state.date,
    outcome: this.state.outcome,
    activity: this.state.activity,
    rid: this.props.rid,
    imgurl: this.state.imgurl

}


        axios.post('https://ruwassa.herokuapp.com/api/v1/weeklyactivityform1',obj)
        .then(res=>{this.setState({
                aid:res.data[0].id,
                date:'',
                activity:'',
                outcome:'',
                imgurl:'',
                imguri:'k'
        })
    }).catch(error=>{console.log(error.message)});
   */
//Actions.form1({pid:this.props.pid,uid:this.props.uid,aid:this.state.aid})
this.setState({
   date:'',
  activity:'',
  outcome:'',
  imgurl:'',
  imguri:'k',
  uploaded:'',
  visible:false
})
}
handleSaveContinue=()=>{
//  const {params} = this.props.route

    this.props.navigation.navigate('weeklyform3',{pid:this.props.pid,uid:this.props.uid,rid:this.props.rid})
    }
render(){
    let { image } = this.state;

    return(
        <ScrollView >

        <View  >
        <ProgressLoader visible={this.state.visible} isModal={true} isHUD={true}
            hudColor={"#000000"} color={"#FFFFFF"}/>

            <View behavior='padding' style={styles.row}>
                <Text style={styles.txt}>Date</Text>
                <TextInput onChangeText={this.handleDateChange} value={this.state.date} style={styles.box} placeholder='dd/mm/yyyy'/>
            </View>
            <View behavior='padding' style={styles.row}>
                <Text style={styles.txt}>Activity</Text>
            </View >
                <TextInput onChangeText={this.handleActivityChange} value={this.state.activity} multiline maxLength={150} style={styles.box1} placeholder=''/>
                <Text style={styles.txt}>Outcome</Text>
                <TextInput onChangeText={this.handleOutcomeChange} value={this.state.outcome} multiline maxLength={150} style={styles.box1} placeholder=''/>
        </View >
       <View>
       <Button
          onPress={this._pickImage}
          title="Pick an image from camera roll"
        />

        <Text>Status: {this.state.uploaded}</Text>
         <Image source={{uri: this.state.imguri}}
       style={{width: 150, height: 150}} />
       </View>
       <View style={styles.row}>
       <View>
           {
                  <TouchableOpacity onPress={this.handleSave} style={styles.updbtn}><Text style={styles.txtbtn}>Add activity</Text></TouchableOpacity>

               //Object.keys(this.state.Activities).map(e=>
                //{alert(e)}
           // )
       //    alert(this.state.Activities)
            }
       </View>
    <View>

    </View>
       <View>
           <TouchableOpacity onPress={this.handleSaveContinue} style={styles.updbtn2}><Text style={styles.txtbtn1}>Save and Continue</Text></TouchableOpacity>
            
       </View>
       </View>
            <View>
              <Text>Activities</Text>
                {Object.keys(this.state.Activities).map(e=>
                <View  key={e}>
                <Text style={styles.txt}>{this.state.Activities[e].activity}</Text>
              {//}  <Text style={styles.txt}>{this.state.Activities[e].imgurl}</Text>
              }
              </View>
            )} 
            </View>
       <View style={{height:60}}/>
        </ScrollView>

    )
}
  
_pickImage = async () => {
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

  _CompressImg = async (a) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      a,
      [{ rotate: 0 }],
      { compress: 0.3, format: ImageManipulator.SaveFormat.jpeg },
    );
 //   alert(manipResult.uri);
    this.setState({
        uri:manipResult.uri
    })
    return manipResult.uri
  };

 
  _handleImagePicked = async pickerResult => {
   // const {params} = this.props.route

    let uploadResponse, uploadResult;

    try {
      this.setState({
          uploaded:'loading...',
          visible:true
      });

      if (!pickerResult.cancelled) {
        const manipResult = await this._CompressImg(pickerResult.uri)
        uploadResponse = await uploadImageAsync(manipResult,this.props.rid, this.props.pid);
        uploadResult = await uploadResponse.json();
       //alert(uploadResult[0].imgurl)
       if(uploadResult[0].imgurl!=null){
        this.setState({
                    imguri:manipResult,
                       uploaded:'done',
                       visible:false,
                       imgurl:uploadResult[0].imgurl,
          image: uploadResult.location
        });
      
        const obj={
          pid: this.props.pid,
          date:this.state.date,
          outcome: this.state.outcome,
          activity: this.state.activity,
          rid: this.props.rid,
          imgurl: uploadResult[0].imgurl
      }
      
              axios.post('https://ruwassa.herokuapp.com/api/v1/weeklyactivityform1',obj)
              .then(res=>{
                this.setState({
                      aid:res.data[0].id,
                   /*   date:'',
                      activity:'',
                      outcome:'',
                      imgurl:'',
                      imguri:'k'*/
              })
          }).catch(error=>{console.log(error.message)});
         
      
      
      
      }else{
         
            this.setState({
                imguri:'kk',
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
}

async function uploadImageAsync(uri,a,b) {
  let apiUrl = 'https://ruwassa.herokuapp.com/api/v1/weeklyactivityform';

  
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
        paddingTop:1,
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
        borderWidth:1,
        width:'40%',
        marginRight:20,
        borderRadius:4,
        borderBottomWidth:2
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
})