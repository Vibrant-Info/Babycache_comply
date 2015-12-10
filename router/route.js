module.exports=function(app,passport){

	app.get('/', function(req, res){
	  res.render('index', { title: 'Munire_Comply' });
	});

	app.get('/loggedin', function(req, res) {
	  res.send(req.isAuthenticated() ? req.user : '0');
	});

	// route to log in
	app.post('/login', passport.authenticate('local'), function(req, res) {
		console.log(req.user);
	  res.send(req.user);
	});

	// route to log out
	app.post('/logout', function(req, res){
	  req.logOut();
	  res.send(200);
	});


}

var auth = function(req, res, next){
  if (!req.isAuthenticated()) 
  	res.send(401);
  else
  	next();
};