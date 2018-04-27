import React from 'react'
import expect from 'expect'
import { Meteor } from 'meteor/meteor'
import { mount } from 'enzyme'

import { NoteList } from './NoteList'
import NoteListEmptyItem from './NoteListEmptyItem';

const notes = [
    {
     _id: 'noteId1',
     title: 'Test title',
     body: '',
     updatedAt: 0,
     userId: 'userId1'
    },{
    _id: 'noteId2',
    title: '',
    body: 'ora batos locos',
    updatedAt: 0,
    userId: 'userId2'
    }
]

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

