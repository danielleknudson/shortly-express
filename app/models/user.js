var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function(model) {

    var user = this;
    console.log('MODEL:', model);
    this.on('creating', function(model, attrs, options){

      bcrypt.genSalt(5, function(err, result) {
      if (err) {
        throw err;
      }
        bcrypt.hash(model.password, result, null, function(err, hash) {
            if(err) {
              throw err;
            }
            user.set('password_hash', hash);
            user.set('salt', result);
            console.log('salt:', user.get('salt'));
            console.log('hash:', hash);
            console.log('attribute hash:', user.get('password_hash'));
        });

      });
    });
  }
});

module.exports = User;
