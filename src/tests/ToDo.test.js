import React from 'react';
import ReactDOM from 'react-dom';
import ToDo from '../components/Todo';
import { exportAllDeclaration } from '@babel/types';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
Enzyme.configure({ adapter: new Adapter() });


it('render correctly todo component', () => {  
    const component = renderer.create(<ToDo />).toJSON();
    expect(component).toMatchSnapshot();
});