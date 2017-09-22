angular.module("myApp.controllers").controller('registerCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){

$scope.register = function(email, conf_email, password, conf_password, referrer, firstName, lastName, dob, cell, addr_street, addr_city, addr_state, addr_zip) {
  if (email !== conf_email)  {
      alert("Your email and confirmation email address don't match. Please double check!");
  }
  else if (password !== conf_password {
      alert("Your password and confirmation password address don't match. Please double check!");
  }
  else {
    var data = {
      email: email,
      password: password,
      referrer: referrer,
      first_name: firstName,
      last_name: lastName,
      dob: dob,
      cell: cell,
      addr_street: addr_street,
      addr_city: addr_city,
      addr_state: addr_state,
      addr_zip: addr_zip
    }
    AOapi.User.register(data)
    .then(function(response){
      if(response.result=="Success"){
        alert("Thank you for participating in our beta program. Your account should be approved by our administrator within the next hour. Feel free to send an email to us anytime at info@alt-options.com.");
        $window.location.href = "login.html";
      } else {
          alert("Your email has already been taken.");
      }
    });
  };
    $http({
        method: "POST",
        url: "https://aos-v3.alt-options.com/public/authed/logout",
        dataType: "json",
        data: {
            auth_token: localStorage.getItem('token')
        }

    }).then(function(data) {
        localStorage.clear();
    });
  }

}]);


/*$("#register").click(function () {

    if ($("#email").val()!== $("#conf_email").val()){
        alert("Your email and confirmation email address don't match. Please double check!");
    }
    else if ($("#password").val()!== $("#conf_password").val()){
        alert("Your password and confirmation password address don't match. Please double check!");
    }
    else{

        $.ajax({
            type: "POST",
            url: "https://aos-v3.alt-options.com/public/register",
            dataType: "json",
            data: JSON.stringify({ /*'first_name', 'last_name', 'dob', 'cell', 'addr_street', 'addr_city', 'addr_state', 'addr_zip'/
                email: $("#email").val(), /*"admin@example.com"/
                password: $("#password").val(), /*"admin"/
                first_name: $("#first_name").val(), /*"first_name"
                last_name: $("#last_name").val(), /*"first_name"
            })

        }).done(function (data) {
            if (String(data.result) == "Success") {
                alert("Thank you for participating in our beta program. Your account should be approved by our administrator within the next hour. Feel free to send an email to us anytime at info@alt-options.com.");
                document.location.href = "login.html";
            } else {
                alert("Your email has already been taken.");
            }

        });
    }
    return false;
});

jQuery("#regForm").validationEngine();

    $("#regForm").bind("jqv.field.result", function(event, field, errorFound, prompText){ console.log(errorFound) });


$("#register").click(function() {
            $.ajax({
                type: "POST",
                url: "https://aos-v3.alt-options.com/public/authed/logout",
                dataType: "json",
                data: JSON.stringify({
                    auth_token: localStorage.getItem('token')
                })

            }).done(function(data) {
                localStorage.clear();
            });
            return;
        });*/
