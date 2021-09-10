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
  Clipboard,
  Share
} from 'react-native';

import {
  shareOnFacebook,
  shareOnTwitter,
} from 'react-native-social-share';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Telefonos from './Telefonos.js';
import Mails from './Mails.js';
import Horarios from './Horarios.js';
import VChorasDomi from './VChorasDomi.js';
import {Actions} from 'react-native-router-flux';


export default class Empresa extends Component<{}> {


//.................................CONSTRUICTOR........................  

  constructor(props) {
    super(props);

     this.state = {
      refreshing: false,
      orden: '',
      fechaRegistro: '',
      activo: '',
      codigo: this.props.codigo,
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
      numPromo: 0,
      numInfo: 0,
      colorCiudad: '',
      barrio: '',
      ciudad: '',
      idCiudad: '',
      correos:[],
      horarios:[],
      telefonos:[],

      };

     
  }

//.................................METODOS LLAMADAS Y WHATSAPP........................


callBrowser = (url) =>{
  if (url != 'sin web') {
    const Hurl = ('http://'+url); 

   Linking.canOpenURL(Hurl).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(Hurl);
   }
 }).catch(err => console.error('An error occurred', err));
   };
}


whatsapp = (phone) =>{
  const url = 'whatsapp://send?text=Buen día, te contacto por medio de www.mako.guru, quisiera...&phone=+57'+phone; 

   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
}


  tweet() {

    shareOnTwitter({
        'text':'Global democratized marketplace for art',
        'link':'https://artboost.com/',
        'imagelink':'https://artboost.com/apple-touch-icon-144x144.png',
        //or use image
        'image': 'artboost-icon',
      },
      (results) => {
        console.log(results);
      }
    );
  }

  facebookShare() {
    let mensa = 'https://mako.guru/directorio/directorio3.php?id='+this.state.codigo;

            Share.share(
            {
                
              message: mensa
            
            }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));

  }

//............................DID AND WILL MOUNT METHOD .............................

