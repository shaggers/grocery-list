import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { exportAllDeclaration } from '@babel/types';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

describe('App component', () => {
    it('renders without crashing', () => {
      const component = Enzyme.shallow(<App />);
       expect(component).toMatchSnapshot();
    });
});