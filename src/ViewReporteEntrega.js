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
  AsyncStorage,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';

import CustomMultiPicker from "react-native-multiple-select-list";
import {Actions} from 'react-native-router-flux';


export default class ViewReporteEntrega extends Component<{}> {

  constructor(props) {
    super(props);

     this.state = {
      id: this.props.usuario.id,
      refreshing: false,
      ds: {"---":"Sin items por reportar"},
      numConsignacion:'',
      activo: '1',
      valor: '$ 0',
      seleccion: [],
      dataVentas: [],
      labelBtn:'Personalmente',
      };

  }
//............................DID AND WILL MOUNT METHOD .............................

componentWillMount(){
 
           this.getVVentas();



} 


//............................FUNCIONES PARA generar carta presentacion  .............................

getVVentas(){

    return fetch('https://www.mako.guru/listadosApp/ventasXpago.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.id
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
          //console.warn('antes', responseJson);
          data={};
          dataV=[];
          if (this.state.activo=='1') {
                  
                  responseJson.forEach(function(venta){
                      
                  data[venta.idVenta]=[]
                  data[venta.idVenta].push(venta.nombre)
  
                  })

                  dataV=responseJson;
         
          } 
       this.setState({
          ds: data,
          dataVentas: dataV,
       })
  
      })

.catch((error) => {
        console.warn(error);
      }); 
}


setPagos(){

    if (this.state.seleccion[0] != '---') {
      if ( this.state.seleccion.length > 0 && this.state.numConsignacion != '') {
    return fetch('http://www.mako.guru/listadosApp/reportarPagos.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      numConsignacion:this.state.numConsignacion,
      seleccion: this.state.seleccion,
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
                 
                if (responseJson == 1) {
                  this.okPago()
               } else{
                  this.malPago()
               };

      })

.catch((error) => {
        console.warn(error);
      }); 
} else{
  this.malEnvio();
};
} else{
  this.sinItems();
};
}


comprobarActivo(){

   return fetch('http://www.mako.guru/listadosApp/returnVendedor.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.id,
    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
          

        if (responseJson.activo=='0') {
           this.setState({
            activo: responseJson.activo,

           }) 

        };

      })
      .catch((error) => {
        console.warn(error);
      })

}



preguntaPagos(){
  Alert.alert(
  'Generando reporte de entrega de dinero...',
  'Estas seguro que deseas generar el reporte de entrega de dinero, revisa primero el numero de consignacion?',
  [
    {text: 'No', onPress: () => console.log('nooooo'), style: 'cancel'},
    {text: 'Si', onPress: () => this.setPagos()},
  ],
  { cancelable: false }
)
}


okPago(){
  Alert.alert(
  'Todo bien!',
  'Se ha reportado satisfactoriamente la PAGO para los comerciantes seleccionados',
  [
    {text: 'Ok', onPress: () => Actions.pop()},
  ],
  { cancelable: false }
)
}

malCarta(){
  Alert.alert(
  'Algo salio mal !',
  'Algo no salio muy bien reportando el PAGO, informa de inmediato al adminitrador MAKO',
  [
    {text: 'Ok', onPress: () => Actions.pop()},
  ],
  { cancelable: false }
)
}

malEnvio(){
  Alert.alert(
  'Faltan datos !',
  'Debes escoger al menos un comerciante para reportar y proporcionar un numero de consignacion, si entregaste el dinero en persona oprime el boton personalmente',
  [
    {text: 'Ok', onPress: () => console.log()},
  ],
  { cancelable: false }
)
}

sinItems(){
  Alert.alert(
  'Sin items para reporte !',
  'No tienes items para reportar pago en el momento',
  [
    {text: 'Ok', onPress: () => Actions.pop()},
  ],
  { cancelable: false }
)
}


getValores(res){
let valor = 0;
  this.state.dataVentas.forEach(function (ventaItem){
      res.forEach(function (itemSelected){
          if (itemSelected == ventaItem.idVenta) {
            switch(ventaItem.plan){

              case '1': valor = valor + 30000;
              break;

              case '2': valor = valor + 100000;
              break;

              case '3': valor = valor + 500000;
              break;

              case '4': valor = valor + 800000;
              break;

              case '5': valor = valor + 0;
              break;

            }
          };
      })
  })

  this.setState({
    seleccion: res,
    valor: 'Valor consignación = $ '+ valor,
  })

}



  
  

reportarPersonal(){
  console.warn('rrrrrrr');
  let num = '';
  let lbl = 'Personalmente';
  if (this.state.labelBtn == 'Personalmente') {
      num = 'Personal';
      lbl = 'Consignación';
  };
  this.setState({
    numConsignacion: num,
    labelBtn: lbl,    
  })

}


//................................................................................... .............................



//............................FUNCIONES PARA RENDER .............................


  render() {
    const userList = {
  "123":"Tom",
  "124":"Michael",
  "125":"Christin",
  "126":"Oscar",
  "127":"andres",
  "128":"manrihdfghdfghdfghdfghdfghdfghque",
}
      return (
       

      <View style={styles.container}> 
		
		<View style={styles.header}>
		  <Text style={styles.txtheader}>Reportar entrega de dinero al administrador:</Text>
		</View>        

        <View style={styles.formulario}>
			<CustomMultiPicker style={styles.picker}
			options={this.state.ds}
			search={false} // should show search bar? 
			multiple={true} // 
			placeholder={"Search"}
			placeholderTextColor={'#757575'}
			returnValue={"value"} // label or value 
			callback={(res)=>{ this.getValores(res) }} // callback, array of selected items 
			rowBackgroundColor={"#eee"}
			rowHeight={40}
			rowRadius={5}
			iconColor={"#34c1bb"}
			iconSize={30}
			selectedIconName={"ios-checkmark-circle"} // opcion 2 ios-checkmark-circle-outline
			unselectedIconName={"ios-radio-button-off-outline"}
			scrollViewHeight={130}
			selected={[]}/>
        </View>

        <Text style={styles.txtValor}>{this.state.valor}</Text>
      
      <View style={styles.consig}>

        <TextInput placeholder="Numero de consignación" placeholderTextColor="gray"  onChangeText={numConsignacion => this.setState({numConsignacion})} style={styles.txtConsig}>{this.state.numConsignacion}</TextInput>
   
        <TouchableOpacity onPress={() => this.reportarPersonal()} style={[styles.btnConsi,{ backgroundColor: '#009846'}]}>
          <View style={styles.contfooter}>
            <Icon name="arrow-back" size={30} color={'#fff'} style={styles.footerIcon}/>
            <Text style={styles.txtfooter}>{this.state.labelBtn}</Text>
          </View>
        </TouchableOpacity>

      </View>

        <TouchableOpacity onPress={() => this.preguntaPagos()} style={[styles.footer,{ borderBottomColor: '#009846', borderBottomWidth: 2}]}>
        	<View style={styles.contfooter}>
	          <Text style={styles.txtfooter}>Reportar pagos</Text>
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

picker:{
flex: 1,
width: '100%',
backgroundColor: 'red'
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

consig:{
  flexDirection: 'row',
  alignItems: 'flex-end',
},

btnConsi:{
  flex: 1,
  height: 30,
  alignItems: 'flex-end',
},

txtConsig:{
  flex: 1,
  color: '#009846',
  paddingBottom: 4,
  paddingLeft: 4,
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

},

contfooter:{
	flexDirection: 'row',
	alignItems: 'center',
},
txtFormu:{
  width: '100%',

},

txtValor:{
  textAlign: 'center',
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