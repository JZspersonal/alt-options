<!doctype html>
<html>
<!--lang363 through lang379-->

<head>

    <title>(BTCVol) Bitcoin Volatility Index | Alt-Options </title>
    <link rel="icon" href="favicon.ico">

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=3">
    <meta name="description" content="Alt-Options is the most professional Bitcoin Options Exchange! Also the only exchange that offers American Options Trading. Start trading Bitcoin Options today!">
    <meta name="keywords" content="Bitcoin Options, Bitcoin Call Options, Bitcoin Put Options, Bitcoin Derivative Exchange, Bitcoin Trading, Bitcoin Forwards, Bitcoin Swaps, Professional Options Pricing, Bitcoin Clearing House, Cryptocurrency Pricing Model, Bitcoin Options Pricing">
    <meta name="author" content="">
    <meta property="og:title" content="Alt-Options | Bitcoin Volatility Index" />
    <meta property="og:type" content="company" />
    <meta property="og:site_name" content="Alt-Options | Bitcoin Volatility Index" />
    <meta property="og:url" content="alt-options.com" />
    <meta property="og:image" content="" />

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/wMain.css" rel="stylesheet">

    <link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css'>

    <!-- Custom Fonts -->
    <link href='https://fonts.googleapis.com/css?family=Lato:300,300,400,700' rel='stylesheet' type='text/css'>
    <link href="fonts/font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- Charting Js Starting here -->
    <script src="js/Chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>


    <style>
        #canvas-holder1 {
            width: 300px;
            margin: 20px auto;
        }
        
        #canvas-holder2 {
            width: 100%;
        }
        
        #chartjs-tooltip {
            opacity: 1;
            position: absolute;
            background: rgba(0, 0, 0, .7);
            color: white;
            padding: 3px;
            border-radius: 3px;
            -webkit-transition: all .1s ease;
            transition: all .1s ease;
            pointer-events: none;
            -webkit-transform: translate(-50%, 0);
            transform: translate(-50%, 0);
        }
        
        .chartjs-tooltip-key {
            display: inline-block;
            width: 10px;
            height: 10px;
        }
        
        #canvas-holder2 canvas {
            height: auto !important;
            width: 100% !important;
            max-height: 400px;
            margin-top: 10px;
        }
    </style>

</head>

