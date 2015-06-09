var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function(model) {

    var user = this;
    this.on('creating', function(model, attrs, options){
      bcrypt.genSalt(5, function(err, result) {
      if (err) {
        throw err;
      }
      bcrypt.hash(model.attributes.password_hash, result, null, function(err, hash) {
            if(err) {
              throw err;
            }
            user.set('password_hash', hash);
            user.set('salt', result);
        });
      });
    });
  },
  checkPassword: function(password) {
    var user = this;
    bcrypt.compare(password, this.get('password_hash'), function(err, res) {
      if (res) {
        console.log(user.get('username'), "valid password");
      } else {
        console.log(user.get('username'), "invalid password");
      }
      });
  }
});

module.exports = User;
