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

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            username:null,
            password:null,
            device_id:null
        }
    }
    componentDidMount(){
        this._getDevice();
        this._getCek();
    }
    _getDevice = async () => {
        try {
            this.state.device_id=await DeviceInfo.getAndroidId();
            console.log("device_id: ",this.state.device_id);
        } catch (e) {
          console.log("Error: ",e);
        }
      }
    async _getCek() {
        try {
            // Retrieve the credentials
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                const obj=JSON.parse(credentials.password);
                Ses.setCurrentUser(obj);
                this.props.navigation.push('Home');
                console.log("Login "+ credentials.username,Ses.getCurrentUser());
            } else {
                console.log('Login: No credentials stored '+credentials);
            }
        } catch (error) {
            console.log("Keychain couldn't be accessed!", error);
        }
        // await Keychain.resetGenericPassword();
    }
   
    render(){
        // this._getDevice();
        // this._getCek();

        if(this.state.loading){
            return(
                <Load/>
            );
        }else{
            return (
                <View>
                    <Text style={{marginTop:60,textAlign:'center',fontSize:25,fontWeight:"bold"}}>Login Sistem</Text>
                    <View style={{marginHorizontal:12,marginTop:30}}>
                        <TextInput placeholder="Username / Email" style={styles.input} onChangeText={val => this.setState({username: val})}/>
                        <TextInput placeholder="Password" secureTextEntry={true} style={styles.input} onChangeText={val => this.setState({password: val})}/>
                        
                        <TouchableOpacity onPress={()=>getData(this,this.state.username,this.state.password,this.state.device_id)}
                            style={{backgroundColor:'#68a0cf',borderRadius:25,margin:10,padding:20}}>
                            <Text style={{fontSize:18,textAlign:"center",color:"#fff"}}>Login</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            );
        }
    }
}




export const getData=(t,username,password,device_id)=>{
    t.setState({loading: true});//spinner
    Keychain.resetGenericPassword();
    var data={
        'username': username,
        'password': password,
        'device_id': device_id
    }
    Axios({
        url: `${api.GetUrl()}/Login`,
        headers: {
            'Content-Type': 'application/json'
            ,'Token' :`${api.GetToken()}`
        },
        method: 'Post',
        data: JSON.stringify(data),
    })
    .then(res=>{
        console.log('id usr: ',res.data.data[0]);
        Keychain.setGenericPassword(username,JSON.stringify(res.data.data[0]));

        if(res.data.data[0].device_id!=device_id || res.data.data[0].is_login=='Y'){
            if(res.data.data[0].device_id==null){
                updateDevice(t,data,res);
            }else{
                Alert.alert(
                    'Peringatan',
                    (res.data.data[0].device_id==null)?"Yakin Login?":res.data.alert_device_id,
                    [
                        {
                            text:'Tidak',
                            // onPress:()=>ToastAndroid.showWithGravity("Tidak",ToastAndroid.SHORT,ToastAndroid.CENTER)
                        },
                        {
                            text:'Ya',
                            onPress:()=>{
                                updateDevice(t,data,res);
                            }
                        }
                    ]
        
                );
            }           
        }else{
            t.props.navigation.push('Home');
            // console.log('log: ',res.data.data);
            ToastAndroid.showWithGravity(res.data.message,ToastAndroid.SHORT,ToastAndroid.CENTER);
        }
    })
    .finally(f=>{
        t.setState({loading: false});//spinner
    })
    .catch(error=>{
        t.setState({loading: false});//spinner
        ToastAndroid.showWithGravity(error,ToastAndroid.SHORT,ToastAndroid.CENTER);
    })
}

export const updateDevice=(t,data,res)=>{
    t.setState({loading: true});//spinner
    Axios({
        url: `${api.GetUrl()}/Login/updateDevice/${res.data.data[0].id_user}`,
            headers: {
                'Content-Type': 'application/json'
                ,'Token' :`${api.GetToken()}`
            },
            method: 'Post',
            data: JSON.stringify(data),
        })
        .then(res2=>{
            if(Boolean(res2.data.success)){
                t.props.navigation.push('Home');
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
    input:{borderWidth:1,marginBottom:12,borderRadius:25,paddingHorizontal:18},
});
