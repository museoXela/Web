var Backbone = require('backbone'),
	$ = require('jquery'),
	HeaderView = require('./backbone/views/header');
	Backbone.$ = $;

$(function(){
	console.log('Hello World! 2');
	var header = new HeaderView();
	header.render();
});