componentDidMount(){

  this.getEmpresa();
  this.getCorreos();
  this.getHorarios();
  this.getTelefonos();
  this.getCiudad();
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
       
       this.setState({
            orden: responseJson.orden,
            fechaRegistro: responseJson.fechaRegistro,
            activo: responseJson.activo,
            codigo: responseJson.codigo,
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
            numPromo: responseJson.numPromo,
            numInfo: responseJson.numInfo,
 
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

getHorarios(){

    return fetch('http://www.mako.guru/listadosApp/horariosXempresa.php',{
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
         
       
       this.setState({
            horarios: responseJson,
       })
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}

getTelefonos(){

    return fetch('http://www.mako.guru/listadosApp/telefonosXempresa.php',{
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
            telefonos: responseJson,
       })
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}

getCorreos(){

    return fetch('http://www.mako.guru/listadosApp/correosXempresa.php',{
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
            correos: responseJson,
       })
      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}







parseTipoHorario(tipoHorario){
   let labelHorario = '';
  switch(item.tipoHorario){

    case 1:  labelHorario = 'Lunes a Viernes';

    break;

    case 2: labelHorario = 'Sábados';

    break;

    case 3: labelHorario = 'Lunes a sábados';

    break;

    case 4: labelHorario = 'Domingos y festivos';

    break;

    case 5: labelHorario = 'Lunes a domingo';

    break;

    case 6: labelHorario = 'Lunes festivos';

    break;

    case 7:labelHorario = 'Lunes a jueves'; 

    break;

    case 8: labelHorario = 'viernes y sábados';

    break;

    case 9: labelHorario = 'Viernes, Sábados y Domingos';

    break;

  }

  return labelHorario;
}


irlistPromos(cod){

Actions.listPromos({cod})

}

irlistInfos(cod){

Actions.listInfos({cod})

}


renderBtnPromo(numPromo){
        const urlpromo = 'https://www.mako.guru/directorio/imagenes/promoIcon.png';

  if (numPromo > 0) {
    return(
      <TouchableOpacity style={[styles.contPromo, styles.promo1]} onPress={() => this.irlistPromos(this.state.codigo)} >
                  
                  <View style={[styles.promoIcon]}>
                    <Image style={[styles.imgPromo]} source={{ uri : urlpromo}}/>
                  </View>

                  <Text style={styles.txtPromo}> {'Ver '+numPromo+' promociones que tenemos para ti'} </Text>

      </TouchableOpacity>
      )
  } else{
    return null;
  };
};


renderBtnInfo(numInfo){
        const urlpromo = 'https://www.mako.guru/directorio/imagenes/infoIcon.png';

  if (numInfo > 0) {
    return(
      <TouchableOpacity style={[styles.contPromo]} onPress={() => this.irlistInfos(this.state.codigo)}>
                  
                  <View style={[styles.infoIcon]}>
                    <Image style={[styles.imgPromo]} source={{ uri : urlpromo}}/>
                  </View>

                  <Text style={styles.txtPromo}> {'Ver '+numInfo+' informativos que tenemos para ti'} </Text>

      </TouchableOpacity>
      )
  } else{
    return null;
  };
};


copiarLink() {
  Clipboard.setString('https://mako.guru/directorio/directorio3.php?id='+this.state.codigo);


  Alert.alert(
  'Hecho !',
  'se ha copiado el link al portapapeles',
  [
    {text: 'Ok', onPress: () => console.log()},
  ],
  { cancelable: false }
)
}



whatsapp = () =>{
  
  const url = 'whatsapp://send?text=https://mako.guru/directorio/directorio3.php?id='+this.state.codigo; 

   Linking.canOpenURL(url).then(supported => {
   if (!supported) {
    console.log('Can\'t handle url: ' + url);
   } else {
    return Linking.openURL(url);
   }
 }).catch(err => console.error('An error occurred', err));
  
}


//............................FUNCIONES PARA RENDER .............................


  render() {
   

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

      if (pagina.indexOf(palabra) != -1 || pagina.indexOf(palabra1) != -1) {
        newPagina= 'Ver Perfil'
        iconoweb= 'logo-facebook'
      };

    const urllogo = 'https://www.mako.guru/directorio/'+this.state.url_logo;
    
   

     const backColor={
      backgroundColor: this.state.colorCiudad,
      
    };

    const borBottColor={
      borderColor: 'lightgray',
      borderBottomWidth: 3,
      borderTopWidth: 1
    };



    return (
       

      <View style={styles.container}> 
        <ScrollView style={styles.scrollcontnido}> 

          <View style={[styles.header,backColor]}>
                <Image style={[styles.fondoHeader]} source={fondoCiudad}/>
                <Image style={[styles.imgMakoT]} source={require('./imgs/makoTransparente.png')}/>
                <Image style={[styles.image]} source={{ uri : urllogo}}/>
                <Text style={styles.nombre}> {this.state.nombre.toUpperCase()} </Text>



          </View>


          <View style={styles.contenido}>
            <Text style={styles.descrip}> {this.state.descripcion} </Text>

              {this.renderBtnPromo(this.state.numPromo)}
              {this.renderBtnInfo(this.state.numInfo)}

    <View style={styles.cajalink}>
      <TouchableOpacity style={styles.touch} onPress={()=> this.copiarLink()}  > 
        <View style={styles.circulo}>
                <Icon2 name="md-copy" size={30} color={this.state.colorCiudad}/>
          </View>
          <Text style={[styles.catego]}> Copiar link</Text>
      </TouchableOpacity>

       <TouchableOpacity style={styles.touch} onPress={()=> this.facebookShare()}  > 
        <View style={styles.circulo}>
                <Icon2 name="md-share" size={30} color={this.state.colorCiudad}/>
          </View>
          <Text style={[styles.catego]}> Compartir</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.touch} onPress={()=> this.whatsapp()}  > 
        <View style={styles.circulo}>
                <Icon2 name="logo-whatsapp" size={30} color={this.state.colorCiudad}/>
          </View>
          <Text style={[styles.catego]}> Compartir</Text>
      </TouchableOpacity>


    </View>

            <View style={[styles.cajainfo]}>
              
              <View style={[styles.iconos,borBottColor]}>
                <Icon name="place" size={30} color={this.state.colorCiudad}/>
                <Text style={[styles.txtTitulo,{color:this.state.colorCiudad }]}> {'Dirección'} </Text>
              </View>

              <View style={styles.infor}>
                <Text style={styles.txtinfo}> {this.state.direccion} </Text>
                <Text style={styles.txtinfo}> {[this.state.barrio ,' - ' ,this.state.ciudad]} </Text>
              </View>

            </View>



            <View style={[styles.cajainfolist]}>
              
              <View style={[styles.iconos,borBottColor]}>
                <Icon name="phone" size={30} color={this.state.colorCiudad}/>
                <Text style={[styles.txtTitulo,{color:this.state.colorCiudad }]}> {'Telefonos'} </Text>
              </View>

              <View style={styles.infor}>
               
                <FlatList
                style={styles.telef}
                  data={this.state.telefonos}
                  renderItem={({item}) => <Telefonos telefono={item}/>}
                  keyExtractor={item => item.id_telefono}/>

              </View>


            </View>

            <View style={[styles.cajainfolist]}>
              
              <View style={[styles.iconos,borBottColor]}>
                <Icon2 name="ios-mail" size={30} color={this.state.colorCiudad}/>
                <Text style={[styles.txtTitulo,{color:this.state.colorCiudad }]}> {'Correos'} </Text>
              </View>

              <View style={styles.infor}>
               
                <FlatList
                  data={this.state.correos}
                  renderItem={({item}) => <Mails mail={item}/>}
                  keyExtractor={item => item.idcorreo}/>

              </View>


            </View>



              <View style={[styles.cajainfolist]}>
              
              <View style={[styles.iconos,borBottColor]}>
                <Icon2 name={''+iconoweb} size={30} color={this.state.colorCiudad}/>
                <Text style={[styles.txtTitulo,{color:this.state.colorCiudad }]}> {'Pagina web'} </Text>
              </View>


            <TouchableOpacity style={[styles.infor]} onPress={()=> this.callBrowser(pagina)}>
            <View style={[styles.cajainfo2]}>

                {newPagina != 'sin web' ?
                <View style={styles.iconos2}>
                  <Icon2 name={'ios-globe-outline'} size={30} color={'#898989'}/>
                  <Text style={styles.txtAction} > visitar </Text>
                </View>
                : null}
                <TouchableOpacity style={styles.infor2} >
                  <Text style={styles.txtinfo2}> {newPagina} </Text>
                </TouchableOpacity>

              </View>
              </TouchableOpacity>
            </View>




             <View style={[styles.cajainfolist]}>
              
              <View style={[styles.iconos,borBottColor]}>
                <Icon2 name="ios-time" size={30} color={this.state.colorCiudad}/>
                <Text style={[styles.txtTitulo,{color:this.state.colorCiudad }]}> {'Horarios'} </Text>
              </View>

              <View style={styles.infor}>
               
                  <FlatList
                  data={this.state.horarios}
                  renderItem={({item}) => <Horarios horario={item} color={this.state.colorCiudad}/>}
                  keyExtractor={item => item.idjornadas}/>


                  

              </View>


            </View>

            <View style={[styles.iconos,borBottColor]}>
              <Icon name="motorcycle" size={30} color={this.state.colorCiudad}/>
              <Text style={[styles.txtTitulo,{color:this.state.colorCiudad }]}> {'Adicionales'} </Text>
            </View>

            <VChorasDomi domicilio={this.state.domicilio} costo={this.state.costo_domicilio} vchoras={this.state.VChoras} color={this.state.colorCiudad}/>

            <Text style={[styles.txtciudad,backColor]}> {this.state.ciudad} </Text>

          </View>

        </ScrollView>


        


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
  height: 187,
  backgroundColor: '#000',
  justifyContent: 'flex-end',
  alignItems: 'center', 
  elevation: 10,

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
    width: 120,
    height: 120,
    borderRadius: 60,
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

promo1:{
  marginTop: 20,
  
},

contPromo:{
  backgroundColor: '#fff',
  flex: 1,
  height: 55,
  zIndex: 10000,
  borderRadius: 10,
  justifyContent: 'flex-start' ,
  alignItems: 'center' ,
  flexDirection: 'row',
  marginHorizontal: 10,
  marginVertical: 3,
},



txtPromo:{
fontSize: 14,
flex: 1,
},

promoIcon:{
width: 30,
height: 30,
borderRadius: 30,
backgroundColor: '#f54848',
marginBottom: 5,
marginHorizontal: 5,
},

infoIcon:{
width: 30,
height: 30,
borderRadius: 30,
backgroundColor: '#79DB48',
marginBottom: 5,
marginHorizontal: 5,

},

imgPromo:{
width: 30,
height: 30,
},

cajainfo:{
  flex: 1,
  flexDirection: 'column',
  paddingVertical: 20,
  justifyContent: 'center',

},

cajalink:{
flex: 1,
  flexDirection: 'row',
  paddingVertical: 10,
  justifyContent: 'center',

},

cajainfolist:{
  flex: 1,
  flexDirection: 'column',
  paddingRight: 0,

},


iconos:{
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'center', 
  paddingLeft: 10,
  flexDirection: 'row',
  borderBottomWidth: 3,
},

infor:{
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
txtinfo2:{
  //justifyContent: 'center',
  //alignItems: 'center',
  flex: 1,
  textAlign: 'right',
  fontSize: 16,
  paddingVertical: 10,
  paddingRight: 20,
  flexWrap: 'nowrap', 


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

txtTitulo:{
  color: '#fff'
},

iconos2:{
  width: 50,
  justifyContent: 'center',
  alignItems: 'center', 
  paddingLeft: 10,
},

infor2:{
flex: 1,
flexDirection: 'column',
justifyContent: 'center',
},

cajainfo2:{
  width: '88%',
  flexDirection: 'row',
  borderBottomColor: '#C5C6C6',
  borderBottomWidth: 0.5,
},

txtAction:{
  fontSize: 8,
  color: '#34c1bb'
},

touch:{
  alignItems: 'center',
  width: 65,
  margin: 5,
  marginHorizontal: 10
    
},

circulo: {
  width: 50,
  height: 50,
  backgroundColor: '#fff',
  borderRadius: 50,
  justifyContent: 'center',
  alignItems: 'center', 
},

catego:{
  color: 'gray',
  fontSize: 10,
  textAlign: 'center',
},

icono:{
width: 30,
resizeMode: Image.resizeMode.contain,

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