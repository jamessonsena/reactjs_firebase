import React, {Component} from 'react';
import firebase from 'firebase';
import './App.css';

export default class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      tokenInput:'',
      nomeInput:'',
      idadeInput:'',
      token: 'Carregando...',
      nome: '',
      idade: ''
    };
    this.cadastrar = this.cadastrar.bind(this);

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
  
  cadastrar(e){
   //Salvando/Editando -> firebase.database().ref('token').set(this.state.tokenInput);
   //Salvando uma coluna nova-> firebase.database().ref('usuarios').child(1).child('Cargo').set(this.state.tokenInput);
   //Removendo -> firebase.database().ref('usuarios').child(1).child('Cargo').remove();

    let usuarios = firebase.database().ref('usuarios');
    let chave = usuarios.push().key;

    usuarios.child(chave).set({
      Nome:this.state.nomeInput,
      Idade: this.state.idadeInput
    });

   e.preventDefault();//Para não atualizar a pagina quando clicar
  }

  render(){
      return (
        <div>
            <form onSubmit={this.cadastrar}>
              <input type="text" value={this.state.tokenInput} onChange={(e)=>this.setState({tokenInput: e.target.value})}/><br/>
              <input type="text" value={this.state.nomeInput} onChange={(e)=>this.setState({nomeInput: e.target.value})}/><br/>
              <input type="text" value={this.state.idadeInput} onChange={(e)=>this.setState({idadeInput: e.target.value})}/><br/>
             
              <button type="submit">cadastrar</button>
            </form>
            <h1>Token: {this.state.token}</h1>
            <h1>Nome: {this.state.nome}</h1>
            <h1>Idade: {this.state.idade}</h1>
        </div>
      );
    }
}