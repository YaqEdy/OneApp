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
import * as api from '../../../config/API';
import Ses from '../../../config/Ses';

export default class App extends Component{
    constructor(props){
        super(props);
        this.state={
            username:null,
            password:null,
            device_id:null
        }
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
        this._getDevice();
        this._getCek();

        return (
            <View>
                <Text style={{marginTop:60,textAlign:'center',fontSize:25,fontWeight:"bold"}}>Login Sistem</Text>
                <View style={{marginHorizontal:12,marginTop:30}}>
                    <TextInput placeholder="Username" style={styles.input} onChangeText={val => this.setState({username: val})}/>
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




export const getData=(t,username,password,device_id)=>{
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
        console.log('id usr: ',res.data.data[0].id_user);

        if(Boolean(!res.data.device_id) || res.data.data[0].is_login=='Y'){
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
                        onPress:()=>
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
                                    console.log('res: ',res.data.data);
                                    
                                    Keychain.setGenericPassword(username,JSON.stringify(res.data.data[0]));
                                }
                                ToastAndroid.showWithGravity(res.data.message,ToastAndroid.SHORT,ToastAndroid.CENTER);
                            })
                    }
                ]
    
            );
           
        }else{
            t.props.navigation.push('Home');
            console.log('log: ',res.data.data);
            
            Keychain.setGenericPassword(username,JSON.stringify(res.data.data[0]));
            ToastAndroid.showWithGravity(res.data.message,ToastAndroid.SHORT,ToastAndroid.CENTER);
        }
    })
    .catch(error=>{
        console.warn('log',error);
    })
}

const styles=StyleSheet.create({
    input:{borderWidth:1,marginBottom:12,borderRadius:25,paddingHorizontal:18},
});
