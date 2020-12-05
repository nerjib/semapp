import React, { Components } from 'react';
import {Button,Keyboard,Image,Dimensions, AsyncStorage,KeyboardAvoidingView, ScrollView, View, Text, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import ProgressLoader from 'rn-progress-loader'


export default class WeeklyForm3 extends React.Component {
constructor(props){
    super(props)
    const {params} = this.props.route
    this.state={
       pid: params.pid,
       uid: params.uid,
        conclusion: '',
        followup: '',
        compliance: '' ,
      visible:false
    }
}


  componentDidMount(){
    const {params} = this.props.route

    axios.get('https://ruwassa.herokuapp.com/api/v1/projects/'+params.pid)
    .then(res=>{
        this.setState({
            data: res.data[0],
          })
        }).catch(error=>{alert(error.message)})
       
        
        
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



handleSaveContinue=()=>{
    const {params} = this.props.route

this.setState({
    visible: true
})
    let    obj = {
        rid: params.rid,
        pid: params.pid,
        uid:  params.uid,
        conclusion: this.state.conclusion,
        followup: this.state.followup,
        compliance: this.state.compliance,
            }
        
           axios.put('https://ruwassa.herokuapp.com/api/v1/reports/submitted/weekly/'+params.rid,obj)
            .then(res=>{
               // alert('yay'+res.data[0].id)
               this.setState({visible:false})
   this.props.navigation.navigate('weeklyform4',{uid:params.uid,pid:params.pid, rid: params.rid})
            }).catch(error=>{alert(error.message)
            this.setState({visible:false})
            }) 
}
render() {

    return (

        <ScrollView style={styles.container}>
        <View >
        <ProgressLoader visible={this.state.visible} isModal={true} isHUD={true}
            hudColor={"#000000"} color={"#FFFFFF"}/>

          <View>
          <KeyboardAvoidingView behavior='padding' enabled keyboardVerticalOffset={0}>
         <View>
             <Text style={styles.txt}>Conclusion and Recommendation</Text>
        <View style={styles.row}>
             <TextInput multiline placeholder='Conclusion' value={this.state.conclusion} onChangeText={this.handleConclusion} 
             style={styles.box1}/>
         </View>
         </View>
         </KeyboardAvoidingView>
          </View>

          <View>
          <KeyboardAvoidingView behavior='padding' enabled keyboardVerticalOffset={0}>
         <View>
             <Text style={styles.txt}>Planned Follow-up activities for next week</Text>
        <View style={styles.row}>
             <TextInput placeholder='Followup' value={this.state.followup} onChangeText={this.handleFollowup} 
             style={styles.box1}/>
         </View>
         </View>
         <View>
             <Text style={styles.txt}>Is work Progressing according to submitted plan?</Text>
        <View style={styles.row}>
             <TextInput placeholder='Compliance' value={this.state.compliance} onChangeText={this.handleCompliance} 
             style={styles.box1}/>
         </View>
         </View>
         </KeyboardAvoidingView>
          </View>
        


<View style={styles.row}>
          <View style={styles.btnview}>
              <TouchableOpacity onPress={this.handleSaveContinue} style={styles.updbtn}><Text style={styles.btntxt}>Save and Continue</Text></TouchableOpacity>
          </View>
</View>
        </View>
        <View style={{height:50}}/>
        </ScrollView>
    )

}
}

const styles = StyleSheet.create ({
    container:{
        flex:1,
        paddingTop:15,
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
        borderWidth:2,
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
    txt:{
      fontSize:20,
      marginTop:15,
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
        height:50
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