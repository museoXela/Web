var Backbone = require('backbone'),
    Pieza     = require('../models/pieza');

module.exports = Backbone.Collection.extend({
  model: Pieza
});