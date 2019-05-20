import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import RoomList from './components/RoomList';
import { exportAllDeclaration } from '@babel/types';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

/*
Steps for testing react components:
1. toMatchSnapshot
2. Test props
3. Test props value types
4. Test events

Components should be tested in order from 
*/


// Enzyme intro

describe('Examining the syntax of Jest tests', () => {
   
  it('sums numbers', () => {
      expect(1 + 2).toEqual(3);
      expect(2 + 2).toEqual(4);
   });
});

describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
    const component = Enzyme.shallow(<App />);
     expect(component).toMatchSnapshot();
   });
});

// Verifying Landing page renders

describe('the Room List component renders on Landing', () => {

  it('should render the content from App.js', () => {
    const component = Enzyme.shallow(<App />);
    expect(component).toMatchSnapshot();
  })

  
// Check room list has the correct value

  it('should render correctly with no props', () => {
    const component = Enzyme.shallow(<RoomList />);
    expect(component.text()).toEqual("List of rooms will go here.");
    expect(component).toMatchSnapshot();
  });
  
})

// Syntax for testing button click

describe('it handles button click', () => {
  it('should click button', () => {
    const component = Enzyme.mount(<App />);
    const button = component.find('button');
    button.simulate('click');
    expect(component.state().item).toEqual('value');
  })
})

