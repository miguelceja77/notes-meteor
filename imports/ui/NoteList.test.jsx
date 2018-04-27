import React from 'react'
import expect from 'expect'
import { Meteor } from 'meteor/meteor'
import { mount } from 'enzyme'

import { NoteList } from './NoteList'
import NoteListEmptyItem from './NoteListEmptyItem';
import { notes } from '../fixtures/fixtures'

if(Meteor.isClient){
    describe('NoteList', function(){
        it('should render NoteListItem para cada nota', function(){
            const wrapper = mount(<NoteList notes={notes}/>)

            expect(wrapper.find('NoteListItem').length).toBe(2)
            expect(wrapper.find('NoteListEmptyItem').length).toBe(0)
        })
        
        it('should render NoteListEmptyItem si no hay ninguna nota', function(){
            const wrapper = mount(<NoteList notes={[]}/>)

            expect(wrapper.find('NoteListItem').length).toBe(0)
            expect(wrapper.find('NoteListEmptyItem').length).toBe(1)
        })
    })
} 

