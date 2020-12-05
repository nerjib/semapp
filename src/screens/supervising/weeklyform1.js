import React, { Components } from 'react';
import {Button,Keyboard,Image,Dimensions,KeyboardAvoidingView, ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
//import { saveReport, loadReport } from './reportStorage';
//import Activityform from './activityform'
import Geolo from '../geo';
//import RNPickerSelect from 'react-native-picker-select'
import ProgressLoader from 'rn-progress-loader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Picker} from '@react-native-community/picker'



export default class WeeklyForm1 extends React.Component {
constructor(props){
    super(props)
    const {params} =  this.props.route

    this.state={
        data:'',
       pid: params.pid,
       uid: params.uid,
        summary: '',
        summaryfrom: '',
        summaryto: '',
        conclusion: '',
        followup: '',
        compliance: '' ,
        gps:'',    
        row:[]  ,
        pStatus:'',
        siteStatus:'ongoing',
        latitude:'',
        longitude:'',
        contactor:'',
        supervisor:''
    }
}


  componentDidMount(){
    // const initialState=loadReport();
    
   // alert('inital'+ JSON.stringify(initialState))
  //  Object.keys(initialState).map(e=>{alert(e)})
    //this.setState(initialState)
    // alert(this.state);
    const {params} =  this.props.route

    axios.get('https://ruwassa.herokuapp.com/api/v1/projects/'+params.pid)
    .then(res=>{
        this.setState({
            data: res.data[0],
          })

          axios.get('https://ruwassa.herokuapp.com/api/v1/contractors/'+res.data[0].contractor_id)
          .then(res1=>{
              this.setState({
                  contractor: res1.data[0].company       
                })
            })

        }).catch(error=>{console.log(error.message)})
        
        axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+params.uid)
        .then(res=>{
                this.setState({
                    profile: res.data[0],
                    supervisor: res.data[0].first_name +' '+res.data[0].last_name,
                  })
                })
    
    }  
         
    
    handleGps=(gps)=>{
       // alert('gps is'+gps)
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

handledraft=()=>{
    const {params} =  this.props.route

    saveReport(this.state);
    Actions.taskDetails({uid:params.uid,pid:params.pid})
}
handleUpdate = () =>{
    const {params} =  this.props.route

let    obj = {
pid:params.pid,
uid:  params.uid,
summary: this.state.summary,
summaryfrom: this.state.summaryfrom,
summaryto: this.state.summaryto,
conclusion: this.state.conclusion,
followup: this.state.followup,
compliance: this.state.compliance,
gps: this.state.gps,
pstatus: this.state.pStatus,
visible:false

    }
    axios.post('http://127.0.0.1:5000/api/v1/reports/submitted/weekly',obj)
    .then(res=>{
        Actions.taskDetails({uid:params.uid,pid:params.pid})
    }).catch(error=>{alert(error.message)})
}
handleActivity=()=>{
    const {params} =  this.props.route

    navigation.navigate('activityform',{uid:params.uid,pid:params.pid})
}
handleRow=(a)=>{
    this.state.row.push(a)
}
handleStage=(value)=>{
//    alert(value)
    this.setState({
        pStatus:value
    })
}
handleLatitude=(value)=>{
    //    alert(value)
        this.setState({
            latitude:value
        })
    }
    handleLongitude=(value)=>{
        //    alert(value)
            this.setState({
                longitude:value
            })
        }
handleStatus=(value)=>{
 //       alert(value)
       this.setState({
           siteStatus:value
        })
    }
handleSaveContinue=()=>{
    const {params} =  this.props.route
//return alert(params.pid)
//checkk if user is not remove from the pplatform
if(this.state.pStatus==''){
    alert('Select project stage')
}
else if(this.state.gps==''){
alert('turn on your location')
}
else{
    this.setState({
        visible:true
    })
    axios.get('https://ruwassa.herokuapp.com/api/v1/users/'+params.uid)
        .then(res=>{
                if (res.data[0].active=='active'){
                    

    let    obj = {
        pid:params.pid,
        uid:  params.uid,
        summary: this.state.summary,
        summaryfrom: this.state.summaryfrom,
        summaryto: this.state.summaryto,
        conclusion: this.state.conclusion,
        followup: this.state.followup,
        compliance: this.state.compliance,
        gps: this.state.gps,
        pstatus: this.state.pStatus,
        sitestatus: this.state.siteStatus,
        sitegps: this.state.latitude+','+this.state.longitude
            }
            axios.post('https://ruwassa.herokuapp.com/api/v1/reports/submitted/weekly',obj)
            .then(res=>{
           //     alert('yay'+res.data[0].id)
             this.setState({
                visible:false
            })
            //this.props.navigation.navigate('weeklyform2')
              this.props.navigation.navigate('weeklyform2',{uid:params.uid,pid:params.pid, rid: res.data[0].id})
            }).catch(error=>{alert('a '+error.message)
                this.setState({
                    visible:false
                })            
            })

       
        }else{
            AsyncStorage.setItem('login','denied');
            alert('you dont have access')
            this.props.navigation.navigate('Login')
            this.setState({
                visible: false
            })
        
        }
}).catch(error=>{alert('b '+ error.message)
    this.setState({
        visible:false
    })

})
}
}
render() {

    return (
        <ScrollView >
        <View >
        <ProgressLoader visible={this.state.visible} isModal={true} isHUD={true}
            hudColor={"#000000"} color={"#FFFFFF"}/>
            <View><Geolo onGps={this.handleGps}/></View>
        <View style={styles.header}>
            <View><Text style={styles.txt1}>LGA:{this.state.data.lga}</Text></View>
            <View><Text style={styles.txt1} >Contractor:{this.state.contractor}</Text></View>      
            <View><Text style={styles.txt1}>LOT:{this.state.data.lot}</Text></View>
            <View><Text style={styles.txt1}>Supervisor: {this.state.supervisor}</Text></View>
            <View><Text style={styles.txt1}>Stage: {this.state.pStatus}</Text></View>

        </View>
        <View >

        <View>
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

         <View>
     {/*}        <Text style={styles.txtstatus}>Project Status</Text>
         <RNPickerSelect style={{color:'red'}} onValueChange={this.handleStatus}
        items={[
            {label:'Ongoin',  value:'ongoing'},
            {label:'Completed ', value:'completed'},
            {label:'Abandoned ', value:'abandoned'}         
        ]}
        />
    */}
         </View>
       
            <View>
         <Text  style={styles.txt}>Summary of planned activities for the week</Text>
         </View>
         
         <View style={styles.row}>
         <View style={styles.rowdate}>
         < TextInput placeholder='Date From dd/mm/yyy'  value={this.state.summaryfrom}
          onChangeText={this.handleSummaryfrom} style={styles.box}/>
         </View>
         <View style={styles.rowdate}>
         < TextInput placeholder='Date To dd/mm/yyy' value={this.state.summaryto} onChangeText={this.handleSummaryto}
          style={styles.box}/>
         </View>
         </View>
         <View>
             <TextInput multiline maxLength={200} placeholder='Summary' value={this.state.summary} onChangeText={this.handleSummary} 
             style={styles.box1} required />
         </View>
          </View>
          
<View style={styles.row}>
          <View style={styles.btnview}>
              <TouchableOpacity onPress={this.handleSaveContinue} style={styles.updbtn}><Text style={styles.btntxt}>Save and Continue</Text></TouchableOpacity>
          </View>
       {/*   
          <View style={styles.btnview}>
              <TouchableOpacity onPress={this.handledraft} style={styles.updbtn}><Text style={styles.btntxt}>Save as draft</Text></TouchableOpacity>
          </View>
*/
       }
</View>
        </View>
        <View style={{height:60}}/>
        </ScrollView>
    )

}
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
        borderBottomWidth:2,
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