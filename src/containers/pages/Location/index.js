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
import {getDistance,getPreciseDistance} from 'geolib'

const {width, height} = Dimensions.get('window')

// const SCREEN_HEIGHT = height
// const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.010//0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
const RADIUS=100

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
            myLocation: {
                title: 'My Location',
                latitude: -6.175392,
                longitude: 106.827153,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            destination: {
                title: 'destination',
                latitude: -6.232209,
                longitude: 107.059722
            }
        };
    }

	findCoordinates = () => {
        // Geolocation.getCurrentPosition(info => console.log(info));
        Geolocation.getCurrentPosition(
            position => {
                this.setState({
                    myLocation: {
                        title: 'My Location',
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                });
            }
        );
	};
    _getPreciseDistance = () => {
        var pdis = getPreciseDistance(
            { latitude: -6.232209, longitude: 107.059722 },
            { latitude: this.state.myLocation.latitude, longitude: this.state.myLocation.longitude }
        );
        alert(`Jarak Lebih Tepat\n ${pdis} Meter`);
    };
    renderMapMarkers =(location)=> {
        console.log("loc",location);
        return (
           <MapView.Marker
              key={location.title}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude}}
                title={location.title}
                description={"lat: "+location.latitude.toString()+", long: "+location.longitude.toString()} 
           >
           </MapView.Marker>
        )
      }
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
                        latitude: this.state.myLocation.latitude,
                        longitude: this.state.myLocation.longitude,
                        latitudeDelta: this.state.myLocation.latitudeDelta,
                        longitudeDelta: this.state.myLocation.latitudeDelta
                        }} >
                {this.renderMapMarkers(this.state.myLocation)}
                {this.renderMapMarkers(this.state.destination)}
                {/* {this.renderMapMarkers(this.state.myLocation.latitude,this.state.myLocation.longitude)}
                {this.renderMapMarkers(this.state.destination.latitude,this.state.destination.longitude)} */}
                <MapView.Circle
                key = { (this.state.destination.latitude + this.state.destination.longitude).toString() }
                center = { this.state.destination }
                radius = { RADIUS }
                strokeWidth = { 1 }
                strokeColor = { '#1a66ff' }
                fillColor = { 'rgba(230,238,255,0.5)' }
                />
                {/* <MapView.Marker
                    coordinate={{
                        latitude: this.state.myLocation.latitude,
                        longitude: this.state.myLocation.longitude
                        }}
                    title="Position"
                    description={"lat: "+this.state.myLocation.latitude.toString()+", long: "+this.state.myLocation.longitude.toString()} /> */}
                </MapView>

                <TouchableOpacity onPress={this.findCoordinates}
                        style={{backgroundColor:'#68a0cf',borderRadius:15,margin:20,padding:10}}>
                        <Text style={{fontSize:18,textAlign:"center",color:"#fff"}}>Locate Me</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._getPreciseDistance}
                        style={{backgroundColor:'#68a0cf',borderRadius:15,margin:20,padding:10}}>
                        <Text style={{fontSize:18,textAlign:"center",color:"#fff"}}>getPreciseDistance</Text>
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
