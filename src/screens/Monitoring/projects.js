import React, {useState, useEffect} from 'react';
import {Button,TextInput, View, Text,TouchableOpacity, StyleSheet,ScrollView,} from 'react-native';
import {Actions} from 'react-native-router-flux';
import axios from 'axios';
//import RNPickerSelect from 'react-native-picker-select'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Picker} from '@react-native-community/picker'



const Projects =({navigation})=>{
let [ data, setData] = useState('')
let [projects, setProjects] = useState('')
let [phase, setPhase] = useState('6d')
let [lot, setLot] = useState('')
let [title, setTitle] = useState('Community Borehole')
let [lga, setLga] = useState('Birnin Gwari')
let [mid, setmid] = useState('')
let [mon, setmon] = useState('')


const handleTitle=(e)=>{
   setTitle(e)
}

const handlePhase=(e)=>{
   setPhase(e)
}

const handleLga=(e)=>{
   setLga(e)
}

useEffect(()=>{
    axios.get('https://ruwassa.herokuapp.com/api/v1/projects/completeprojects/all')
    .then(res=>{
        AsyncStorage.setItem('projects', JSON.stringify(res.data))
    })
    AsyncStorage.getItem('projects').then(val=>{
 //       alert(JSON.parse(val)[0].title)
        const projectsVal = JSON.parse(val)
        setProjects(projectsVal)
    })
    AsyncStorage.getItem('uid').then(val=>{
       // alert(JSON.parse(val)[0].title)
      //  const projectsVal = JSON.parse(val)
      setmid(val)
    })

    AsyncStorage.getItem('uid').then(val=>{
        // alert(JSON.parse(val)[0].title)
       //  const projectsVal = JSON.parse(val)
       setmon(val)
     })

}, [])

const  GotoReport=(e,title,community,lga,company,ward,lot)=>{
   // return alert(lot)
    //    alert(this.state.mid)
    if(title=='Motorized Solar Borehole'){
    navigation.navigate('monsmbh',{pid:e,mid,title,community,lga,mon,company,ward,lot})
    }else if(title=='Community Borehole'){
        navigation.navigate('monhpbh',{pid:e,mid,title,community,lga,mon,company,ward,lot})
        }
        else if(title=='Sanitation'){
         //   alert('kf')
         //  Actions.monvip()
            navigation.navigate('monvip',{pid:e,mid,title,community,lga,mon,company,ward,lot})
            }else if(title=='Force Lift'){
                navigation.navigate('monhpbh',{pid:e,mid,title,community,lga,mon,company,ward,lot})
                }
}


let row=[]
if(projects){
Object.keys(projects).map((e,i)=>{
    if(projects[e].title===title && projects[e].lga===lga && projects[e].phase===phase){
row.push(<TouchableOpacity key={i} style={styles.row} onPress={()=>GotoReport(projects[e].id,
projects[e].title,projects[e].community,projects[e].lga,projects[e].company,projects[e].ward,
projects[e].lot)}>

            <Text ><Text style={styles.txtl}>{projects[e].community}<Text style={styles.sep}>|</Text>                
            </Text>
            <Text style={styles.txtl}>{projects[e].ward}<Text style={styles.sep}>|</Text>
            
            </Text>
            <Text style={styles.txtl}>{projects[e].lga}<Text style={styles.sep}></Text>
            
            </Text>
            </Text>
            <Text  style={styles.txtname}>
            <Text  > {projects[e].title} </Text>
            <Text  style={styles.txtphase} > Phase {projects[e].phase} </Text>
            <Text  style={styles.txtphase} > Phase {projects[e].company} </Text>

            </Text>
            
</TouchableOpacity>)
    }
})
}


    let facility=['Community Borehole', 'Motorized Solar Borehole', 'Force Lift', 'Sanitation']
    let lgas=['Birnin Gwari','Giwa','Igabi','Ikara','Jaba','Jemaa','Kachia',
    'Kaduna North','Kaduna South','Kagarko','kajuru','Kaura','Kauru','Kubau',
    'Kudan','Lere','Makarfi','Sabon Gari','Sanga','Soba','Zangon Kataf','Zaria']
  
    return(

        <ScrollView>
        <View>
            <Text>
                {title+ ' '+ lga+ ' '+ phase +' '+projects.length}
            </Text>
            <View>
                <Picker style={{borderWidth:4,borderColor:'gray', height: 50, width: 150}}
                 selectedValue = {title}  onValueChange = {handleTitle}>
{facility.map(e=>
               <Picker.Item label = {e} value = {e} />
  
)}
            </Picker>

                  </View>
                  <View>
                     <Text>Phase</Text>
   {     
<Picker style={{borderWidth:4,borderColor:'gray', height: 50, width: 150}}
                 selectedValue = {phase}  onValueChange = {handlePhase}>
               <Picker.Item label = {'Phase 6C'} value = {'6'} />
               <Picker.Item label = {'Phase 6D'} value = {'6d'} />
               <Picker.Item label = {'Phase 7'} value = {'7'} />
               <Picker.Item label = {'Covid 19 Support'} value = {'covid19'} />
               
            </Picker>
            }
      
                  </View>
                  <View>
                     
<Text >Search By LGA</Text>
<Picker style={{borderWidth:4,borderColor:'gray', height: 50, width: 150}} selectedValue = {lga}  
onValueChange = {handleLga}>
{lgas.map(e=>
               <Picker.Item label = {e} value = {e} />
  
)}
</Picker>

                  </View>
            {row
            }
         {//}   <Button onPress={this.search} title='search'/>
}
<View style={{height:70}}/>
        </View>
        </ScrollView>
    )


}

