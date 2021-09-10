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

export default class Mails extends Component<{}> {






sendMail = (mail) =>{
  const url = 'mailto:'+mail+'?subject=Contacto por medio de www.mako.guru&body=body'; 

   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
}





  render() {


      const { correo} =this.props.mail

     

    return (
        <TouchableOpacity onPress={()=> this.sendMail(correo)}>  
          <View style={[styles.cajainfo]}>

                      
              <View style={styles.iconos}>
                <Icon name={'ios-mail-outline'} size={30} color={'#898989'}/>
              </View>

              <View style={styles.info}>
                <Text style={styles.txtinfo} > {correo} </Text>
              </View>
          </View>
        </TouchableOpacity>




 
      

    );
  }
}

const styles = StyleSheet.create({


cajainfo:{
  flex: 1,
  flexDirection: 'row',
  borderBottomColor: '#C5C6C6',
  borderBottomWidth: 0.5,
  paddingBottom: 6,

},

iconos:{
  width: 50,
  justifyContent: 'center',
  alignItems: 'center', 
  paddingLeft: 10,
},

wiconos:{
  width: 50,
  justifyContent: 'center',
  alignItems: 'center', 
  paddingLeft: 10,
  borderLeftColor: '#C5C6C6',
  borderLeftWidth: 0.5,
},

info:{
width: '75%',
flexDirection: 'column',
},

txtinfo:{
  //justifyContent: 'center',
  //alignItems: 'center',
  flex: 1,
  textAlign: 'right',
   fontSize: 18,
     paddingVertical: 10,
     flexWrap: 'nowrap', 

},

image:{
height: '100%',
  resizeMode: Image.resizeMode.contain,
},


});
