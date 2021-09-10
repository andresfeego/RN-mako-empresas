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
  Dimensions,
  TextInput,
  Keyboard,
  AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');


export default class CambioPass extends Component<{}> {

  constructor(props) {
    super(props);
  
    this.state = {
      correo: '',
    };

  }

//............................DID AND WILL MOUNT METHOD .............................




recuperar(){

    if (this.state.correo != '') {
    return fetch('http://www.mako.guru/listadosApp/recuperarPassEmp.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      correo: this.state.correo,
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
       if (responseJson == 1) {
            this.errorAsignar();
        
       } else{
          
          if (responseJson == 2) {
            this.errorEnvio();
          } else{

            if (responseJson == 0) {

          this.malCorreo();

            } else{
            
             this.envioOk();

            };

          };
       };

      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 

  Keyboard.dismiss();

  } else{
    this.faltanDatos();
  };

}



//............................FUNCIONES PARA generar carta presentacion  .............................



faltanDatos(){
  Alert.alert(
  'Faltan datos !',
  'Debes ingresar un correo electronico',
  [
    {text: 'Ok', onPress: () => console.log()},
  ],
  { cancelable: false }
)
}

malCorreo(){
  Alert.alert(
  'Algo salio mal !',
  'Correo invalido',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}

errorEnvio(){
  Alert.alert(
  'Algo salio mal !',
  'Error al enviar el codigo ponte en contacto con un administrador Mako o  intenta de nuevo mas tarde.',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}

errorAsignar(){
  Alert.alert(
  'Algo salio mal !',
  'Error al asignar el codigo temporal ponte en contacto con un administrador Mako o  intenta de nuevo mas tarde.',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}




envioOk(){

  Alert.alert(
  'Todo bien !',
  'Se ha enviado el codigo de forma correcta a tu correo',
  [
    {text: 'Ok', onPress: () => { Keyboard.dismiss(); Actions.ViewLogin();}},
  ],
  { cancelable: false }
)
}

cambioMal(){
  Alert.alert(
  'Algo salio mal !',
  'No ha sido posible actualizar tu contraseña intenta de nuevo mas tarde',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}


//................................................................................... .............................



//............................FUNCIONES PARA RENDER .............................


  render() {
    
      return (
       

      <View style={styles.container}> 
    
      <Image source={require('./imgs/fondoLogin3.jpg')} style={[styles.fondo,{height: height}]}/>
      <Text style={styles.txtCambio}>Introduce el correo electronico principal que usaste para el registro en www.mako.guru y enviaremos una clave temporal para tu inicio de sesion.</Text>

        <View style={styles.formulario}>
        <TextInput placeholder="Correo" placeholderTextColor="gray" onChangeText={correo => this.setState({correo})} style={styles.txtFormu}/>
        </View>

        <TouchableOpacity onPress={() => this.recuperar()} style={[styles.footer,{ borderBottomColor: '#008DD2', borderBottomWidth: 2}]}>
          <View style={styles.contfooter}>
            <Text style={styles.txtfooter}>Recuperar contraseña</Text>
            <Icon name="lock" size={40} color={'#fff'} style={styles.footerIcon}/>
          </View>
        </TouchableOpacity>

      </View>


      


 
      

    );
  }
}

const styles = StyleSheet.create({

container:{
  flex: 1,
  height: '100%',
  width: '100%',
  justifyContent: 'center' ,
},

fondo:{
  alignSelf: 'center',
  position: 'absolute',
  resizeMode: Image.resizeMode.center,
},


formulario:{
   flex: 1,
   alignItems: 'center',
   justifyContent: 'flex-start',
},

header:{
  backgroundColor: '#242B40',
   height: 50,
   justifyContent: 'center',
   alignItems: 'center',
},

footer:{
  backgroundColor: 'rgb(52, 193, 187)',
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
},

txtheader:{
  textAlign: 'center',
  alignItems: 'center', 
  fontSize: 17,
  color: '#fff'
},

txtfooter:{
  textAlign: 'center',
  alignItems: 'center', 
  fontSize: 17,
  color: '#fff',
  marginRight: 15
},

txtCambio:{
  textAlign: 'center',
  alignItems: 'center', 
  fontSize: 22,
  color: '#fff',
  marginRight: 15,
  alignSelf: 'center',
  fontFamily: 'CaviarDreams',
  marginBottom: 15,
},


txtFormu:{
  width: '80%',
  paddingLeft: 4,
  paddingBottom: 4,
  color: '#2e3638',
  backgroundColor: '#fff',
  marginBottom: 4,
  borderRadius: 4,

},

contfooter:{
  flexDirection: 'row',
  alignItems: 'center',
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