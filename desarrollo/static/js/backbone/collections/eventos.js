var Backbone = require('backbone'),
    Evento     = require('../models/evento');

module.exports = Backbone.Collection.extend({
  model: Evento
});