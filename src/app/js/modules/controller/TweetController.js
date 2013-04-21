'use strict';

define([
    'underscore',
    'backbone',
    'backbone.marionette',
    'modules/TwitterSearchApp',
    'modules/collections/TwitterCollection',
    'modules/view/TweetSearch',
    'modules/view/TwitterEditView',
    'modules/view/TweetsView'], function(
        _,
        Backbone,
        Marionette,
        TwitterSearchApp,
        TwitterCollection,
        TweetSearch,
        TwitterEditView,
        TweetsView) {

    var Controller = Marionette.Controller.extend({
        initialize : function(options) {
            _.bindAll(this, "search_tweets", "start", "showDetail");
        },

        start: function() {
            //TODO: code to start
        },

        /**
         * Initialized on start, without hash
         * @method
         */
        search_tweets : function () {
            var collection = new TwitterCollection();
            var tweetsSearch = new TweetSearch();
            var StoreCollectionView = new TweetsView({
                    collection : collection
            });
            StoreCollectionView.on("before:item:added", function(viewInstance){
                //console.log("sfore:item:addedt", viewInstance);
            });
            this.listenTo(StoreCollectionView, "itemview:image:selected", function(options) {
                console.log("I said,", options);
                var edit = new TwitterEditView({
                    model : options.model
                });
               TwitterSearchApp.tweet.show(edit);
            });
            TwitterSearchApp.tweets.show(StoreCollectionView);
            TwitterSearchApp.search.show(tweetsSearch);
            tweetsSearch.on("twitter:search", function(data) {
                collection.url = 'http://search.twitter.com/search.json?q=' + data + '&callback=?';
                collection.query = data;
                collection.fetch({
                     success: function(response, xhr) {
                        console.log("dkslajdklsajkdlsa", response);
                     },
                     error: function (errorResponse) {
                         console.error('There is an error with the connection');
                     }
                });
            }, this);
        },


        showDetail : function(){

        }
    });

    return Controller;
});
