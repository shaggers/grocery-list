import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

  // Set the configuration for your app
  const firebaseConfig = {
    apiKey: "AIzaSyDiMKeTwz7LgFfpPRNVc3dDQYH_A4e48Uo",
    authDomain: "grocery-list-1ed7b.firebaseapp.com",
    databaseURL: "https://grocery-list-1ed7b.firebaseio.com",
    projectId: "grocery-list-1ed7b",
    storageBucket: "grocery-list-1ed7b.appspot.com",
    messagingSenderId: "833209511385",
    appId: "1:833209511385:web:31f159d5098c2a96"
  };
  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();

class App extends React.Component {
  render() {
    return (
      <div className="App">
          <header>
            <h1>Grocery List</h1>
          </header>
          <main>
            <RoomList
              firebase={firebase}
            />
          </main>
      </div>
    );
  }
}

export default App;
