<html>

<head>
	<meta charset="UTF-8">
	<title>AOEX | Global Trading Competition</title>

	<link href="css/reset.css" rel="stylesheet">
	<link href="css/oedge.css" rel="stylesheet">
	<link href="css/bootstrap-theme.css" rel="stylesheet">
	<link href="css/bootstrap.css" rel="stylesheet">
	<link href="css/pMain.css" rel="stylesheet">
	<link href="css/ao-theme.css" rel="stylesheet">
	<link href="css/font-awesome.min.css" rel="stylesheet">
	<!-- The notification Component for Analytics-->
	<link href="https://lipis.github.io/bootstrap-sweetalert/lib/sweet-alert.css" rel="stylesheet">
	<link href="css/hint.css" rel="stylesheet">
	<link href="css/bootstrap-tour-standalone.css" rel="stylesheet">
	<link href="css/parsleycss.css" rel="stylesheet">
	<link href="css/bootstrap-switch.min.css" rel="stylesheet">

	<!-- The notification Component End-->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script src="https://code.jquery.com/ui/1.11.1/jquery-ui.min.js"></script>
	<script src="js/bootstrap.js"></script>
	<script src="js/bootstrap-switch.min.js"></script>
	<script src="js/AOApp/AOmisc.js"></script>
	<script src="js/AOApp/AOui.js"></script>
	<script src="js/external/date.js"></script>
	<script src="js/external/dygraph-combined.js"></script>
	<script src="js/bootstrap-tour-standalone.js"></script>


	<!-- Pnotification Plugin Starts -->
	<script type="text/javascript" src="js/pnotify.custom.js"></script>
	<link href="css/pnotify.custom.css" media="all" rel="stylesheet" type="text/css" />
	<!-- Pnotification Plugin Ends -->

	<script>
		function preCheck() {
			if (localStorage.getItem('token') == null || localStorage.getItem("status") !== "Active") {
				document.location.href = "../login.html"
			}
		}
		window.onpaint = preCheck();
		window.onpaint = welcome_message();
		// window.onpaint = Tutourial();
	</script>
</head>


