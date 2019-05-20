import React from 'react';
import ReactDOM from 'react-dom';
import UsersTest from '../components/Users';
import { exportAllDeclaration } from '@babel/types';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
Enzyme.configure({ adapter: new Adapter() });
import * as firebase from 'firebase';
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

const Users = (props) => 
    <UsersTest
        firebase = {firebase}
        user={"guest"}
    />;

it('render correctly Users component', () => {  
    const component = renderer.create(<Users />).toJSON();
    expect(component).toMatchSnapshot();
});