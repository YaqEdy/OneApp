import React,{Component} from 'react';
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

//icon
import iconeHome from '../../../assets/icon/home.png'

export default class TopContent extends Component{
    render(){
        return (
          <View style={{marginHorizontal:17,marginTop:8}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#2C5FB8',borderTopLeftRadius:4,borderTopRightRadius:4,padding:14}}>
              <Image style={{}} source={iconeHome} />
              <Text style={{fontSize:17,fontWeight:'bold',color:'white'}}>Rp 50.000</Text>
            </View>

            <View style={{flexDirection:'row',paddingTop:20,paddingBottom:14,backgroundColor:'#2F65BD',borderBottomLeftRadius:4,borderBottomRightRadius:4}}>
              <View style={{flex:1,alignItems:'center'}}>
                <Image style={styles.icon_img} source={iconeHome} ></Image>
                <Text style={{fontSize:13,fontWeight:'bold',color:'white',marginTop:15}}>pay</Text>
              </View>
              <View style={{flex:1,alignItems:'center'}}>
                <Image style={styles.icon_img} source={iconeHome} ></Image>
                <Text style={{fontSize:13,fontWeight:'bold',color:'white',marginTop:15}}>Nearby</Text>
              </View>
              <View style={{flex:1,alignItems:'center'}}>
                <Image style={styles.icon_img} source={iconeHome} ></Image>
                <Text style={{fontSize:13,fontWeight:'bold',color:'white',marginTop:15}}>Top up</Text>
              </View>
              <View style={{flex:1,alignItems:'center'}}>
                <Image style={styles.icon_img} source={iconeHome} ></Image>
                <Text style={{fontSize:13,fontWeight:'bold',color:'white',marginTop:15}}>More</Text>
              </View>
            </View>
          </View>
        );  
    }
}

const styles=StyleSheet.create({
});