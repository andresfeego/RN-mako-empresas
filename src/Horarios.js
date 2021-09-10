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
  TouchableOpacity,
  Linking,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class Horarios extends Component<{}> {








  render() {


      const { tipoHorario, tipojornada, de ,a } =this.props.horario
      const coloCiudad = this.props.color



     const backColor={
      backgroundColor: coloCiudad,
      
    };

    const borBottColor={
      borderBottomColor: '#C5C6C6',
      borderBottomWidth: 0.5,
    };

     const color={
      color: coloCiudad,
      
    };

let iconoDias = require('./imgs/lunesaviernes.png');
           switch(tipoHorario){
      case '1':  iconoDias = require('./imgs/lunesaviernes.png');
                 
      break;

      case '2':  iconoDias = require('./imgs/sabados.png');
                
      break;

      case '3':  iconoDias = require('./imgs/lunesasabado.png');
                 
      break;

      case '4':  iconoDias = require('./imgs/domingosyfestivos.png');
               
      break;

      case '5':  iconoDias = require('./imgs/lunesadomingo.png');
                 
      break;
      
      case '6':  iconoDias = require('./imgs/lunesfestivos.png');
                 
      break;
      
      case '7':  iconoDias = require('./imgs/lunesajueves.png');
                 
      break;
      
      case '8':  iconoDias = require('./imgs/viernesysabados.png');
                 
      break;
      
      case '9':  iconoDias = require('./imgs/viernessabadosydomingos.png');
                 
      break;
      

    }
let  iconoJor = 'mañana';
           switch(tipojornada){
      case '1':  iconoJor = 'mañana';
                 
      break;

      case '2':  iconoJor = 'tarde';
                
      break;

      case '3':  iconoJor = 'jor-continua';
                 
      break;


    }
    return (
      
          <View style={[styles.cajainfo]}>

                      
              <View style={styles.infor}>
                <Text style={[styles.txtjor, color,borBottColor]} > {iconoJor} </Text>
                <Text style={styles.txtinfo} > {'de'} </Text>
                <Text style={styles.txtinfo} > {de} </Text>
                <Text style={styles.txtinfo} > {'a'} </Text>
                <Text style={styles.txtinfo} > {a} </Text>
              </View>

         

              <View style={[styles.dias,backColor]}>
                <Image style={[styles.imgVer]} source={iconoDias}/>
              </View>

          </View>





 
      

    );
  }
}

const styles = StyleSheet.create({

cajainfo:{
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end',
},

txtjor:{
  width: '100%',
},

infor:{
  width: '85%',
},

txtinfo:{
textAlign: 'center',
},



dias:{
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 18,
},

});
