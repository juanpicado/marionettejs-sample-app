require.config({

  //   list of vendor required
  paths: {
    jquery : "vendor/jquery/jquery",
    backbone : "vendor/backbone/backbone",
    underscore : "vendor/underscore/underscore",
    domReady : "vendor/requirejs-domready/domReady",
    text : "vendor/requirejs-text/text",
    json2 : "vendor/json2/json2",
    bootstrap : "vendor/bootstrap/bootstrap",
    handlebars : "vendor/handlebars/handlebars",
    'backbone.marionette' : "vendor/backbone.marionette/lib/backbone.marionette",
    'marionette_handlebars' : "vendor/backbone.marionette.handlebars/backbone.marionette.handlebars"
  },

  shim: {

    jquery: {
      exports: "jQuery"
    },

     bootstrap: ["jquery"],

    underscore: {
      exports: "_"
    },

    handlebars : {
        exports: 'Handlebars'
    },

    backbone: {
      deps: ["underscore" , "jquery"],
      exports: "Backbone"
    },

    "backbone.marionette" : {
      deps: ["backbone"],
      exports: "Backbone.Marionette"
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
    'marionette_handlebars',
    'bootstrap'
  ],
     function(
        $,
        Backbone,
        _,
        Handlebars,
        TwitterSearchApp,
        TweetAppRouter,
        TweetController,
        TwitterCollection,
        Marionette,
        MarionetteHandlebars,
        bootstrap) {

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
            path_root : "/"
        });

});