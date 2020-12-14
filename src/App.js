import React,{Component} from 'react';
import {StyleSheet} from 'react-native';

import Router from './config/Router';

export default class App extends Component{
  render(){
    return (
        <Router/>
    );
  }
}

const styles=StyleSheet.create({});
