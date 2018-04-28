import React from 'react'
import expect from 'expect'
import { Meteor } from 'meteor/meteor'
import { mount } from 'enzyme'

import {NoteListHeader} from './NoteListHeader'

if(Meteor.isClient){
    describe('NoteListHeader', function(){
        let meteorCall
        let session

        beforeEach(function(){
            meteorCall = expect.createSpy()
            Session = {
                set: expect.createSpy()
            }
        })
        it('Llamar a meteorCall cuando hagan clic', function(){
            const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>)

            wrapper.find('button').simulate('click')
            meteorCall.calls[0].arguments[1](undefined, notes[0]._id)

            expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert')
            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id)
        })
        
        it('Should not set session for failed insert', function(){
            const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>)

            wrapper.find('button').simulate('click')
            meteorCall.calls[0].arguments[1]({})

            expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert')
            expect(Session.set).toNotHaveBeenCalled()
        })
    })
}