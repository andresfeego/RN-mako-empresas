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
  TextInput,
  Keyboard,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';

import {Actions} from 'react-native-router-flux';


export default class ViewFactura extends Component<{}> {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	cliente:'',
	  	nit:'',
	  	direccion:this.props.direccion,
	  	telefono:this.props.venta.telefono,
	  	razon:this.props.venta.nombre,
	  	codigo:this.props.venta.idComercio,
	  	plan:this.props.venta.plan,
	  	idVenta:this.props.venta.idVenta,
	  	color:this.props.color,
	  	correo:this.props.venta.correo,
	  };
	}

//............................DID AND WILL MOUNT METHOD .............................



//............................FUNCIONES PARA generar carta presentacion  .............................




getFactura(){

    return fetch('http://www.mako.guru/listadosApp/facturacion/factura.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      	cliente: this.state.cliente,
	  	nit: this.state.nit,
	  	direccion: this.state.direccion,
	  	telefono: this.state.telefono,
	  	razon: this.state.razon,
	  	codigo: this.state.codigo,
	  	plan: this.state.plan,
	  	idVenta:this.state.idVenta,
	  	correo:this.state.correo,

    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
       if (responseJson == 1) {
          this.okFactura()
       } else{
          this.malFactura()
       };

      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 

	Keyboard.dismiss();

}

okFactura(){
  Alert.alert(
  'Todo bien!',
  'Se ha generado satisfactoriamente la FACTURA para '+ this.state.razon,
  [
    {text: 'Ok', onPress: () => Actions.pop()},


  ],
  { cancelable: false }
)
}

malFactura(){
  Alert.alert(
  'Algo salio mal !',
  'Algo no salio muy bien generando la FACTURA, informa de inmediato al administrador MAKO',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}

asignarCliente(){
	this.setState({
		cliente: this.state.razon,
	})
}

//................................................................................... .............................



//............................FUNCIONES PARA RENDER .............................


  render() {


     const backColor={
      backgroundColor: this.state.color,
      
    };
    
      return (
       

      <View style={styles.container}> 
		
		<View style={styles.header}>
		  <Text style={styles.txtheader}>Generar factura a:</Text>
		</View>        

		  <TouchableOpacity onPress={() => this.asignarCliente()} style={[styles.footer,backColor]}>
        	<View style={styles.contfooter}>
	          <Text style={[styles.txtfooter]}>Usar razón social</Text>
	          <Icon name="arrow-downward" size={40} color={'#fff'} style={styles.footerIcon}/>
        	</View>
        </TouchableOpacity>


        <View style={styles.formulario}>
        <TextInput placeholder="Cliente" placeholderTextColor="gray"  onChangeText={cliente => this.setState({cliente})} style={styles.txtFormu}>{this.state.cliente}</TextInput>
        <TextInput placeholder="Nit" placeholderTextColor="gray"  onChangeText={nit => this.setState({nit})} style={styles.txtFormu}/>

        </View>

        <TouchableOpacity onPress={() => this.getFactura()} style={[styles.footer,{ borderBottomColor: '#008DD2', borderBottomWidth: 2}]}>
        	<View style={styles.contfooter}>
	          <Text style={styles.txtfooter}>Enviar</Text>
	          <Icon name="send" size={40} color={'#fff'} style={styles.footerIcon}/>
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
},

formulario:{
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
},

header:{
  backgroundColor: '#242B40',
   height: 50,
   justifyContent: 'center',
   alignItems: 'center',
},

footer:{
  backgroundColor: '#242B40',
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

txtFormu:{
	width: '80%',
  paddingBottom: 4,
  paddingLeft: 4,
  color: '#008DD2',

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