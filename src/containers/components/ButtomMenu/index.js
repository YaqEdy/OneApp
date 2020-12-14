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
import { FAIcon } from '@fortawesome/react-native-fontawesome';
import { faLock,faAirFreshener,faAnchor } from '@fortawesome/free-solid-svg-icons';


export default ButtomMenu;
function ButtomMenu ({onHelp,onHome,onOrders,onAbsen,onLogout}){
      return (
          <View style={styles.menu}>
              <TouchableOpacity onPress={onHome} style={styles.icon_menu}>
                  {/* <FAIcon icon={faLock} size={10} color={"blue"} style={styles.icon_img} /> */}
                  <Image style={styles.icon_img} source={iconeHome} ></Image>
                  <Text style={styles.icon_text}>Home</Text>
                </TouchableOpacity>
              <TouchableOpacity onPress={onOrders} style={styles.icon_menu}>
                  <Image style={styles.icon_img} source={iconeHome} ></Image>
                  <Text style={styles.icon_text}>Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onAbsen} style={styles.icon_menu}>
                  <Image style={styles.icon_img} source={iconeHome} ></Image>
                  <Text style={styles.icon_text}>Absen</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onHelp} style={styles.icon_menu}>
                  <Image style={styles.icon_img} source={iconeHome} ></Image>
                  <Text style={styles.icon_text}>Help</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onLogout} style={styles.icon_menu}>
                  <Image style={styles.icon_img} source={iconeHome} ></Image>
                  <Text style={styles.icon_text}>Logout</Text>
              </TouchableOpacity>
          </View>
      );  
}

// export default ButtomMenu;
// function ButtomMenu ({onHelp,opHome,opOrders,onLogout}){
//   return(
//     <ButtomMenu_ onHelp={onHelp} opHome={opHome} opOrders={opOrders} onLogout={onLogout}/>
//   );
// }
// export class ButtomMenu_ extends Component{
//     render(onHelp,opHome,opOrders,onLogout){
//         return (
//           <View style={styles.menu}>
//               <TouchableOpacity onPress={opHome} style={styles.icon_menu}>
//                   <Image style={styles.icon_img} source={iconeHome} ></Image>
//                   <Text style={styles.icon_text}>Home</Text>
//                 </TouchableOpacity>
//               <TouchableOpacity onPress={opOrders} style={styles.icon_menu}>
//                   <Image style={styles.icon_img} source={iconeHome} ></Image>
//                   <Text style={styles.icon_text}>Orders</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={onHelp} style={styles.icon_menu}>
//                   <Image style={styles.icon_img} source={iconeHome} ></Image>
//                   <Text style={styles.icon_text}>Help</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={()=>alert('Inbox')} style={styles.icon_menu}>
//                   <Image style={styles.icon_img} source={iconeHome} ></Image>
//                   <Text style={styles.icon_text}>Inbox</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={()=>alert('Logout')} style={styles.icon_menu}>
//                   <Image style={styles.icon_img} source={iconeHome} ></Image>
//                   <Text style={styles.icon_text}>Logout</Text>
//               </TouchableOpacity>
//           </View>
//         );  
//     }
// }

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