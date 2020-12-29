import React,{Component} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
//FA
import { FontAwesomeIcon  } from '@fortawesome/react-native-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';

import logo from '../../assets/picture/logo_masjid.png'

export default class App extends Component{
    render(){
        return (
            <View style={styles.viewStyles}>
                <Image source={logo} style={styles.imgStyles}/>
                <Text style={styles.textStyles}>.....</Text>
                {/* <FontAwesomeIcon  icon={fa.faSyncAlt} size={100} color={"white"} /> */}
                {/* <FontAwesomeIcon  icon={fa.faEllipsisH} size={50} color={"white"} /> */}
            </View>
        );
    }
}

const styles=StyleSheet.create({
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'purple'
      },
    imgStyles:{
        width:125,
        height:125
    },
    textStyles: {
        color: 'white',
        fontSize: 45,
        fontWeight: 'bold'
    }
});
