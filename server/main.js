import { Meteor } from 'meteor/meteor';
import { WebApp }  from 'meteor/webapp';
import 'babel-polyfill';


import '../imports/api/users';
import '../imports/api/notes';
import '../imports/startup/simple-schema-configuration.jsx';

Meteor.startup(() => {
});