export default Projects

/*
export default class Projects extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:'',
            projects:'',
            phase:'',
            lot:'',
            title: '',
            lga:'',
            mid:'',
            mon:'',
           
        }
    }


    componentDidMount=()=>{
        axios.get('https://ruwassa.herokuapp.com/api/v1/projects/completeprojects/all')
        .then(res=>{
            AsyncStorage.setItem('projects', JSON.stringify(res.data))
        })
        AsyncStorage.getItem('projects').then(val=>{
     //       alert(JSON.parse(val)[0].title)
            const projectsVal = JSON.parse(val)
            this.setState({
                projects:projectsVal
            })
        })
        AsyncStorage.getItem('uid').then(val=>{
           // alert(JSON.parse(val)[0].title)
          //  const projectsVal = JSON.parse(val)
            this.setState({
                mid:val
            })
        })

        AsyncStorage.getItem('uid').then(val=>{
            // alert(JSON.parse(val)[0].title)
           //  const projectsVal = JSON.parse(val)
             this.setState({
                 mon:val
             })
         })
        
    }

    search=()=>{
        AsyncStorage.getItem('projects').then(val=>{
            alert(JSON.parse(val)[0].title)
            const projectsVal = JSON.parse(val)
            this.setState({
                projects:projectsVal
            })
        })
        alert('ser')
    }
    handleTitle=(e)=>{
        this.setState({
            title: e
        })
    }
    
    handlePhase=(e)=>{
        this.setState({
            phase: e
        })
    }
    
    handleLga=(e)=>{
        this.setState({
            lga: e
        })
    }
    GotoReport=(e,title,community,lga,company,ward,lot)=>{
    //    alert(this.state.mid)
    if(title=='Motorized Solar Borehole'){
    Actions.sol({pid:e,mid:this.state.mid,title,community,lga,mon:this.state.mon,company,ward,lot})
    }else if(title=='Community Borehole'){
        Actions.hpbh({pid:e,mid:this.state.mid,title,community,lga,mon:this.state.mon,company,ward,lot})
        }
        else if(title=='Sanitation'){
            Actions.san({pid:e,mid:this.state.mid,title,community,lga,mon:this.state.mon,company,ward,lot})
            }else if(title=='Force Lift'){
                Actions.hpbh({pid:e,mid:this.state.mid,title,community,lga,mon:this.state.mon,company,ward,lot})
                }
}
render(){
    let row=[]
    if(this.state.projects){
    Object.keys(this.state.projects).map((e,i)=>{
        if(this.state.projects[e].title==this.state.title && this.state.projects[e].lga==this.state.lga && this.state.projects[e].phase==this.state.phase){
    row.push(<TouchableOpacity key={i} style={styles.row} onPress={()=>this.GotoReport(this.state.projects[e].id,this.state.projects[e].title,this.state.projects[e].community,this.state.projects[e].lga,this.state.projects[e].company,this.state.projects[e].ward,this.state.projects[e].lot)}>
   
                <Text ><Text style={styles.txtl}>{this.state.projects[e].community}<Text style={styles.sep}>|</Text>                
                </Text>
                <Text style={styles.txtl}>{this.state.projects[e].ward}<Text style={styles.sep}>|</Text>
                
                </Text>
                <Text style={styles.txtl}>{this.state.projects[e].lga}<Text style={styles.sep}></Text>
                
                </Text>
                </Text>
                <Text  style={styles.txtname}>
                <Text  > {this.state.projects[e].title} </Text>
                <Text  style={styles.txtphase} > Phase {this.state.projects[e].phase} </Text>
                <Text  style={styles.txtphase} > Phase {this.state.projects[e].company} </Text>

                </Text>
                
    </TouchableOpacity>)
        }
    })
    }
    let facility=['Community Borehole', 'Motorized Solar Borehole', 'Force Lift', 'Sanitation']
    let lgas=['Birnin Gwari','Giwa','Igabi','Ikara','Jaba','Jemaa','Kachia',
    'Kaduna North','Kaduna South','Kagarko','Kajuru','Kaura','Kauru','Kubau',
    'Kudan','Lere','Makarfi','Sabon Gari','Sanga','Soba','Zangon Kataf','Zaria']
  
    return(

        <ScrollView>
        <View>
            <Text>
                {this.state.title+ ' '+ this.state.lga+ ' '+ this.state.phase}
            </Text>
            <View>
                <Picker style={{borderWidth:4,borderColor:'gray', height: 50, width: 150}}
                 selectedValue = {this.state.title}  onValueChange = {this.handleTitle}>
{facility.map(e=>
               <Picker.Item label = {e} value = {e} />
  
)}
            </Picker>

                  </View>
                  <View>
                     <Text>Phase</Text>
   {     
<Picker style={{borderWidth:4,borderColor:'gray', height: 50, width: 150}}
                 selectedValue = {this.state.title}  onValueChange = {this.handleTitle}>
               <Picker.Item label = {'Phase 6C'} value = {'6'} />
               <Picker.Item label = {'Phase 6D'} value = {'6D'} />
               <Picker.Item label = {'Phase 7'} value = {'7'} />
               <Picker.Item label = {'Covid 19 Support'} value = {'covid19'} />
               
            </Picker>
            }
      
                  </View>
                  <View>
                     
<Text >Search By LGA</Text>
<Picker style={{borderWidth:4,borderColor:'gray', height: 50, width: 150}} selectedValue = {this.state.lga}  onValueChange = {this.handleLga}>
{lgas.map(e=>
               <Picker.Item label = {e} value = {e} />
  
)}
</Picker>

                  </View>
            {row}
         {//}   <Button onPress={this.search} title='search'/>
}
<View style={{height:70}}/>
        </View>
        </ScrollView>
    )
}

}*/
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
       // justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#00e9f9',
        //height:'100%',
        width:'100%',
        marginTop:30,
      //  marginBottom:30
    
    },
    
    row:{
     
        marginTop:2,
        marginLeft:10,
        marginRight:10,
     //   height:60,
        padding:0,
        alignContent:'center',
        backgroundColor:'#00dff2',
        borderRadius:4

    },
    txtname:{
        flexDirection:'column',
        textAlign:'left',
        fontSize:15,
        color:'white',
        alignItems:'center',

    },
    txtphase:{
         textAlign:'right',
        fontSize:15,
        color:'white',
        padding:50
    },
    txtloc:{
        flexDirection:'column',
        textAlign:'right',
        alignItems:'center',
       fontSize:12,
       color:'white'
   },
   txtl:{
    fontSize:30,
    color:'white'
},
   txtstat:{
       margin:20,
       color:'white'
   },
   sep:{
       color:'#b1fff5',
       fontSize:20

   }

})
