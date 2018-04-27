import React from 'react'
import expect from 'expect'
import { Meteor } from 'meteor/meteor'
import { mount } from 'enzyme'

import {NoteListHeader} from './NoteListHeader'

if(Meteor.isClient){
    describe('NoteListHeader', function(){
        it('Llamar a meteorCall cuando hagan clic', function(){
            const spy = expect.createSpy()
            const wrapper = mount(<NoteListHeader meteorCall={spy}/>)

            wrapper.find('button').simulate('click')

            expect(spy).toHaveBeenCalledWith('notes.insert')
        })
    })
}