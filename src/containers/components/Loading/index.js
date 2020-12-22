import React,{Component} from 'react';
import {View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
//FA
// import { FontAwesomeIcon  } from '@fortawesome/react-native-fontawesome';
// import * as fa from '@fortawesome/free-solid-svg-icons';

export default class loading extends Component{
    render(){
        return (
          <View style={{flex:1,justifyContent:"center",alignContent:"center",backgroundColor:'#F5FCFF'}}>
             <Spinner
             visible={true}
             textContent={'Loading...'}
             textStyle={{color:'#FFF'}}
             />
          </View>
        );  
    }
}
