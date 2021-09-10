/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView, FlatList,ListItem,CheckBox, RefreshControl,AsyncStorage,TouchableOpacity,View,Text} from 'react-native';

import Venta from './Venta';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default class checkVentList extends Component {
  
 
  
  constructor(props) {
    super(props);

     this.state = {
      id: this.props.usuario.id,
      refreshing: false,
      ds: '',
      activo: '1',
      selectedLots: [],
      token: ''
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

switchIconoPlan(plan){

      let iconoPlan = require('./imgs/obsequio.jpg');

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
  
  let iconoEstado = require('./imgs/cobrar.jpg');

    switch(estado){
      case '2':  iconoEstado = require('./imgs/asignado.jpg');
      break;

      case '3':  iconoEstado = require('./imgs/cerrada.jpg');
      break;

    }
    return iconoEstado;
}




  onCheckBoxPress(id) {
    alert('entrado');
    let tmp = this.state.selectedLots;

    if ( tmp.includes( id ) ) {
      tmp.splice( tmp.indexOf(id), 1 );
    } else {
      tmp.push( id );
    }

    this.setState({
      selectedLots: tmp
    });
    console.warn('selected: ', this.state.selectedLots)
  }

mostrar(m){
    console.warn('selected: ',m)
}




  render() {
    console.warn('listas de ventlist = ' + this.state.ds)

    return (
 <View style={styles.container}>
     <FlatList
        data={this.state.ds}
        renderItem={(item) => {
          return(

            <View>
             <CheckBox
                    onPress={()=>this.mostrar(item.idVenta)}/>
                  <Text> {item.idVenta} </Text>

            </View>

            );
        }}
        refreshControl={
          <RefreshControl
            refreshing = {this.state.refreshing}
            onRefresh={this._onRefesh.bind(this)}/>
        }
        keyExtractor={item => item.idVenta}/>

       <TouchableOpacity onPress={() => this.mostrar()} style={[styles.footer,{ borderBottomColor: '#008DD2', borderBottomWidth: 8}]}>
          <View style={styles.contfooter}>
            <Text style={styles.txtfooter}>Enviar</Text>
            <Icon name="send" size={40} color={'#fff'} style={styles.footerIcon}/>
          </View>
        </TouchableOpacity>
</View>
    
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 50,
  },
});


      /*
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(vent) => <Venta vent={vent} />}/>   */