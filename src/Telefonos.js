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

export default class telefonos extends Component<{}> {







callNumber = (url) =>{
   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
}


whatsapp = (phone,wp) =>{
  if (wp != 0) {
  const url = 'whatsapp://send?text=Buen día, te contacto por  medio de www.mako.guru, quisiera...&phone=+57'+phone; 

   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
   };
}





  render() {


      const { telefono, wp, tipo} =this.props.telefono

     


      let iconoWp = require('./imgs/wicono.png');
      let iconoTipo = 'ios-phone-portrait-outline';
      let llamada = `tel:${telefono}`;

        if (wp == 0) {
          iconoWp = require('./imgs/sinwicono.png');

        };

         if (tipo == 1) {
          iconoWp = require('./imgs/nowicono.png');
          iconoTipo = 'md-call';
          llamada = `tel:038${telefono}`;

        };



    return (
          <View style={[styles.cajainfo]}>

            <TouchableOpacity onPress={()=> this.callNumber(llamada)} style={[styles.llamada]}>  
                      
              <View style={styles.iconos}>
                <Icon name={''+iconoTipo} size={30} color={'#898989'}/>
              </View>

              <View style={styles.infor}>
                <Text style={styles.txtinfo} > {telefono} </Text>
              </View>
           
            </TouchableOpacity>
              
            <TouchableOpacity   onPress={()=> this.whatsapp(telefono,wp)} style={styles.wiconos}>
                <Image style={[styles.image]} source={iconoWp}/>
            </TouchableOpacity>


          </View>




 
      

    );
  }
}

const styles = StyleSheet.create({


cajainfo:{
  flex: 1,
  flexDirection: 'row',
  borderBottomColor: '#C5C6C6',
  borderBottomWidth: 0.5,
},

iconos:{
  width: 50,
  justifyContent: 'center',
  alignItems: 'center', 
  paddingLeft: 10,
},

llamada:{
flex: 1,
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',

},

wiconos:{
  width: '15%',
  justifyContent: 'center',
  alignItems: 'center', 
  paddingLeft: 0,
  borderLeftColor: '#C5C6C6',
  borderLeftWidth: 0.5,
},

infor:{
flex: 1,
flexDirection: 'column',
justifyContent: 'center',
},

txtinfo:{
  //justifyContent: 'center',
  //alignItems: 'center',
  flex: 1,
  textAlign: 'right',
  fontSize: 26,
  paddingVertical: 10,
  flexWrap: 'nowrap', 


},

image:{
height: '70%',
  resizeMode: Image.resizeMode.contain,
},


});
