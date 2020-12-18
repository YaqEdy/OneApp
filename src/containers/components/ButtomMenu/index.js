import React,{Component} from 'react';
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


export default ButtomMenu;
function ButtomMenu ({onHelp,onHome,onOrders,onAbsen,onLogout}){
      return (
          <View style={styles.menu}>
              <TouchableOpacity onPress={onHome} style={styles.icon_menu}>
                  <FontAwesomeIcon  icon={fa.faHome} size={25} color={"black"} style={styles.icon_img}/>
                  <Text style={styles.icon_text}>Home</Text>
                </TouchableOpacity>
              <TouchableOpacity onPress={onOrders} style={styles.icon_menu}>
                  <FontAwesomeIcon  icon={fa.faSearchLocation} size={25} color={"black"} style={styles.icon_img}/>
                  <Text style={styles.icon_text}>List Absensi</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onAbsen} style={styles.icon_menu}>
                  <FontAwesomeIcon  icon={fa.faMapMarkedAlt} size={25} color={"black"} style={styles.icon_img}/>
                  <Text style={styles.icon_text}>Absen</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>alert("coming soon")} style={styles.icon_menu}>
              {/* <TouchableOpacity onPress={onHelp} style={styles.icon_menu}> */}
                  <FontAwesomeIcon  icon={fa.faHandsHelping} size={25} color={"black"} style={styles.icon_img}/>
                  <Text style={styles.icon_text}>Scan QR</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onLogout} style={styles.icon_menu}>
                  <FontAwesomeIcon  icon={fa.faSignOutAlt} size={25} color={"black"} style={styles.icon_img}/>
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