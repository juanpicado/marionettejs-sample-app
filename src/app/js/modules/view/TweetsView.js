'use strict';

define([
    "underscore",
    "backbone",
    "backbone.marionette",
    "modules/view/TweetItemView"
],

function( _, Backbone, Marionette, TweetItemView) {

    var NoItemsView = Backbone.Marionette.ItemView.extend({
        template: {
            type: 'handlebars',
            template: Handlebars.compile($('#show-no-items-message-template').html())
        }
    });

    var tweetsView = Backbone.Marionette.CollectionView.extend({
            id : "tweetsView",

            className: "tweets-container",
            template: {
                type: 'handlebars',
                template: Handlebars.compile($('#node-template').html())
            },
            itemView: TweetItemView,
            emptyView: NoItemsView,
              onItemAdded: function(itemView){
                console.log("item view ", itemView);
            },
            initialize : function(){
                // grab the child collection from the parent model
                // so that we can render the collection as children
                // of this parent node
                //this.collection = this.model.nodes;
                console.log("tweets view", this.collection);
            },
    });

    return tweetsView;

});
