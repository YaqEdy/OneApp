import Axios from 'axios';
import React,{Component, useEffect, useState} from 'react';
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
  TouchableOpacity
} from 'react-native';
//FA
import { FontAwesomeIcon  } from '@fortawesome/react-native-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';

import * as api from '../../../config/API'
import Load from '../../components/Loading';
import Ses from '../../../config/Ses';


export default class App extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            vwAbsensi:[],
            nodata:""
          }
      }
    componentDidMount(){
        getData(this);
    }

    render(){
        if(this.state.loading){
            return(
                <Load/>
            );
        }else{
            if(this.state.vwAbsensi.length==0){
                return(
                    <View key="1" style={{borderBottomColor:'#2f3337',borderBottomWidth:1,flex:1}}>
                        <Text style={{padding:20}}>{this.state.nodata}</Text>
                    </View>
                );
            }
            return(
                <View>
                    <ScrollView>
                        {this.state.vwAbsensi.map(items=>{
                            return(
                                <View key={items.id} style={{borderBottomColor:'#2f3337',borderBottomWidth:1,flex:1}}>
                                    <View style={{flexDirection:'row',marginBottom:5,padding:10}}>
                                        {/* <TouchableOpacity onPress={()=>selectedItem(items)}>
                                            <Image source={avt} style={styles.avatar}/>
                                        </TouchableOpacity> */}
                                        <FontAwesomeIcon  icon={fa.faCheckCircle} size={60} color={"green"} />
                                        <View style={{marginLeft:18,flex:1}}>
                                            <Text style={{fontSize:16,fontWeight:'bold'}}>Nik :{items.nik}</Text>
                                            <Text>Masuk : {items.in}</Text>
                                            <Text>Keluar : {items.out}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            );
        }
    }
}

export const getData=(t)=>{
    t.setState({loading: true});//spinner
    const obj=Ses.getCurrentUser();
    Axios({
        url: `${api.GetUrl()}/users/listAbsen/${obj.nik}`,
        headers: {
            'Content-Type': 'application/json'
            ,'Token' :`${api.GetToken()}`
        },
        method: 'GET',
        })
    .then(res=>{
        if(Boolean(res.data.success)){
            console.log("dt:",res.data);
            t.setState({vwAbsensi: res.data.data});
            t.setState({nodata: res.data.nodata});
        }
    })
    .catch(error=>{
        // console.warn('log',error);
    })
    .finally(f=>{
    t.setState({loading: false});//spinner
    })
    .catch(error=>{
        t.setState({loading: false});//spinner
        ToastAndroid.showWithGravity(error,ToastAndroid.SHORT,ToastAndroid.CENTER);
    })
}
