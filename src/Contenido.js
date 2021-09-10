/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView, FlatList, RefreshControl,View,Text} from 'react-native';

//import {Actions} from 'react-native-router-flux';
import InfoEmpresa from './InfoEmpresa.js';
import ListInfor from './ListInfor.js';
import ListPromos from './ListPromos.js';
import EditarInfo from './EditarInfo.js';
import ListSugerencias from './ListSugerencias.js';


export default class Contenido extends Component {
  
  constructor(props) {
    super(props);

     this.state = {
      contenido: this.props.conte.contenido,
      ds: '',
    };

     
  }

cambiaContenido(conte){
  this.props.cambiaContenido(conte);

  
}

  generaContenido(){
    const infomacion = <InfoEmpresa style={styles.container} idComercio={this.props.conte.idComercio}  />;
    const informativos = <ListInfor cod={this.props.conte.idComercio} colorCiudad={this.props.conte.colorCiudad}/>
    const promociones = <ListPromos cod={this.props.conte.idComercio} colorCiudad={this.props.conte.colorCiudad} />
    const sugerencias = <ListSugerencias cod={this.props.conte.idComercio} colorCiudad={this.props.conte.colorCiudad} />
   
    let contenido;


     switch (this.props.conte.contenido){
 

      case 2: contenido = informativos;
      break;

      case 3: contenido = promociones;
      break;

      case 4: contenido = sugerencias;
      break;

     
      default: contenido = infomacion;
      break;
     }

     return contenido;

  }



  render() {

    return (<View>{this.generaContenido()}</View>)
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '70%',
  },


});




      /*
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(vent) => <Venta vent={vent} />}/>   */