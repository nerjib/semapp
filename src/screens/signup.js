import React, { Components } from 'react';
import {AsyncStorage, View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView} from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
import ProgressLoader from 'rn-progress-loader' ;
import {Picker} from '@react-native-community/picker'



export default class Signup extends React.Component {
state={
email:'',
password:'',
password2: '',
pword: '',
lga: 'Birnin Gwari',
fname:'',
lname: '',
oname:'',
phone: '',
id:'',
visible: false,
warning:'',
btn:false,
gender:'',
address:''
}


componentDidMount=()=>{
    AsyncStorage.getItem('login').then((val)=>{
        if(val=='granted'){
            this.props.navigation.navigate('Home');
        }
    })
}
handleChangePhone =(text)=>{
this.setState({
phone: text
})
}
   handleChangePass = (text)=>{
       this.setState({
           password:text
       })
   }
   handleChangePass2 = (text)=>{
    this.setState({
        password2:text
    })
    if(this.state.password==text){
        this.setState({pword:this.state.password, warning:'', btn:true})
    }else{
        this.setState({warning:'Password not match', btn:false})
    }
}
handleChangeFname = (text)=>{
    this.setState({
        fname: text
    })
}
handleChangeLname = (text)=>{
    this.setState({
        lname: text
    })
}
handleChangeOname = (text)=>{
    this.setState({
        oname: text
    })
}

handleChangeEmail = (text)=>{
    this.setState({
        email: text
    })
}

  goToHome=(userid)=>{
    Actions.Home({userid})
}
    saveUserId=async userId=>{
        try {
            await AsyncStorage.setItem('userId', userId);
      1  }catch(error) {
            alert(error.message)
        }
    }

SignUp=()=>{
  //alert('HelloEmail: '+a+' check your  Password and try again '+b)

this.setState({
    visible:true
})
const data = {
    phone: this.state.phone,
    pword: this.state.pword,
    fname: this.state.fname,
    lname: this.state.lname,
    oname: this.state.oname,
    email: this.state.email,
    lga: this.state.lga,
    ward: this.state.ward,
    gender: this.state.gender,
    address: this.state.address,
    role:''
}

axios.post('https://ruwasa.herokuapp.com/api/v1/users',data).then(res=>{
   //     alert(res.data.data.phone)
    //  AsyncStorage.setItem('uid', (res.data.data.id))
      // AsyncStorage.setItem('mon', (res.data.data.first_name+' '+res.data.data.last_name))
     //  AsyncStorage.setItem('email', JSON.stringify(res.data[0].email))
       //AsyncStorage.setItem('phone', (res.data.data.phone))
      //AsyncStorage.setItem('login','granted1')
  this.props.navigation.navigate('Login');
      alert(res.data[0].id)
     this.setState({
        visible:false
    })
   }  
    ).catch(error=>{
        this.setState({
            visible:false
        })
        alert(error)
})
   //alert('wrong combination')


}

check=()=>{
    AsyncStorage.getItem('email').then((val)=>alert(val))
    AsyncStorage.getItem('pass').then((val)=>alert(val))
Actions.async();
}

updateLGA=(text)=>{
        this.setState({
            lga:text
        })
}
handleChangeWord=(text)=>{
    this.setState({
        ward:text
    })
}
handleChangeGender=(text)=>{
    this.setState({
        gender:text
    })
}
handleChangeAddress=(text)=>{
    this.setState({
        address:text
    })
}
render(){
    const lgas=['Birnin Gwari','Giwa','Igabi','Ikara','Jaba','Jemaa','Kachia',
    'Kaduna North','Kaduna South','Kagarko','Kajuru','Kaura','Kauru','Kubau',
    'Kudan','Lere','Makarfi','Sabon Gari','Sanga','Soba','Zangon Kataf','Zaria']
    const gender=['Male','Female']
    return(
        <ScrollView>
        <View style={styles.container}>

            
        <TextInput style={styles.input} 
            underlineColorAndroid ="transparent"
            placeholder="First Name"
            onChangeText={this.handleChangeFname}
              // password={true}         
            /> 
            <TextInput style={styles.input} 
            underlineColorAndroid ="transparent"
            placeholder="Last Name"
            onChangeText={this.handleChangeLname}
              // password={true}         
            /> 
               <TextInput style={styles.input} 
            underlineColorAndroid ="transparent"
            placeholder="Other Name"
            onChangeText={this.handleChangeOname}
              // password={true}         
            /> 

            <TextInput style={styles.input}
            underlineColorAndroid ="transparent"
            placeholder="Phone number"
            onChangeText={this.handleChangePhone}
            />
    <TextInput style={styles.input}
            underlineColorAndroid ="transparent"
            placeholder="Email"
            onChangeText={this.handleChangeEmail}
            />
     
    <Picker style={{borderWidth:4,borderColor:'gray', height: 50, width: 150}} selectedValue = {this.state.gender}  onValueChange = {this.handleChangeGender}>
{gender.map(e=><Picker.Item label = {e} value = {e} />  
)}
            </Picker>
            <Text>LGA</Text>  
            <Picker style={{borderWidth:4,borderColor:'gray', height: 50, width: 150}} selectedValue = {this.state.lga}  onValueChange = {this.updateLGA}>
{lgas.map(e=>  <Picker.Item label = {e} value = {e} />
  )}          
    </Picker>
      {/*}      <TextInput style={styles.input} 
            underlineColorAndroid ="transparent"
            placeholder="Ward"
            onChangeText={this.handleChangeWord}
            secureTextEntry={true}
              // password={true}         
            />  
              <TextInput style={styles.input} 
            underlineColorAndroid ="transparent"
            placeholder="Address"
            onChangeText={this.handleChangeAddress}
            secureTextEntry={true}
              // password={true}         
            />  


            <TextInput style={styles.input} 
            underlineColorAndroid ="transparent"
            placeholder="Password"
            onChangeText={this.handleChangePass}
            secureTextEntry={true}
              // password={true}         
            /> 
            <TextInput style={styles.input} 
            underlineColorAndroid ="transparent"
            placeholder="Password"
            onChangeText={this.handleChangePass2}
            secureTextEntry={true}
              // password={true}         
            />     
*/}   
            <Text>{this.state.warning}</Text>
       {     <TouchableOpacity style={styles.submitbutton}
            onPress={()=>this.SignUp()}>
            <Text style={styles.text}> Sign up</Text>

            </TouchableOpacity>}

           <View style={{flexDirection:'row', marginLeft:10}}>
               <Text>
                <Text>I already have account </Text>
                <Text onPress={()=>{this.props.navigation.navigate('Signin')}} style={{color:'green'}}>Login here</Text>
                </Text>
           </View>
            <ProgressLoader visible={this.state.visible} isModal={true} isHUD={true}
            hudColor={"#000000"} color={"#FFFFFF"}/>
            
        </View>
        <View style={{height:40}}/>
        </ScrollView>
    )
}
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 23
    },
    input:{
        margin:15,
        height:40,
        borderColor: 'grey',
        borderWidth:1
    },
    submitbutton:{
        padding:10,
        margin:15,
        height:42,
        alignItems:'center',
        borderRadius:7,
        backgroundColor:'#00a1ff',
        color: 'white',
         justifyContent:'center'
    },
    text:{
        color:'white',
        fontSize:25,
        
    }

})