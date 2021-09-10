/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView,Alert, FlatList, RefreshControl,Text,TouchableOpacity,View,Image,Dimensions} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width}= Dimensions.get('window')

export default class ListSugerencias extends Component {
  
  constructor(props) {
    super(props);
     this.state = {
      codigo: this.props.cod,
      colorCiudad: this.props.colorCiudad,
      label: 'Tus sugerencias son importantes para nosotros, espera una respuesta por parte de nuestro equipo. Responderemos en breve',
      refreshing: false,
      ds: '',

      };
  }



componentWillMount(){

          this.getSugerencias(this.props.cod);
          this.actualizar();
} 



  
actualizar(){


     this.getSugerencias(this.props.cod).then(() =>{
  
  let that = this;

  setTimeout(function() {
        that.actualizar();
        }, 1000);
  })

}

getSugerencias(id){
   

    return fetch('http://www.mako.guru/listadosApp/returnSugerenciasAppEmp.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      codigo: id,
      })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
         
          if (responseJson != 0) {
            data=[];
            data= responseJson;
            this.setState({
              ds: data,

            })

          }
            
            
  
      })

.catch((error) => {
        console.warn(error);
      }); 
}







_onRefesh(){
  
  this.setState({
    refreshing: true,
  });
     this.getEmpresas(this.state.ciudad, this.state.busRazon, this.state.busServicios , this.state.busCategoria).then(() =>{
    this.setState({
      refreshing:false,
    })
  })

  
 
}


MaysPrimera(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}






  render() {
        
       


    return (
  <View style={styles.contenido}>

   <View style={styles.cajalink}>

  <TouchableOpacity style={styles.touch} onPress={()=> Actions.AgregarSugerencia({ idComercio: this.state.codigo , colorCiudad: this.props.colorCiudad})}  > 
        <View style={styles.circulo}>
                <Icon name="add" size={30} color={this.state.colorCiudad}/>
          </View>
          <Text style={[styles.catego]}> Agregar sugerencia</Text>
      </TouchableOpacity>
        


    </View>
          <Text style={[styles.catego]}> {this.state.label}</Text>


  <View style={styles.lista}>

    <FlatList
    style={styles.lista}
        data={this.state.ds}
        renderItem={({item}) => {
 
        

          return(

            <View style={[styles.promo]}  >


                  <View style={[styles.viewImg]}>
                	<Icon name="live-help" size={30} color={'#fff'}/>
                  </View>
                  
                <View style={[styles.contPromo]}>
                  <View style={[styles.titulo]}>
                    <Text style={[styles.txttitulo]}> Sugerencia </Text>
                  </View>
                  
                  <View style={[styles.txtPromo]}>
                    <Text style={styles.txtPromo}> {'Tu sugerencia: '+this.MaysPrimera(item.sugerencia.toLowerCase())} </Text>
                  </View>

                  {item.respuesta != '' ?

                  <View style={[styles.txtPromo]}>
                    <Text style={[styles.txtPromo,{color: this.state.colorCiudad}]}> {'Nuestra respuesta: '+this.MaysPrimera(item.respuesta.toLowerCase())} </Text>
                  </View>
                  : null
              }
				</View>
               

            </View>

            );
        }}
       rol={
          <RefreshControl
            refreshing = {this.state.refreshing}
            onRefresh={this._onRefesh.bind(this)}/>
        }
        keyExtractor={item => item.orden}/>
     
          </View>
        </View>


    
    );
  }
}

const styles = StyleSheet.create({

lista:{
width: '100%',
},

  promo:{
  flex: 1,
  flexDirection: 'row',
  borderTopColor: 'lightgray',
  marginBottom: 15,

},

titulo:{
	width: '100%',
	backgroundColor: 'green',

},

txttitulo:{
fontSize: 19,
},


txtPorciento:{
fontSize: 17,
alignSelf: 'center',
textAlign: 'center' ,
color: '#fff',
fontWeight: 'bold' ,
},

logo:{
  width: ((width/2)-12),
  height: ((width/2)-12),
  alignItems: 'center',
  justifyContent: 'center',
},

contPromos:{
  position: 'absolute',
  top: 0,
  right: 0,
  flexDirection: 'column',
},

contPromo:{

  backgroundColor: '#fff',
  flex: 1,
  justifyContent: 'center' ,
  alignItems: 'center' ,
  marginTop: 15,
  marginLeft: 20,
  marginRight: 10,
  borderColor: 'lightgray',
  borderWidth: 0.5,
  flexDirection: 'column',
  elevation: 5,

},


txtPromo:{
fontSize: 15,
textAlign: 'left',
flex: 1,
padding: 5,
},

promoIcon:{
width: 30,
height: 30,
borderRadius: 30,
backgroundColor: '#f54848',
marginLeft: 5,
},

infoIcon:{
width: 30,
height: 30,
borderRadius: 30,
backgroundColor: '#79DB48',
marginLeft: 5,
},

vistoIcon:{
width: 30,
height: 30,
borderRadius: 30,
backgroundColor: '#00A0E3',
marginLeft: 5,
},

imgPromo:{
width: 40,
height: 40,
},

image:{
    width: 40,
    height: 40,
    borderWidth: 0,

},

viewImg:{
    width: 40,
    height: 40,
    borderWidth: 0,
    borderRadius: 30,
    backgroundColor: '#34c1bb',
    top: 0,
    left: 0,
    zIndex: 10,
    position: 'absolute',
justifyContent: 'center' ,
alignItems: 'center' ,
elevation: 9,
},


texto:{
  flex: 1,
},

txttitulo:{
  fontWeight: 'bold',
  fontSize: 13,
  textAlign: 'center',
  backgroundColor: 'lightgray',
  height: 20,
  width: '100%',
},

descripcion:{
  color: 'gray',
  fontSize: 10,
  textAlign: 'center',
},

txtFechas:{
fontSize: 12,
width: '100%',
textAlign: 'left',
flex: 1,
padding: 5,
paddingHorizontal: 10,
},


cajalink:{
flex: 1,
  flexDirection: 'row',
  paddingVertical: 10,
  justifyContent: 'center',

},

catego:{
  color: 'gray',
  fontSize: 10,
  textAlign: 'center',
},


circulo: {
  width: 50,
  height: 50,
  backgroundColor: '#fff',
  borderRadius: 50,
  justifyContent: 'center',
  alignItems: 'center', 
},

touch:{
  alignItems: 'center',
  width: 65,
  margin: 5,
  marginHorizontal: 10
    
},

  ver:{
    width: 0,
    height: 0,
    justifyContent: 'center',
    alignItems: 'center',

  },




  btnAccion:{
    height: 30,
    width: '100%',
    flexDirection: 'row',
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

});




      /*
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(vent) => <Venta vent={vent} />}/>   */