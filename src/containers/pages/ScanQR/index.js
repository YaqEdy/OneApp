import React,{Component, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Load from '../../components/Loading';

//QR
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import Ses from '../../../config/Ses';

export default class Search extends Component{
  constructor(props){
    super(props);
    this.state={
      loading:false,
      reactivate:false
    }
  }

  _onSuccess = e => {
      console.log('QR : ', e.data)
      alert(e.data);
  };
  render(){
    if(this.state.loading){
      return(
        <Load/>
      );
    }else{
      return (
          <QRCodeScanner
            onRead={this._onSuccess}
            flashMode={RNCamera.Constants.FlashMode.off}// .FlashMode.torch}
            reactivate={this.state.reactivate}
            showMarker={true}
          /> 
      ); 
    }
  }
}
