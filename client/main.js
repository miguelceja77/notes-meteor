import { Meteor } from 'meteor/meteor'; 
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';
import 'babel-polyfill';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.jsx';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Tracker.autorun(() => {
  const name = Session.get('name');
  console.log('Name: ', name);
});

Meteor.startup(() => {
  ReactDOM.render(routes, document.getElementById('app'));
});

