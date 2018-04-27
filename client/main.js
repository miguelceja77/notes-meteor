import { Meteor } from 'meteor/meteor'; 
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import 'babel-polyfill';
import createHistory from 'history/createBrowserHistory';
import { Router, Switch, Route, withRouter } from 'react-router';



import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.jsx';

const history = createHistory();

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId')

  if (selectedNoteId) {
    history.replace(`/dashboard/${selectedNoteId}`)
  }
})

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined)
  ReactDOM.render(routes, document.getElementById('app'));
});

