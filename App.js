/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  Button,
  TouchableOpacity,
  AsyncStorage,
  Linking
} from 'react-native';

import Inicio from './src/Inicio.js';
import RecupPass from './src/RecupPass.js';
import CambioPass from './src/CambioPass.js';
import ViewLogin from './src/ViewLogin.js';
import detalleVenta from './src/detalleVenta.js';
import EditarInfo from './src/EditarInfo.js';
import EditarPromo from './src/EditarPromo.js';
import AgregarInfo from './src/AgregarInfo.js';
import AgregarPromo from './src/AgregarPromo.js';
import AgregarSugerencia from './src/AgregarSugerencia.js';
import Empresa from './src/Empresa.js';


import {Actions, Scene, Router} from 'react-native-router-flux';

export default class App extends Component<{}>{





  render() {
    return <Router>


      <Scene key="root" hideNavBar>
        <Scene key="login">
          <Scene key="Inicio" component={Inicio} hideNavBar/ >
          <Scene key="ViewLogin" component={ViewLogin} hideNavBar/ >
          <Scene key="RecupPass" component={RecupPass} hideNavBar/ >
          <Scene key="CambioPass" component={CambioPass} hideNavBar/ >
        </Scene>

        <Scene key="home">
          <Scene key="detalleVenta" component={detalleVenta} hideNavBar={Platform.OS === 'android'}/>
          <Scene key="EditarInfo" component={EditarInfo} hideNavBar={Platform.OS === 'android'}/>
          <Scene key="EditarPromo" component={EditarPromo} hideNavBar={Platform.OS === 'android'}/>
          <Scene key="AgregarInfo" component={AgregarInfo} hideNavBar={Platform.OS === 'android'}/>
          <Scene key="AgregarPromo" component={AgregarPromo} hideNavBar={Platform.OS === 'android'}/>
          <Scene key="AgregarSugerencia" component={AgregarSugerencia} hideNavBar={Platform.OS === 'android'}/>
          <Scene key="Empresa" component={Empresa} hideNavBar={Platform.OS === 'android'}/>
        </Scene>
      </Scene>
    </Router>
  }
}


