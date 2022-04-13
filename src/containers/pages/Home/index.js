import React,{Component} from 'react';
import {
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import * as Keychain from 'react-native-keychain';
import Axios from 'axios';
import DeviceInfo from 'react-native-device-info';

import G from '../../components/Global';
import Ses from '../../../config/Ses';
import RunBack from '../../../config/Ses/RunBackground';
import Load from '../../components/Loading';

import * as api from '../../../config/API';
import Search from '../../components/Search';
import Hay from '../../components/Hay';
import TopContent from '../Home/TopContent';
import MainFeature from '../Home/MainFeature';
import ButtomMenu from '../../components/ButtomMenu';

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state={
        loading:false,
        device_id:null
      }
  }
  componentDidMount(){
    this._getDataAsync();
    this._getSes();
    // getDataAll(this);
    RunBack.goRunBack(this);
  }

  _getDataAsync = async () => {
    try {
      this.state.device_id= await DeviceInfo.getAndroidId();
      // deviceJSON.androidId = await DeviceInfo.getAndroidId();
      // deviceJSON.brand = await DeviceInfo.getBrand();
      // deviceJSON.DeviceId = await DeviceInfo.getDeviceId();
      // deviceJSON.DeviceName = await DeviceInfo.getDeviceName();
      // console.log("Data: ",deviceJSON);
    } catch (e) {
      console.log("Error: ",e);
    }
  }

  _getSes(){
    // console.log("Home1 ",Ses.getCurrentUser().islogin);
    if(!Ses.getCurrentUser().islogin){
      Ses.getSes().then((s)=>{
        if(!s){
          this.props.navigation.push('Login');
        // console.log("Home2 ",s);
        }
      });
    }
    if(!Ses.getCurrentUser().isOTP){
      this.props.navigation.push('Login');
    }
  }
  
  render(){
    // this.getDataAsync();
    // this.getSes();
    if(this.state.loading){
      return(
          <Load/>
      );
    }else{
      return (
        <View style={{flex:1}}>
          <View style={{ backgroundColor:'white',flex:1,paddingTop:15}}>
            {/* <Search/> */}
            <Hay/>
            <TopContent/>
            <MainFeature/>
          </View>
          <ButtomMenu 
          onHome={()=>G.goToScreen(this,1)}
          onOrders={()=>G.goToScreen(this,2)}
          onAbsen={()=>G.goToScreen(this,3)}
          onHelp={()=>G.goToScreen(this,4)}
          onLogout={()=>logout(this)}
          />
        </View>
      );  
    }
  }
}

export const logout=(t)=>{
  t.setState({loading: true});//spinner
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
          Ses.setOTP(false);
          t.props.navigation.push('Login');
        }
        ToastAndroid.showWithGravity(res.data.message,ToastAndroid.SHORT,ToastAndroid.CENTER);
    })
    .finally(f=>{
      t.setState({loading: false});//spinner
    })
    .catch(error=>{
        t.setState({loading: false});//spinner
        ToastAndroid.showWithGravity(error,ToastAndroid.SHORT,ToastAndroid.CENTER);
    })
}

export const getDataAll=(t)=>{
  // console.log("getDataAll",Ses.getCurrentUser().id_user);
  Axios({
    url: `${api.GetUrl()}/Users/getDataAll/${Ses.getCurrentUser().id_user}`,
    headers: {
        'Content-Type': 'application/json'
        ,'Token' :`${api.GetToken()}`
    },
    method: 'GET',
    })
    .then(res=>{
        if(Boolean(res.data.success)){
            const obj=JSON.parse(JSON.stringify(res.data.data[0]));
            Ses.setCurrentUser(obj);
            // console.log("OBJ: ",obj);
            if(t.state.device_id!=obj.device_id){
              Keychain.resetGenericPassword();
              t.props.navigation.push('Login');
              if(obj.device_id!=null){
                ToastAndroid.showWithGravity(res.data.msgDeviceId,ToastAndroid.LONG,ToastAndroid.CENTER);
              }
            }
        }else{
          console.log("OBJ: 2");
          getDataAll(t);
        }
    })
    .catch(error=>{
      console.log("OBJ: 3");
      getDataAll(t);
    })
}

const styles=StyleSheet.create({});