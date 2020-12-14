import React,{Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import * as Keychain from 'react-native-keychain';

import Search from '../../components/Search';
import TopContent from '../Home/TopContent';
import MainFeature from '../Home/MainFeature';
import ButtomMenu from '../../components/ButtomMenu';

export default class Home extends Component{
  async getCek() {
    try {
        // Retrieve the credentials
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          const obj=JSON.parse(credentials.password);
            console.log("Home ", credentials.username,obj.nama);
        }else {
            this.props.navigation.push('Login');
            console.log('Home: No credentials stored '+credentials);
        }
    } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
    }
    // await Keychain.resetGenericPassword();
  }
    render(){
      this.getCek();
        return (
          <View style={{flex:1}}>
            <View style={{ backgroundColor:'white',flex:1,paddingTop:15}}>
              <Search/>
              <TopContent/>
              <MainFeature/>
            </View>
            <ButtomMenu 
            onHome={()=>this.props.navigation.push('Home')}
            onOrders={()=>this.props.navigation.push('Crud')}
            onAbsen={()=>this.props.navigation.push('Location')}
            onHelp={()=>this.props.navigation.push('Login')}
            onLogout={()=>logout(this)}
            />
          </View>
        );  
    }
}


export const logout=(t)=>{
  Keychain.resetGenericPassword();
  t.props.navigation.push('Login');
}
const styles=StyleSheet.create({});