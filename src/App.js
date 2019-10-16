import React, {Component} from 'react';
import firebase from 'firebase';
import './App.css';

export default class App extends Component {
  
  constructor(props){
    super(props);
    this.state={};
  }
  
  render(){
      return (
        <div className="App-Container">
          <h1>Funcionando</h1>
        </div>
      );
    }
}
export default App;
