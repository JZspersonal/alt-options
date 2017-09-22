
function Notification(update, type) {

	$(function () {
		new PNotify({
			title: 'Notification',
			text: update,
			type: type,
			animate_speed: "fast",
			styling: "fontawesome",
		});
	});
};

function Tutourial() {
	$(document).ready(function() {
							// added tour functionality
							// Instance the tour
							var tour = new Tour({
								backdrop: true,
								steps: [
								{
									element: "#tour1",
									title: "Your Alt-Options Balance",
									content: "You can view your account balances from this area. &#10;Typically your account will have two type of balances: 1. Cryptocurrency 2. Fiat Currency. &#10; You current exposure is calculated with mark-to-market method."
								},
								{
									element: "#tour2",
									title: "Market Depth View",
									content: "Market Depth is an aggregated orderbook that allows user to tell the current liquidity in the market from both buy side and sell side."
								},
								{
									element: "#tour3",
									title: "Advanced Charting Analyzer",
									content: "AOEX's robust charting tool allows you to simulate a strategy prior to placing it. The analyzer is able to tell you what your expected PnL is at current date v.s. at expiration."
								},
								{
									element: "#tour4",
									title: "Option Chain View",
									content: "Option Chain gives you an overview of all available option products on the market across a wide range of strike prices."
								},
								{
									element: "#tour5",
									title: "Postion Risk Profile",
									content: "Risk Profile uses mathematical model to help you understand the risks associated with your current positions. Portfolio greeks helps you navigate your portfolio value dynamically.",
									placement: "left"
								},
								{
									element: "#tour6",
									title: "Trading Bar",
									content: "Trading bar is where you want to place a trade at.",
									placement:"top"
								},
								{
									element: "#tour7",
									title: "Option Chain",
									content: "A snapshot of the current option chain.",
									placement: "top",
								},
								{
									element: "#tour8",
									title: "Price",
									content: "Enter your trade price here.",
									placement: "top"
								},
								{
									element: "#tour9",
									title: "Amount",
									content: "Enter your trade size here.",
									placement: "top"
								},
								{
									element: "#tour10",
									title: "Sell",
									content: "Sell the product you've selected.",
									placement: "top"
								},
								{
									element: "#tour11",
									title: "Buy",
									content: "Buy the product you've selected.",
									placement: "top"
								},
								{
									element: "#tour12",
									title: "Current Orders/Positions",
									content: "Here you will be able to check your current positions!",
									placement:"left"
								},
								{
									element: "#tour13",
									title: "Skype!",
									content: "Drop us a message anytime if you have any questions!",
									placement:"left"
								}
							],
							storage: false,
						});



							// Initialize the tour
							tour.init();

							console.log("tour1 is running...")
							//console.log(tour)

							// Start the tour
							tour.start();

					});
}


function createRiskChart(){
		$(document).ready(function() {

			new Dygraph(document.getElementById('graph'), graphArray, {
				interactionModel: {},
				// showRangeSelector: true,
				// rangeSelectorHeight: 5,
				panEdgeFraction: 0,
				xLabelHeight: '10',
				yAxisLabelWidth: 50,
				axisLineWidth: 1,
				axisLabelFontSize: 12,
				axisLineColor: '#15232C',
				gridLineColor: '#15232C',
				gridLineWidth: 1,
				strokeWidth: 0.5,
				drawAxesAtZero: true,
				includeZero: true,
				labelsSeparateLines: true,
				legend: 'always',
				//labelsDivWidth: 200,
				axes: {
					y: {
						valueFormatter: function(v) {
							return v.toFixed(2).replace(/^(-)?(\d+\.\d+)/, '$1$$$2');
						},
						axisLabelFormatter: function(v) {
							return v.toFixed(0).replace(/^(-)?(\d+\.*\d+)/, '$1$$$2');
						}
					},
					x: {
						valueFormatter: function(v) {
							return v.toFixed(2);
						}
					}
				},
				colors: ['#38B944', 'white'],
				series: {
					'P/L Current': {
						strokePattern: Dygraph.DASHED_LINE,
						strokeWidth: 1,
						drawPoints: false,
						fillGraph: true,
						pointSize: 1.5,
					},
					'P/L Expiration': {
						strokeWidth: 1,
						drawPoints: false,
						fillGraph: true,
						fillAlpha: 1,
						pointSize: 1.5
					},
				},
				labels: ["Underlying Price", "P/L Current", "P/L Expiration"]
			});
		});
}
/***********************************************/
