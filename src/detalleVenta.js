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
  FlatList,
  ScrollView,
  Alert,
  AsyncStorage,
  Dimensions,
  RefreshControl,
  BackAndroid
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Telefonos from './Telefonos.js';
import Mails from './Mails.js';
import Contenido from './Contenido.js';
import Horarios from './Horarios.js';
import ListaPromoEmp from './ListaPromoEmp.js';
import {Actions} from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

export default class detralleVenta extends Component<{}> {


//.................................CONSTRUICTOR........................  

  constructor(props) {
    super(props);
     this.state = {
      refreshing: false,
      orden: '',
      fechaRegistro: '',
      activo: '',
      codigo: this.props.idComercio,
      credito: '0',
      nombre: '',
      descripcion: '',
      direccion: '',
      VChoras: '',
      domicilio: '',
      costo_domicilio: '',
      pagina_web: '',
      url_logo: '',
      categoria: '',
      palabras_clave: '',
      ubicacion_maps: '',
      visto: '',
      listado: '',
      cantidad_de_votos: '',
      numero_de_votantes: '',
      tipo_comercio: '',
      vip: '',
      afiliacion_vip: '',
      lat: '',
      lng: '',
      colorCiudad: '',
      barrio: '',
      ciudad: '',
      idCiudad: '',
      correos:[],
      horarios:[],
      telefonos:[],
      contenido: 1,
      txtInfoMako: '',
      currentPosition: 0,
      numInfo: 0,
      numPromo: 0,
      ds: [],
      dsPromosEmp: [],



      };
  AsyncStorage.setItem('user', this.props.user);
  AsyncStorage.setItem('pass', this.props.pass);


  }


//............................DID AND WILL MOUNT METHOD .............................

componentDidMount(){

  this.getEmpresa();
  this.getCiudad();


}


componentWillUnmount(){

  BackAndroid.removeEventListener('hardwareBackPress', this.ok);

  
}
  

ok(){
 if (Actions.currentScene == 'detalleVenta') {

BackAndroid.exitApp();
 }
}


//............................FUNCIONES PARA ARMADO DE EMPRESA COMPLETA .............................



getEmpresa(){

    return fetch('http://www.mako.guru/listadosApp/empresaXcodigo.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.codigo
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
          //console.warn('antes', this.state.lista);
       
       BackAndroid.addEventListener('hardwareBackPress', this.ok);



       this.setState({
            orden: responseJson.orden,
            fechaRegistro: responseJson.fechaRegistro,
            activo: responseJson.activo,
            codigo: responseJson.codigo,
            credito: responseJson.credito,
            nombre: responseJson.nombre,
            descripcion: responseJson.descripcion,
            direccion: responseJson.direccion,
            VChoras: responseJson.vc_horas,
            domicilio: responseJson.domicilio,
            costo_domicilio: responseJson.costo_domicilio,
            pagina_web: responseJson.pagina_web,
            url_logo: responseJson.url_logo,
            categoria: responseJson.categoria,
            palabras_clave: responseJson.palabras_clave,
            ubicacion_maps: responseJson.ubicacion_maps,
            visto: responseJson.visto,
            listado: responseJson.listado,
            cantidad_de_votos: responseJson.cantidad_de_votos,
            numero_de_votantes: responseJson.numero_de_votantes,
            tipo_comercio: responseJson.tipo_comercio,
            vip: responseJson.vip,
            afiliacion_vip: responseJson.afiliacion_vip,
            lat: responseJson.lat,
            lng: responseJson.lng,
            numInfo: responseJson.numInfo,
            numPromo: responseJson.numPromo,

 
       })

 

      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}

getCiudad(){

    return fetch('http://www.mako.guru/listadosApp/barriociudadXempresa.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.codigo
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
          //console.warn('antes', this.state.lista);
       
       this.setState({
          colorCiudad: responseJson.color,
          barrio: responseJson.nombreBarrio,
          ciudad: responseJson.nombre,
          idCiudad: responseJson.id_ciudad,
 
       })
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}





cambiaContenido(conte){
  this.setState({
    contenido: conte,
  })


 setTimeout(function() {
 
if (conte >= 2 ) {

    this.conteconte.scrollTo({ y: 150, animated: true });

}else{
    this.conteconte.scrollTo({ y: 1, animated: true });
  };
        }, 3000);


}




salir(){

  AsyncStorage.clear();
  Actions.ViewLogin();


}





_onRefesh(){
  
  this.setState({
    refreshing: true,
  });
     this.getCat().then(() =>{
    this.setState({
      refreshing:false,
    })
  })

  
 
}


//............................FUNCIONES PARA RENDER .............................
  render() {
    const txt0 = 'https://www.mako.guru/directorio/logos/RNNXPG4K.png'
    const txt1 = 'https://www.mako.guru/registro/imagenes/logo.png'
    const txt2 = 'IN•PACTO PUBLICITARIO'
    const txt3 = 'Sogamoso'
    const posit = 'Asesor comercial'
    const label1 = 'Mis ventas'
    let label2 = 'Activo'



    let fondoCiudad = require('./imgs/fondoheader0.png');

    switch(this.state.idCiudad){
      case '1':  fondoCiudad = require('./imgs/fondoheader1.png');
                 
      break;

      case '2':  fondoCiudad = require('./imgs/fondoheader2.png');
                
      break;

      case '3':  fondoCiudad = require('./imgs/fondoheader3.png');
                 
      break;

      case '4':  fondoCiudad = require('./imgs/fondoheader4.png');
               
      break;

      case '5':  fondoCiudad = require('./imgs/fondoheader5.png');
                 
      break;

    }


    let pagina = this.state.pagina_web;
    let newPagina = this.state.pagina_web;
    let iconoweb = 'ios-globe-outline';

    const palabra = 'facebook.';
    const palabra1 = 'fb.';
      if (!pagina.indexOf(palabra) || !pagina.indexOf(palabra1)) {
        newPagina= 'Ver Perfil'
        iconoweb= 'logo-facebook'
      };

    const urllogo = 'https://www.mako.guru/directorio/'+this.state.url_logo;
    

     const backColor={
      backgroundColor: this.state.colorCiudad,
      
    };

    const borBottColor={
      borderBottomColor: this.state.colorCiudad,
      borderBottomWidth: 1,
    };



  let conteni = this.state.contenido;
    let colorIcono1 = '#fff';
    let colorIcono2 = '#fff';
    let colorIcono3 = '#fff';
    let colorIcono4 = '#fff';
    let colorIcono5 = '#fff';
    let colorIcono6 = '#fff';

    switch(conteni){

      case 1:  colorIcono1 = '#f33446';
      break;

      case 2:  colorIcono2 = '#f33446';
      break;
      
      case 3:  colorIcono3 = '#f33446';
      break;
      
      case 4:  colorIcono4 = '#f33446';
      break;
      
      case 5:  colorIcono5 = '#f33446';
      break;
      
      case 6:  colorIcono6 = '#f33446';
      break;
      

    }
    

  let conte = {
      contenido: this.state.contenido,
      idComercio: this.state.codigo,
      colorCiudad: this.state.colorCiudad,
    }

        const urlpromo = 'https://www.mako.guru/directorio/imagenes/infoIcon.png';


    return (
       

      <View style={styles.container} > 

        <ScrollView style={styles.scrollcontnido} ref={ref => conteconte = ref}> 

            




              <ListaPromoEmp />
      


          <View style={[styles.header,backColor]}>
                <Image style={[styles.fondoHeader]} source={fondoCiudad}/>
                <Image style={[styles.imgMakoT]} source={require('./imgs/makoTransparente.png')}/>
                <Image style={[styles.image]} source={{ uri : urllogo}}/>
                <Text style={styles.nombre}> {this.state.nombre} </Text>


          </View>
          

        <Contenido  style={styles.conteInteract} conte={conte} appFun={this} />

        </ScrollView>



         <View  style={styles.footer}>
          <TouchableOpacity  onPress={()=> this.cambiaContenido(1)}  style={[styles.footerIcon]}>
            <Icon name="list" size={30} color={colorIcono1} style={styles.footerIcon}/>
            <Text numberOfLines={1} ellipsizeMode ={'tail'} style={[styles.texto,{color: colorIcono1}]}>Información</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.cambiaContenido(3)}  style={[styles.footerIcon]}>
            <Icon name="local-offer" size={30} color={colorIcono3} style={styles.footerIcon} />
            <Text numberOfLines={1} ellipsizeMode ={'tail'} style={[styles.texto,{color: colorIcono3}]}>{this.state.numPromo+' Promociones'}</Text>
          </TouchableOpacity>


          <TouchableOpacity  onPress={()=> this.cambiaContenido(2)} style={[styles.footerIcon]}>
            <Icon name="info" size={30} color={colorIcono2} style={styles.footerIcon}/>
            <Text style={[styles.texto,{color: colorIcono2}]}>{this.state.numInfo+' Informativos'}</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={()=> this.cambiaContenido(4)}  style={[styles.footerIcon]}>
            <Icon name="live-help" size={30} color={colorIcono4} style={styles.footerIcon} />
            <Text style={[styles.texto,{color: colorIcono4}]}>Sugerencias</Text>
          </TouchableOpacity>



          <TouchableOpacity onPress={()=> this.salir()}  style={[styles.footerIcon]}>
            <Icon name="input" size={30} color={colorIcono5} style={styles.footerIcon} />
            <Text style={[styles.texto,{color: colorIcono5}]}>Salir</Text>
          </TouchableOpacity>


        
        </View>



      </View>


      


 
      

    );
  }
}

const styles = StyleSheet.create({

container:{
  flex: 1,
  height: '100%',
},

scrollcontnido:{
  flex:1,
  flexDirection: 'column',
},

header:{
  flex: 1,
  height: 170,
  backgroundColor: '#000',
  justifyContent: 'flex-end',
  alignItems: 'center', 
  elevation: 10

},

carourelTxt:{
height: 30,
},

conteInteract:{
backgroundColor: 'red'
},



imgMakoT:{
  width: '150%',
  height: '100%',
  position: 'absolute',
  top: -10,
  right: -250,
  resizeMode: Image.resizeMode.contain,
},

fondoHeader:{
  width: '100%',
  position: 'absolute',
  top: '-110%',
  left: 0,
  resizeMode: Image.resizeMode.contain,
},

image:{
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    marginHorizontal: 30,
    borderColor: '#1C252A',
    borderWidth: 3,
  },

nombre:{
  color: '#fff',
   fontWeight: 'bold',
  fontSize: 17,
  textAlign: 'center',
  marginHorizontal: 5,
  marginVertical: 10
},

descrip:{
  color: '#5B5B5B',
  fontSize: 14,
  textAlign: 'center',
  paddingHorizontal: 5,
  paddingVertical: 5,
  backgroundColor: '#C5C6C6',
  elevation: 5
}, 

contenido:{
  flex: 1,

},

cajainfo:{
  flex: 1,
  flexDirection: 'row',
  paddingVertical: 20,

},

cajainfolist:{
  flex: 1,
  flexDirection: 'row',
  paddingRight: 0,

},


iconos:{
  width: 50,
  justifyContent: 'center',
  alignItems: 'center', 
  paddingLeft: 10,
},

info:{
  flex: 1,
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
},

txtinfo:{
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  textAlign: 'right',
  paddingRight: 20,
   fontSize: 16,

},

texto:{
  fontSize: 10,
  color: '#fff',
},

txtciudad:{
  backgroundColor: '#333',
  height: 30,
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: '#fff',
},

telef:{
  width: '90%',
},

  footer:{
   height: 50,   
  flexDirection: 'row',
  backgroundColor: '#2e3638',
  alignItems: 'center', 
},

footerIcon:{
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},

imgInf:{
width: 15,
height: 15,
},

promo:{
flexDirection: 'row',
backgroundColor: '#fff',
flexWrap: 'nowrap', 
alignItems: 'center',

},



infoIcon:{
width: 15,
height: 15,
borderRadius: 30,
backgroundColor: '#79DB48',
marginLeft: 5,
},

viewImg:{
    width: 15,
    height: 15,
    borderWidth: 0,
    borderRadius: 15,
    backgroundColor: '#79DB48',
    elevation: 2,
justifyContent: 'center' ,
alignItems: 'center' ,
margin: 3,
},

listaPromoEmp:{
height: 100,
},

promoEmp:{
width: 250,
height: 90,
margin: 5,
flexDirection: 'row',
backgroundColor: '#fff',
elevation: 3,
},


logoPromoEmp:{
width: 110,
height: 110,
borderRadius: 55,
position: 'absolute',
top: -5,
left: -35,
borderWidth: 3,
zIndex: 2,
elevation: 4
},

txtPromoEmp:{
  flex: 1,
  justifyContent: 'center' ,
},

tituloPromoEmp:{
flex: 1,
textAlign: 'left',
paddingLeft: 65,
fontSize: 15,
justifyContent: 'center',
fontFamily: 'CaviarDreams_Bold',
color: '#fff',
},

txtDescPromoEmp:{
flex: 3,
paddingLeft: 75,
paddingTop: 5,
},

descripcionPromoEmp:{
textAlign: 'left',
fontSize: 12,
fontFamily: 'CaviarDreams'
},

imgPromo:{
  width: '100%',
  height: '100%',
  position: 'absolute',

},

porcientoPromoEmp:{
position: 'absolute',
bottom: -5,
right: -10,
width: 50,
height: 50,
textAlign: 'center',
justifyContent: 'center' ,
alignItems: 'center' ,
},

porcientoEmp:{
color: '#fff',
fontFamily: 'CaviarDreams_Bold'
},

});


/*


        

        <FlatList
          data={this.state.correos}
          renderItem={({item}) => <Text style={styles.txt3}>{item.correo}</Text>}
          keyExtractor={item => item.idcorreo}/>

        <FlatList
          data={this.state.horarios}
          renderItem={({item}) => <Text style={styles.txt3}>{item.de}</Text>}
          keyExtractor={item => item.idjornadas}/>

*/