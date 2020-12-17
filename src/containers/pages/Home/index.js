import React,{Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import * as Keychain from 'react-native-keychain';

import Ses from '../../../config/Ses';

import Search from '../../components/Search';
import Hay from '../../components/Hay';
import TopContent from '../Home/TopContent';
import MainFeature from '../Home/MainFeature';
import ButtomMenu from '../../components/ButtomMenu';

export default class Home extends Component{
  getSes(){
    // console.log("Home1 ",Ses.getCurrentUser().islogin);
    if(!Ses.getCurrentUser().islogin){
      Ses.getSes("home").then((s)=>{
        if(!s){
          this.props.navigation.push('Login');
        // console.log("Home2 ",s);
        }
      });
    }
    
  }
  
    render(){
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
          onOrders={()=>this.props.navigation.push('Crud')}
          onAbsen={()=>this.props.navigation.push('Location')}
          onHelp={()=>this.props.navigation.push('ScanQR')}
          onLogout={()=>logout(this)}
          />
        </View>
      );  
    }
}

export const logout=(t)=>{
  Keychain.resetGenericPassword();
  Ses.setResetCurrentUser();
  t.props.navigation.push('Login');
}
const styles=StyleSheet.create({});