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
  Picker,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';



export default class ViewPosponer extends Component<{}> {

	constructor(props) {
	  super(props);
	
	  this.state = {
      id:this.props.venta.idVenta,
      dia:'01',
	  	mes:'01',
	  };
	}

//............................DID AND WILL MOUNT METHOD .............................



//............................FUNCIONES PARA generar carta presentacion  .............................





getPosponer(){

    return fetch('http://www.mako.guru/listadosApp/posponer.php',{
    method:'post',
    headers:{
      'Accept': 'aplication/json',
      'Content-Type': 'aplication/json',
    },
    body:JSON.stringify({
      id: this.state.id,
      dia: this.state.dia,
      mes: this.state.mes,

    })
  
  })
    .then((response) => response.json())
      .then((responseJson) =>{
       console.warn(responseJson)

       if (responseJson == 1) {
          this.okPosponer()
       } else{
        console.warn('responseJson = ' + responseJson);
          this.malPosponer()
       };

      })

.catch((error) => {
        console.warn('error fetch: '+error);
      }); 
}

okPosponer(){
  Alert.alert(
  'Todo bien!',
  'Se ha POSPUESTO el pago para '+this.props.venta.nombre,
  [
    {text: 'Ok', onPress: () => Actions.pop()},
  ],
  { cancelable: false }
)
}

malPosponer(){
  Alert.alert(
  'Algo salio mal !',
  'Algo no salio muy bien al POSPONER la pago, informa de inmediato al administrador MAKO',
  [
    {text: 'Ok', onPress: () => console.log('ok')},
  ],
  { cancelable: false }
)
}



//................................................................................... .............................



//............................FUNCIONES PARA RENDER .............................


  render() {
    
        const diasArray = [{label: '1',value: '01',},{label: '2',value: '02',},{label: '3',value: '03',},{label: '4',value: '04',},{label: '5',value: '05',},{label: '6',value: '06',},{label: '7',value: '07',},{label: '8',value: '08',},{label: '9',value: '09',},{label: '10',value: '10',},{label: '11',value: '11',},{label: '12',value: '12',},{label: '13',value: '13',},{label: '14',value: '14',},{label: '15',value: '15',},{label: '16',value: '16',},{label: '17',value: '17',},{label: '18',value: '18',},{label: '19',value: '19',},{label: '20',value: '20',},{label: '21',value: '21',},{label: '22',value: '22',},{label: '23',value: '23',},{label: '24',value: '24',},{label: '25',value: '25',},{label: '26',value: '26',},{label: '27',value: '27',},{label: '28',value: '28',},{label: '29',value: '29',},{label: '30',value: '30',},{label: '31',value: '31',}];
    const mesesArray = [{label: 'Enero',value: '1',},{label: 'Febrero',value: '02',},{label: 'Marzo',value: '03',},{label: 'Abril',value: '04',},{label: 'Mayo',value: '05',},{label: 'Junio',value: '06',},{label: 'Julio',value: '07',},{label: 'Agosto',value: '08',},{label: 'Septiembre',value: '09',},{label: 'Octubre',value: '10',},{label: 'Noviembre',value: '11',},{label: 'Diciembre',value: '12',}];
  
      return (
       

      <View style={styles.container}> 
		
		<View style={styles.header}>
		  <Text style={styles.txtheader}>Posponer pago para cod: {this.props.venta.idComercio}</Text>
		</View>        

        <View style={styles.formulario}>
        
        <Picker
            style={styles.txtFormu}
            selectedValue={this.state.dia}
            onValueChange={itemValue => this.setState({ dia: itemValue })}>
            {diasArray.map((i, index) => (
              <Picker.Item key={index} label={i.label} value={i.value} />
            ))}
          </Picker>

          <Picker
            style={styles.txtFormu}
            selectedValue={this.state.mes}
            onValueChange={itemValue => this.setState({ mes: itemValue })}>
            {mesesArray.map((i, index) => (
              <Picker.Item key={index} label={i.label} value={i.value} />
            ))}
          </Picker>


        
        </View>

        <TouchableOpacity onPress={() => this.getPosponer()} style={[styles.footer,{ borderBottomColor: '#EC5353', borderBottomWidth: 2}]}>
        	<View style={styles.contfooter}>
	          <Text style={styles.txtfooter}>Posponer</Text>
	          <Icon name="update" size={40} color={'#fff'} style={styles.footerIcon}/>
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
  color: '#EC5353',
  borderRadius: 5,
  marginBottom: 5,
  borderBottomColor: '#EC5353',
  borderBottomWidth: 2,
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