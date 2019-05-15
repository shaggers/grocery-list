import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';

function App() {
  return (
    <div className="App">
        <header>
          <h1>Grocery List</h1>
        </header>
        <main>
          <Route exact path="/" component={RoomList} />
        </main>
    </div>
  );
}

export default App;
