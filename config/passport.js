var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./dbconfig');
var connection = mysql.createConnection(dbconfig.connection);

connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {

	passport.use(new LocalStrategy({
			usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form
		console.log("PAssport entered");
            connection.query("SELECT * FROM test.munire_comply_users WHERE uname = ?",[username], function(err, rows){
				console.log("[uname]="+rows[0]);
                if (err)
                    return done(err);
                if (!rows.length) {
					console.log("rows.length="+rows.length);
                    return done(null, false);
                }
        
                return done(null, rows[0]);
            });
        })
	);

	// Serialized and deserialized methods when got from session
	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

}
//==================================================================
