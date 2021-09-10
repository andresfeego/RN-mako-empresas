/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView, FlatList,ScrollView, TextInput, RefreshControl,Text,TouchableOpacity,View,Image,Dimensions,Alert} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Moment from 'moment';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
 
 

export default class AgregarSugerencia extends Component {
  
  constructor(props) {
    super(props);
     this.state = {
      idComercio: this.props.idComercio,
      sugerencia: '',
      colorCiudad: this.props.colorCiudad,
      label: 'Tus sugerencias son importantes para nosotros, espera una respuesta por parte de nuestro equipo. Responderemos en breve',
     
      };
  }






crear(){
   
    this.setState({
              label: 'Guardando informativo...',
            })

    return fetch('http://www.mako.guru/listadosApp/CrearSugerencia.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
        idComercio: this.state.idComercio,
      sugerencia: this.state.sugerencia,
      })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
            let that = this;
           // console.warn('okokokoko '+ responseJson);
         
          if (responseJson != 0) {
            this.setState({
              label: 'Guardado',
            })
            
             setTimeout(function() {
                   
                    Actions.pop();
                    }, 2000);
              

          }else{
             this.setState({
              label: 'No ha sido posible guardar los cambios, intenta mas tarde.',
            })
            
              
          }
            
            
  
      })

.catch((error) => {
        console.warn(error);
      }); 

}



  render() {
   

    return (

 <View style={styles.container}>


  <ScrollView style={styles.formulario}>
        <Text style={[styles.txtId,{color: this.state.colorCiudad}]}>{'Creando sugerencia'}</Text>

        <Text style={[styles.catego]}> {this.state.label}</Text>

 
        <TextInput placeholder={'Sugerencia'} placeholderTextColor="gray"  multiline={true} maxLength = {250} numberOfLines = {4} onChangeText={sugerencia => this.setState({sugerencia})} style={styles.txtFormu}>{this.state.sugerencia}</TextInput>
        
        
        </ScrollView>
   
        <View style={[styles.btnAccion]}>

          <TouchableOpacity style={[styles.btnEliminar]}  onPress={()=> Actions.pop()}>
            <Icon name="cancel" size={20} color={'#f54848'}/>
            <Text style={styles.txtEliminar}> Cancelar </Text>
          </TouchableOpacity>


          <TouchableOpacity style={[styles.btnEditar]} onPress={()=> this.crear()}>
            <Icon name="save" size={20} color={'#79DB48'}/>
            <Text style={styles.txtEditar}> Guardar </Text>
          </TouchableOpacity>


        </View>

      </View>
    
    );
  }
}

const styles = StyleSheet.create({

container:{
  flex: 1,
  width: '100%',
  justifyContent: 'center',

},

formulario:{
  flex: 1,
  marginTop: 15,
  marginHorizontal: 15,

},

radioBtn:{
marginTop: 15,
width: '100%',
justifyContent: 'center',
},


btnFecha:{
  backgroundColor: 'red',
  padding: 10,
  width: '100%',
  height: 30,
  borderRadius: 3,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 15,
},

txtbtnFecha:{
color: '#fff'
},


txtFormu:{
  width: '100%',
  paddingLeft: 4,
  paddingBottom: 4,
  color: '#2e3638',
  backgroundColor: '#ffffffce',
  marginBottom: 9,
  borderRadius: 4,
  elevation: 5,
  textAlign: 'left',
  flexWrap: 'wrap',
  marginTop: 10,
  
},




  btnAccion:{
    height: 40,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#2e3638',
  },

btnEditar:{
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center' ,
    borderColor: 'lightgray',
    borderWidth: 1,
},


btnEliminar:{
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center' ,
    borderColor: 'lightgray',
    borderWidth: 1,
},

txtEliminar:{
color: '#fff'
},

txtEditar:{
color: '#fff'
},

txtId:{
  margin: 15,
  fontSize: 15,
  fontFamily: 'CaviarDreams',
  textAlign: 'center',
},


catego:{
  color: 'gray',
  fontSize: 10,
  textAlign: 'center',
},
});

