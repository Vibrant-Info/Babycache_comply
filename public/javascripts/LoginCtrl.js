app.controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
  // This object will be filled by the form
 

  // Register the login() function
  $scope.login = function(){
	  console.log($scope.user);
	   var userinput = $('#username');
        var passinput = $('#password');
	  if($scope.user==undefined){
		    highlight_error(userinput);
            highlight_error(passinput);
			return false;
	  }
    $http.post('/login', {
      username: $scope.user.username,
      password: $scope.user.password,
    })
    .success(function(user){
      // No error: authentication OK
	  
	 sessionStorage.setItem('user',user.uname);
	
      $rootScope.message = 'Authentication successful!';
      $location.url('/dashboard');
    })
    .error(function(){
      // Error: authentication failed
	    highlight_error(userinput);
        highlight_error(passinput);
      $rootScope.msg = 'Sorry Wrong username/Password';
	  $scope.msgshow=true;
      $location.url('/login');
    });
  };
});
function highlight_error(el) {
    if(el.val() == '') {
        el.parent().addClass('has-error');
    } else {
        el.parent().removeClass('has-error');
    }
}