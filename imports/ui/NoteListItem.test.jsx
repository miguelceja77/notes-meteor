import React from 'react'
import expect from 'expect'
import { Meteor } from 'meteor/meteor'
import { mount } from 'enzyme'

import NoteListItem from './NoteListItem'

if(Meteor.isClient){
    describe('NoteListeItem', function(){
        it('Poner el titulo y la fecha exacta', function(){
            const title = 'Aquí va mi titulo'
            const updatedAt = 1524849449065
            const wrapper = mount(<NoteListItem note={{title, updatedAt}}/>)

            expect(wrapper.find('h5').text()).toBe(title)
            expect(wrapper.find('p').text()).toBe('4/27/18')  
        })

        it('Si no tiene titulo ponerselo por defecto', function(){
            const title = '';
            const updatedAt = 1524849449065
            const wrapper = mount(<NoteListItem note={{title, updatedAt}}/>)

            expect(wrapper.find('h5').text()).toBe('Nota sin titulo')
        })
    })
}
