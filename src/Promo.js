/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet, ListView,Alert, FlatList, RefreshControl,Text,TouchableOpacity,View,Image,Dimensions,Share} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob';

import {
  shareOnFacebook,
  shareOnTwitter,
} from 'react-native-social-share';

const {width}= Dimensions.get('window')

export default class Promo extends Component {
  
  constructor(props) {
    super(props);
     this.state = {
      item: this.props.item,
      idComercio: this.props.idComercio,
      ratio: 3,
      sourceImage: {uri: 'https://www.mako.guru/directorio/imagenes/promos/sinPromo.jpg'},
      hasImage: 0,
      data: null,
      };


        if (this.props.item.imagen != null) {
           this.ImageURI = 'https://www.mako.guru/directorio/imagenes/promos/'+this.state.idComercio+"/"+this.props.item.imagen;
          let imgPromo = {uri : this.ImageURI};
           this.setState({
            sourceImage : imgPromo,
            hasImage: 1,
          })

        }else{
          this.ImageURI = 'https://www.mako.guru/directorio/imagenes/promos/sinPromo.jpg';
        	let imgPromo = {uri : this.ImageURI};
          this.setState({
            sourceImage : imgPromo,
            hasImage: 0,
          })
        }

  }




componentWillReceiveProps(nextProps: Props) {
  this.setState({
    item: nextProps.item,
      idComercio: nextProps.idComercio,
          })

   if (this.props.item.imagen != null) {
           this.ImageURI = 'https://www.mako.guru/directorio/imagenes/promos/'+this.state.idComercio+"/"+this.props.item.imagen;
          let imgPromo = {uri : this.ImageURI};
           this.setState({
            sourceImage : imgPromo,
            hasImage: 1,
          })

        }else{
          this.ImageURI = 'https://www.mako.guru/directorio/imagenes/promos/sinPromo.jpg';
          let imgPromo = {uri : this.ImageURI};
          this.setState({
            sourceImage : imgPromo,
            hasImage: 0,
          })
        }
 

 Image.getSize( this.ImageURI, ( Width, Height ) =>
        {
            this.setState({ ratio: (Width/Height)});
 
        },(errorMsg) =>
        {
            console.log( errorMsg );
 
        });

     if (this.props.item.imagen != null) {
          
          let imgPromo = {uri : 'https://www.mako.guru/directorio/imagenes/promos/'+this.state.idComercio+"/"+this.props.item.imagen};
          this.setState({
            sourceImage : imgPromo,
            hasImage: 1,
          })
        } 



  }


componentDidMount(){

  Image.getSize( this.ImageURI, ( Width, Height ) =>
        {
            this.setState({ ratio: (Width/Height)});
 
        },(errorMsg) =>
        {
            console.log( errorMsg );
 
        });

     if (this.props.item.imagen != null) {
          
          let imgPromo = {uri : 'https://www.mako.guru/directorio/imagenes/promos/'+this.state.idComercio+"/"+this.props.item.imagen};
        	this.setState({
        		sourceImage : imgPromo,
        		hasImage: 1,
        	})
        } 

} 




  facebookShare(idPromo) {
    let mensa = 'https://mako.guru/directorio/directorio3.php?id='+this.state.codigo+'&idPromo='+idPromo;

            Share.share(
            {
                
              message: mensa
            
            }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));

  }

PreguntaEliminar(id, titulo){
  Alert.alert(
  'Estas seguro!',
  'Vas a eliminar la promoción - '+titulo,
  [
    {text: 'Cancelar', onPress: () => console.log('nooooo'), style: 'cancel'},
    {text: 'Ok', onPress: () => this.eliminarPromo(id)},
  ],
  { cancelable: true }
)
}

