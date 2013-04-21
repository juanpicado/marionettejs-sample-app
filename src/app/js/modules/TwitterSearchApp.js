'use strict';

define([
	"underscore",
	"backbone",
	'modules/collections/TwitterCollection',
	'backbone.marionette'
],

function( _, Backbone, TwitterCollection) {

	var TwitterAPP = new Backbone.Marionette.Application();

	TwitterAPP.addRegions({
		search: '#search',
		tweets :  '#tweets',
		tweet : '#tweets_detail'
	});

	TwitterAPP.on('initialize:after', function(options) {
		Backbone.history.start();
	});

	TwitterAPP.on("initialize:before", function(options) {
		//TODO: something before star the app
	});

	return TwitterAPP;
});
