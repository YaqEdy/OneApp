import React,{Component} from 'react';
import {View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../Splash';
import Home from '../../containers/pages/Home';
import ListAbsensi from '../../containers/pages/ListAbsensi';
import Crud from '../../containers/pages/Crud';
import Login from '../../containers/pages/Login';
import Otp from '../../containers/pages/Login/otp';
import Location from '../../containers/pages/Location';
import ScanQR from '../../containers/pages/ScanQR';

const Stack = createStackNavigator();
export default class App extends Component{
  constructor(props){
    super(props);
    this.state={
      splash:true
    }
  }

  _taskSplash = async() => {
    setTimeout(
        () => { 
          this.setState({
           splash:false
          });
      },1
    )
  }

  async componentDidMount() {
    await this._taskSplash();
  }

  render(){
    if(this.state.splash){
      return (
        <Splash/>
      );
    }else{
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
            <Stack.Screen name="ListAbsensi" component={ListAbsensi} options={{headerShown:true,title:"Daftar Absensi"}}/>
            <Stack.Screen name="Location" component={Location} options={{headerShown:true,title:"Absensi"}}/>
            <Stack.Screen name="ScanQR" component={ScanQR} options={{headerShown:true,title:"Scan QR"}}/>
            <Stack.Screen name="OTP" component={Otp} options={{headerShown:false,title:"OTP"}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      );  
    }
    
  }
}

