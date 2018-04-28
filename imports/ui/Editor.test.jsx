import { Meteor } from 'meteor/meteor'
import React from 'react'
import expect from 'expect'
import { shallow, mount, Enzyme } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import createHistory from 'history/createBrowserHistory';


import { Editor } from './Editor'
import { notes } from '../fixtures/fixtures'

const history = createHistory();

if (Meteor.isClient){
    describe('Editor', function(){
        let history 
        let call

        beforeEach(function (){
            call = expect.createSpy();
            history = {
                push: expect.createSpy()
            }
        })

        it('Should render pick note message', function() {
            const wrapper = mount(<Editor history={history} call={call}/>)
            expect(wrapper.find('p').text()).toBe('Pick or create a note to get started')
        })
        it('Should render not found message', function(){
            const wrapper = mount(<Editor history={history} call={call} selectedNoteId={notes[0]._id}/>)
            expect(wrapper.find('p').text()).toBe('Sabe donde está tu nota')
        })
        it('Should remove note', function(){
            const wrapper = mount(<Editor history={history} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>)
            
            wrapper.find('button').simulate('click')
            
            expect(history.push).toHaveBeenCalledWith('/dashboard')
            expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id)
        })
        it('should update the note body on textarea change', function(){
            const newBody = 'Esta es mi nueva nota ese'
            const wrapper = mount(<Editor history={history} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>)
            
            wrapper.find('textarea').simulate('change', {
                target: {
                    value: newBody
                }
            })

            expect(wrapper.state('body')).toBe(newBody)
            expect(call).toHaveBeenLastCalledWith('notes.update', notes[0]._id, {body: newBody})
        })
        
        it('should update the note titel on input change', function(){
            const newTitle = 'Este es mi nuevo titulo ese'
            const wrapper = mount(<Editor history={history} call={call} selectedNoteId={notes[0]._id} note={notes[0]}/>)
            
            wrapper.find('input').simulate('change', {
                target: {
                    value: newTitle
                }
            })

            expect(wrapper.state('title  ')).toBe(newTitle)
            expect(call).toHaveBeenLastCalledWith('notes.update', notes[0]._id, {title: newTitle})
        })

        it('should set state for new note', function(){
            const wrapper = mount(<Editor history={history} call={call}/>)

            wrapper.setProps({
                selectedNoteId: notes[0]._id,
                note: notes[0]
            })
            expect(wrapper.state('title')).toBe(notes[0].title)
            expect(wrapper.state('body')).toBe(notes[0].body)
        })
        
        it('should NOT set state if note prop not provided', function(){
            const wrapper = mount(<Editor history={history} call={call}/>)

            wrapper.setProps({
                selectedNoteId: notes[0]._id,
            })
            expect(wrapper.state('title')).toBe('')
            expect(wrapper.state('body')).toBe('')
        })
    })
}