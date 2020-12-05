import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert, ScrollView, Text } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'

export default function Firelesson1() {
  const [playing, setPlaying] = useState(false);
  const [exerciseView, setExerciseView] = useState('none');
  const [q1, setQ1] = useState(0);
  const [q2, setQ2] = useState(0);
  const [q3, setQ4] = useState(0);



  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
const handleExercise = ()=>{
  setExerciseView('flex')
}

const handleSubmit=()=>{
  let total=(((q1)+Number(q2))/2) * 100;
  alert( `Your score is ${total}%`)  
}

const radio_props = [
  {label: 'yes', value:1},
  {label: 'no', value:0}
]
  return (
    <ScrollView>
    <View>
      <YoutubePlayer
        height={300}
        play={playing}
       
        videoId={"cw2wQG-AWh8"}
       // videoId={"iee2TATGMyI"}
        onChangeState={onStateChange}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
<View style={{margin:10}}>
      <Button  title={'Exercise'} onPress={handleExercise} />
</View>
    </View>

    <View style={{display:exerciseView}}>
      <View style={{marginLeft:20}}>
    <Text>1. Below are the major cause of domestic fire except</Text>
               <RadioForm 
        radio_props={radio_props}
        formHorizontal={false}
        labelHorizontal={true}
        initial={-1}
        animation={false}
        onPress={(value)=>{setQ1(value)}}
        />
        </View>
        <View style={{marginLeft:20}}>
         <Text>2. Who should you call in terms of fire emergency?</Text>
         <View  >
               <RadioForm 
        radio_props={[
           {label: ' LG Cordinator', value:1},
           {label: 'Village head', value:0},
           {label: 'Supervisor', value:0},
           {label: 'LG chairman', value:0},

      ]}
        formHorizontal={false}
        labelHorizontal={true}
        initial={-1}
        animation={false}
       onPress={(value)=>{setQ2(value)}}
 />
 </View>
    </View>

    <View style={{margin:10}}>
      <Button  title={'Submit'} onPress={handleSubmit} />
</View>

    </View>
    </ScrollView>
  );
}