import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { mount } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {PrivateHeader} from './PrivateHeader'

Enzyme.configure({ adapter: new Adapter() });

if(Meteor.isClient) {
    describe('PrivateHeader', function(){
        it('el botón de salida debe funcionar', function(){
            const wrapper = mount( <PrivateHeader title="Test title" handleLogout={() => {}}/> )
            const buttonText = wrapper.find('button').text();

            expect(buttonText).toBe('Logout');
        });

        it('Las propiedades del titulo deben ir en el texto h1', function(){
            const title = 'Test title here';
            const wrapper = mount( <PrivateHeader title={title} handleLogout={() => {}}/> )
            const titleText = wrapper.find('h1').text();

            expect(titleText).toBe(title);  
        })
        // it('should call the function', function(){
        //     const spy = expect.createSpy();
        //     spy(3, 4, 123);
        //     spy('Mike');
        //     expect(spy).toHaveBeenCalledWith('Mike');
        // })
        
        it('should call handleLogout on click', function () {
            const spy = expect.createSpy();
            const wrapper = mount( <PrivateHeader title="Title" handleLogout={spy}/> );

            wrapper.find('button').simulate('click');
            expect(spy).toHaveBeenCalled();
        })
    })
}