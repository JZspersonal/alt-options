<!DOCTYPE html>
<html lang="en" ng-app="myApp" ng-strict-di ng-conroller="tradingCtrl" ng-cloak fade-ng-cloak>

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <meta charset="UTF-8">
    <title>AOEX | Global Trading Entry</title>
    <link rel="icon" href="favicon.ico">
    <link href="css/reset.css" rel="stylesheet">
    <link href="css/bootstrap-theme.css" rel="stylesheet">
    <link href="css/bootstrap.css" rel="stylesheet">
    <!-- <link href="css/pMain.css" rel="stylesheet"> -->
    <link href="css/ao-theme.css" rel="stylesheet">
    <link href="css/font-awesome.min.css" rel="stylesheet">

    <!-- notification -->
    <link href="css/angular-notification.min.css" rel="stylesheet">

    <!-- The notification Component for Analytics-->
    <link href="css/hint.css" rel="stylesheet">
    <!-- <link href="css/bootstrap-tour-standalone.css" rel="stylesheet"> -->
    <link href="css/parsleycss.css" rel="stylesheet">
    <link href="css/bootstrap-switch.min.css" rel="stylesheet">

    <!-- jQuery -->
    <script type="text/javascript" src="js/shared/lib/jQuery/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="js/shared/lib/jQuery/jquery.csv-0.71.min.js"></script>

    <!-- angular js -->
    <script src="js/shared/lib/angular/angular.js"></script>
    <script src="js/shared/lib/angular/angular-route.js"></script>
    <script src="js/shared/lib/angular/angular-animate.js"></script>
    <script src="js/shared/lib/angular/angular-ui-bootstrap-modal.js"></script>

    <!-- React -->
    <script src="js/shared/ngReact.js"></script>
    <script src="js/shared/react.js"></script>
    <script src="js/shared/react-dom.js"></script>

    <!--D3 Chart -->
    <link href="css/nv.d3.css" rel="stylesheet">
    <script src="js/shared/lib/d3chart/d3.min.js"></script>
    <script src="js/shared/lib/d3chart/nv.d3.min.js"></script>
    <script src="js/shared/lib/d3chart/angular-nvd3.min.js"></script>

    <!-- external chart -->
    <script type="text/javascript" src="https://cdn.cryptowat.ch/assets/build/scripts/dist/embed.js"></script>

    <!-- loader -->
    <link href="css/loader.css" rel="stylesheet">

    <!-- Angular Loader -->
    <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/angular-loading-bar/0.7.1/loading-bar.min.css' type='text/css' media='all' />
    <script type='text/javascript' src='//cdnjs.cloudflare.com/ajax/libs/angular-loading-bar/0.7.1/loading-bar.min.js'></script>


    <script>
        function preCheck() {
            if (localStorage.getItem('token') == null || localStorage.getItem("status") !== "Active") {
                document.location.href = "../login.html"
            }
        }
        window.onpaint = preCheck();
        // window.onpaint = Tutourial();
    </script>
</head>


