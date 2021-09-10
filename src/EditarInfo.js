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
 
 

export default class EditarInfo extends Component {
  
  constructor(props) {
    super(props);
     this.state = {
      idInfo: this.props.idInfo,
      idComercio: this.props.idComercio,
      titulo: this.props.titulo,
      descrip: this.props.descrip,
      fechaInicio: Moment(this.props.fechaInicio).format('YYYY-MM-DD'),
      fechaFin: Moment(this.props.fechaFin).format('YYYY-MM-DD'),
      colorCiudad: this.props.colorCiudad,
      label: 'Los informativos que se encuentren inactivos sera activados de forma automatica a su fecha de inicio.',
      isDateTimePickerVisible: false,
      isDateTimePickerVisible2: false,
      radio_props : [
                      {label: 'Activo', value: 1 },
                      {label: 'Inactivo', value: 0 }
                    ],
      };
  }



 showDateTimePicker(){

 this.setState({ isDateTimePickerVisible: true });
 } 
 
 hideDateTimePicker(){

  this.setState({ isDateTimePickerVisible: false });
}

 showDateTimePicker2(){

 this.setState({ isDateTimePickerVisible2: true });
 } 
 
 hideDateTimePicker2(){

  this.setState({ isDateTimePickerVisible2: false });
}
 
 handleDatePicked(date){
  this.setState({ fechaInicio: Moment(date).format('YYYY-MM-DD') });
    this.hideDateTimePicker();
  };


 handleDatePicked2(date){
  this.setState({ fechaFin: Moment(date).format('YYYY-MM-DD') });
    this.hideDateTimePicker();
  };





guardar(){
   
    this.setState({
              label: 'Guardando informativo...',
            })

    return fetch('http://www.mako.guru/listadosApp/EditarInforma.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
       idInfo: this.state.idInfo,
       idComercio: this.state.idComercio,
      titulo: this.state.titulo,
      descrip: this.state.descrip,
      fechaInicio: this.state.fechaInicio,
      fechaFin:this.state.fechaFin,
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
        
       let inicial = 0;

       if (this.state.activo == 1) {
        inicial = 1;
       }; 

    return (

 <View style={styles.container}>


        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible2}
          onConfirm={(date)=> this.handleDatePicked2(date)}
          onCancel={()=> this.hideDateTimePicker2()}/>

                <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={(date)=> this.handleDatePicked(date)}
          onCancel={()=> this.hideDateTimePicker()}/>

  <ScrollView style={styles.formulario}>
        <Text style={[styles.txtId,{color: this.state.colorCiudad}]}>{'Editando Informativo: '+this.state.titulo}</Text>

        <Text style={[styles.catego]}> {this.state.label}</Text>


        <TextInput placeholder={'Titulo'} placeholderTextColor="gray"  onChangeText={titulo => this.setState({titulo})} style={styles.txtFormu}>{this.state.titulo}</TextInput>
        <TextInput placeholder={'Descripcion'} placeholderTextColor="gray"  multiline={true} maxLength = {250} numberOfLines = {4} onChangeText={descrip => this.setState({descrip})} style={styles.txtFormu}>{this.state.descrip}</TextInput>
        
        <Text style={styles.txtId}>{'Comienza el: '+this.state.fechaInicio}</Text>

        <TouchableOpacity style={[styles.btnFecha, {backgroundColor: this.state.colorCiudad}]} onPress={()=> this.showDateTimePicker()}>
          <Text style={styles.txtbtnFecha}>Cambiar fecha</Text>
        </TouchableOpacity>

        <Text style={styles.txtId}>{'Termina el: '+this.state.fechaFin}</Text>
        
        <TouchableOpacity style={[styles.btnFecha, {backgroundColor: this.state.colorCiudad}]} onPress={()=> this.showDateTimePicker2()}>
          <Text style={styles.txtbtnFecha}>Cambiar fecha</Text>
        </TouchableOpacity>

        
      
        </ScrollView>
   
        <View style={[styles.btnAccion]}>

          <TouchableOpacity style={[styles.btnEliminar]}  onPress={()=> Actions.pop()}>
            <Icon name="cancel" size={20} color={'#f54848'}/>
            <Text style={styles.txtEliminar}> Cancelar </Text>
          </TouchableOpacity>


          <TouchableOpacity style={[styles.btnEditar]} onPress={()=> this.guardar()}>
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

