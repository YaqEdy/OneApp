import React,{Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  AppRegistry,
  Alert, 
  TouchableOpacity,
  Button,
  Dimensions
} from 'react-native';
import Axios from 'axios';
// import * as Keychain from 'react-native-keychain';
// import * as api from '../../../config/API';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';


const {width, height} = Dimensions.get('window')

// const SCREEN_HEIGHT = height
// const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.010//0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
            region: {
                latitude: -6.175392,
                longitude: 106.827153,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
        };
    }

	findCoordinates = () => {
        // Geolocation.getCurrentPosition(info => console.log(info));
        Geolocation.getCurrentPosition(
            position => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                });

                // const obj=JSON.parse(JSON.stringify(position));
                // this.setState({latitude: Number(obj.coords.latitude)});
                // this.setState({longitude: Number(obj.coords.longitude)});
                // console.log("ini",this.state.region.latitude);
            }
        );
        // Geolocation.getCurrentPosition(
        //     position => {
        //       const initialPosition = JSON.stringify(position);
        //       console.log("ini",initialPosition);
        //     //   this.setState({initialPosition});
        //     },
        //     error => Alert.alert('Error', JSON.stringify(error)),
        //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        //   );
        //   this.watchID = Geolocation.watchPosition(position => {
        //     const lastPosition = JSON.stringify(position);
        //       console.log(lastPosition);
        //       // this.setState({lastPosition});
        //   });
	};

	render() {
        // setInterval(() => {
        //     this.findCoordinates();
        // },5000)//per 5 detik
		return (
            <View style={styles.container}>

                <MapView provider={PROVIDER_GOOGLE}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    zoomEnabled={true}
                    zoomControlEnabled={true}
                    style={styles.map}
                    // style={{ flex: 1, width: window.width }} //window pake Dimensions
                    region={{
                        latitude: this.state.region.latitude,
                        longitude: this.state.region.longitude,
                        latitudeDelta: this.state.region.latitudeDelta,
                        longitudeDelta: this.state.region.latitudeDelta
                        }} >
                <MapView.Marker
                    coordinate={{
                        latitude: this.state.region.latitude,
                        longitude: this.state.region.longitude
                        }}
                    // title="Lokasi"
                    description={"lat: "+this.state.region.latitude+", long: "+this.state.region.longitude} />
                </MapView>

                <TouchableOpacity onPress={this.findCoordinates}
                        style={{backgroundColor:'#68a0cf',borderRadius:15,margin:20,padding:10}}>
                        <Text style={{fontSize:18,textAlign:"center",color:"#fff"}}>Locate Me</Text>
                </TouchableOpacity>

            </View>

		);
	}
}


const styles = StyleSheet.create({
        container: {
          width: "100%",
          alignItems: "center"
        },
        map: {
          width: "100%",
          height: 600
        }
});
