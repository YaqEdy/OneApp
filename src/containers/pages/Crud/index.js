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

import avt from '../../../assets/picture/avatar5.png'
import * as api from '../../../config/API'

const Item=(nik,username,email)=>{
    return(
        <View style={{flexDirection:'row',marginBottom:20}}>
            <Image source={avt} style={styles.avatar}/>
            <View style={{marginLeft:18,flex:1}}>
                <Text style={{fontSize:16,fontWeight:'bold'}}>{nik}</Text>
                <Text>{username}</Text>
                <Text>{email}</Text>
                {/* <Text>Password</Text>
                <Text>Distrik</Text>
                <Text>Gp</Text>
                <Text>Status</Text> */}
            </View>
            <Text style={{fontSize:20,fontWeight:"bold",color:'red'}}>X</Text>
        </View>
    )
}

const Crud =()=>{
    const [id_user,setId_user]=useState("0");
    const [nik,setNik]=useState("");
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [distrik,setDistrik]=useState("");
    const [gp,setGp]=useState("");
    const [status,setStatus]=useState("");
    const [users,setUsers]=useState([]);
    const [selectedUser,setSelectedUser]=useState({});
    const [btnsave,setBtnsave]=useState("Simpan");

    useEffect(()=>{
        getData();
    },[]);
    const getData=()=>{
        // console.warn('url',`${api.GetUrl()}/users`);
        Axios({
            url: `${api.GetUrl()}/users`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
                ,'Token' :`${api.GetToken()}`
            },
            method: 'GET',
            })
        .then(res=>{
            // console.warn('res',res.data.data);
            if(Boolean(res.data.success)){
            setUsers(res.data.data);
            }
        })
        .catch(error=>{
            // console.warn('log',error);
        })
    }

    const submit=()=>{
        var data={
            'id_user': id_user,
            'nik': nik,
            'username': username,
            'email': email,
            'password': 'admin',
            'distrik': 'Ngaw',
            'gp': '1',
            'status': '1'
        }
        Axios({
        url: (id_user=="0")?`${api.GetUrl()}/users/create`:`${api.GetUrl()}/users/update/`+id_user,
        headers: {'Content-Type': 'application/json' },
        method: (id_user=="0")?'post':'put',
        data: JSON.stringify(data),
        })
        .then(function (res) {
            ToastAndroid.showWithGravity(res.data.message,ToastAndroid.LONG,ToastAndroid.CENTER);
            if(Boolean(res.data.success))
            getData();
            newData();
            // console.warn(res.data);
        })
        .catch(function (error) {
            console.warn("Error",error);
        });
        

    }

    const deleteData=(item)=>{
        Alert.alert(
            'Peringatan',
            'Anda yakin menghapus data '+item.nik+" ini?",
            [
                {
                    text:'Tidak',
                    onPress:()=>ToastAndroid.showWithGravity("Tidak",ToastAndroid.SHORT,ToastAndroid.CENTER)
                },
                {
                    text:'Ya',
                    onPress:()=>
                        Axios.delete(`${api.GetUrl()}/users/delete/${item.id_user}`)
                        .then(res=>{
                            ToastAndroid.showWithGravity("Data:"+item.nik+" "+res.data.message,ToastAndroid.SHORT,ToastAndroid.CENTER);
                            getData();
                        })
                }
            ]

        );
        
    }

    const selectedItem=(item)=>{
        setId_user(item.id_user);
        setNik(item.nik);
        setUsername(item.username);
        setEmail(item.email);
        setBtnsave("Update");
    }
    const newData=(item)=>{
        setId_user("0");
        setNik("");
        setUsername("");
        setEmail("");
        setBtnsave("Simpan");
    }
    
    return (
        <View style={styles.container}>
        <View style={styles.content}>
            <View style={{padding:20}}>
                <Text style={{textAlign:"center",marginBottom:20}}>Test CRUD</Text>

                <Button title="New Data" onPress={newData}/>

                <Text>Input Data</Text>
                <TextInput placeholder="Nik" style={styles.input} value={nik} onChangeText={(value)=>setNik(value)}/>
                <TextInput placeholder="Username" style={styles.input} value={username} onChangeText={(value)=>setUsername(value)}/>
                <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={(value)=>setEmail(value)}/>
                {/* <TextInput placeholder="Password" value="1234" style={styles.input}/>
                <TextInput placeholder="Distrik" value="Ngaw" style={styles.input}/>
                <TextInput placeholder="Gp" value="1" style={styles.input}/>
                <TextInput placeholder="Status" value="1" style={styles.input}/> */}
                
                <Button color="green" title={btnsave} onPress={submit}/>
                <View style={styles.line}></View>
                <ScrollView>
                    {users.map(usr=>{
                        return(
                            <View key={usr.id_user} style={{flexDirection:'row',marginBottom:20}}>
                                <TouchableOpacity onPress={()=>selectedItem(usr)}>
                                    <Image source={avt} style={styles.avatar}/>
                                </TouchableOpacity>
                                <View style={{marginLeft:18,flex:1}}>
                                    <Text style={{fontSize:16,fontWeight:'bold'}}>{usr.nik}</Text>
                                    <Text>{usr.username}</Text>
                                    <Text>{usr.email}</Text>
                                    <Text >{usr.id_user}</Text>
                                </View>
                                {/* <View style={{fontSize:20,fontWeight:"bold"}}><Button title="X" onPress={(deleteData)=>usr.id_user}></Button></View> */}
                                <Text onPress={()=>deleteData(usr)} style={{fontSize:20,fontWeight:"bold",color:'red'}}>X</Text>
                            </View>
                        )
                        //  return <Item nik={usr.nik} username={usr.username} email={usr.email}/>;
                    })}

                </ScrollView>


            </View>
        </View>
        </View>
    );  
}

export default Crud;
const styles=StyleSheet.create({
    container:({flex:1}),
    content:{backgroundColor:'white',flex:1,paddingTop:15},
    input:{borderWidth:1,marginBottom:12,borderRadius:25,paddingHorizontal:18},
    line:{height:2,backgroundColor:'black',marginVertical:20},
    avatar:{width:140,height:140,borderRadius:50},
});
