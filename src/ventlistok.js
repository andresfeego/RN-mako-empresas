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
      ds: new ListView.DataSource({ rowHasChanged: (r1, r2) => {r1 !== r2}}),
      activo: '1',
      };

     
  }

 

componentWillMount(){
  
  AsyncStorage.getItem('id').then((myId) => {
 
      this.setState({
        id: myId,
      })
  
  })

  this.comprobarActivo().then((id) => {
           this.getVVentas();

  })


} 

comprobarActivo(){

   return fetch('http://www.mako.guru/listadosApp/returnVendedor.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.id,
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
          

        if (responseJson.activo=='0') {
           this.setState({
            activo: responseJson.activo,

           }) 

        };

      })
      .catch((error) => {
        console.warn(error);
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
          if (this.state.activo=='1') {
            data= responseJson;
          } 
       this.setState({
          ds: this.state.ds.cloneWithRows(data),
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

 
      
  this.comprobarActivo().then((id) => {
     this.getVVentas().then(() =>{
    this.setState({
      refreshing:false,
    })
  })
  })
  
 
}



handlePress(venta){
Actions.detalleVenta({venta});

}

  render() {


    return (
 
     <ListView
        dataSource={this.state.ds}
        renderRow={(item) => {
          return(

            <TouchableOpacity onPress={() => this.handlePress(item)}>
              <Venta vent={item}/> 
            </TouchableOpacity>

            );
        }}
        refreshControl={
          <RefreshControl
            refreshing = {this.state.refreshing}
            onRefresh={this._onRefesh.bind(this)}/>
        }/>


    
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