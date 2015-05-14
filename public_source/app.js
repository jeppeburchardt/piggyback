require(['react', 'jsx!components/app'], function(React, App){

  var AppFactory = React.createFactory(App)();
	React.render(AppFactory, document.body);

});
