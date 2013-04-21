'use strict';

define([
	"underscore",
	"backbone",
	'handlebars',
	'backbone.marionette',
	'marionette_handlebars'
],

function( _, Backbone, Handlebars, Marionette, MarionetteHandlebars) {

	var TwitterSearch = Marionette.ItemView.extend({

		tagName: "div",

		className: "search-box",

		template: {
			type: 'handlebars',
			template: Handlebars.compile($('#search_twitter-template').html())
		},

		events: {
			"click button": "search"
		},

		initialize: function() {},

		/**
		 * Search on twitter search service.
		 * @method search
		 */
		search : function (e) {
			e.preventDefault();
			var value = this.$el.find('input').val();
			this.trigger("twitter:search", value);
			console.log('value', value);
		}
	});

	return TwitterSearch;
});