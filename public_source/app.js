'use strict';

var React = require('react'),
	App = require('./components/views/app.jsx');

// Here we put our React instance to the global scope. Make sure you do not put it 
// into production and make sure that you close and open your console if the 
// DEV-TOOLS does not display
window.React = React; 

var AppFactory = React.createFactory(App)();
React.render(AppFactory, document.body);

module.exports = AppFactory();
