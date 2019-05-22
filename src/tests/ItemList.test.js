import React from 'react';
import ReactDOM from 'react-dom';
import ItemListTest from '../components/ItemList';
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

const ItemList = () => 
    <ItemListTest
        firebase = {firebase}
        currentRoom= {1}
        currentRoomKey={1}
        user={"guest"}
    />;

// Snapshot

it('render correctly ItemList component', () => {  
    const component = renderer.create(<ItemList />).toJSON();
    expect(component).toMatchSnapshot();
});

// Props

/*
it("renders a todo item", () => {
    const component = Enzyme.mount(<ItemList fakeProp={"this is the fake prop"} />);
    console.log(component.props());
    expect((component).prop('fakeProp')).toEqual("guest");
})
*/

// trying contains() enzyme method

/*
    it("should contain static text", () => {
    const component = Enzyme.mount(<ItemList  
        firebase = {firebase}
        currentRoom= {1}
        currentRoomKey={1}
        user={"guest"}
        />);

        expect(component.contains(<h2>Select Conversation</h2>)).toEqual(true);
    })
*/

