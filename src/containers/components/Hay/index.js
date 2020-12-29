import React,{Component, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput
} from 'react-native';
import {sty} from './styles';
//FA
import { FontAwesomeIcon  } from '@fortawesome/react-native-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';

import Ses from '../../../config/Ses';

export default class Search extends Component{
  constructor(props){
    super(props);
    this.state={
        nama:""
    }
  }
  componentDidMount(){
    this._getSes();
  }
  _getSes(){
    if(this.state.nama==""){
      Ses.getSes().then((s)=>{
        if(s){
         this.setState({
           nama:Ses.getCurrentUser().nama
         })
        }
      });
    }
  }
  render(){
      return (
        <View style={sty.container}>
          <View style={sty.view1}>
            <Text style={sty.hay}>{"Hay "+this.state.nama}</Text>
            <FontAwesomeIcon  icon={fa.faCertificate} size={25} color={"orange"} style={{position:'absolute'}}/>
          </View>
          {/* <View style={{width:35,alignItems:'center',justifyContent:'center'}}> 
            <Image style={{}} source={iconeHome} />
          </View> */}
        </View>
      );  
  }
}

const styles=StyleSheet.create({
  cari:{
    paddingTop:3,
    height:40,
    fontSize:13,
    paddingLeft:35,
    paddingRight:20,
    backgroundColor:'white',
    marginRight:18
  }
  
});