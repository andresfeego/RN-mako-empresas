/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView, FlatList, RefreshControl,AsyncStorage,TouchableOpacity} from 'react-native';

import Venta from './Venta';
import {Actions} from 'react-native-router-flux';


export default class VentList extends Component {
  
  constructor(props) {
    super(props);

     this.state = {
      id: this.props.usuario.id,
      refreshing: false,
      ds: '',
      activo: this.props.activo,
      };

     
  }

 

componentWillMount(){
  
  AsyncStorage.getItem('user').then((myId) => {
 
      this.setState({
        id: myId,
      })
  
  })

 this.props.homeFun.comprobarActivo().then((id) => {
           this.getVVentas();

  })


} 



getVVentas(){

    return fetch('http://www.mako.guru/listadosApp/returnVentasXusuario.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.id
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
          //console.warn('antes', this.state.lista);
          data=[];
     
            data= responseJson;
        
       this.setState({
          ds: data,
       })
  
      })

.catch((error) => {
        console.warn(error);
      }); 
}



_onRefesh(){
  
  this.setState({
    refreshing: true,
  });
  this.props.homeFun.comprobarActivo().then((id) => {
     this.getVVentas().then(() =>{
    this.setState({
      refreshing:false,
    })
  })
  })
  
 
}



handlePress(venta){
  if (venta.plan != 5 && venta.estado != 4) {
Actions.detalleVenta({venta});
}
}

switchIconoPlan(plan){

      let iconoPlan = require('./imgs/obsequio.png');

    switch(plan){
      case '1':  iconoPlan = require('./imgs/basico.png');
      break;

      case '2':  iconoPlan = require('./imgs/bronce.png');
      break;

      case '3':  iconoPlan = require('./imgs/plata.png');
      break;

      case '4':  iconoPlan = require('./imgs/oro.png');
      break;

    }

    return iconoPlan;

}

switchGananciaPlan(plan){

      let ganancia = '$ 0';

    switch(plan){
      case '1':  ganancia = '$ 20.000';
      break;

      case '2': ganancia = '$ 50.000';
      break;

      case '3': ganancia = '$ 100.000';
      break;

      case '4':  ganancia = '$ 200.000';
      break;

    }

    return ganancia;

}

switchValorPlan(plan){

      let valorPlan = '$ 0';

    switch(plan){
      case '1':  valorPlan = '$ 50.000';
      break;

      case '2':  valorPlan = '$ 150.000';
      break;

      case '3':  valorPlan = '$ 600.000';
      break;

      case '4':  valorPlan = '$ 1.000.000';
      break;

    }

    return valorPlan;

}

switchIconoEstado(estado){
  
  let iconoEstado = require('./imgs/cobrar.png');

    switch(estado){
      case '2':  iconoEstado = require('./imgs/asignado.png');
      break;

      case '3':  iconoEstado = require('./imgs/cerrada.png');
      break;

      case '5':  iconoEstado = require('./imgs/asignado.png');
      break;

    }
    return iconoEstado;
}
  render() {


    return (
 
     <FlatList
        data={this.state.ds}
        renderItem={({item}) => {
          return(

            <TouchableOpacity onPress={() => this.handlePress(item)}>
              <Venta vent={item} iconoPlan={this.switchIconoPlan(item.plan)} gananciaPlan={this.switchGananciaPlan(item.plan)} valorPlan={this.switchValorPlan(item.plan)} iconoEstado={this.switchIconoEstado(item.estado)}/> 
            </TouchableOpacity>

            );
        }}
        refreshControl={
          <RefreshControl
            refreshing = {this.state.refreshing}
            onRefresh={this._onRefesh.bind(this)}/>
        }
        keyExtractor={item => item.idVenta}/>



    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: 50,
  },
});




      /*
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(vent) => <Venta vent={vent} />}/>   */