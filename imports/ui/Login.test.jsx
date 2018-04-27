import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Login } from './Login';

if (Meteor.isClient){
    describe('Login', function(){

        it('debe escribir el mensaje de error', function(){
            const error = 'This is no funcionando ese';
            const wrapper = shallow(<Login loginWithPassword={() => {}}/>);

            wrapper.setState({error});
            expect( wrapper.find('p').text()).toBe(error);
        });

        it('should call loginWithPassword with the form data', function(){
            const email = 'ok@ok.com'
            const password = '12345'
            const spy = expect.createSpy();
            const wrapper = shallow(<Login loginWithPassword={spy}/>)

            wrapper.find('email').value = email;
            wrapper.find('password').value = password;
            wrapper.find('form').simulate('submit');

            expect(spy.calls[0].arguments[0].toEqual({email}))
            expect(spy.calls[0].arguments[0].toBe({password}))
        });
        it('should set longinWithPassword callback errors', function () {
            const spy = expect.createSpy()
            const wrapper = shallow(<Login loginWithPassword={spy}/>)

            wrapper.find('form').simulate('submit')

            spy.calls[0].arguments[2]({})
            expect(wrapper.state('error').length).toNotBe(0)
            
            spy.calls[0].arguments[2]( )
            expect(wrapper.state('error').length).toBe(0)
        })
    });
}