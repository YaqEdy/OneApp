import React,{Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  ScrollView,
  ToastAndroid,
  Alert,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Axios from 'axios';
import * as Keychain from 'react-native-keychain';
import Load from '../../components/Loading';

import * as api from '../../../config/API';
import Ses from '../../../config/Ses';

export default class Otp extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            id_user:null,
            otp1:null,
            otp2:null,
            otp3:null,
            otp4:null,
            otp5:null
        }
    }
    componentDidMount(){
        this._getSes();
      }
      _getSes(){
        if(this.state.id_user==null){
          Ses.getSes().then((s)=>{
            if(s){
             this.setState({
                id_user:Ses.getCurrentUser().id_user
             })
            }
          });
        }
      }
    render(){
        if(this.state.loading){
            return(
                <Load/>
            );
        }else{
            return (
                <View>
                    <Text style={{marginTop:60,textAlign:'center',fontSize:25,fontWeight:"bold"}}>Masukkan kode OTP</Text>
                    <View style={{marginHorizontal:12,marginTop:30,flex:1,flexDirection:"row",justifyContent:"center"}}>
                        <TextInput ref="otp_1" style={styles.input} onChangeText={val => focusTo(this,val,1)} keyboardType={'numeric'} maxLength = {1}/>
                        <TextInput ref="otp_2" style={styles.input} onChangeText={val => focusTo(this,val,2)} keyboardType={'numeric'} maxLength = {1}/> 
                        <TextInput ref="otp_3" style={styles.input} onChangeText={val => focusTo(this,val,3)} keyboardType={'numeric'} maxLength = {1}/> 
                        <TextInput ref="otp_4" style={styles.input} onChangeText={val => focusTo(this,val,4)} keyboardType={'numeric'} maxLength = {1}/> 
                        <TextInput ref="otp_5" style={styles.input} onChangeText={val => focusTo(this,val,5)} keyboardType={'numeric'} maxLength = {1}/> 
                        <TextInput ref="otp_6" style={styles.input} onChangeText={val=>validasiOTP(this,val)} keyboardType={'numeric'} maxLength = {1}/>
                        
                        {/* <TouchableOpacity onPress={()=>validasiOTP(this,this.state.username,this.state.password,this.state.device_id)}
                            style={{backgroundColor:'#68a0cf',borderRadius:25,margin:10,padding:20}}>
                            <Text style={{fontSize:18,textAlign:"center",color:"#fff"}}>Login</Text>
                        </TouchableOpacity> */}

                    </View>
                </View>
            );
        }
    }
}

export const focusTo=(t,val,rf)=>{
    if(val) {
        if(rf==1){
            t.refs.otp_2.focus();
            t.setState({otp1:val});
        }else if(rf==2){
            t.refs.otp_3.focus();
            t.setState({otp2:val});
        }else if(rf==3){
            t.refs.otp_4.focus();
            t.setState({otp3:val});
        }else if(rf==4){
            t.refs.otp_5.focus();
            t.setState({otp4:val});
        }else if(rf==5){
            t.refs.otp_6.focus();
            t.setState({otp5:val});
        }
    }
}
export const validasiOTP=(t,val)=>{
    t.setState({loading: true});//spinner
    var data={
        'otp': t.state.otp1+t.state.otp2+t.state.otp3+t.state.otp4+t.state.otp5+val,
        'id_user': t.state.id_user
    }
    console.log("data",data);
    Axios({
        url: `${api.GetUrl()}/Login/ValidasiOTP`,
        headers: {
            'Content-Type': 'application/json'
            ,'Token' :`${api.GetToken()}`
        },
        method: 'Post',
        data: JSON.stringify(data),
    })
    .then(res=>{
        console.log("res",res.data);
        if(Boolean(res.data.success)){
            Ses.setOTP(true);
            t.props.navigation.push('Home');
        }else{
            Ses.setOTP(false);
            t.props.navigation.push('OTP');
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

const styles=StyleSheet.create({
    input:{borderWidth:1,borderRadius:5,width:50,height:50,fontSize:20,textAlign:"center"},
});