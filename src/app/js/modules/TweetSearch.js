'use strict';

define([
	"underscore",
	"backbone"
],

function( _, Backbone){

	var TwitterSearch = Marionette.ItemView.extend({

		  id: "add-image-form",

		  events: {
		    "click #search_button": "search_tweets"
		  },

		  initialize: function(options){
		    this.template = options.template;
		  },

		doSearch: function() {
			var subject = $('#search').val() || 'NYC';
			this.tweets.url = 'http://search.twitter.com/search.json?q=' + subject + '&callback=?';
			this.tweets.fetch();
		},

		  search_tweets : function(e){
		    e.preventDefault();

		    var data = Backbone.Syphon.serialize(this);
		    this.model.set(data);
		    this.trigger("image:save", this.model);
		  }
	});

	return TwitterSearch;
});
