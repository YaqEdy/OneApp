import React,{Component} from 'react';
import {View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../containers/pages/Home';
import Crud from '../../containers/pages/Crud';
import Login from '../../containers/pages/Login';
import Location from '../../containers/pages/Location';

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: 'purple',
          },
          headerTintColor: '#ffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Crud" component={Crud} options={{headerShown:true,title:"my CRUD1"}}/>
        <Stack.Screen name="Location" component={Location} options={{headerShown:true,title:"Absensi"}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

