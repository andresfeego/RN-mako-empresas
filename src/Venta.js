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


export default class Venta extends Component<{}> {

  constructor(props) {
    super(props);
  
    this.state = {

      nombre: 'this.props.vent.nombre', 
      telefono: this.props.vent.telefono,
      idComercio: this.props.vent.idComercio,
      plan: this.props.vent.plan,
      estado: this.props.vent.estado,
      colorCiudad: this.props.vent.id_ciudad,
    };

    
  }


callNumber = (url) =>{
  if (this.state.telefono > 3) {
   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
   } else{};
}


whatsapp = (phone,wp) =>{
  if (wp == 1) {
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
    const txt0 = 'https://www.mako.guru/directorio/logos/RNNXPG4K.png'
    const txt1 = 'https://www.mako.guru/registro/imagenes/logo.png'
    const txt2 = 'IN•PACTO PUBLICITARIO'
    const txt3 = 'Sogamoso'
    const posit = 'Asesor comercial'
    const label1 = 'Mis ventas'
    let label2 = 'Activo'



 let iconoWhat = require('./imgs/sinwicono.png');

    if (this.props.vent.wp == 1) {
        iconoWhat = require('./imgs/wicono.png');      
    };



   
    let color='lightgray';

        
       
        switch(this.state.colorCiudad){
          case '1': ciudad='Sogamoso';color = 'rgb(255,159,63)';break;
          case '2': ciudad='Duitama';color = 'rgb(235,44,152)';break;
          case '3': ciudad='Tunja';color = 'rgb(34,168,216)';break;
          case '4': ciudad='Paipa';color = 'rgb(179,216,34)';break;
          case '5': ciudad='Villa de Leyva';color = 'rgb(182,121,214)';break;
          case '6': ciudad='Chiquinquira';color = 'rgb(236,83,83)';break;
          case '7': ciudad='Iza';color = 'rgb(247,210,14)';break;
        } 

    let colortxtFecha = color
    let colorFondoFecha = color
    let colorEstado = '#fff'
      if (this.props.vent.estado == 3) {
        colorEstado = '#E1E1E1'
        colortxtFecha = color
        colorFondoFecha = color
      };

   

    
    const backEstado={
      backgroundColor: colorEstado,
      
    };


    
    
    if (this.props.vent.estado == 1 || this.props.vent.estado == 2) {
      colortxtFecha = '#fff'
      colorFondoFecha = '#EC5353'
    };

    const fecha={
      backgroundColor: colorFondoFecha,
      
    };

      const txtFecha={
        color: colortxtFecha,
    };


    return (
       


        <View style={[styles.venta, backEstado]}>
          
          <View style={[styles.up,{borderBottomColor: color, borderBottomWidth: 2}]}>
            
            <Text numberOfLines={1} ellipsizeMode ={'tail'} style={[styles.txt0,{backgroundColor: color}]}> {this.props.vent.nombre.toUpperCase()} </Text>
            
            <View style={[styles.fecha,fecha]}>
              <Text style={[styles.txtFecha, txtFecha]}> {this.props.vent.fechaPospuesto} </Text>
            </View>

          </View>
          
          
          <View style={styles.down}>
            

            <View style={styles.izq}>
              <Text style={styles.txt2}> {this.props.gananciaPlan} </Text>
              <Text style={styles.txt3}> {this.props.valorPlan} </Text>
            </View>

            <View style={styles.der}>

              <TouchableOpacity onPress={()=> this.callNumber(`tel:${this.state.telefono}`)}>
                <Image style={styles.iconos2} source={require('./imgs/llamada.png')}/>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={()=> this.whatsapp(this.state.telefono,this.props.vent.wp)}>
                <Image style={styles.iconos2} source={iconoWhat}/>
              </TouchableOpacity>  
              
              <Image style={styles.iconos} source={this.props.iconoPlan}/>
              <Image style={styles.iconos} source={this.props.iconoEstado}/>

            </View>
          
          </View>



        </View>





 
      

    );
  }
}

const styles = StyleSheet.create({

venta:{
  backgroundColor: '#fff',
  height: 80,
  marginTop: 10,
  flexDirection: 'column',
  elevation   : 5,
},

up:{
  flexDirection: 'row' ,
  alignItems: 'center' ,
  height: 20,

},

fecha:{
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  right: 0,
  top: 0,
}, 


txtFecha:{
  fontSize: 11,
},

down:{
  flex: 1,
  flexDirection: 'row',
  marginHorizontal: 5,
  justifyContent: 'center' ,
},
  
izq:{
  flex: 1,
  flexDirection: 'column',
  alignItems: 'flex-end',
  marginHorizontal: 10,
  justifyContent: 'center',
},


der:{
  flex: 2,
  justifyContent: 'flex-end' ,
  alignItems: 'center',
  flexDirection: 'row',
},


txt0:{
  fontWeight: 'bold',
  fontSize: 13,
  color: '#fff',
  flex: 1,
  textAlign: 'center',
},

txt1:{
  fontWeight: 'bold',
  fontSize: 15,
  color: 'gray',
},

txt2:{
  fontWeight: 'bold',
  fontSize: 18,
  color: '#00A0E3',

},

txt3:{
  fontWeight: 'bold',
  fontSize: 10,
  color: '#009846',

},

iconos:{
  width: 40,
  height: 40,
  margin: 5,
  marginTop: 10 ,

},

iconos2:{
  width: 30,
  height: 30,
  margin: 5,
  marginTop: 10  
},

iconoW:{
  width: 30,
  height: 30,
  borderRadius: 50,
  margin: 5,
},

});
