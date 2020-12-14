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

export default class MainFeature extends Component{
    render(){
        return (
          <View style={{flexDirection:'row',flexWrap:'wrap',marginHorizontal:0,marginTop:18}}>
            <View style={{justifyContent:'space-between',flexDirection:'row',width:'100%',marginBottom:18}}>
              {/* <View style={{width:`${100/4}%`}}> */}
              <View style={{width:'25%',alignItems:"center"}}>
                <View style={{width:58,height:58,borderWidth:1,borderColor:'#EFEFEF',borderRadius:18,justifyContent:"center",alignItems:"center"}}>
                  <Image source={iconeHome} ></Image>
                </View>
                <Text style={{fontSize:11,fontWeight:"bold",textAlign:"center",marginTop:6}}>GO-MENU1</Text>
              </View>
              <View style={{width:'25%',alignItems:"center"}}>
                <View style={{width:58,height:58,borderWidth:1,borderColor:'#EFEFEF',borderRadius:18,justifyContent:"center",alignItems:"center"}}>
                  <Image source={iconeHome} ></Image>
                </View>
                <Text style={{fontSize:11,fontWeight:"bold",textAlign:"center",marginTop:6}}>GO-MENU2</Text>
              </View>
              <View style={{width:'25%',alignItems:"center"}}>
                <View style={{width:58,height:58,borderWidth:1,borderColor:'#EFEFEF',borderRadius:18,justifyContent:"center",alignItems:"center"}}>
                  <Image source={iconeHome} ></Image>
                </View>
                <Text style={{fontSize:11,fontWeight:"bold",textAlign:"center",marginTop:6}}>GO-MENU3</Text>
              </View>
              <View style={{width:'25%',alignItems:"center"}}>
                <View style={{width:58,height:58,borderWidth:1,borderColor:'#EFEFEF',borderRadius:18,justifyContent:"center",alignItems:"center"}}>
                  <Image source={iconeHome} ></Image>
                </View>
                <Text style={{fontSize:11,fontWeight:"bold",textAlign:"center",marginTop:6}}>GO-MENU4</Text>
              </View>
            </View>

            <View style={{justifyContent:'space-between',flexDirection:'row',width:'100%',marginBottom:18}}>
              <View style={{width:'25%',alignItems:"center"}}>
                <View style={{width:58,height:58,borderWidth:1,borderColor:'#EFEFEF',borderRadius:18,justifyContent:"center",alignItems:"center"}}>
                  <Image source={iconeHome} ></Image>
                </View>
                <Text style={{fontSize:11,fontWeight:"bold",textAlign:"center",marginTop:6}}>GO-MENU5</Text>
              </View>
              <View style={{width:'25%',alignItems:"center"}}>
                <View style={{width:58,height:58,borderWidth:1,borderColor:'#EFEFEF',borderRadius:18,justifyContent:"center",alignItems:"center"}}>
                  <Image source={iconeHome} ></Image>
                </View>
                <Text style={{fontSize:11,fontWeight:"bold",textAlign:"center",marginTop:6}}>GO-MENU6</Text>
              </View>
              <View style={{width:'25%',alignItems:"center"}}>
                <View style={{width:58,height:58,borderWidth:1,borderColor:'#EFEFEF',borderRadius:18,justifyContent:"center",alignItems:"center"}}>
                  <Image source={iconeHome} ></Image>
                </View>
                <Text style={{fontSize:11,fontWeight:"bold",textAlign:"center",marginTop:6}}>GO-MENU7</Text>
              </View>
              <View style={{width:'25%',alignItems:"center"}}>
                <View style={{width:58,height:58,borderWidth:1,borderColor:'#EFEFEF',borderRadius:18,justifyContent:"center",alignItems:"center"}}>
                  <Image source={iconeHome} ></Image>
                </View>
                <Text style={{fontSize:11,fontWeight:"bold",textAlign:"center",marginTop:6}}>GO-MENU8</Text>
            </View>

            </View>
          </View>
        );  
    }
}

const styles=StyleSheet.create({
});