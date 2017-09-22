angular.module('myApp.controllers').controller("loginCtrl", ['$scope','$http', '$location', '$window', 'authentication', function($scope, $http, $location, $window, authentication){


// let me know what scope item you wnat me to add to do the following:
  // --------------------------------------------------------------------

  /*$("#resetPassword").click(function () {
    document.getElementById('resetpage').style.display = "block";
    document.getElementById('loginpage').style.display = "none";
  });
  -------------------------------------------------------------------*/




$scope.login = function(email, password) {
  var promise = authentication.login(email, password);

  promise.then(function(data){
    //var resp = JSON.parse(data);
    if(String(data.result) == "Success")  {
      $window.localStorage.setItem('token', data.data.auth_token);
      if(data.status == "Active") {

        // $window.localStorage.setItem('status', data.status);
        $scope.status = data.data.status;
        $window.location.href = "loggedin/body.php?view=trading";
      } else if (data.data.status == "AwaitingTFAMethod"){
        //$window.localStorage.setItem('status', resp.status);
        $scope.status = data.data.status;

        $http({
          method: 'POST',
          url: "https://aos-v3.alt-options.com/public/send_tfa_code",
          dataType: "json",
          data: {
            auth_token: $window.localStorage.getItem('token'),
            method: 'Email',
          }
        }).then(function(data){
          alert("2FA code has been sent to your email. Please check your inbox!");
        });
      }
    } else {
      alert("Incorrect Email or Password");
    }
  });
  //return false;
};



$scope.verify2FA = function(code){
  var authToken = $window.getItem('token');
  var promise = authentication.verify2FA(authToken, code);
  promise.then(function(resp){
    //var resp = JSON.parse(data);
    if(String(resp.result) == "Success"){
      $scope.status = "Active";
      $window.location.href = "loggedin/body.php?view=trading";
    } else {
      alert("Incorrect 2FA authentication code, please resend or enter it again!");
    }
  });
  //return false;
};

$scope.resend2FA = function(){
  var authToken = $window.getItem('token');
  var promise = authentication.resend2FA(authToken);
  promise.then(function(data){
    alert("Your 2FA code has been resent, please check your email!");
  });

  //return false;
}


$scope.reset = function(email){
  var promise = authentication.reset(email);
  promise.then(function(resp){
    //var resp = JSON.parse(data);
    if(String(resp.result) == "Success") {
      alert("We just sent a confirmation email with the reset code to your email. Please check your inbox!");

      //below is DOM manipulation. Let me know what metrics you need to make it happen in angular
      //
      // --------------------------------------------------------------

      /*document.getElementById('reset').remove();
      document.getElementById('RA_Sender').style.display = "block";
      document.getElementById('verify_RA').disabled = false;
      document.getElementById('resend_RA').disabled = false;

      --------------------------------------------------------------*/
    } else {
      alert("Incorrect Email or Password");
    }
  });
}

$scope.verifyRA = function(email, code, newPass) {
  var promise = authentication.verifyRA;
  promise.then(function(resp){
    //var resp = JSON.parse(data);

    if(String(resp.result) == "Success"){
      alert("Success! Your password has been changed!");
      //below is DOM manipulation. Let me know what metrics you need to make it happen in angular
      /*
      --------------------------------------------------------------
      document.getElementById('resetpage').style.display = "none";
      document.getElementById('loginpage').style.display = "block";
      --------------------------------------------------------------
      */
    } else {
      alert("Please try this process again! Something went wrong!");
    }
  });
}

$scope.resendRA = function(email){
  var promise = authentication.resendRA(email);
  promise.then(function(resp){
    //var resp = JSON.parse(data);
    if (String(resp.result) == "Success"){
      alert("We just sent another confirmation email with the reset code to your email. Please check your inbox!")
    } else {
      alert("Incorrect Email or Password")
    }
  });
}


}]);
