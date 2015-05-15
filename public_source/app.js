require(['react', 'jsx!components/views/app'], function(React, App){

	'use strict';

	var AppFactory = React.createFactory(App)();
	React.render(AppFactory, document.body);

});
