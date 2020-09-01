import React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from './src/screens/home'
import Chat from './src/screens/chat'
import Settings from './src/screens/settings'

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={navigation.openDrawer}
        title="Open navigation drawer"
      />
      <Button
        onPress={() => navigation.navigate('Notifications',{me:'ff'})}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation, route }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={navigation.openDrawer}
        title="Open navigation drawer"
      />
      <Button
        onPress={() => navigation.goBack()}
        title="Go back home" 
      />
      <Text>
      {route.params.me}
      </Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Chat" component={Chat} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Notifications b" component={NotificationsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}