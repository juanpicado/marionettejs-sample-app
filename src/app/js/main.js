// Set the require.js configuration for your application.
require.config({

  paths: {
    // JavaScript folders.
    libs: "vendor",
    // Libraries.
    jquery : "vendor/jquery/jquery",
    //lodash : "vendor/lodash/lodash",
    backbone : "vendor/backbone/backbone",
    underscore : "vendor/underscore/underscore",
    domReady : "vendor/requirejs-domready/domReady",
    text : "vendor/requirejs-text/text",
    json2 : "vendor/json2/json2",
    handlebars : "vendor/handlebars/handlebars",
    'backbone.marionette' : "vendor/backbone.marionette/lib/backbone.marionette",
    marionette_handlebars : "vendor/backbone.marionette.handlebars/backbone.marionette.handlebars"
  },

  shim: {
    jquery: {
      exports: "jQuery"
    },

    underscore: {
      exports: "_"
    },

    handlebars : {
		exports : 'Handlebars'
    },

    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ["underscore" , "jquery"],
      exports: "Backbone"
    },

    "backbone.marionette" : {
      deps: ["backbone"],
      exports : "Backbone.Marionette"
    },

    "marionette_handlebars" : {
      deps: ["backbone.marionette"]
    }

  }

});


require([
	"jquery",
	'backbone',
	'underscore',
	'handlebars',
	'modules/TwitterSearchApp',
	'modules/router/TweetAppRouter',
	'modules/controller/TweetController',
	'modules/collections/TwitterCollection',
	'backbone.marionette',
	'marionette_handlebars'],
	function($,
		Backbone,
		_,
		Handlebars,
		TwitterSearchApp,
		TweetAppRouter,
		TweetController,
		TwitterCollection,
		Marionette,
		MarionetteHandlebars) {
		console.log('TweetAppRouter', TweetAppRouter);
		console.log('TwitterSearchApp', TwitterSearchApp);
		console.log('TweetController', TweetController);
		console.log('TwitterCollection', TwitterCollection);

		//var collection = new TwitterCollection();
		//collection.fetch();

		// collection.each(function(tweet) {
  //               console.log("tweet", tweet);
  //        });

		// initialize the controller and app router
		TwitterSearchApp.addInitializer(function(options) {
			// initialize the controller
			var controller = new TweetController({
				region_search : TwitterSearchApp.search
			});
			// initialize the router
			var router = new TweetAppRouter({
				controller : controller
			});
		});


		// initialize the application
		TwitterSearchApp.start({
			root : window.location.pathname,
			path_root : "/",
			juan_random_param : "jotadeveloper"
		});

});









































