/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView, FlatList, RefreshControl,Text,TouchableOpacity,View,Image,Dimensions,Alert,Share} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Informativo from './Informativo.js';

import {
  shareOnFacebook,
  shareOnTwitter,
} from 'react-native-social-share';


const {width}= Dimensions.get('window')

export default class ListInfor extends Component {
  
  constructor(props) {
    super(props);
     this.state = {
      codigo: this.props.cod,
      label: 'Los informativos que se encuentren inactivos sera activados de forma automatica a su fecha de inicio.',
      refreshing: false,
      ds: '',

      };
  }



componentWillMount(){

          this.getPromos(this.props.cod);
          this.actualizar();

} 

actualizar(){


     this.getPromos(this.props.cod).then(() =>{
  
  let that = this;

  setTimeout(function() {
        that.actualizar();
        }, 1000);
  })

}



  facebookShare(idInfo) {
    let mensa = 'https://mako.guru/directorio/directorio3.php?id='+this.state.codigo+'&idInfo='+idInfo;

            Share.share(
            {
                
              message: mensa
            
            }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));

  }




  
getPromos(id){
   

    return fetch('http://www.mako.guru/listadosApp/returnInfosAppEmp.php',{
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
              label: 'Los informativos que se encuentren inactivos sera activados de forma automatica a su fecha de inicio.',
              ds: data,
            })

          }else{
             this.setState({
              label: 'No  tienes informativos para mostrar.',
              ds: '',

            })

          }
            
            
  
      })

.catch((error) => {
        console.warn(error);
      }); 
}



PreguntaEliminar(id, titulo){
  Alert.alert(
  'Estas seguro!',
  'Vas a eliminar el informativo - '+titulo,
  [
    {text: 'Cancelar', onPress: () => console.log('nooooo'), style: 'cancel'},
    {text: 'Ok', onPress: () => this.eliminarInf(id)},
  ],
  { cancelable: true }
)
}



eliminarInf( id ){
   
    this.setState({
              label: 'Eliminando informativo',
            })

    return fetch('http://www.mako.guru/listadosApp/eliminarInformativo.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: id,
      idComercio: this.state.codigo,
      })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
            let that = this;
         
          if (responseJson != 0) {
            this.setState({
              label: 'Informativo eliminado',
            })
            
             setTimeout(function() {
                    that.setState({
                    label: 'Los informativos que se encuentren inactivos sera activados de forma automatica a su fecha de inicio.',
                    });
                    }, 5000);
              

          }else{
             this.setState({
              label: 'No ha sido posible eliminar, intenta mas tarde.',
            })
              setTimeout(function() {
                    that.setState({
                      label: 'Los informativos que se encuentren inactivos sera activados de forma automatica a su fecha de inicio.',

                    })
                    }, 5000);
              
          }
            
            
  
      })

.catch((error) => {
        console.warn(error);
      }); 

this.getPromos();
}


activarInforma( id ){
   
    this.setState({
              label: 'Eliminando informativo',
            })

    return fetch('http://www.mako.guru/listadosApp/activarInforma.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: id,
      idComercio: this.state.codigo,
      })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
            let that = this;
            console.warn('okokokoko '+ responseJson);
         
          if (responseJson != 0) {
            this.setState({
              label: 'Informativo activado',
            })
            
             setTimeout(function() {
                    that.setState({
                    label: 'Los informativos que se encuentren inactivos sera activados de forma automatica a su fecha de inicio.',
                    });
                    }, 5000);
              

          }else{
             this.setState({
              label: 'No ha sido posible activar, intenta mas tarde.',
            })
              setTimeout(function() {
                    that.setState({
                    label: 'Los informativos que se encuentren inactivos sera activados de forma automatica a su fecha de inicio.',

                    })
                    }, 5000);
              
          }
            
            
  
      })

.catch((error) => {
        console.warn(error);
      }); 

this.getPromos();
}



desactivarInforma( id ){
   
    this.setState({
              label: 'Eliminando informativo',
            })

    return fetch('http://www.mako.guru/listadosApp/desactivarInforma.php',{
    method:'POST',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: id,
      idComercio: this.state.codigo,
      })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
            let that = this;
            console.warn('okokokoko '+ responseJson);
         
          if (responseJson != 0) {
            this.setState({
              label: 'Informativo desactivado',
            })
            
             setTimeout(function() {
                    that.setState({
                    label: 'Los informativos que se encuentren inactivos sera activados de forma automatica a su fecha de inicio.',
                    });
                    }, 5000);
              

          }else{
             this.setState({
              label: 'No ha sido posible desactivar, intenta mas tarde.',
            })
              setTimeout(function() {
                    that.setState({
                    label: 'Los informativos que se encuentren inactivos sera activados de forma automatica a su fecha de inicio.',

                    })
                    }, 5000);
              
          }
            
            
  
      })

.catch((error) => {
        console.warn(error);
      }); 

this.getPromos();
}



actDesactInf(id, activo){

  if (activo == 0) {
    this.activarInforma(id);
  } else{
    this.desactivarInforma(id);
  };

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


handlePress(empresa){
  if (empresa.activo != 0) {
this.contarVisita(empresa.codigo);

Actions.DetalleVenta({empresa});
}
}





  render() {
        
       


    return (
  <View style={styles.contenido}>

   <View style={styles.cajalink}>

  <TouchableOpacity style={styles.touch} onPress={()=> Actions.AgregarInfo({ idComercio: this.state.codigo , colorCiudad: this.props.colorCiudad})}  > 
        <View style={styles.circulo}>
                <Icon name="add" size={30} color={this.state.colorCiudad}/>
          </View>
          <Text style={[styles.catego]}> Agregar informativo</Text>
      </TouchableOpacity>
        


    </View>
          <Text style={[styles.catego]}> {this.state.label}</Text>

  <View style={styles.lista}>

    <FlatList
    
    style={styles.lista}
        data={this.state.ds}
        renderItem={({item}) => {
      return (        
              <Informativo item={item} fn={this} idComercio = {this.state.codigo}/>
            );
        }}
       rol={
          <RefreshControl
            refreshing = {this.state.refreshing}
            onRefresh={this._onRefesh.bind(this)}/>
        }
        keyExtractor={item => item.id}/>
     
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
  flexDirection: 'column',
  marginBottom: 15,

},

titulo:{
  width: '100%',

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
  flex: 1,
  backgroundColor: 'red',
  top: 0,
  right: 0,
  flexDirection: 'row',
},

contPromo:{

  backgroundColor: '#fff',
  flex: 1,
  justifyContent: 'center' ,
  alignItems: 'center' ,
  marginTop: 25,
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
paddingHorizontal: 10,
},

txtFechas:{
fontSize: 12,
width: '100%',
textAlign: 'left',
flex: 1,
padding: 5,
paddingHorizontal: 10,
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
    backgroundColor: '#79DB48',
    top: 10,
    left: 0,
    elevation: 9,
    position: 'absolute',
justifyContent: 'center' ,
},


texto:{
  flex: 1,
},

txttitulo:{
  fontWeight: 'bold',
  fontSize: 13,
  textAlign: 'center',
  backgroundColor: 'lightgray',
  width: '100%',
},

descripcion:{
  color: 'gray',
  fontSize: 10,
  textAlign: 'center',
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

compartir:{
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#4177F6',
  flexDirection: 'row',
  width: "100%",
  padding: 3,
  marginHorizontal: 10
    
},

});




      /*
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(vent) => <Venta vent={vent} />}/>   */










