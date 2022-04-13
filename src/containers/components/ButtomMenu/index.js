import React,{Component, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
//icon
import iconeHome from '../../../assets/icon/home.png'
//FA
import { FontAwesomeIcon  } from '@fortawesome/react-native-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';

import Ses from '../../../config/Ses';


export default ButtomMenu;
function ButtomMenu ({onHelp,onHome,onOrders,onAbsen,onLogout}){
  const [color1,setColor1]=useState(Ses.getBtn().color_default);
  const [color2,setColor2]=useState(Ses.getBtn().color_default);
  const [color3,setColor3]=useState(Ses.getBtn().color_default);
  const [color4,setColor4]=useState(Ses.getBtn().color_default);
  const [color5,setColor5]=useState(Ses.getBtn().color_default);

  useEffect(()=>{
    if(Ses.getBtn().id==1){
      setColor1(Ses.getBtn().color_change);
      setColor2(Ses.getBtn().color_default);
      setColor3(Ses.getBtn().color_default);
      setColor4(Ses.getBtn().color_default);
    }else if(Ses.getBtn().id==2){
      setColor1(Ses.getBtn().color_default);
      setColor2(Ses.getBtn().color_change);
      setColor3(Ses.getBtn().color_default);
      setColor4(Ses.getBtn().color_default);
    }else if(Ses.getBtn().id==3){
      setColor1(Ses.getBtn().color_default);
      setColor2(Ses.getBtn().color_default);
      setColor3(Ses.getBtn().color_change);
      setColor4(Ses.getBtn().color_default);
    }else if(Ses.getBtn().id==4){
      setColor1(Ses.getBtn().color_default);
      setColor2(Ses.getBtn().color_default);
      setColor3(Ses.getBtn().color_default);
      setColor4(Ses.getBtn().color_change);
    }
  });

      return (
          <View style={styles.menu}>
            <TouchableOpacity onPress={onHome} style={styles.icon_menu}>
              <FontAwesomeIcon  icon={fa.faHome} size={25} color={color1} style={styles.icon_img}/>
              <Text style={styles.icon_text}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onOrders} style={styles.icon_menu}>
              <FontAwesomeIcon  icon={fa.faSearchLocation} size={25} color={color2} style={styles.icon_img}/>
              <Text style={styles.icon_text}>List Absensi</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onAbsen} style={styles.icon_menu}>
              <FontAwesomeIcon  icon={fa.faMapMarkedAlt} size={25} color={color3} style={styles.icon_img}/>
              <Text style={styles.icon_text}>Absen</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={()=>alert("coming soon")} style={styles.icon_menu}> */}
            <TouchableOpacity onPress={onHelp} style={styles.icon_menu}>
              <FontAwesomeIcon  icon={fa.faQrcode} size={25} color={color4} style={styles.icon_img}/>
              <Text style={styles.icon_text}>Scan QR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onLogout} style={styles.icon_menu}>
              <FontAwesomeIcon  icon={fa.faSignOutAlt} size={25} color={color5} style={styles.icon_img}/>
              <Text style={styles.icon_text}>Logout</Text>
            </TouchableOpacity>
          </View>
      );  
}

const styles=StyleSheet.create({
    menu:({
      backgroundColor:'white',
      height:54,
      flexDirection:'row',
      borderWidth:1,
      borderColor:'#EFEFEF'
    }),
    icon_menu:({
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    }),
    icon_text:({
      fontSize:10,
      color:'#545454',
      marginTop:4
    }),
    icon_img:({
      width:26,
      height:26,
    }),
  
});