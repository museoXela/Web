var Backbone = require('backbone'),
    Voluntario     = require('../models/voluntario');

module.exports = Backbone.Collection.extend({
  model: Voluntario
});