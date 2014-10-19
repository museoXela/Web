var Backbone = require('backbone'),
    Investigacion     = require('../models/investigacion');

module.exports = Backbone.Collection.extend({
  model: Investigacion
});