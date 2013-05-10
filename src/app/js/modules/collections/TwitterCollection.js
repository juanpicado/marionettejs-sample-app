'use strict';

define([
    'backbone', 'modules/model/Tweet'], function(Backbone, Tweet) {
    var Tweets = Backbone.Collection.extend({
        model: Tweet,
        initialize : function () {
            this.bind("reset", function (model, options) {

            });
        },
        // Url to request when fetch() is called
        //url: 'http://search.twitter.com/search.json?q=Hamburg&rpp=5&lang=all',
        // Because twitter doesn't return an array of models by default we need
        // to point Backbone.js at the correct property
        parse: function(response) {
            return response.results;
        },
        url: function () {
            return 'http://identi.ca/api/search.json?q=' + this.query + '&page=' + this.page + '&callback=?'
        },
        query: 'backbone.js',

        page: 1,

        // Overwrite the sync method to pass over the Same Origin Policy
        sync: function(method, model, options) {
            var that = this;
                var params = _.extend({
                    type: 'GET',
                    dataType: 'jsonp',
                    url: that.url,
                    processData: false
                }, options);

            return $.ajax(params);
        }
    });
    return Tweets;
});
