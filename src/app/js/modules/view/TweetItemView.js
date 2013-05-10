'use strict';

define([
    "underscore",
    "backbone",
    "backbone.marionette",
    'marionette_handlebars'
], function( _, Backbone, Marionette, MarionetteHandlebars) {

    var MyItemView = Backbone.Marionette.ItemView.extend({
        className: "twitter-item row",
        triggers: {
            "click .item-parent": "image:selected"
        },
        template: {
            type: 'handlebars',
            template: Handlebars.compile($('#tweet-item-view').html())
        },
        tagName :'div'
    });

    return MyItemView;

});