<body style="background:#15232C;width:100%;height:100%;">
    <div class="navbar top-bar">
        <div class="container-fluid">

            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <div class="container-fluid">
                    <ul class="nav-ul" id="top-bar-balances">
                        <li style="padding:5px 10px 10px 10px;">
                            <a ng-click="changeView('/trading')">
                                <img src="img/logo_letters.png" style="width:45px; height:35px;">
                            </a>
                        </li>
                        <li>
                            <i class="fa fa-dollar"></i>{{USDBalance | number:2}}
                            <br><a class="hint--bottom  hint--primary" data-hint="Your total USD balance.">USD Balance <i class="fa fa-question-circle"></i></a>
                        </li>
                        <li>
                            <i class="fa fa-dollar"></i>{{userMargin.avail_usd_val | number:2}}
                            <br><a class="hint--bottom  hint--primary" data-hint="Your USD balance available to trade with.">USD Available <i class="fa fa-question-circle"></i></a>
                        </li>
                        <li>
                            <i class="fa fa-btc"></i>{{XBTBalance | number: 4}}
                            <br><a class="hint--bottom  hint--primary" data-hint="Your available XBT balance. &#10;This is approximated balance, to check full balance please click [Settings].">XBT Balance <i class="fa fa-question-circle"></i></a>
                        </li>
                        <li>
                            <i class="fa fa-dollar"></i>{{total_exposure | number: 2}}
                            <br><a class="hint--bottom  hint--primary" data-hint="Total exposure from all outstanding positions.">Total Exposure <i class="fa fa-question-circle"></i></a>
                        </li>
                        <li>
                            <i class="fa fa-dollar"></i>{{total_pnl | number: 2}} <i ng-style="total_pnl >= 0 && {'color':'#50B949'} || total_pnl < 0 && {'color':'#FF6939'}" ng-class="total_pnl >= 0 ? 'fa fa-caret-up' : 'fa fa-caret-down'"></i>
                            <br><a class="hint--bottom  hint--primary" data-hint="Your current floating profit & loss of your total holding.">Floating PnL <i class="fa fa-question-circle"></i></a>
                        </li>
                    </ul>
                </div>
            </div>


            <div class="collapse navbar-collapse" id="top-bar-controllers">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a ng-click="changeView('/trading')">Trading</a>
                    </li>
                    <li>
                        <a ng-click="changeView('/analytics')">Analytics</a>
                    </li>
                    <li>
                        <a ng-click="changeView('/settings')">Settings</a>
                    </li>
                    <li>
                        <a ng-click="logOut()">Logout</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </div>
    <div ng-view style="padding-bottom: 52px;"> </div>

    <div class="row">
        <div id="tour6" class="container-fluid trading-bar" style="width: 100%;z-index:99999999">
            <div id="tour7" style="float: left; height: 45px;">
                <div style="float: left; padding: 6px; display:block;" ng-init="value = 'spot'">
                    <input ng-model="value" type="radio" name="type-select" value="option"> Options
                    <br>
                    <input ng-model="value" type="radio" name="type-select" value="spot"> Bitcoin
                </div>

                <div style="float: left; padding: 6px; display:block;">
                    Option Chain:
                    <button id="open-button" type="button" class="btn btn-info">
                        <span id="ordProd">{{ordProd}}</span>
                    </button>
                </div>
            </div>

            <div id="tour101" style="float: left; padding: 6px; display:block;" ng-init="market = false">
                <button id="limitOrd" ng-click="market = false" class="btn btn-info glow2">Limit</button>
                <button id="marketOrd" ng-click="market = true; ordProd = 'XBT'" ng-disabled="value == 'option' " class="btn unselected" style="margin-left:-4px">Market</button>
            </div>


            <div id="orderTypeDiv" style="float: left; padding: 6px; display:block;" ng-hide="market">
                <div class="input-group" style="width: 135px">
                    <div class="input-group-addon" style="align:center;">$</div>
                    <input ng-model="ordPrice" value="{{ordPrice}}" class="form-control" id="ordPrice" placeholder="Price" style="width:100px">
                </div>
            </div>


            <div id="tour9" style="float: left; padding: 6px; display:block;">
                <div class="input-group" style="width: 175px">
                    <div class="input-group-addon">Amount</div>
                    <input ng-model="ordAmt" value="{{ordAmt}}" class="form-control" placeholder="Amount" style="width:100px">
                </div>
            </div>

            <div id="tour10" style="float: left; padding: 6px; display:block;">
                <button type="reset" ng-click="buy()" class="btn btn-success">BUY</button>
                <button type="reset" ng-click="sell()" class="btn btn-danger">SELL</button>
            </div>
            <div id="tour11">
                <div style="float: left; padding: 3px; font-size:11px;">
                    <span class="hint--left  hint--primary" data-hint="The Current Bitcoin Best Bid and Best Offer.">Underlying Bid/Ask <i class="fa fa-question-circle"></i></span>
                    <br>
                    <span class="hint--left  hint--primary" data-hint="The impact this trade will have on your USD buying power.">Buying Power Impact <i class="fa fa-question-circle"></i> &asymp;</span>
                    <br>
                    <span class="hint--left  hint--primary" data-hint="Options commissions = Flat Fee($4.95) + Contract Fee($0.49) &#10;Spot commissions = Total Amount * 0.01">Trade Commissions <i class="fa fa-question-circle"></i>  &asymp;</span>
                </div>

                <div style="float: left; padding: 3px; font-size:11px;">
                    <span>{{spot_buy | currency}}x{{spot_sell | currency}}</span>
                    <br>
                    <span ng-if="market === false">{{-ordAmt * ordPrice | currency}}</span>
                    <span ng-if="market === true">{{-ordAmt * spot_buy | currency}}</span>
                    <br>
                    <span ng-if="market === false && value == 'spot' ">{{ordAmt * ordPrice * 0.01 | currency}}</span>
                    <span ng-if="market === true  && value == 'spot' ">{{ordAmt * spot * 0.01 | currency}}</span>
                    <span ng-if="market === false && value == 'option' ">{{ordAmt * 0.49 + 4.50 | currency}}</span>
                </div>
            </div>

            <!-- <div class = "btn-group" style="float: left; padding:12px;font-size:14px;">
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

            <div id="tour13" style="float: right; padding: 5px; margin-margin: 7px; font-size:11px;">
                <a href="skype:?chat&blob=GD5SgnYR-PSiCA4rza029kA5wMrDpRzaFdkY8_a0A6UC2GJC3BreoWtR3aRWVhQbRUWSh_3k8D954fchCfrOKkZ8">
                    <button type="reset" class="btn btn-info btn-xs glow" style="font-size:11px;width:90.54px">
                        <i class="fa fa-skype fa"></i>Chat Online
                    </button>
                </a><br>
                <a href="https://www.alt-options.com/options.php" target="_blank">
                    <button type="reset" class="btn btn-success btn-xs glow" style="font-size:11px;margin-top:2px">
                        <i class="fa fa-question-circle"></i><span class="hint--left  hint--primary" data-hint="Click to learn how OPTION works.">Learn Options</span>
                    </button>
                </a>
            </div>
        </div>
    </div>

    <!-- POP OUT TABLE OPTION CHAIN -->
    <div id="overlay-back" style="z-index:9999999;" ng-show="showpop"></div>
    <div id="overlay" style="z-index:9999999;">

        <div class="container-fluid glow" style="width: 50%; top: 25%; left: 25%; position: fixed; border: 1px solid #DDD">

            <div class="row section-head">

                <a id="close-button" style="color: #fff; float:right; margin-right: 5px; text-shadow: 1px 1px #666;" ng-click="showpop = false">X</a>
                <span style="float:left; padding:8px 0px 0px 20px;">CALLS</span>
                <span style="float:right; padding:8px 20px 0px 0;">PUTS</span>

                <h5>Option Chain: November</h5>
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
                <tbody id="EMtable2C" style="width:54.55%; float:left; border: none;">
                    <tr ng-repeat="call in optionChain.calls track by call.strike | limitTo:15" class="trade">
                        <td ng-click="updateOrderInput(call.bid_price, 10, call.name)" highlighter="call.ask_depth">{{call.ask_depth}}</td>
                        <td ng-click="updateOrderInput(call.bid_price, 10, call.name)" highlighter="call.volume">{{call.volume}}</td>
                        <td ng-click="updateOrderInput(call.bid_price, 10, call.name)" highlighter="call.last_price">{{call.last_price}}</td>
                        <td ng-click="updateOrderInput(call.bid_price, 10, call.name)" highlighter="call.bid_price">{{call.bid_price}}</td>
                        <td ng-click="updateOrderInput(call.bid_price, 10, call.name)" highlighter="call.ask_price">{{call.ask_price}}</td>
                        <td>{{call.strike}}</td>
                    </tr>
                </tbody>
                <tbody id="EMtable2P" style="width:45.45%; border: none;">
                    <tr ng-repeat="put in optionChain.puts track by put.strike| limitTo:15" class="trade">
                        <td ng-click="updateOrderInput(put.bid_price, 10,  put.name)" highlighter="put.bid_price">{{put.bid_price}}</td>
                        <td ng-click="updateOrderInput(put.bid_price, 10,  put.name)" highlighter="put.ask_price">{{put.ask_price}}</td>
                        <td ng-click="updateOrderInput(put.bid_price, 10,  put.name)" highlighter="put.last_price">{{put.last_price}}</td>
                        <td ng-click="updateOrderInput(put.bid_price, 10,  put.name)" highlighter="put.volume">{{put.volume}}</td>
                        <td ng-click="updateOrderInput(put.bid_price, 10,  put.name)" highlighter="put.ask_depth">{{put.ask_depth}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>


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
            document.getElementById('marketOrd').setAttribute("class", "btn unselected");
            document.getElementById('limitOrd').setAttribute("class", "btn btn-info glow2");
        });

        $('#marketOrd').on('click', function() {
            document.getElementById('limitOrd').setAttribute("class", "btn unselected");
            document.getElementById('marketOrd').setAttribute("class", "btn btn-info glow2");
        });
    </script>

    <!-- bootstrap -->
    <script src="js/bootstrap.js"></script>
    <script src="js/bootstrap-switch.min.js"></script>
    <script src="js/angular-notification.min.js"></script>
    <!-- <script src="js/external/date.js"></script> -->
    <!-- <script src="js/bootstrap-tour-standalone.js"></script> -->

    <!-- App Modulizer-->
    <script src="js/AOApp/app.js"></script>
    <script src="js/AOApp/AOmisc.js"></script>
    <script src="js/AOApp/directives.js"></script>
    <script src="js/AOApp/filters.js"></script>



    <!-- controllers App-->
    <script src="js/AOApp/controllers/app/analyticsCtrl.js"></script>
    <script src="js/AOApp/controllers/app/settingsCtrl.js"></script>
    <script src="js/AOApp/controllers/app/tradingCtrl.js"></script>
    <!-- controllers Auth-->
    <script src="js/AOApp/controllers/auth/loginCtrl.js"></script>

    <!-- React Components -->
    <script src="js/AOApp/react/components/tradeHistory.js"></script>
    <script src="js/AOApp/react/components/orderBook.js"></script>

    <!-- services App-->
    <script src="js/AOApp/services/app/getUSTreasury.js"></script>
    <script src="js/AOApp/services/app/getBTCUSD.js"></script>
    <script src="js/AOApp/services/app/API.js"></script>
    <script src="js/AOApp/services/app/blackScholes.js"></script>
    <script src="js/AOApp/services/app/greeks.js"></script>
    <script src="js/AOApp/services/app/greeksCalculation.js"></script>
    <script src="js/AOApp/services/app/optionChain.js"></script>
    <script src="js/AOApp/services/app/orders.js"></script>
    <script src="js/AOApp/services/app/positionList.js"></script>
    <script src="js/AOApp/services/app/sensitivityTable.js"></script>
    <script src="js/AOApp/services/app/getHist.js"></script>
    <script src="js/AOApp/services/app/volatilityCalc.js"></script>
    <script src="js/AOApp/services/app/probabilityChart.js"></script>
    <script src="js/AOApp/services/app/normDistPrice.js"></script>

    <!-- services Auth-->
    <script src="js/AOApp/services/auth/authentication.js"></script>
    <script src="js/AOApp/services/auth/tokenStore.js"></script>

    <!-- <script src="https://d33t3vvu2t2yu5.cloudfront.net/tv.js" type="text/javascript"></script> -->



</body>

</html>
