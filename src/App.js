import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import ItemList from './components/ItemList';
import User from './components/Users';
import './style/app.css'

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

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      currentRoom: '',
      currentRoomKey: '',
      user: ''
    }
  }

  selectedRoom(value) {
    this.setState({ currentRoom: value.name });
    this.setState({ currentRoomKey: value.key })  
  }

  setUser(name) {
    if (name == null){
      this.setState({ user: '' })
    } else {
      this.setState({ user: name.displayName });
    }  
  }

  render() {
    return (
      <div className="App">
          <header>
            
            <div className="header row">
                <div className="userController col-md-5 col-6">
                  <User 
                    firebase={firebase}
                    setUser={this.setUser.bind(this)}
                    user={this.state.user}
                  />
                </div>

                <div className="titleContainer col-md-7 col-6">
                  <h1 className="title">Grocery List</h1>
                </div>
            </div>
            
          </header>
          
          <main>
            <div className="main row">
              <div className="RoomList col-md-3 col-sm-4 col-5">
                <RoomList
                  firebase={firebase}
                  callbackFromParent={this.selectedRoom.bind(this)}
                />
              </div>           
              <div className="ItemList col-md-9 col-sm-8 col-7">
                <ItemList 
                    firebase={firebase}
                    currentRoom={this.state.currentRoom}
                    currentRoomKey={this.state.currentRoomKey}
                    user={this.state.user}
                />
              </div>
            </div>
          </main>
      </div>
    );
  }
}

export default App;
