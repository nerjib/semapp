
import React from "react";
import { View, StyleSheet, Text ,Button, AsyncStorage} from "react-native";




const Contact = ({navigation}) => {

  const logout=()=>{
    AsyncStorage.setItem('login','hhh')
    AsyncStorage.setItem('type','')
  
    AsyncStorage.removeItem('login').then(res=>{
     AsyncStorage.removeItem('open')  
       AsyncStorage.removeItem('closed')
       AsyncStorage.removeItem('feedback')
       AsyncStorage.removeItem('openevents')
       AsyncStorage.removeItem('followup')
  })
  navigation.navigate('Home')
  }
  return (
    <View style={styles.center}>
        <Text>Payment related issues</Text>
      <Text style={styles.txt}>07069354343</Text>
      <Text>Sanitation related issues</Text>
      <Text style={styles.txt}>08035220501</Text>
      <Text>Water related issues</Text>
      <Text style={styles.txt}>07062136510</Text>
    { <Button title='Logout' onPress={logout}>

//     </Button>
  }
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  txt:{
    fontSize:22
  }
});

export default Contact;