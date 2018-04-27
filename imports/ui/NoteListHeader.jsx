import React from 'react'
import { Meteor } from 'meteor/meteor'
import { createContainer } from 'meteor/react-meteor-data'
import PropTypes from 'prop-types';


export const NoteListHeader = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <button onClick={() => {
                props.meteorCall('notes.insert')
                }}>Crear Nota</button>
        </div>
    )
}

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired
}

export default createContainer(() => {
    return{
        meteorCall: Meteor.call
    };
}, NoteListHeader)