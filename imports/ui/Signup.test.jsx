import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Signup } from './Signup';

if (Meteor.isClient){
    describe('Signup', function(){

        it('debe escribir el mensaje de error', function(){
            const error = 'This is no funcionando ese';
            const wrapper = shallow(<Signup createUser={() => {}}/>);

            wrapper.setState({error});
            expect( wrapper.find('p').text()).toBe(error);
        });

        it('should call createUser with the form data', function(){
            const email = 'ok@ok.com'
            const password = '12345'
            const spy = expect.createSpy();
            const wrapper = shallow(<Signup createUser={spy}/>)

            wrapper.find('email').value = email;
            wrapper.find('password').value = password;
            wrapper.find('form').simulate('submit');

            expect(wrapper.state('error').length).toBeFewerThan(0);
        });
        
        it('Arrojar un error si la constraseña tiene menos de 4 caracteres', function(){
            const email = 'ok@ok.com'
            const password = '125      '
            const spy = expect.createSpy();
            const wrapper = shallow(<Signup createUser={spy}/>)

            wrapper.find('email').value = email;
            wrapper.find('password').value = password;
            wrapper.find('form').simulate('submit');

            expect(spy.calls[0].arguments[0].toEqual({email, password}))
        });
        it('should set longinWithPassword callback errors', function () {
            const password = '12345'
            const reason = 'Por esto falló, pero te dije'
            const spy = expect.createSpy()
            const wrapper = shallow(<Signup createUser={spy}/>)

            wrapper.find('password').value = password;
            wrapper.find('form').simulate('submit')

            spy.calls[0].arguments[1]({reason})
            expect(wrapper.state('error')).toBe(reason)
            
            spy.calls[0].arguments[1]( )
            expect(wrapper.state('error').length).toBe(0)
        })
    });
}