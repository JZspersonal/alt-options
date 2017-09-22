<?php session_start(); ?>
<?php if( isset($_SESSION[ 'ERRMSG_ARR']) && is_array($_SESSION[ 'ERRMSG_ARR']) && count($_SESSION[ 'ERRMSG_ARR'])>0 ) { echo '
<ul style="padding:0; color:red;">'; foreach($_SESSION['ERRMSG_ARR'] as $msg) { echo '
    <li>',$msg,'</li>'; } echo '</ul>'; unset($_SESSION['ERRMSG_ARR']); } ?>


<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="author" content="">
    <link rel="icon" href="favicon.ico">
    <title>Alt-Options | Register Your Beta Account</title>
    <meta property="og:title" content="Alt-Options | Register Your Beta Account" />
    <meta property="og:type" content="company" />
    <meta property="og:site_name" content="Alt-Options | Register Your Beta Account" />
    <meta property="og:url" content="alt-options.com" />
    <meta property="og:image" content="" />

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

    <!-- Validation CSS -->
    <link rel="stylesheet" href="css/validationEngine.jquery.css" type="text/css" />

    <!-- Custom CSS -->
    <!-- <link href="css/agency.css" rel="stylesheet"> -->
    <link href="css/reg.css" rel="stylesheet">
    <link href="css/alert.css" rel="stylesheet">

</head>

<body>
  <div class="error-notice">
      <div id = "alert" class="oaerror danger" hidden>
        <button type="button" class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
        <div id = "alert-content"></div>
        <!-- <button class="alert-btn">dismiss</button> -->
      </div>
      <div id = "success" class="oaerror success" hidden>
        <button type="button" class="close"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
        <div id = "success-content"></div>
        <!-- <button class="alert-btn">dismiss</button> -->
      </div>
  </div>
    <div class="main-body">
        <img src="img/logo_standalone.png" width="20%" style="margin-top: 30px;">
        <br>
        <div class="container-fluid">
            <div class="title" style="margin: -10px auto;">
                <br>Register Beta</div>
                <form id="regForm" role="form" method="post" action="pass_reg.php" novalidate>
                <br><h4>Email</h4>
                <div class="row">

                    <img src="img/login/email_box.png">
                    <input type="text" name="email" id="email" placeholder="Email Address" class="validate[required,custom[email]] text-input" data-prompt-position="centerLeft">

                </div>
                <div class="row">

                    <img src="img/login/email_box.png">
                    <input type="email" name="conf_email" id="conf_email" placeholder="Confirm Email" class="validate[required,equals[email]]" data-prompt-position="centerLeft">

                </div>
                <br><h4>Password</h4>
                <div class="row">

                    <img src="img/login/pass_box.png">
                    <input type="password" name="password" id="password" placeholder="Your Password" class="validate[required,maxSize[40]]" data-prompt-position="centerLeft">

                </div>
                <div class="row">

                    <img src="img/login/pass_box.png">
                    <input type="password" name="conf_password" id="conf_password" placeholder="Confirm Password" class="validate[required,equals[password]]" data-prompt-position="centerLeft">

                </div>

                <br><h4>Additional Information</h4>
                <div class="row">

                    <img src="img/login/pass_box.png">
                    <input type="text" name="first_name" id="first_name" placeholder="First Name" data-prompt-position="centerLeft">

                </div>

                <div class="row">

                    <img src="img/login/pass_box.png">
                    <input type="text" name="last_name" id="last_name" placeholder="Last Name" data-prompt-position="centerLeft">

                </div>

                <br>
                <div class="row">
                    <button class= "btn-primary btn-md btn" id = "register" style="color: #fff;width: 150px;margin-bottom:5px;">Register</button>
                </div>
                <div class="row">
                    <div style="text-align:center; color:#FFF; width: 100%; font-size: 0.7em; margin-top:5px;">
                        By clicking <strong>REGISTER</strong>, you agree to the <strong><a href="https://alt-options.com/legal.php"  style="color:white">Terms and Conditions</a></strong>.
                    </div>
                </div>
                <div class="row">
                    <div style="text-align:center; color:#FFF; width: 100%;font-size: 12px; margin-top:10px; margin-bottom:10px;">
                        Please contact us if you have any questions:<br>
                        Email:<a href='mailto:info@alt-options.com'>info@alt-options.com</a> |
                        Skype: <i class="fa fa-skype" style="color:white"></i><a href="skype:?chat&blob=GD5SgnYR-PSiCA4rza029kA5wMrDpRzaFdkY8_a0A6UC2GJC3BreoWtR3aRWVhQbRUWSh_3k8D954fchCfrOKkZ8">Alt-Options<a>
                    </div>
                </div>
                </form>

        </div>
    </div>



    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

    <script src="js/jquery.validationEngine.js"></script>
    <script src="js/jquery.validationEngine-en.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <script>
    $("#register").click(function () {

        if ($("#email").val()!== $("#conf_email").val()){
            document.getElementById("alert-content").innerHTML = "Your email and confirmation email address don't match. Please double check!!"
            document.getElementById("alert").style.display = 'block';
        }
        else if ($("#password").val()!== $("#conf_password").val()){
            document.getElementById("alert-content").innerHTML = "Your password and confirmation password address don't match. Please double check!"
            document.getElementById("alert").style.display = 'block';
        }
        else{

            $.ajax({
                type: "POST",
                url: "https://aos-v3.alt-options.com/public/register",
                dataType: "json",
                data: JSON.stringify({ /*'first_name', 'last_name', 'dob', 'cell', 'addr_street', 'addr_city', 'addr_state', 'addr_zip'*/
                    email: $("#email").val(), /*"admin@example.com"*/
                    password: $("#password").val(), /*"admin"*/
                    first_name: $("#first_name").val(), /*"first_name"*/
                    last_name: $("#last_name").val(), /*"first_name"*/
                })

            }).done(function (data) {
                if (String(data.result) == "Success") {
                    // oved by our administrator within the next hour. Feel free to send an email to us anytime at info@alt-options.com.");
                    document.getElementById("success-content").innerHTML = "Thank you for participating in our beta program. Your account should be approved by our administrator within the next hour. Feel free to send an email to us anytime at info@alt-options.com."
                    document.getElementById("success").style.display = 'block';
                    setTimeout(function(){
                      document.location.href = "app/login.html";
                    }, 5000);
                } else {
                    document.getElementById("alert-content").innerHTML = "Your [ Email Address ] has already been taken, please use another address!"
                    document.getElementById("alert").style.display = 'block';
                }

            });
        }
        return false;
    });

    jQuery("#regForm").validationEngine();

        $("#regForm").bind("jqv.field.result", function(event, field, errorFound, prompText){ console.log(errorFound) });

        //Close alert
    $('.error-notice .close').click(function(e) {
        e.preventDefault();
        $(this).closest('#alert').slideUp();
        $(this).closest('#success').slideUp();
    });

    </script>

</body>

</html>
