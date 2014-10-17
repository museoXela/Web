var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore');

module.exports = Backbone.View.extend({
  el: $('#Header'),

  events: {
    'click #Header-buttons-menuButton': 'displayMenu',
    'click #Header-buttons-searchButton': 'displaySearchBox'
  },
  initialize: function (options) {
    this.options = options || {};
    if(this.options.config === 1){
      this.$el.addClass('Header--searchHide')      
    }
    //this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    return this;
  },
  displayMenu: function (){
    this.$el.removeClass('Header--searchActive');
  	this.$el.toggleClass('Header--menuActive');
  },
  displaySearchBox: function (){
    this.$el.removeClass('Header--menuActive');
    this.$el.toggleClass('Header--searchActive');
  },
});