<body id="page-top" class="index" style="background:rgba(0, 0, 0, .90)">

    <?php include( "header.html") ?>

    <!-- About us header session starts-->
    <header>
        <div class="container" style="height: 400px; ">
            <div style="margin-top:150px">
                <img src="img/logo_standalone.png" width="35%">
                <h1 id="lang363" style="margin-top:0px">比特币波动</h1>
            </div>
        </div>
    </header>

    <div class="container" style="position: relative; margin-top:5px">
        <div class="col-md-60">

            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist" style="font-weight:bold">
                <li><a id="lang364" href="#2011" role="title" data-toggle="tab">平均每日波动(%)</a></li>
                <li><a id="tab1" href="#2011" role="tab" data-toggle="tab">FY2011</a></li>
                <li><a id="tab2" href="#2012" role="tab" data-toggle="tab">FY2012</a></li>
                <li><a id="tab3" href="#2013" role="tab" data-toggle="tab">FY2013</a></li>
                <li><a id="tab4" href="#2014" role="tab" data-toggle="tab">FY2014</a></li>
                <li class="active"><a id="tab5" href="#2015" role="tab" data-toggle="tab">FY2015</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content vol-data">

                <div class="tab-pane active" id="2011">
                    <div class="row">

                        <div class="col-md-6">
                            <div id="canvas-holder2">
                                <canvas id="chart1" width="600" height="400"></canvas>
                            </div>
                        </div>

                        <!--! table start -->
                        <div class="col-md-5" style="color:#fff">
                            <table class="table table-condense " style="position:relative; margin-left:78px;">
                                <thead>
                                    <br>
                                    <tr>
                                        <th id="lang365" style="width:50px; ">排名</th>
                                        <th id="lang366" style="width:75px; ">日期</th>
                                        <th id="lang367" style="width:50px; ">最大波动率</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>06/18/2011</td>
                                        <td>16.30% </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>06/13/2011</td>
                                        <td>16.27%</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>06/12/2011</td>
                                        <td>16.05%</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>06/16/2011</td>
                                        <td>15.93%</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>06/19/2011</td>
                                        <td>15.73%</td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>06/20/2011</td>
                                        <td>15.70%</td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>06/23/2011</td>
                                        <td>15.68%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="tab-pane" id="2012">
                    <div class="col-md-6">
                        <div id="canvas-holder2">
                            <canvas id="chart2" width="600" height="400"> </canvas>
                        </div>
                    </div>

                    <div class="col-md-5" style="color:#fff">
                        <table class="table table-condense " style="position:relative; margin-left:90px;">

                            <thead>
                                <br>
                                <tr>
                                    <th id="lang368" style="width:50px; ">排名</th>
                                    <th id="lang369" style="width:75px; ">日期</th>
                                    <th id="lang370" style="width:50px; ">最大波动率</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>08/26/2012</td>
                                    <td>9.341% </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>08/27/2012</td>
                                    <td>9.340%</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>08/25/2012</td>
                                    <td>9.338%</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>08/28/2012</td>
                                    <td>9.337%</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>08/29/2012</td>
                                    <td>9.306%</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>08/31/2012</td>
                                    <td>9.305%</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>08/30/2012</td>
                                    <td>9.298%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="tab-pane" id="2013">
                    <div class="col-md-6">
                        <div id="canvas-holder2">
                            <canvas id="chart3" width="600" height="400"> </canvas>
                        </div>
                    </div>

                    <div class="col-md-5" style="color:#fff">
                        <table class="table table-condense " style="position:relative; margin-left:90px;">

                            <thead>
                                <br>
                                <tr>
                                    <th id="lang371" style="width:50px; ">排名</th>
                                    <th id="lang372" style="width:75px; ">日期</th>
                                    <th id="lang373" style="width:50px; ">最大波动率</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>05/06/2013</td>
                                    <td>14.804%</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>05/05/2013</td>
                                    <td>14.791%</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>05/02/2013</td>
                                    <td>14.689%</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>05/04/2013</td>
                                    <td>14.604%</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>05/07/2013</td>
                                    <td>14.576%</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>04/30/2013</td>
                                    <td>14.549%</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>05/03/2013</td>
                                    <td>14.545%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="tab-pane" id="2014">
                    <div class="col-md-6">
                        <div id="canvas-holder2">
                            <canvas id="chart4" width="600" height="400"> </canvas>
                        </div>
                    </div>

                    <div class="col-md-5" style="color:#fff">
                        <table class="table table-condense " style="position:relative; margin-left:90px;">

                            <thead>
                                <br>
                                <tr>
                                    <th id="lang374" style="width:50px; ">排名</th>
                                    <th id="lang375" style="width:75px; ">日期</th>
                                    <th id="lang376" style="width:50px; ">最大波动率</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>01/01/2014</td>
                                    <td>11.819%</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>01/02/2014</td>
                                    <td>11.806%</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>01/03/2014</td>
                                    <td>11.756%</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>01/04/2014</td>
                                    <td>11.664%</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>01/05/2014</td>
                                    <td>10.926%</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>01/06/2014</td>
                                    <td>10.450%</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>01/07/2014</td>
                                    <td>10.169%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="tab-pane" id="2015">
                    <div class="col-md-6">
                        <div id="canvas-holder2">
                            <canvas id="chart5" width="600" height="400"> </canvas>
                        </div>
                    </div>

                    <div class="col-md-5" style="color:#fff">
                        <table class="table table-condense " style="position:relative; margin-left:90px;">

                            <thead>
                                <br>
                                <tr>
                                    <th id="lang377" style="width:50px; ">排名</th>
                                    <th id="lang378" style="width:75px; ">日期</th>
                                    <th id="lang379" style="width:50px; ">最大波动率</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>01/29/2015</td>
                                    <td>7.963%</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>02/01/2015</td>
                                    <td>7.946%</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>01/31/2015</td>
                                    <td>7.929%</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>01/30/2015</td>
                                    <td>7.925%</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>02/02/2015</td>
                                    <td>7.750%</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>02/04/2015</td>
                                    <td>7.749%</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>02/03/2015</td>
                                    <td>7.748%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>
    </div>

    <?php include( "footer.html") ?>

    <script type="text/javascript">
        $(function() {
            'use strict';

            var line_chart_options = {
                scaleGridLineColor: "rgba(0,0,0,.15)",
                responsive: false,
                showScale: true,
                pointDot: true,
            };

            var data2011 = {
                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: [{
                    label: "2011 Daily Average Vol(%)",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [6.08, 9.16, 5.76, 9.16, 11.30, 14.75, 7.41, 10.33, 8.63, 7.72, 8.63, 5.84]
                }, ]
            };

            var data2012 = {
                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: [{
                    label: "2012 Daily Average Vol(%)",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [6.90, 5.75, 4.24, 2.67, 1.70, 1.67, 2.91, 5.55, 6.46, 1.71, 6.46, 1.62]
                }, ]
            };

            var data2013 = {
                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: [{
                    label: "2013 Daily Average Vol(%)",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [1.31, 2.89, 4.27, 11.12, 9.59, 3.15, 5.76, 2.40, 2.41, 5.42, 2.41, 12.00]
                }, ]
            };

            var data2014 = {
                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: [{
                    label: "2014 Daily Average Vol(%)",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [7.87, 4.02, 5.2, 6.18, 4.14, 3.38, 2.26, 2.14, 2.85, 3.56, 2.85, 2.85]
                }, ]
            };

            var data2015 = {
                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: [{
                    label: "2015 Daily Average Vol(%)",
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: [5.79, 5.71, 3.40, 2.80, 2.50, 2.17, 2.01, 1.65, 3.95]
                }, ]
            };

            var ctx1 = $("#chart1").get(0).getContext("2d");
            var myLineChart1 = new Chart(ctx1).Line(data2011, line_chart_options);

            var ctx2 = $("#chart2").get(0).getContext("2d");
            var myLineChart2;

            var ctx3 = $("#chart3").get(0).getContext("2d");
            var myLineChart3;

            var ctx4 = $("#chart4").get(0).getContext("2d");
            var myLineChart4;

            var ctx5 = $("#chart5").get(0).getContext("2d");
            var myLineChart5;

            $('#tab1').on('shown.bs.tab', function(e) {
                myLineChart2.destroy();
                myLineChart1 = new Chart(ctx1).Line(data2011, line_chart_options);
            });

            $('#tab2').on('shown.bs.tab', function(e) {
                myLineChart2 = new Chart(ctx2).Line(data2012, line_chart_options);
                myLineChart1.destroy();
            });

            $('#tab3').on('shown.bs.tab', function(e) {
                myLineChart3 = new Chart(ctx3).Line(data2013, line_chart_options);
                myLineChart2.destroy();
                myLineChart1.destroy();
            });

            $('#tab4').on('shown.bs.tab', function(e) {
                myLineChart4 = new Chart(ctx4).Line(data2014, line_chart_options);
                myLineChart3.destroy();
            });

            $('#tab5').on('shown.bs.tab', function(e) {
                myLineChart5 = new Chart(ctx5).Line(data2015, line_chart_options);
                myLineChart4.destroy();
            });
        });
    </script>

    <!-- jQuery Version 1.11.0 -->
    <script src="js/jquery-1.11.0.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <!-- Plugin JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
    <script src="js/classie.js"></script>
    <script src="js/cbpAnimatedHeader.js"></script>

    <!-- Contact Form JavaScript -->
    <script src="js/jqBootstrapValidation.js"></script>
    <script src="js/contact_me.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="js/agency.js"></script>

    <script>
        var EN363 = "Bitcoin Volatility";
        var EN364 = "Average Daily Volatility(%)";
        var EN365 = "Rank";
        var EN366 = "Date";
        var EN367 = "Volatility";
        var EN368 = "Rank";
        var EN369 = "Date";
        var EN370 = "Volatility";
        var EN371 = "Rank";
        var EN372 = "Date";
        var EN373 = "Volatility";
        var EN374 = "Rank";
        var EN375 = "Date";
        var EN376 = "Volatility";
        var EN377 = "Rank";
        var EN378 = "Date";
        var EN379 = "Volatility";


        var CN363 = "比特币波动";
        var CN364 = "平均每日波动(%)";
        var CN365 = "排名";
        var CN366 = "日期";
        var CN367 = "最大波动率";
        var CN368 = "排名";
        var CN369 = "日期";
        var CN370 = "最大波动率";
        var CN371 = "排名";
        var CN372 = "日期";
        var CN373 = "最大波动率";
        var CN374 = "排名";
        var CN375 = "日期";
        var CN376 = "最大波动率";
        var CN377 = "排名";
        var CN378 = "日期";
        var CN379 = "最大波动率";

        var ENinput1 = "ENTER EMAIL FOR BETA INVITATION";
        var CNinput1 = "输入邮件开始测试体验";
        var ENinput2 = "INVITE ME";
        var CNinput2 = "开始测试体验";

        var EN181 = "About Us";
        var EN182 = "Blog";
        var EN183 = "Privacy Policy";
        var EN184 = "Legal";
        var EN185 = "Privacy Policy";
        var EN186 = "This Privacy Policy governs the manner in which Alt-Options LLC collects, uses, maintains and discloses information collected from users (each, a 'User') of the https://www.alt-options.com website ('Site'). This privacy policy applies to the Site and all products and services offered by Alt-Options LLC.";
        var EN187 = "Personal identification information";
        var EN188 = "We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, subscribe to the newsletter, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.";
        var EN189 = "Non-personal identification information";
        var EN190 = "We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.";
        var EN191 = "Web browser cookies";
        var EN192 = "Our Site may use 'cookies' to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. User may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.";
        var EN193 = "How we use collected information";
        var EN194 = "Alt-Options LLC may collect and use Users personal information for the following purposes:";
        var EN195 = "<span id='lang196' style='font-style:italic'>To improve customer service</span> <br> Information you provide helps us respond to your customer service requests and support needs more efficiently.";
        var EN196 = "To improve customer service";
        var EN197 = "<span id='lang198' style='font-style:italic'>To personalize user experience</span> <br> We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.";
        var EN198 = "To personalize user experience";
        var EN199 = "<span id='lang200' style='font-style:italic'>To improve our Site</span> <br> We may use feedback you provide to improve our products and services.";
        var EN200 = "To improve our Site";
        var EN201 = "<span id='lang202' style='font-style:italic'>To process payments </span> <br> We may use the information Users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide the service.";
        var EN202 = "To process payments ";
        var EN203 = "<span id='lang204' style='font-style:italic'>To send periodic emails </span> <br> We may use the email address to send User information and updates pertaining to their order. It may also be used to respond to their inquiries, questions, and/or other requests. If User decides to opt-in to our mailing list, they will receive emails that may include company news, updates, related product or service information, etc. If at any time the User would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email.";
        var EN204 = "To send periodic emails ";
        var EN205 = "How we protect your information";
        var EN206 = "We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.";
        var EN207 = "Sensitive and private data exchange between the Site and its Users happens over a SSL secured communication channel and is encrypted and protected with digital signatures.";
        var EN208 = "Sharing your personal information";
        var EN209 = "We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.We may use third party service providers to help us operate our business and the Site or administer activities on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes provided that you have given us your permission.";
        var EN210 = "Changes to this privacy policy";
        var EN211 = "Alt-Options LLC has the discretion to update this privacy policy at any time. When we do, we will post a notification on the main page of our Site, revise the updated date at the bottom of this page and send you an email. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.";
        var EN212 = "Your acceptance of these terms";
        var EN213 = "By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.";
        var EN214 = "Contacting us";
        var EN215 = "If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:";
        var EN216 = "This document was last updated on June 02, 2014";

        var CN181 = "关于我们";
        var CN182 = "博客";
        var CN183 = "隐私权和条款";
        var CN184 = "法定权利";
        var CN185 = "Privacy Policy";
        var CN186 = "This Privacy Policy governs the manner in which Alt-Options LLC collects, uses, maintains and discloses information collected from users (each, a 'User') of the https://www.alt-options.com website ('Site'). This privacy policy applies to the Site and all products and services offered by Alt-Options LLC.";
        var CN187 = "Personal identification information";
        var CN188 = "We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, subscribe to the newsletter, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.";
        var CN189 = "Non-personal identification information";
        var CN190 = "We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.";
        var CN191 = "Web browser cookies";
        var CN192 = "Our Site may use 'cookies' to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. User may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.";
        var CN193 = "How we use collected information";
        var CN194 = "Alt-Options LLC may collect and use Users personal information for the following purposes:";
        var CN195 = "<span id='lang196' style='font-style:italic'>To improve customer service</span> <br> Information you provide helps us respond to your customer service requests and support needs more efficiently.";
        var CN196 = "To improve customer service";
        var CN197 = "<span id='lang198' style='font-style:italic'>To personalize user experience</span> <br> We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.";
        var CN198 = "To personalize user experience";
        var CN199 = "<span id='lang200' style='font-style:italic'>To improve our Site</span> <br> We may use feedback you provide to improve our products and services.";
        var CN200 = "To improve our Site";
        var CN201 = "<span id='lang202' style='font-style:italic'>To process payments </span> <br> We may use the information Users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide the service.";
        var CN202 = "To process payments ";
        var CN203 = "<span id='lang204' style='font-style:italic'>To send periodic emails </span> <br> We may use the email address to send User information and updates pertaining to their order. It may also be used to respond to their inquiries, questions, and/or other requests. If User decides to opt-in to our mailing list, they will receive emails that may include company news, updates, related product or service information, etc. If at any time the User would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email.";
        var CN204 = "To send periodic emails ";
        var CN205 = "How we protect your information";
        var CN206 = "We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.";
        var CN207 = "Sensitive and private data exchange between the Site and its Users happens over a SSL secured communication channel and is encrypted and protected with digital signatures.";
        var CN208 = "Sharing your personal information";
        var CN209 = "We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.We may use third party service providers to help us operate our business and the Site or administer activities on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes provided that you have given us your permission.";
        var CN210 = "Changes to this privacy policy";
        var CN211 = "Alt-Options LLC has the discretion to update this privacy policy at any time. When we do, we will post a notification on the main page of our Site, revise the updated date at the bottom of this page and send you an email. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.";
        var CN212 = "Your acceptance of these terms";
        var CN213 = "By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.";
        var CN214 = "Contacting us";
        var CN215 = "If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:";
        var CN216 = "This document was last updated on June 02, 2014";


        var vol = <? php $btcVol = fopen("btcVol.txt", "r") or die("Unable to open file!"); echo fgets($btcVol); fclose($btcVol); ?>;
        vol = vol.toFixed(2);


        var EN217 = "Toggle navigation";
        var EN218 = "Volatility Index: " + vol + "%";
        var EN219 = "Services";
        var EN220 = "Platform";
        var EN221 = "RESOURCES<span class='caret'></span>";
        var EN222 = "Institutions";
        var EN223 = "What is Bitcoin?";
        var EN224 = "What is Option?";
        var EN225 = "Competition";
        var EN226 = "Product & Margins";
        var EN227 = "Blog";
        var EN228 = "FAQ";
        var EN229 = "About AOEX";
        var EN230 = "English";
        var EN231 = "Chinese";

        var CN217 = "Toggle navigation";
        var CN218 = "波动率指数:" + vol + "%";
        var CN219 = "服务";
        var CN220 = "平台";
        var CN221 = "资源<span class='caret'></span>";
        var CN222 = "机构";
        var CN223 = "什么是比特币?";
        var CN224 = "什么是期权？";
        var CN225 = "交易竞赛";
        var CN226 = "产品和保证金";
        var CN227 = "博客";
        var CN228 = "常见问题";
        var CN229 = "关于我们";
        var CN230 = "英语";
        var CN231 = "中文";

        var EN232 = "THE BITCOIN OPTIONS MARKET";
        var EN233 = "Alt-Options solves the liquidity problem related to the developing virtual currency market by providing a trading platform and derivative pricing algorithm.";
        var EN234 = "SERVICES";
        var EN235 = "Generate value with alternative derivative opportunities";
        var EN236 = "Platform";
        var EN237 = "Gain instant insight into the cryptocurrency market and dive deeper with cryptocurrency dedicated trading tools.";
        var EN238 = "Leverage";
        var EN239 = "Engage in new hedging opportunities with the Alt-Options alternative cryptocurrency products.";
        var EN240 = "Security";
        var EN241 = "Trade with confidence, knowing that your virtual wallet is protected with industry standard security layers.";
        var EN242 = "What is an option?";
        var EN243 = "A contract with the right to buy or sell bitcoins with leverage";
        var EN244 = "Institutional Platform";
        var EN245 = "Trade with institutional level derivative platform and technology.";
        var EN246 = "Deep Liquidity";
        var EN247 = "Multiple liquidity providers connect you with miners, buy-side firms and payment processors.";
        var EN248 = "Unique Pricing Model";
        var EN249 = "Trade with confidence and analyze your trading strategy.";

        var CN232 = "比特币期权市场";
        var CN233 = "Alt Options 是一家美国波士顿的金融服务公司。它的平台和算法有效地解决了虚拟货币市场流动性的问题。Alt－Options平台提供现款现货交易，标准化的期权合约(比特币/美金货币期权）。我们的交易平台即将会改变全球金融市场局面。";
        var CN234 = "服务";
        var CN235 = "利用另类/别致衍生品创造市场价值";
        var CN236 = "交易平台";
        var CN237 = "实时跟踪虚拟货币市场行情。深部掌握虚拟货币专用交易工具";
        var CN238 = "杠杆";
        var CN239 = "利用Alt-Options崭新的虚拟货币产品进行有效的对冲买卖";
        var CN240 = "防护";
        var CN241 = "用户可放心地交易比特币,我们​产业标准的安全系统已保护好您的​虚拟钱包";
        var CN242 = "什么是期权?";
        var CN243 = "期权(option),是指某一标的物的买卖权或选择权,具有在某一限定时间内按某一指定的价格买进或卖出某一特定商品或合约的权利。和期货不同,期权的买方只有权利而没有义务。";
        var CN244 = "机构交易平台";
        var CN245 = "使用机构等级的衍生品交易平台和技术.";
        var CN246 = "浩大的流动性";
        var CN247 = "通过各个流动性提供者把用户者和各矿工,投资机构,支付处理商连接起来。";
        var CN248 = "独特的定价模式";
        var CN249 = "自信地交易和分析您的交易策略";

        $(document).ready(function() {

            $("#lang230").click(function() {
                //console.log("you have clicked #lang230")
                window.localStorage.removeItem("lang");
                window.localStorage.setItem("lang", "EN");
                CNtoENheader();
            })
            $("#lang231").click(function() {
                //console.log("you have clicked #lang231")
                window.localStorage.removeItem("lang");
                window.localStorage.setItem("lang", "CN");
                ENtoCNheader();
            })

            if (window.localStorage.getItem("lang") == "EN" || window.localStorage.getItem("lang") == null) {
                CNtoENheader();
                //console.log($("a#lang218").attr("data-original-title"));
                $("a#lang218").attr("data-original-title", "AOEX Volatility Index measures of how much the price of Bitcoin varies over time. Higher volatility means that an asset is riskier to hold.");
            } else if (window.localStorage.getItem("lang") == "CN") {
                ENtoCNheader();
                $("a#lang218").attr("data-original-title", "AOEX波动率检测的是比特币的随着的价格变化。高波动率意味着资产风险更大");
            } else {
                alert("You may have selected a language that is not supported!")
            }

            function CNtoENheader() {
                //console.log($("html").attr("lang"))
                $("html").attr("lang", "en");
                //console.log($("html").attr("lang"))

                $("#lang363").html(EN363);
                $("#lang364").html(EN364);
                $("#lang365").html(EN365);
                $("#lang366").html(EN366);
                $("#lang367").html(EN367);
                $("#lang368").html(EN368);
                $("#lang369").html(EN369);
                $("#lang370").html(EN370);
                $("#lang371").html(EN371);
                $("#lang372").html(EN372);
                $("#lang373").html(EN373);
                $("#lang374").html(EN374);
                $("#lang375").html(EN375);
                $("#lang376").html(EN376);
                $("#lang377").html(EN377);
                $("#lang378").html(EN378);
                $("#lang379").html(EN379);

                $("a#lang218").attr("data-original-title", "AOEX Volatility Index measures of how much the price of Bitcoin varies over time. Higher volatility means that an asset is riskier to hold.");
                //console.log("translating CN to EN...")
                for (var num = 181; num <= 249; ++num) {
                    //clearing all texts first
                    $("#lang" + num).text("");
                    //$("#lang" + num).text("EN"+num);
                    //console.log("i am looping..." + num)
                    //$("#lang" + num).html("EN"+num);
                    //console.log($("#CN249").text())
                }
				
                $("#input1").attr("placeholder", ENinput1);
                $("#input2").attr("value", ENinput2);

                $("#lang181").text(EN181);
                $("#lang182").text(EN182);
                $("#lang183").text(EN183);
                $("#lang184").text(EN184);
                $("#lang185").text(EN185);
                $("#lang186").text(EN186);
                $("#lang187").text(EN187);
                $("#lang188").text(EN188);
                $("#lang189").text(EN189);
                $("#lang190").text(EN190);
                $("#lang191").text(EN191);
                $("#lang192").text(EN192);
                $("#lang193").html(EN193);
                $("#lang194").html(EN194);
                $("#lang195").html(EN195);
                $("#lang196").html(EN196);
                $("#lang197").html(EN197);
                $("#lang198").html(EN198);
                $("#lang199").html(EN199);
                $("#lang200").html(EN200);
                $("#lang201").html(EN201);
                $("#lang202").html(EN202);
                $("#lang203").html(EN203);
                $("#lang204").html(EN204);
                $("#lang205").text(EN205);
                $("#lang206").text(EN206);
                $("#lang207").text(EN207);
                $("#lang208").text(EN208);
                $("#lang209").text(EN209);
                $("#lang210").text(EN210);
                $("#lang211").text(EN211);
                $("#lang212").text(EN212);
                $("#lang213").text(EN213);
                $("#lang214").text(EN214);
                $("#lang215").text(EN215);
                $("#lang216").text(EN216);


                $("#lang217").text(EN217);
                $("#lang218").text(EN218);
                $("#lang219").text(EN219);
                $("#lang220").text(EN220);
                $("#lang221").html(EN221);
                $("#lang222").text(EN222);
                $("#lang223").text(EN223);
                $("#lang224").text(EN224);
                $("#lang225").text(EN225);
                $("#lang226").text(EN226);
                $("#lang227").text(EN227);
                $("#lang228").text(EN228);
                $("#lang229").text(EN229);
                $("#lang230").text(EN230);
                $("#lang231").text(EN231);
            }

            function ENtoCNheader() {
                //console.log($("html").attr("lang"))
                $("html").attr("lang", "zh-Hans");
                //console.log($("html").attr("lang"))

                $("#lang363").html(CN363);
                $("#lang364").html(CN364);
                $("#lang365").html(CN365);
                $("#lang366").html(CN366);
                $("#lang367").html(CN367);
                $("#lang368").html(CN368);
                $("#lang369").html(CN369);
                $("#lang370").html(CN370);
                $("#lang371").html(CN371);
                $("#lang372").html(CN372);
                $("#lang373").html(CN373);
                $("#lang374").html(CN374);
                $("#lang375").html(CN375);
                $("#lang376").html(CN376);
                $("#lang377").html(CN377);
                $("#lang378").html(CN378);
                $("#lang379").html(CN379);

                $("a#lang218").attr("data-original-title", "AOEX波动率检测的是比特币的随着的价格变化。高波动率意味着资产风险更大");
                //console.log("translating EN to CN...")

                //232-249 not included, but loop doesn't actually include those anyway
                for (var num = 181; num <= 249; ++num) {
                    //clearing all texts first
                    $("#lang" + num).text("");
                    //$("#lang" + num).text("EN"+num);
                    //console.log("i am looping..." + num)
                    //$("#lang" + num).html("EN"+num);
                    //console.log($("#CN249").text())
                }
                $("#input1").attr("placeholder", CNinput1);
                $("#input2").attr("value", CNinput2);

                $("#lang181").text(CN181);
                $("#lang182").text(CN182);
                $("#lang183").text(CN183);
                $("#lang184").text(CN184);
                $("#lang185").text(CN185);
                $("#lang186").text(CN186);
                $("#lang187").text(CN187);
                $("#lang188").text(CN188);
                $("#lang189").text(CN189);
                $("#lang190").text(CN190);
                $("#lang191").text(CN191);
                $("#lang192").text(CN192);
                $("#lang193").html(CN193);
                $("#lang194").html(CN194);
                $("#lang195").html(CN195);
                $("#lang196").html(CN196);
                $("#lang197").html(CN197);
                $("#lang198").html(CN198);
                $("#lang199").html(CN199);
                $("#lang200").html(CN200);
                $("#lang201").html(CN201);
                $("#lang202").html(CN202);
                $("#lang203").html(CN203);
                $("#lang204").html(CN204);
                $("#lang205").text(CN205);
                $("#lang206").text(CN206);
                $("#lang207").text(CN207);
                $("#lang208").text(CN208);
                $("#lang209").text(CN209);
                $("#lang210").text(CN210);
                $("#lang211").text(CN211);
                $("#lang212").text(CN212);
                $("#lang213").text(CN213);
                $("#lang214").text(CN214);
                $("#lang215").text(CN215);
                $("#lang216").text(CN216);


                $("#lang217").text(CN217);
                $("#lang218").text(CN218);
                $("#lang219").text(CN219);
                $("#lang220").text(CN220);
                $("#lang221").html(CN221);
                $("#lang222").text(CN222);
                $("#lang223").text(CN223);
                $("#lang224").text(CN224);
                $("#lang225").text(CN225);
                $("#lang226").text(CN226);
                $("#lang227").text(CN227);
                $("#lang228").text(CN228);
                $("#lang229").text(CN229);
                $("#lang230").text(CN230);
                $("#lang231").text(CN231);

            }


        });
    </script>
</body>

</html>