import React,{Component} from 'react';
import {
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import Axios from 'axios';
import DeviceInfo from 'react-native-device-info';

import Ses from '../../../config/Ses';

import * as api from '../../../config/API';
import Search from '../../components/Search';
import Hay from '../../components/Hay';
import TopContent from '../Home/TopContent';
import MainFeature from '../Home/MainFeature';
import ButtomMenu from '../../components/ButtomMenu';

export default class Home extends Component{
  getDataAsync = async () => {
    let deviceJSON = {};
    try {
      deviceJSON.androidId = await DeviceInfo.getAndroidId();
      deviceJSON.brand = await DeviceInfo.getBrand();
      deviceJSON.DeviceId = await DeviceInfo.getDeviceId();
      deviceJSON.DeviceName = await DeviceInfo.getDeviceName();
      console.log("Data: ",deviceJSON);
    } catch (e) {
      console.log("Error: ",e);
    }
  }

  getSes(){
    // console.log("Home1 ",Ses.getCurrentUser().islogin);
    if(!Ses.getCurrentUser().islogin){
      Ses.getSes().then((s)=>{
        if(!s){
          this.props.navigation.push('Login');
        // console.log("Home2 ",s);
        }
      });
    }
    
  }
  
    render(){
      this.getDataAsync();
      this.getSes();

      return (
        <View style={{flex:1}}>
          <View style={{ backgroundColor:'white',flex:1,paddingTop:15}}>
            {/* <Search/> */}
            <Hay/>
            <TopContent/>
            <MainFeature/>
          </View>
          <ButtomMenu 
          onHome={()=>this.props.navigation.push('Home')}
          onOrders={()=>this.props.navigation.push('ListAbsensi')}
          onAbsen={()=>this.props.navigation.push('Location')}
          onHelp={()=>this.props.navigation.push('ScanQR')}
          onLogout={()=>logout(this)}
          />
        </View>
      );  
    }
}

export const logout=(t)=>{
  Axios({
    url: `${api.GetUrl()}/Login/logout/${Ses.getCurrentUser().id_user}`,
        headers: {
            'Content-Type': 'application/json'
            ,'Token' :`${api.GetToken()}`
        },
        method: 'Post',
        // data: JSON.stringify(data),
    })
    .then(res=>{
        if(Boolean(res.data.success)){
          Keychain.resetGenericPassword();
          Ses.setResetCurrentUser();
          t.props.navigation.push('Login');
        }
        ToastAndroid.showWithGravity(res.data.message,ToastAndroid.SHORT,ToastAndroid.CENTER);
    })

}

const styles=StyleSheet.create({});