<body style="background:#15232C">
	<div class="navbar top-bar">
		<div class="container-fluid">

			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<div class="container-fluid">
					<ul class="nav-ul" id = "top-bar-balances">
						<li style ="padding:5px 10px 10px 10px;">
							<a href="#"><img src="img/logo_letters.png" style="width:45px; height:35px;">
							</a>
						</li>
							<li>
								<i class="fa fa-dollar"></i><span class="USDBalance">0.00</span>
								<br><a class="hint--bottom  hint--primary" data-hint="Your available USD balance.">USD Balance</a>
							</li>
							<li>
								<i class="fa fa-btc"></i><span class="XBTBalance">0.0000</span>
								<br><a class="hint--bottom  hint--primary" data-hint="Your available XBT balance. &#10;This is approximated balance, to check full balance please click [Settings].">XBT Balance</a>
							</li>
							<li>
								<i class="fa fa-dollar"></i><span id="exposure">0.00</span>
								<br><a class="hint--bottom  hint--primary" data-hint="Total exposure from all outstanding positions.">Total Exposure</a>
							</li>
							<li>
								<i class="fa fa-dollar"></i><span id="total_pnl">0.00</span>
								<br><a class="hint--bottom  hint--primary" data-hint="Your current floating profit & loss of your total holding.">Floating PnL</a>
							</li>
					</ul>
				</div>
			</div>


			<div class="collapse navbar-collapse" id = "top-bar-controllers">
				<ul class="nav navbar-nav navbar-right">

					<li>
						<a href="../loggedin/body.php?view=trading">Trading</a>
					</li>
					<li>
						<a href="../loggedin/body.php?view=analytics">Analytics</a>
					</li>
					<li>
							<a href="../loggedin/body.php?view=settings">Settings</a>
					</li>
					<li>
						<a id="logOut">Logout</a>
					</li>
				</ul>
			</div>
			<!-- /.navbar-collapse -->
		</div>
		<!-- /.container-fluid -->
	</div>

	<?php //Allow values only from a predefined set
            $view_vals=array(
                'trading' => "view/trading.html",
                'analytics' => "view/analytics.html",
                'settings' => "view/settings.html" );
            if(array_key_exists($_GET['view'], $view_vals)){
                include($view_vals[$_GET['view']]);
            }else{ //default location
                include($view_vals['trading']); }
    ?>

		<div class="row">
			<div id="tour6" class="container-fluid trading-bar" style="width: 100%;">
				<div id="tour7" style="float: left; height: 45px;">
				<div style="float: left; padding: 6px; display:block;">
					<input id="optCheck" type="radio" name="type-select" value="contract"> Options
					<br>
					<input type="radio" name="type-select" value="spot" checked> Bitcoin
				</div>

				<div style="float: left; padding: 6px; display:block;">
					Option Chain:
					<button id="open-button" type="button" class="btn btn-info"><span id="ordProd">XBT</span>
					</button>
				</div>
			</div>

				<div id="tour101" style="float: left; padding: 6px; display:block;">
					  <button id = "limitOrd" class ="btn btn-info glow2">Limit</button>
						<button id = "marketOrd" class ="btn unselected" style = "margin-left:-4px">Market</button>
						<!-- <input type="checkbox" name="orderType" data-on-text="Limit" data-off-text="Limit" data-label-text ="Limit" data-on-color = "info" data-off-color = "grey" checked> -->
				</div>


				<div id="orderTypeDiv" style="float: left; padding: 6px; display:block;">
						<div class="input-group" style="width: 135px">
							<div class="input-group-addon" style="align:center;">$</div>
							<input type="number" class="form-control" id="ordPrice" placeholder="Price" style="width:100px">
						</div>
				</div>


				<div id="tour9" style="float: left; padding: 6px; display:block;">
					<div class="input-group" style="width: 175px">
						<div class="input-group-addon">Amount</div>
						<input id="ordAmt" type="number" class="form-control" placeholder="Amount" style="width:100px">
					</div>
				</div>

				<div id="tour10" style="float: left; padding: 6px; display:block;">
					<button type="reset" id="buy-click" class="btn btn-success">BUY</button>
					<button type="reset" id="sell-click" class="btn btn-danger">SELL</button>
				</div>
				<div id="tour11">
				<div style="float: left; padding: 6px; font-size:13px;">
					<span class="hint--Top  hint--primary" data-hint="The impact this trade will have on your USD buying power.">Buying Power Impact:</span>
					<br>
					<span class="hint--Top  hint--primary" data-hint="Options commissions = Flat Fee($4.95) + Contract Fee($0.49) &#10;Spot commissions = Total Amount * 0.01">Trade Commissions:</span>
				</div>

				<div style="float: left; padding: 6px; font-size:12px;">
					<i class="fa fa-dollar"></i><span id="trade_cost">0.00</span>
					<br>
					<i class="fa fa-dollar"></i><span id="trade_commissions">0.00</span>
				</div>
			</div>

			<!-- <div class = "btn-group" style="float: left; padding:12px;font-size:14px; margin-left: -10px;">
				<button type="reset" class="btn btn-success btn-xs glow" style="font-size:14px" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i class="fa fa-caret-square-o-right fa-lg"></i> Webinars
				</button>
				<ul class="dropdown-menu exp_dropdown">
					<li><a href="https://global.gotomeeting.com/join/531034133"><i class="fa fa-caret-square-o-right"></i> October 28th 09:30-10:00 PM EDT</a></li>
					<li><a href="https://global.gotomeeting.com/join/246935765"><i class="fa fa-caret-square-o-right"></i> October 30th 10:30-11:00 AM EDT </a></li>
					<li role="separator" class="divider"></li>
					<li><a href="https://www.alt-options.com">Contact us:info@alt-options.com</a></li>
				</ul>
			</div> -->

				<div id="tour13" style="float: left; padding: 12px; margin-left: 10px; font-size:14px;">
					<a href="skype:?chat&blob=GD5SgnYR-PSiCA4rza029kA5wMrDpRzaFdkY8_a0A6UC2GJC3BreoWtR3aRWVhQbRUWSh_3k8D954fchCfrOKkZ8">
						<button type="reset" class="btn btn-info btn-xs glow" style="font-size:14px">
							<i class="fa fa-skype fa-lg"></i>Chat Online
						</button>
					</a>
				</div>
			</div>
		</div>

		<!-- POP OUT TABLE OPTION CHAIN -->
		<div id="overlay-back"></div>
		<div id="overlay">

			<div class="container-fluid" style="width: 50%; top: 25%; left: 25%; position: fixed; height:150px;">

				<div class="row section-head">

					<a id="close-button" href="#" style="color: #fff; float:right; margin-right: 5px; text-shadow: 1px 1px #666;">X</a>
					<span style="float:left; padding:8px 0px 0px 20px;">CALLS</span>
					<span style="float:right; padding:8px 20px 0px 0;">PUTS</span>

					<h5>Option Chain: October</h5>
				</div>
					<!-- <div type="button" class="btn btn-info btn-md" data-toggle="collapse" data-target="#demo" style = "height:30px;width:100%">[+]September 30 2015</div>
						<div id="demo" class="collapse"> -->
							<table class="table scroll table-condensed" style="text-align:center">
								<thead>
									<tr>

										<th>OPEN</th>
										<th>VOLUME</th>
										<th>LAST</th>
										<th>BID</th>
										<th>ASK</th>
										<th>STRIKE</th>
										<th>BID</th>
										<th>ASK</th>
										<th>LAST</th>
										<th>VOLUME</th>
										<th>OPEN</th>

									</tr>
								</thead>
								<tbody id="EMtable2C" style="width:54.55%; float:left; border: none;"></tbody>
								<tbody id="EMtable2P" style="width:45.45%; border: none;"></tbody>
							</table>
						<!-- </div>
						<div type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo" style = "height:30px;width:100%">[+]October 31 2015</div>
						<div type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo" style = "height:30px;width:100%">[+]November 30 2015</div> -->
					</div>
		</div>

		<script src="js/AOApp/AOapi.js"></script>
		<script src="js/AOApp/AOui.js"></script>
		<script src="js/AOApp/black-scholes.js"></script>
		<script src="js/AOApp/greeks.js"></script>
		<script src="js/AOApp/AOmisc.js"></script>


		<script>
			$(function() {
				AOapi.Account.getPositions(AOui.Account.updatePositions);
				AOapi.Account.getBalances(AOui.Account.updateBalances);
				AOapi.Product.getOptions(AOui.Product.updateOptions2, {
					expTime: "2015-11-30T23:59:59"
				});
				AOapi.User.getUserMargin(AOui.Settings.updateMargin);
			});

		</script>

		<!-- OptionChain pop out window -->
		<script>
			$(function() {
				$('#EMtable2P').on('scroll', function() {
					$('#EMtable2C').scrollTop($(this).scrollTop());
				});
			});

			$('#open-button').on('click', function() {
				$('#overlay, #overlay-back').fadeIn(0);
			});

			$('#close-button').on('click', function() {
				$('#overlay, #overlay-back').fadeOut(0);
			});

			$('#EMtable2C').on('click', function() {
				$('#overlay, #overlay-back').fadeOut(200);
			});

			$('#EMtable2P').on('click', function() {
				$('#overlay, #overlay-back').fadeOut(200);
			});

			$('input:radio[name=type-select]').click(function() {
				var checkval = $(this).val();
				$('#open-button').prop('disabled', (checkval == 'spot'));
				if (checkval == 'spot') {
					document.getElementById('ordProd').innerHTML = 'XBT';
					AOapi.Product.getOrderBook(AOui.Product.updateDepth, {
						ordProd: document.getElementById('ordProd').innerHTML
					});
				} else {

					document.getElementById('ordProd').innerHTML = '280Call1130';
					AOapi.Product.getOrderBook(AOui.Product.updateDepth, {
						ordProd: document.getElementById('ordProd').innerHTML
					});
				}

			});

			$('#ordAmt').on('change keyup paste', function() {
				AmtRefresh(ordPrice);

			});


		</script>

		<script>
		/**google analytics**/
			(function(i, s, o, g, r, a, m) {
				i['GoogleAnalyticsObject'] = r;
				i[r] = i[r] || function() {
					(i[r].q = i[r].q || []).push(arguments)
				}, i[r].l = 1 * new Date();
				a = s.createElement(o),
					m = s.getElementsByTagName(o)[0];
				a.async = 1;
				a.src = g;
				m.parentNode.insertBefore(a, m)
			})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

			ga('create', 'UA-66743100-1', 'auto');
			ga('send', 'pageview');

			$('#limitOrd').on('click', function() {
				document.getElementById('orderTypeDiv').style.display = "block";
				document.getElementById('marketOrd').setAttribute("class", "btn unselected");
				document.getElementById('limitOrd').setAttribute("class", "btn btn-info glow2");
			});

			$('#marketOrd').on('click', function() {
				document.getElementById('orderTypeDiv').style.display = "none";
				document.getElementById('limitOrd').setAttribute("class", "btn unselected");
				document.getElementById('marketOrd').setAttribute("class", "btn btn-info glow2");
			});

			// $("[name='orderType']").bootstrapSwitch('state',true,false);
			// $.fn.bootstrapSwitch.defaults.size = 'small';
			// $("[name='orderType']").on('switchChange.bootstrapSwitch', function (event, state) {
			//
			// 	if(state == true ) {
			// 		document.getElementById('orderTypeDiv').style.display = "block";
			// 	};
			//
			// 	if (state == false) {
			// 		document.getElementById('orderTypeDiv').style.display = "none";
			// 	}
			//
			// });
			// $("[name='orderType']").off('switchChange.bootstrapSwitch', function (event, state) {
			// 		document.getElementById('orderPriceDiv').style.display = "block";
			// });
		</script>

</body>

</html>
