require.config({
	paths: {
		'react': '../bower_components/react/react-with-addons',
		'JSXTransformer': '../bower_components/react/JSXTransformer',
		'jsx': '../bower_components/requirejs-react-jsx/jsx',
		'text': '../bower_components/requirejs-text/text',
		'p': '../bower_components/p-promise/p',
		'socketio': '../bower_components/socket.io-client/socket.io',
		'YuoTubeApi': 'http://www.youtube.com/iframe_api?noext',
	},

	shim : {
		'react': {
			'exports': 'React'
		},
		'Q': {
			'exports': 'Q'
		},
		'YuoTubeApi' : {
			'exports': 'YT'
		},
		'JSXTransformer': 'JSXTransformer',
		'socketio': {
			exports: 'io'
		},
	},

	jsx: {
		fileExtension: '.jsx',
		transformOptions: {
			harmony: true,
			stripTypes: false,
			inlineSourceMap: true
		},
		usePragma: false
	}
});

require(['app']);