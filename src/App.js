import React, {Component} from 'react';
import firebase from 'firebase';
import './App.css';

export default class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      token: 'Carregando...',
      nome: '',
      idade: ''
    };


    const firebaseConfig = {
      apiKey: "AIzaSyAEpchbR257dc_1dWl5FRa8VHw5lYoB_ds",
      authDomain: "reactjs-firebase-james.firebaseapp.com",
      databaseURL: "https://reactjs-firebase-james.firebaseio.com",
      projectId: "reactjs-firebase-james",
      storageBucket: "reactjs-firebase-james.appspot.com",
      messagingSenderId: "759601773099",
      appId: "1:759601773099:web:f16384d491bbcdd0f8886e"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.database().ref('token').once('value').then((snapshot) => {
      let state = this.state;
      state.token = snapshot.val();
      this.setState(state);
    });

    firebase.database().ref('usuarios').child(1).on('value', (snapshot)=>{
      let state = this.state;
      state.nome = snapshot.val().Nome;
      state.idade = snapshot.val().Idade;
      this.setState(state);
    });
  }
  
  render(){
      return (
        <div>
            <h1>Token: {this.state.token}</h1>
            <h1>Nome: {this.state.nome}</h1>
            <h1>Idade: {this.state.idade}</h1>
        </div>
      );
    }
}