import React from 'react';
import ReactDOM from 'react-dom';
import RoomListTest from '../components/RoomList';
import { exportAllDeclaration } from '@babel/types';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import * as firebase from 'firebase';
import renderer from 'react-test-renderer';

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

const RoomList = (props) => 
    <RoomListTest
        firebase = {firebase}
    />;

it('render correctly RoomList component', () => {  
    const component = renderer.create(<RoomList />).toJSON();
    expect(component).toMatchSnapshot();
});