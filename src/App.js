import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import ItemList from './components/ItemList';

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
  constructor(props){
    super(props)

    this.state = {
      currentRoom: '',
      currentRoomKey: ''
    }
  }

  selectedRoom(value) {
    this.setState({ currentRoom: value.name });
    this.setState({ currentRoomKey: value.key })  
  }

  render() {
    return (
      <div className="App">
          <header>
            <h1>Grocery List</h1>
          </header>
          <main>
            <RoomList
              firebase={firebase}
              callbackFromParent={this.selectedRoom.bind(this)}
            />
            <ItemList 
                firebase={firebase}
                currentRoom={this.state.currentRoom}
                currentRoomKey={this.state.currentRoomKey}
            />
          </main>
      </div>
    );
  }
}

export default App;