eliminarPromo( id ){
   
    this.setState({
              label: 'Eliminando informativo',
            })

    return fetch('http://www.mako.guru/listadosApp/eliminarPromo.php',{
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

this.getPromos(); // cambiar en todos por fn.actualizar
}


activarPromo( id ){
   
    this.setState({
              label: 'Activando informativo',
            })

    return fetch('http://www.mako.guru/listadosApp/activarPromo.php',{
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


desactivarPromo( id ){
   
    this.setState({
              label: 'Desactivando informativo',
            })

    return fetch('http://www.mako.guru/listadosApp/desactivarPromo.php',{
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


actDesactPromo(id, activo){

  if (activo == 0) {
    this.activarPromo(id);
  } else{
    this.desactivarPromo(id);
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


AgregarImagen(){
	ImagePicker.openPicker({
  width: 600,
  height: 600,
  cropping: true
}).then(image => {

	
	this.uploadImage('imagen.png',image,'0');

       

});
}

EditarImagen(){
	ImagePicker.openPicker({
  width: 600,
  height: 600,
  cropping: true
}).then(image => {

	
	this.uploadImage(this.props.item.imagen,image,'0');

       

});
}


PreguntaEliminarImg( titulo){
  Alert.alert(
  'Estas seguro!',
  'Vas a eliminar la imagen para la promoción - '+titulo,
  [
    {text: 'Cancelar', onPress: () => console.log('nooooo'), style: 'cancel'},
    {text: 'Ok', onPress: () => this.eliminarImagen()},
  ],
  { cancelable: true }
)
}


eliminarImagen(){


  
  this.uploadImage(this.props.item.imagen,'null','1');

}


uploadImage(nombre,imagen,eliminar){
	 RNFetchBlob.fetch('POST', 'https://www.mako.guru/listadosApp/uploadImgPromo.php', {
    Authorization : "Bearer access-token",
    otherHeader : "foo",
    Accept: 'text/plain',
    'Content-Type' : 'multipart/form-data',
  }, [

    { name : 'imagen', filename : nombre, type:'image/png', data: RNFetchBlob.wrap(imagen.path)},
    { name : 'id', filename : this.state.idComercio, type:'image/png', data: 'null'},
    { name : 'eliminar', filename : eliminar, type:'image/png', data: 'null'},
 
     

     
  ]).then((response) => response.json())
      .then((responseJson) =>{
            if (responseJson != 0) {
            	if (responseJson == '1') {

                  this.guardaUrl(responseJson, imagen);

              } else{

                  this.guardaUrl(responseJson, imagen);

              };
            } else{
    
    this.props.fn.setState({
    	label: 'Imposible guardar la imagen en este momento',
    })

            };
      }).catch((err) => {
    this.props.fn.setState({
    	label: 'Imposible guardar la imagen en este momento',

    })
  })
	 
}

guardaUrl(nombre, imagen){


    return fetch('http://www.mako.guru/listadosApp/guardaUrlPromo.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.props.item.id,
      url: nombre
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
       
       if (responseJson == 1) {
       		this.renderImagen(imagen);
       } else{
       	 this.props.fn.setState({
    	label: 'Imposible guardar la imagen en este momento',
    })
       };
      })

.catch((error) => {
        alert('error fetch: '+error);
      }); 


}

renderImagen(image){

if (image == 'null') {


            let imgPromo = { uri: image.path };
          this.setState({
              ratio: 3,
              sourceImage: {uri: 'https://www.mako.guru/directorio/imagenes/promos/sinPromo.jpg'},
              hasImage: 0,
              data: null,
          })
        

  

} else{

            let imgPromo = { uri: image.path };
          this.setState({
            sourceImage : imgPromo,
            data: image,
            hasImage: 1,
          })
        

         Image.getSize( image.path, ( Width, Height ) =>
        {
            this.setState({ ratio: (Width/Height)});
 
        },(errorMsg) =>
        {
            console.log( errorMsg );
 
        });



};
}

  render() {
 		const item = this.state.item;
        const urlpromo = 'https://www.mako.guru/directorio/imagenes/promoIcon.png';
        
     
       let iconoActivo = 'visibility-off';
        let lblActivo = 'Inactiva';
        let lblExis = '';

        if (item.activo == 1) {
            iconoActivo = 'visibility';          
            lblActivo = 'Activa';
        };

           if (item.existencias == 1) {
            lblExis = ' o hasta agotar existencias.';
        };

          return(

            <View style={[styles.promo]}  >


                  <View style={[styles.viewImg]}>
                    <Text style={[styles.txtPorciento]}> {item.porciento+'%'} </Text>
                  </View>
                  
                <View style={[styles.contPromo]}>
                  <View style={[styles.titulo]}>
                    <Text style={[styles.txttitulo]}> {item.titulo.toUpperCase()} </Text>
                  </View>


                  {this.state.hasImage != 1 ? 

                  	<View style={[styles.btnEditImg]}>
                    <TouchableOpacity style={[styles.btnEliminar]}  onPress={()=> this.AgregarImagen()}>
                      <Icon name={'camera-alt'} size={20} color={'#4177F6'}/>
                      <Text style={styles.txtEliminar}> Agregar imagen </Text>
                    </TouchableOpacity>
	                </View>

                  	:
                  	
                  	<View style={[styles.btnEditImg]}>
	                    <TouchableOpacity style={[styles.btnEliminar]}  onPress={()=> this.EditarImagen()}>
	                      <Icon name="edit" size={20} color={'#79DB48'}/>
	                      <Text style={styles.txtEliminar}> Editar imagen </Text>
	                    </TouchableOpacity>

						<TouchableOpacity style={[styles.btnEliminar]}  onPress={()=> this.PreguntaEliminarImg(item.titulo)}>
	                      <Icon name="delete" size={20} color={'#f54848'}/>
	                      <Text style={styles.txtEliminar}> Eliminar imagen </Text>
	                    </TouchableOpacity>
	                </View>

                  }
                  
                    <Image style={[styles.imgPromo,{borderColor: item.color,aspectRatio: this.state.ratio}]} source={this.state.sourceImage}/>
                  
                  



                  
                  <View style={[styles.txtPromo]}>
                    <Text style={styles.txtPromo}> {this.MaysPrimera(item.descripcion.toLowerCase())} </Text>
                  </View>

                   <Text style={styles.txtFechas}> {'Inicio el: '+ (item.fechaInicio) } </Text>

                    <Text style={styles.txtFechas}> {'Termina el: '+ (item.fechaFin) + lblExis} </Text>

               <View style={[styles.btnAccion]}>


                    <TouchableOpacity style={[styles.btnEliminar]}  onPress={()=> this.actDesactPromo(item.id,item.activo)}>
                      <Icon name={iconoActivo} size={20} color={'#4177F6'}/>
                      <Text style={styles.txtEliminar}> {lblActivo} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btnEditar]}  onPress={()=>Actions.EditarPromo({idPromo: item.id,idComercio: this.state.codigo, titulo: item.titulo, descrip: item.descripcion , fechaInicio: item.fechaInicio , fechaFin: item.fechaFin , existencias: item.existencias , porciento: item.porciento , colorCiudad: this.props.colorCiudad})}>
                      <Icon name="edit" size={20} color={'#79DB48'}/>
                      <Text style={styles.txtEditar}> Editar </Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={[styles.btnEliminar]}  onPress={()=> this.PreguntaEliminar(item.id,item.titulo)}>
                      <Icon name="delete" size={20} color={'#f54848'}/>
                      <Text style={styles.txtEliminar}> Eliminar </Text>
                    </TouchableOpacity>


                  </View>

                  {item.activo == 1 ? 

                    <TouchableOpacity style={styles.compartir} onPress={()=> this.facebookShare(item.id)}  > 
                  <Icon2 name="md-share" size={30} color={'#fff'}/>
                  <Text style={[styles.catego,{color: '#fff'}]}> Compartir</Text>
                  </TouchableOpacity>

                  :
                   null
                  }


                  
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
padding: 10,
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
    backgroundColor: '#f54848',
    top: 0,
    left: 0,
    zIndex: 10,
    position: 'absolute',
justifyContent: 'center' ,
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

compartir:{
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#4177F6',
  flexDirection: 'row',
  width: "100%",
  padding: 3,
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

imgPromo:{

alignSelf: "stretch", 
resizeMode: 'stretch'
},

btnImgPromo:{
  flex: 1,
  backgroundColor: 'rgba(34,34,34,0.8)',
  right: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center' ,
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 5,
},

btnEditImg:{
  width: '100%',
  height: 30,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center' ,
    borderColor: 'lightgray',
    borderWidth: 1,
}

});




      /*
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(vent) => <Venta vent={vent} />}/>   */