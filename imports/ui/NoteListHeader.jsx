import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types';
import { Session } from 'meteor/session'


export const NoteListHeader = (props) => {
    return (
        <div className="item-list__header">
            <h1>{props.title}</h1>
            <button className="button" onClick={() => {
                props.meteorCall('notes.insert', (err, res) => {
                    if(res){
                        props.Session.set('selectedNoteId', res)
                    }
                })
                }}>Crear Nota</button>
        </div>
    )
}

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired,
    Session: PropTypes.object.isRequired
}

export default createContainer(() => {
    return{
        meteorCall: Meteor.call,
        Session
    };
}, NoteListHeader)