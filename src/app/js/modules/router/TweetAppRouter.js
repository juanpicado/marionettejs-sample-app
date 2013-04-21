'use strict';

define(["backbone", "backbone.marionette"], function(Backbone, Marionette) {
  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      "": "search_tweets",
      "tweet/:id": "showDetail"
    }
  });

  return Router;
});