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

export default class Search extends Component{
    render(){
        return (
          <View style={{marginHorizontal:17,flexDirection:'row'}}>
            <View style={{position:'relative',flex:1}}>
              <TextInput style={styles.cari} placeholder="Cari..."/>
              <Image style={{position:'absolute',top:8,left:12}} source={iconeHome} />
            </View>
            <View style={{width:35,alignItems:'center',justifyContent:'center'}}> 
              <Image style={{}} source={iconeHome} />
            </View>
          </View>
        );  
    }
}

const styles=StyleSheet.create({
  cari:({
    borderWidth:1,
    borderColor:'#E8E8E8',
    borderRadius:25,
    height:40,
    fontSize:13,
    paddingLeft:45,
    paddingRight:20,
    backgroundColor:'white',
    marginRight:18
  }),
  
});