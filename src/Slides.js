import React from 'react';
import { StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
 import {Actions} from 'react-native-router-flux';
import {Image} from 'react-native';
const styles = StyleSheet.create({
  image: {
    width: 320,
      position: 'absolute',
    top: -45,
    resizeMode: Image.resizeMode.contain,

  },

    image2: {
    height: 320,
    position: 'absolute',
    top: 85,
    resizeMode: Image.resizeMode.contain,

  },

    image1: {
    height: 240,
    position: 'absolute',
    top: 85,
    resizeMode: Image.resizeMode.contain,

  },

   image3: {
     height: 450,
     width: 450,
     overflow: 'visible' ,
    resizeMode: Image.resizeMode.contain,

  },

  titulo: {
    color: 'rgba(34, 34, 34, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
    position: 'absolute',
    top: 5,
    alignSelf: 'center' ,
  },


   text: {
    color: 'rgba(34, 34, 34, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center' ,
  },

  blanco: {
    color: '#fff',
},

});
 
const slides = [
  {
    key: 'MAKO',
    title: 'MAKO',
    text: 'Directorio comercial, empresarial y profesional, dentro del cual, de una forma interactiva, fácil e innovador, los habitantes de tu cuidad pueden buscar los productos y  servicios de tu empresa así como la información de contacto, horarios y números de servicio a domicilio.',
    image: require('./imgs/slides/mako.png'),
    imageStyle: styles.image1,
    textStyle: styles.text,
    titleStyle: [styles.titulo],
    backgroundColor: '#fff',
  },

  {
    key: 'herramienta',
    title: 'Es una herramienta',
    text: 'pensada para crear un canal de comunicación inmediata entre la comunidad de tu ciudad y las pequeñas, medianas y grandes empresas, con el fin de hacer crecer el comercio, turismo y facilitar la búsqueda de productos y servicios.',
    image: require('./imgs/slides/herramienta.png'),
    imageStyle: styles.image2,
    textStyle: [styles.text, styles.blanco],
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#008DD2',
  },

  {
    key: 'Toda Boyacá',
    title: 'Toda Boyacá',
    text: 'Buscamos ser el directorio más grande y usado por la comunidad Boyacense',
    image: require('./imgs/slides/001.png'),
    imageStyle: styles.image,
    textStyle: [styles.text],
    titleStyle: [styles.titulo],
    backgroundColor: '#8BC34A',
  },

  {
    key: 'Datos básicos',
    title: 'Datos de contacto',
    text: 'Podrás registrar: teléfonos, productos, e-mails, página web y horarios de atención.',
    image: require('./imgs/slides/002.png'),
    imageStyle: styles.image,
    textStyle: styles.text,
    titleStyle: [styles.titulo],
    backgroundColor: '#F1C40F',
  },


  {
    key: 'local app',
    title: 'Tu negocio en la app',
    text: 'Así te verán tus clientes en nuestra app movil',
    image: require('./imgs/slides/003.png'),
    imageStyle: styles.image2,
    textStyle: [styles.text, styles.blanco],
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#9C27B0',
  },

  {
    key: 'local pagina',
    title: 'Tu negocio en la Web',
    text: 'Así te verán tus clientes en nuestra pagina web',
    image: require('./imgs/slides/004.png'),
    imageStyle: styles.image2,
    textStyle: [styles.text, styles.blanco],
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#F44336',
  },

  {
    key: 'botones',
    title: 'Botones de acción',
    text: 'Botones de acción inmediata para llamadas, whatsapp, e-mails y visitar tu web o facebook',
    image: require('./imgs/slides/005.png'),
    imageStyle: styles.image,
    textStyle: [styles.text, styles.blanco],
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#FF5722',
  },

  {
    key: 'búsquedas',
    title: 'Búsquedas inteligentes',
    text: 'Opción de búsquedas por nombre, categorías, productos o servicios y palabras claves',
    image: require('./imgs/slides/006.png'),
    imageStyle: styles.image2,
    textStyle: [styles.text, styles.blanco],
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#4CAF50',
  },

  {
    key: 'apps',
    title: 'Apps en las 2 plataformas',
    text: 'Contamos con apps en las 2 plataformas mas usadas, junto con nuestra pagina web',
    image: require('./imgs/slides/007.png'),
    imageStyle: styles.image2,
    textStyle: styles.text,
    titleStyle: [styles.titulo],
    backgroundColor: '#FFCA28',
  },
  {
    key: 'economico',
    title: 'Registro economico',
    text: 'para poder brindar la posibilidad a cualquier comerciante de tener presencia en la web y que los usuarios encuentren toda la información comercial de Boyacá',
    image: require('./imgs/slides/010.png'),
    imageStyle: styles.image2,
    textStyle: styles.text,
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#00BECA',
  },

 {
    key: 'viene',
    title: 'Lo que viene !',
    text: 'Un pequeño repaso de lo que traeremos para ti muy pronto',
    image: require('./imgs/slides/viene.png'),
    imageStyle: styles.image2,
    textStyle: styles.text,
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#F24F00',
  },


  {
    key: 'emergencia',
    title: 'Números de emergencia',
    text: 'Podrás encontrar números de emergencia como lo son, policía, bomberos cruz rojas, etc.',
    image: require('./imgs/slides/008.png'),
    imageStyle: styles.image2,
    textStyle: styles.text,
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#EC407A',
  },

  {
    key: 'offline',
    title: 'Directorio offline',
    text: 'Directorio básico sin internet. para que los usuarios nunca se queden sin la información relevante de contacto',
    image: require('./imgs/slides/009.png'),
    imageStyle: styles.image2,
    textStyle: styles.text,
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#9575CD',
  },

    {
    key: 'planes',
    title: 'Nuestros planes',
    text: 'Tenemos para que escojas',
    image: require('./imgs/slides/planes.png'),
    imageStyle: styles.image2,
    textStyle: [styles.text, styles.blanco],
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#727271',
  },

      {
    key: 'basico',
    image: require('./imgs/slides/basico.png'),
    imageStyle: styles.image3,
    textStyle: styles.text,
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#727271',
  },

      {
    key: 'bronce',
    image: require('./imgs/slides/bronce.png'),
    imageStyle: styles.image3,
    textStyle: styles.text,
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#727271',
  },

      {
    key: 'plata',
    image: require('./imgs/slides/plata.png'),
    imageStyle: styles.image3,
    textStyle: styles.text,
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#727271',
  },

      {
    key: 'oro',
    image: require('./imgs/slides/oro.png'),
    imageStyle: styles.image3,
    textStyle: styles.text,
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#727271',
  },


  {
    key: 'esperas',
    title: 'Regístrate ya !',
    text: 'No lo dejes pasar',
    image: require('./imgs/slides/011.png'),
    imageStyle: styles.image2,
    textStyle: [styles.text, styles.blanco],
    titleStyle: [styles.titulo, styles.blanco],
    backgroundColor: '#EC407A',
  },

];
 
export default class App extends React.Component {
  _onDone = () => {
    Actions.pop();
  }
  render() {
    return (
      <AppIntroSlider
        slides={slides}
        onDone={this._onDone}/>
    );
  }
}