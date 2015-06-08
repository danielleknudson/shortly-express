var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

// user.increments('id').primary();
// user.string('username', 100);
// user.string('password_hash', 100);
// user.string('salt', 10);
// user.timestamps();

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function() {
    this.on('creating', function(model, attrs, options){
      //console.log('attrs', attrs);
      bcrypt.genSalt(5, function(err, result) {
      if (err) {
        throw err;
      }
        bcrypt.hash(model.attributes.password, result, null, function(err, hash) {
            if(err) {
              throw err;
            }
            model.set('password_hash', hash);
            model.set('salt', result);
            console.log('salt:', model.get('salt'));
            console.log('hash:', hash);
            console.log('attribute hash:', model.get('password_hash'))
        });

      });
    });

  }
  // initialize
  // event listener for 'creating' with callback that gets passed model, attrs, options
  // log model, attrs, options
  // set(hash)
  // some hasfunction(attrs.password)
  // set(password, '')
});

module.exports = User;
