var Backbone = require('backbone'),
    Categoria = require('../models/categoria');

module.exports = Backbone.Collection.extend({
  model: Categoria
});