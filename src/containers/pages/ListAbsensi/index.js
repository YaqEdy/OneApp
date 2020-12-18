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
import Ses from '../../../config/Ses';



export const listAbsensi =()=>{
    const [vwAbsensi,setVwAbsensi]=useState([]);

    useEffect(()=>{
        getData();
    },[]);
    const getData=()=>{
        const obj=Ses.getCurrentUser();
        // console.log('obj: ',obj);
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
                // console.log("dt:",res.data.data);
                setVwAbsensi(res.data.data);
            }
        })
        .catch(error=>{
            // console.warn('log',error);
        })
    }

    return(
        <View>
            <ScrollView>
                {vwAbsensi.map(items=>{
                    return(
                        <View style={{borderBottomColor:'#2f3337',borderBottomWidth:1,flex:1}}>
                            <View key={items.id} style={{flexDirection:'row',marginBottom:5,padding:10}}>
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
                    //  return <Item nik={usr.nik} username={usr.username} email={usr.email}/>;
                })}

            </ScrollView>
        </View>

    );
}

export default listAbsensi;
