import React,{Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  AppRegistry,
  Alert, 
  TouchableOpacity,
  ToastAndroid,
  Button,
  Dimensions
} from 'react-native';
import Axios from 'axios';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import {getDistance,getPreciseDistance} from 'geolib'
//FA
import { FontAwesomeIcon  } from '@fortawesome/react-native-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';

import Load from '../../components/Loading';
import Ses from '../../../config/Ses';
import * as api from '../../../config/API';

const {width, height} = Dimensions.get('window')

// const SCREEN_HEIGHT = height
// const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.010//0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class App extends Component {
    constructor(props) {
        const obj=Ses.getCurrentUser();
        super(props);
        this.state = {
            dtobj:obj,
            loading: false,
            myLocation: {
                title: 'My Location',
                latitude: -6.175392,
                longitude: 106.827153,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
                pinColor:'green'
            },
            destination: {
                title: 'destination',
                latitude: Number(obj.latitude),
                longitude: Number(obj.longitude),
                pinColor: obj.pin_color,
                radius:Number(obj.radius)
            }
        };
    }
    componentDidMount(){
        this._findCoordinates();
      }
	_findCoordinates = () => {
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
        var data={
            'nik': this.state.dtobj.nik,
            'location': this.state.myLocation.latitude.toString()+";"+this.state.myLocation.longitude.toString()
            // 'location': JSON.stringify(this.state.myLocation)
        }
        if(this.state.dtobj.fg_location=="Y"){
            var pdis = getPreciseDistance(
                { latitude: this.state.destination.latitude, longitude: this.state.destination.longitude },
                { latitude: this.state.myLocation.latitude, longitude: this.state.myLocation.longitude }
            );
            if(pdis>Number(this.state.dtobj.radius)){
                alert(`Anda berada di ${pdis} Meter dari lokasi \n di luar radius yang diizinkan.`);
            }else{
                saveAbsensi(data,this);
            }
        }else{
            saveAbsensi(data,this);
        }

    };
    renderMapMarkers =(location)=> {
        return (
           <MapView.Marker
              key={location.title}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude}}
                title={location.title}
                description={"lat: "+location.latitude.toString()+", long: "+location.longitude.toString()} 
                pinColor={location.pinColor}
           >
           </MapView.Marker>
        )
    }
	render() {
        if(this.state.loading){
            return(
                <Load/>
            );
          }else{
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
                    {/* {this.renderMapMarkers(this.state.myLocation)} */}
                    {this.renderMapMarkers(this.state.destination)}
                    <MapView.Circle
                    key = { (this.state.destination.latitude + this.state.destination.longitude).toString() }
                    center = { this.state.destination }
                    radius = { this.state.destination.radius }
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

                    <View style={{flexDirection:"row"}}>
                        <TouchableOpacity onPress={this._findCoordinates}
                            style={{borderRadius:25,borderColor:"blue",borderWidth:2,margin:20,padding:10}}>
                            <FontAwesomeIcon  icon={fa.faLocationArrow} size={25} color={"blue"} style={styles.icon_img}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this._getPreciseDistance}
                            style={{backgroundColor:'green',borderRadius:15,margin:20,padding:10}}>
                            <View style={{position:'relative',flex:1}}>
                                <Text style={{paddingLeft:30,color:'white'}}>Absen</Text>
                                <FontAwesomeIcon  icon={fa.faCheckCircle} size={25} color={"white"} style={{position:'absolute'}}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

            );
        }
	}
}
export const saveAbsensi=(data,t)=>{
      t.setState({loading: true});//spinner
      // console.log("dt",JSON.stringify(data));
    Axios({
        url: `${api.GetUrl()}/Users/absen`,
        headers: {
            'Content-Type': 'application/json' 
            ,'Token' :`${api.GetToken()}`
        },
        method: 'post',
        data: JSON.stringify(data),
    })
    .then(res=>{
        ToastAndroid.showWithGravity(res.data.message,ToastAndroid.SHORT,ToastAndroid.CENTER);
        if(Boolean(res.data.success)){
            // console.log('res: ',res.data.data);
            t.props.navigation.push('ListAbsensi');
        }
    })
    .catch(function (error) {
        ToastAndroid.showWithGravity(error,ToastAndroid.SHORT,ToastAndroid.CENTER);
        // console.log("log err",error);
    })
    .finally(f=>{
        t.setState({loading: false});//spinner
    })
    .catch(error=>{
        t.setState({loading: false});//spinner
        ToastAndroid.showWithGravity(error,ToastAndroid.SHORT,ToastAndroid.CENTER);
    })
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
