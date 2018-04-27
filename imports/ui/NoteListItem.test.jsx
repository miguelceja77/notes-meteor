import React from 'react'
import expect from 'expect'
import { Meteor } from 'meteor/meteor'
import { mount } from 'enzyme'

import { notes } from '../fixtures/fixtures'
import {NoteListItem} from './NoteListItem'

if(Meteor.isClient){
    describe('NoteListeItem', function(){
        let Session

        beforeEach(() => {
            Session = {
                set: expect.createSpy()
            }
        })
        it('Poner el titulo y la fecha exacta', function(){
            const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>)

            expect(wrapper.find('h5').text()).toBe(notes[0].title)
            expect(wrapper.find('p').text()).toBe('4/27/18')  
        })

        it('Si no tiene titulo ponerselo por defecto', function(){
           const wrapper = mount(<NoteListItem note={notes[1]} Session={Session}/>)
           
           expect(wrapper.find('h5').text()).toBe('Nota sin titulo')
        })

        it('should call set on click', function(){
            const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>)

            wrapper.find('div').simulate('click')

            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id)

        })
    })
}
