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
  const currentPagePrivacy = Session.get('currentPagePrivacy')

  onAuthChange(isAuthenticated, currentPagePrivacy);
});

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId')
  Session.set('isNavOpen', false);
  
  if (selectedNoteId) {
    history.replace(`/dashboard/${selectedNoteId}`)
  }
})

Tracker.autorun(() => {
  const isNavOpen = Session.get('isNavOpen');

  document.body.classList.toggle('is-nav-open', isNavOpen);
})

Meteor.startup(() => {
  Session.set('selectedNoteId', undefined)
  Session.set('isNavOpen', false)
  ReactDOM.render(routes, document.getElementById('app'));
});

