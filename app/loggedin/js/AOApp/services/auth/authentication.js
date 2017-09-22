
angular.module('myApp.services').factory(['$http', '$window', function($http, $window){
  var service = {};

  service.login = login;
  service.verify2FA = verify2FA;
  service.resend2FA = resend2FA;
  service.reset = reset;
  service.verifyRA = verifyRA;
  service.resendRA = resendRA;

  return service;

  function login(email, password){
    return $http({
        method: "POST",
        url: "https://aos-v3.alt-options.com/public/create_session",
        dataType: "json",
        data: {
          email: email,
          password: password
        }
    })
  };

  function verify2FA(authToken, code){
    return $http({
        method: "POST",
        url: "https://aos-v3.alt-options.com/public/verify_tfa_code",
        dataType: "json",
        data: {
          auth_token: authToken,
          code: code
        }
    });
  };

  function resend2FA(authToken) {
    return $http({
      method: "POST",
      url: "https://aos-v3.alt-options.com/public/send_tfa_code",
      dataType: "json",
      data: {
        auth_token: authToken,
        method: "Email"
      }
    });
  };

  function reset(email){
    return $http({
      method: "POST",
      url: "https://aos-v3.alt-options.com/public/send_pw_reset_code",
      dataType: "json",
      data: {
        email: email
      }
    });
  };

  function verifyRA(email, code, newPass){
    return $http({
      method: "POST",
      url: "https://aos-v3.alt-options.com/public/reset_pw",
      dataType: "json",
      data: {
        email: email,
        code: code,
        new_password: newPass
      }
    });
  }

  function resendRA(email){
    return $http({
      method: "POST",
      url: "https://aos-v3.alt-options.com/public/send_pw_reset_code",
      dataType: "json",
      data: {
        email: email
      }
    });
  }
}]);











/*$("#login").click(function () {

    $.ajax({
        type: "POST",
        url: "https://aos-v3.alt-options.com/public/create_session",
        dataType: "json",
        data: JSON.stringify({
            email: $("#email").val(), /*"admin@example.com"
            password: $("#password").val() /*"admin"
        })

    }).done(function (data) {
        if (String(data.result) == "Success") {

            localStorage.setItem('token', data.auth_token);

            if (data.status == "Active") {

                localStorage.setItem('status', data.status); //if data.status is active, set localstorage.
                document.location.href = "loggedin/body.php?view=trading"; //go to trading page - precheck()

            } else if (data.status == "AwaitingTFAMethod"){
                localStorage.setItem('status', data.status);
                document.getElementById('2FA_Sender').style.display = "block";
                document.getElementById('verify_2FA').disabled = false;
                document.getElementById('resend_2FA').disabled = false;

                 $.ajax({
                    method: "POST",
                    url: "https://aos-v3.alt-options.com/public/send_tfa_code",
                    dataType: "json",
                    data: JSON.stringify({
                        auth_token: localStorage.getItem('token'),
                        method: "Email",
                    })
                }).done(function (data) {
                    // callback(data);
                    alert("2FA code has been sent to your email. Please check your inbox!")
                });
            }

        } else {
            alert("Incorrect Email or Password")
        }
    });

    return false;

});*/


/*$("#verify_2FA").click(function () {

    $.ajax({
        type: "POST",
        url: "https://aos-v3.alt-options.com/public/verify_tfa_code",
        dataType: "json",
        data: JSON.stringify({
            auth_token: localStorage.getItem('token'),
            code: $("#2FA_Code").val(),
        })
    }).done(function (data) {
        if (data.result == "Success") {
            localStorage.setItem('status', "Active");
            document.location.href = "loggedin/body.php?view=trading";
        } else {
            alert("Incorrect 2FA authentication code, please resend or enter it again!");
            document.getElementById('2FA_Sender').style.display = "block";
        }

    });

    return false;

});*/

/*$("#resend_2FA").click(function () {

    $.ajax({
        type: "POST",
        url: "https://aos-v3.alt-options.com/public/send_tfa_code",
        dataType: "json",
        data: JSON.stringify({
            auth_token: localStorage.getItem('token'),
            method: "Email",
        })

    }).done(function (data) {
            alert("Your 2FA code has been resent, please check your email!");
    });

    return false;

});*/

/*$("#reset").click(function () {

  $.ajax({
      type: "POST",
      url: "https://aos-v3.alt-options.com/public/send_pw_reset_code",
      dataType: "json",
      data: JSON.stringify({
          email: $("#ra_email").val(), /*"admin@example.com"
      })

  }).done(function (data) {
      if (String(data.result) == "Success") {

          alert("We just sent a confirmation email with the reset code to your email. Please check your inbox!")
          document.getElementById('reset').remove();
          document.getElementById('RA_Sender').style.display = "block";
          document.getElementById('verify_RA').disabled = false;
          document.getElementById('resend_RA').disabled = false;

          }  else {
          alert("Incorrect Email or Password")
      }
  });

  return false;

});*/

/*$("#verify_RA").click(function () {
  var npsw = $("#new_password").val();
  var npsw_confirm = $("#new_password_confirm").val();
  if ( npsw !== npsw_confirm) {
    alert("Please double check the password you just entered. The password doesn't match with the confirmation password!")
  } else {
    $.ajax({
        type: "POST",
        url: "https://aos-v3.alt-options.com/public/reset_pw",
        dataType: "json",
        data: JSON.stringify({
            email: $("#ra_email").val(),
            code:$("#RA_Code").val(),
            new_password:npsw
        })

    }).done(function (data) {
        if (String(data.result) == "Success") {

            alert("Success! Your password has been changed!")
            document.getElementById('resetpage').style.display = "none";
            document.getElementById('loginpage').style.display = "block";

            }  else {

            alert("Please try this process again! Something went wrong!")
        }
    });
  }
  return false;
});*/


/*$("#resend_RA").click(function () {

  $.ajax({
      type: "POST",
      url: "https://aos-v3.alt-options.com/public/send_pw_reset_code",
      dataType: "json",
      data: JSON.stringify({
          email: $("#ra_email").val(), /*"admin@example.com"
      })

  }).done(function (data) {
      if (String(data.result) == "Success") {
          alert("We just sent another confirmation email with the reset code to your email. Please check your inbox!")
          }  else {
          alert("Incorrect Email or Password")
      }
  });

  return false;

});*/
