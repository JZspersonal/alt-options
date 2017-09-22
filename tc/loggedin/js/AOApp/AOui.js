var AOui = AOui || {};
var lastCallArr = [];
var testPortArr = [];
var testPortArr2 = [];
var scenariosArr = [];
var objectArr = [];
var expGraphArr = [];
var expGraphArr2 = [];
var graphArray = [];
var strGraphArr = [];
var spot, portDelta, portGamma, portVega, portTheta, portRho, term, price;


//testPortArr[testPortArr.map(function(x) {return x.strike; }).indexOf("270")].bid_price

//Account implementation

AOui.Settings = {

	updateMargin: function (data) {
		var MarginUsage = parseFloat( 100 - Number(data.usage_fraction) * 100).toFixed(2);
		var MarginUsed = parseFloat(Number(data.usage_fraction) * 100).toFixed(2);
		if (data.usage_fraction !== undefined){
			$('#Usage').html(MarginUsage);
			$('#MarginUsage').css('width', MarginUsage+'%').attr('aria-valuenow', MarginUsage);
			$('#MarginUsed').css('width', MarginUsed+'%').attr('aria-valuenow', MarginUsed);
		}
		else {
			$('#Usage').html('0.00');
		};

		if (data.avail_usd_val !== undefined){
			$('.USDBalance').html(parseFloat(data.avail_usd_val).toFixed(2));
		}
		else {
			$('.USDBalance').html('0.00');
		};
		// if (data.total_fees !== undefined)
		// 	$('#Available_USD').html(data.avail_usd_val);
		// else
		// 	$('#Available_USD').html('0.00');
	},

	update2FAstatus: function (data) {
		if (data.enabled == true)
			$('#2FA_Status').html('Enabled');
		else
			$('#2FA_Status').html('Disabled');

	},

	updateFees: function (data) {
		if (data.total_fees !== undefined)
			$('.USDFees').html(data.total_fees);
		else
			$('.USDFees').html('0.0000');
	},

	updateUserPram: function (data) {
		/*'first_name', 'last_name', 'dob', 'cell', 'addr_street', 'addr_city', 'addr_state', 'addr_zip'*/

		if (data.first_name !== undefined) {
			$('#first_name').val(data.first_name);
		} else
			$('#first_name').val('N/A');

		if (data.last_name !== undefined) {
			$('#last_name').val(data.last_name);
		} else
			$('#last_name').val('N/A');

		if (data.dob !== undefined) {
			$('#dob').val(data.dob);
		} else
			$('#dob').val('N/A');

		if (data.cell !== undefined) {
			$('#cell').val(data.cell);
		} else
			$('#cell').val('N/A');

		if (data.addr_street !== undefined) {
			$('#addr_street').val(data.addr_street);
		} else
			$('#addr_street').val('N/A');

		if (data.addr_city !== undefined) {
			$('#addr_city').val(data.addr_city);
		} else
			$('#addr_city').val('N/A');

		if (data.addr_state !== undefined) {
			$('#addr_state').val(data.addr_state);
		} else
			$('#addr_state').val('N/A');

		if (data.addr_zip !== undefined) {
			$('#addr_zip').val(data.addr_zip);
		} else
			$('#addr_zip').val('N/A');
	},


}

AOui.Account = {

	updateMargin: function (data) {

		if (data.avail_usd_val !== undefined)
			$('.USDBalance').html(parseFloat(data.avail_usd_val).toFixed(2));
		else
			$('.USDBalance').html('0.00');

	},


	updateBalances: function (data) {
		if (data.result == "SessionNotActive" || data.result == "AuthTokenRequiresRenewal" || data.result == "InvalidAuthToken") {
			localStorage.clear();
			Notification("Your session has expired, please login again!", "warning");
			document.location.href = "../login.html";
		}

		if (data.balances.XBT !== undefined) {
			$('.XBTBalance').html(parseFloat(data.balances.XBT).toFixed(4));
		}
		else {
			$('.XBTBalance').html('0.0000');
		}

		// if (data.balances.USD !== undefined){
		// 	$('.USDBalance').html(data.balances.USD);
		// }
		// else{
		// 	$('.USDBalance').html('0.00');
		// }
	},

	updateOrderStatus: function (data) {
		if (data.notifications[0].event == "OrderCompleted") {
			var execution = "Order: [" + data.notifications[0].params.order_id + "] has been executed at</br>" + data.notifications[0].time
			Notification(execution, "success")
		}
	},

	updatePositions: function (data) {
		$('#CPtable').html("");
		var total_exposure = 0;
		var total_pnl = 0;
		var exposure = 0;
		for (var i = 0; i < data.positions.length; i++) {
			var tr = $("<tr onclick=\"updOptChain('" + data.positions[i].symbol + "') + updOptPrice('" + data.positions[i].last_price + "')\"/>");
			if (data.positions[i] !== undefined && data.positions[i].amount != 0  ) {
				tr.append("<td>" + data.positions[i].symbol + "</td>");
				tr.append("<td>" + parseFloat(data.positions[i].amount).toFixed(2) + "</td>");
				tr.append("<td>" + data.positions[i].last_price + "</td>");
				tr.append("<td>" + data.positions[i].avg_cost + "</td>");
				exposure = (Number(data.positions[i].bid_price) + Number(data.positions[i].ask_price))/2 * data.positions[i].amount;
				total_exposure += exposure;
				var pnl = ((Number(data.positions[i].bid_price) + Number(data.positions[i].ask_price))/2 - data.positions[i].avg_cost)* data.positions[i].amount; //pnl calulation
				total_pnl += pnl;
				if (pnl >= 0) {
					tr.append("<td style='color:#50b949; '>" + parseFloat(pnl).toFixed(2) + "</style></td>"); //green if profit
				} else {
					tr.append("<td style='color:#FF6939; '>" + parseFloat(pnl).toFixed(2) + "</style></td>"); //red if loss
				}
			}
			$('#CPtable').append(tr);

			if (total_exposure !== 0) {
				document.getElementById('exposure').innerHTML = parseFloat(total_exposure).toFixed(2);
			} else {
				document.getElementById('exposure').innerHTML = "0.0000";
			}

			if (total_pnl !== 0) {
				if (total_pnl >= 0) {
					document.getElementById('total_pnl').innerHTML = parseFloat(total_pnl).toFixed(2) + '&#32;<i class="fa fa-caret-up" style="color:green"></i>';
				} else {
					document.getElementById('total_pnl').innerHTML = parseFloat(total_pnl).toFixed(2) + '&#32;<i class="fa fa-caret-down" style="color:red"></i>';
				}
			} else {
				document.getElementById('total_pnl').innerHTML = "0.00";
			}
			check = {
				amount: data.positions[i].amount,
				ask_price: data.positions[i].last_price,
				bid_price: data.positions[i].last_price,
				name: data.positions[i].symbol,
				strike: data.positions[i].symbol.slice(0, 3)
			}
			if (data.positions[i].symbol !== "XBT" && indexOf(testPortArr2, check) == -1) {
				testPortArr2.push(
					check
				);
			}
		}
		portAnalyzer();
		portAnalyzer();
		createRiskChart();
		createSensitivity();

	},


	updateOpenOrders: function (data) {
		$('#POtable').html("");
		for (var i = 0; i < data.orders.length; i++) {
			var tr = $('<tr/>');
			if (data.orders[i] !== undefined) {
				tr.append("<td>" + data.orders[i].product + "</td>");
				tr.append("<td>" + data.orders[i].order_type + "</td>");
				tr.append("<td>" + data.orders[i].price + "</td>");
				tr.append("<td>" + data.orders[i].amount + "</td>");
				tr.append("<td ><button type=\"reset\" onClick=\"cancelOrd(" + data.orders[i].id + ")\" class=\"btn btn-danger cancelBtn\">cancel</button></td>");
			}
			$('#POtable').append(tr);
		}

	},

	updateClosedOrders: function (data) {
		var date = new Date(); //create a new date object
		$('#POtable2').html("");
		for (var i = 0; i < data.orders.length; i++) {
			var tr = $('<tr/>');
			var time_delta = Math.abs(Date.parse(data.orders[i].create_time) - Date.parse(date));
			if (data.orders[i] !== undefined && time_delta < 68083200) {
				tr.append("<td>" + data.orders[i].product + "</td>");
				tr.append("<td>" + data.orders[i].order_type + "</td>");
				tr.append("<td>" + data.orders[i].price + "</td>");
				tr.append("<td>" + data.orders[i].original_amount + "</td>");
				var time = data.orders[i].create_time;
				var ntime = time.slice(11, 19);
				tr.append("<td>" + ntime + "</td>");
			}

			$('#POtable2').append(tr);
		}

	},


	updateRejectedOrders: function (data) {
		$('#POtable3').html("");
		for (var i = 0; i < data.orders.length; i++) {
			var tr = $('<tr/>');
			if (data.orders[i] !== undefined) {
				tr.append("<td>" + data.orders[i].product + "</td>");
				tr.append("<td>" + data.orders[i].order_type + "</td>");
				tr.append("<td>" + data.orders[i].price + "</td>");
				tr.append("<td>" + data.orders[i].original_amount + "</td>");
				var time = data.orders[i].create_time
				var ntime = time.slice(0, 16)
				tr.append("<td>" + ntime + "</td>");
			}
			$('#POtable3').append(tr);
		}

	},

	updateTotalRecords: function (data) {
		$('#POtable4').html("");
		for (var i = 0; i < data.orders.length; i++) {
			var tr = $('<tr/>');
			if (data.orders[i] !== undefined) {
				tr.append("<td>" + data.orders[i].id + "</td>");
				tr.append("<td>" + data.orders[i].product + "</td>");
				tr.append("<td>" + data.orders[i].order_type + "</td>");
				tr.append("<td>$" + data.orders[i].price + "</td>");
				tr.append("<td>" + data.orders[i].original_amount + "</td>");
				var total = data.orders[i].original_amount * data.orders[i].price;
				tr.append("<td>$" + total.toFixed(4) + "</td>");
				tr.append("<td>" + data.orders[i].status + "</td>");
				var time = data.orders[i].create_time;
				var ntime = time.slice(0, 16);
				tr.append("<td>" + ntime + "</td>");
				tr.append("<td><button type=\"reset\" onClick=\"showExecutions(" + data.orders[i].id + ")\" class=\"btn btn-success cancelBtn\">(+)Execution Details</button></td>");
			}
			$('#POtable4').append(tr);
		}
	},


	updateTradeDetails: function (data) {
		$('#excution_report').html("");
		for (var i = 0; i < data.order_executions.length; i++) {
			var tr = $('<tr/>');
			if (data.order_executions[i] !== undefined) {
				tr.append("<td>" + data.order_executions[i].id + "</td>");
				tr.append("<td>$" + data.order_executions[i].price + "</td>");
				tr.append("<td>" + data.order_executions[i].amount + "</td>");
				tr.append("<td>$" + data.order_executions[i].fee + "</td>");
				tr.append("<td>" + data.order_executions[i].time.slice(0, 16) + "</td>");
			}
			$('#excution_report').append(tr);

		}
	},


}

AOui.Product = {

	updateLastTrades: function (data) {
		$('#LTtable').html("");
		for (var i = 0; i < 35; i++) {
			var tr = $('<tr/>');
			if (data.order_executions[i] !== undefined && data.order_executions[i].product == "XBT") {
				tr.append("<td>" + parseFloat(data.order_executions[i].amount).toFixed(8) + "</td>");
				if (data.order_executions[i + 1].price > data.order_executions[i].price) {
					tr.append("<td style=\"color:#FF6939\">$" + data.order_executions[i].price + "<i class=\"fa fa-caret-down\" style=\"color:#FF6939\"></i></td>");
				} else {
					tr.append("<td style=\"color:#50b949\">$" + data.order_executions[i].price + "<i class=\"fa fa-caret-up\" style=\"color:#50B949\"></i></td>");
				}
				tr.append("<td>" + data.order_executions[i].time.slice(11, 19) + "</td>");
			}
			$('#LTtable').append(tr);
		}
	},

	updateSpot: function (data) {
		spot = data.asks[0].price;
		localStorage.setItem('BTCUSD', spot);
		// $('#current_spot').html(parseFloat(spot).toFixed(2));
	},

	updateDepth: function (data) {
		$('#MDtable').html("");
		document.getElementById('mktDptProd').innerHTML = document.getElementById('ordProd').innerHTML;

		for (var i = 14; i >= 0; i--) {
			tr = $("<tr/>");
			if (data.asks[i] !== undefined) {
				tmpPrice = data.asks[i].price;
				tr.append("<td onclick=\"priceRefresh('" + tmpPrice + "')\">" + data.asks[i].amount + "</td>");
				tr.append("<td onclick=\"priceRefresh('" + tmpPrice + "')\" style='color:#FF6939; '>" + parseFloat(data.asks[i].price).toFixed(2) + "</td>");
			} else {
				tr.append("<td> - </td>");
				tr.append("<td> - </td>");
			}

			$('#MDtable').append(tr);
		}

		$('#MDtable2').html("");

		document.getElementById('mktDptProd').innerHTML = document.getElementById('ordProd').innerHTML;


		for (var i = 0; i < 15; i++) {
			tr = $("<tr/>");
			if (data.bids[i] !== undefined) {
				tmpPrice = data.bids[i].price;
				tr.append("<td onclick=\"priceRefresh('" + tmpPrice + "')\">" + data.bids[i].amount + "</td>");
				tr.append("<td onclick=\"priceRefresh('" + tmpPrice + "')\" style='color:#50b949; '>" + parseFloat(data.bids[i].price).toFixed(2) + "</td>");
			} else {
				tr.append("<td> - </td>");
				tr.append("<td> - </td>");
			}
			$('#MDtable2').append(tr);
		}

	},

	updateOptions: function (data) {
		$('#EMtableC').html("");
		$('#EMtableP').html("");
		testPortArr = [];
		for (var i = 0; i < data.calls.length; i++) {
			//var tr = $('<tr/>');
			if (data !== undefined) {

				tmpName = data.calls[i].name;
				tmpPrice = data.calls[i].ask_price;
				var tr = $("<tr onclick=\"updOptChain('" + tmpName + "') + updOptPrice('" + tmpPrice + "')\"/>");
				tr.append("<td>" + data.calls[i].ask_depth + "</td>");
				tr.append("<td>" + data.calls[i].volume + "</td>");
				tr.append("<td id=\"lpc" + i + "\">" + data.calls[i].last_price + "</td>");
				tr.append("<td>" + data.calls[i].bid_price + "</td>");
				tr.append("<td>" + data.calls[i].ask_price + "</td>");
				tr.append("<td>" + data.calls[i].strike + "</td>");

				for (var x = 0; x < data.puts.length; x++) {
					if (data.puts[x].strike == data.calls[i].strike) {
						tmpName = data.puts[x].name;
						tmpPrice = data.puts[x].ask_price;
						var tr2 = $("<tr onclick=\"updOptChain('" + tmpName + "') + updOptPrice('" + tmpPrice + "')\"/>");
						tr2.append("<td>" + data.puts[x].bid_price + "</td>");
						tr2.append("<td>" + data.puts[x].ask_price + "</td>");
						tr2.append("<td>" + data.puts[x].last_price + "</td>");
						tr2.append("<td>" + data.puts[x].volume + "</td>");
						tr2.append("<td>" + data.puts[x].ask_depth + "</td>");
					}
				}
			}

			$('#EMtableC').append(tr);
			checkChange(data.calls[i].last_price, i);
			lastCallArr[i] = data.calls[i].last_price;

			$('#EMtableP').append(tr2);
		}
	},

	updateOptions2: function (data) {
		$('#EMtable2C').html("");
		$('#EMtable2P').html("");
		for (var i = 0; i < data.calls.length; i++) {
			var tr = $('<tr/>');
			if (data !== undefined) {

				tmpName = data.calls[i].name;
				tmpPrice = data.calls[i].ask_price;
				var tr = $("<tr onclick=\"updOptChain('" + tmpName + "') + updOptPrice('" + tmpPrice + "')\"/>");
				tr.append("<td>" + data.calls[i].ask_depth + "</td>");
				tr.append("<td>" + data.calls[i].volume + "</td>");
				tr.append("<td>" + data.calls[i].last_price + "</td>");
				tr.append("<td>" + data.calls[i].bid_price + "</td>");
				tr.append("<td>" + data.calls[i].ask_price + "</td>");
				tr.append("<td>" + data.calls[i].strike + "</td>");

				for (var x = 0; x < data.puts.length; x++) {
					if (data.puts[x].strike == data.calls[i].strike) {
						tmpName = data.puts[x].name;
						tmpPrice = data.puts[x].ask_price;
						var tr2 = $("<tr onclick=\"updOptChain('" + tmpName + "') + updOptPrice('" + tmpPrice + "')\"/>");
						tr2.append("<td>" + data.puts[x].bid_price + "</td>");
						tr2.append("<td>" + data.puts[x].ask_price + "</td>");
						tr2.append("<td>" + data.puts[x].last_price + "</td>");
						tr2.append("<td>" + data.puts[x].volume + "</td>");
						tr2.append("<td>" + data.puts[x].ask_depth + "</td>");

					}
				}
			}
			$('#EMtable2C').append(tr);
			$('#EMtable2P').append(tr2);
		}
	},

	updateOptions3: function (data) {
		$('#EMtableCA').html("");
		$('#EMtablePA').html("");
		testPortArr = [];
		for (var i = 0; i < data.calls.length; i++) {
			//var tr = $('<tr/>');
			if (data !== undefined) {

				tmpName = data.calls[i].name;
				tmpPrice = data.calls[i].ask_price;

				var tr = $("<tr onclick=\"updOptPrice('" + tmpPrice + "')\"/>");
				tr.append("<td><button id=\"" + tmpName + "\" onclick=\"addAnalyzer('" + tmpName + "|" + data.calls[i].bid_price + "|" + data.calls[i].ask_price + "|" + data.calls[i].strike + "',1),portAnalyzer(),createRiskChart(),createSensitivity()\" style=\"display:inline-block;\" class=\"btn btn-success cancelBtn\">+1</button><button id=\"" + tmpName + "\" onclick=\"addAnalyzer('" + tmpName + "|" + data.calls[i].bid_price + "|" + data.calls[i].ask_price + "|" + data.calls[i].strike + "',-1),portAnalyzer(),createRiskChart(),createSensitivity()\" class=\"btn btn-danger cancelBtn\">-1</button></td>");
				tr.append("<td>" + data.calls[i].ask_depth + "</td>");
				tr.append("<td>" + data.calls[i].volume + "</td>");
				tr.append("<td id=\"lpc" + i + "\">" + data.calls[i].last_price + "</td>");
				tr.append("<td>" + data.calls[i].bid_price + "</td>");
				tr.append("<td>" + data.calls[i].ask_price + "</td>");
				tr.append("<td>" + data.calls[i].strike + "</td>");

				for (var x = 0; x < data.puts.length; x++) {
					if (data.puts[x].strike == data.calls[i].strike) {
						tmpName = data.puts[x].name;
						tmpPrice = data.puts[x].ask_price;
						var tr2 = $("<tr onclick=\"updOptPrice('" + tmpPrice + "')\"/>");
						tr2.append("<td>" + data.puts[x].bid_price + "</td>");
						tr2.append("<td>" + data.puts[x].ask_price + "</td>");
						tr2.append("<td>" + data.puts[x].last_price + "</td>");
						tr2.append("<td>" + data.puts[x].volume + "</td>");
						tr2.append("<td>" + data.puts[x].ask_depth + "</td>");
						tr2.append("<td><button id=\"" + tmpName + "\" onclick=\"addAnalyzer('" + tmpName + "|" + data.puts[i].bid_price + "|" + data.puts[i].ask_price + "|" + data.puts[i].strike + "',1),portAnalyzer(),createRiskChart(),createSensitivity()\" class=\"btn btn-success cancelBtn\">+1</button><button id=\"" + tmpName + "\" onclick=\"addAnalyzer('" + tmpName + "|" + data.puts[i].bid_price + "|" + data.puts[i].ask_price + "|" + data.puts[i].strike + "',-1),portAnalyzer(),createRiskChart(),createSensitivity()\" class=\"btn btn-danger cancelBtn\">-1</button></td>");
					}
				}
			}

			$('#EMtableCA').append(tr);
			checkChange(data.calls[i].last_price, i);
			lastCallArr[i] = data.calls[i].last_price;

			$('#EMtablePA').append(tr2);
		}
	},



	updateExpirations: function (data) {
		var ul = document.getElementById("expTimes");
		var li = document.createElement("li");

		for (var i = 0; i < data.expire_times.length; i++) {
			li = document.createElement("li");
			li.appendChild(document.createTextNode(data.expire_times[i]));
			li.setAttribute("id", data.expire_times[i]);
			ul.appendChild(li);
			li.addEventListener("click", function () {
				AOapi.Product.getOptions(AOui.Product.updateOptions, {
					expTime: $(this).attr("id")
				});
			});
		}

	}
}

$("#buy-click").click(function () {
	if (document.getElementById("orderTypeDiv").style.display == "none") {
		var price = "Inf";
	} else {
		var price = document.getElementById('ordPrice').value;
	};
	AOapi.Trading.placeBid(function (data) {
		if (data.result == "MarginError") {
			Notification("Order Rejected! Insufficient available buying power.", "warning");
		} else if (data.result == "OrderSizeError") {
			Notification("Order Rejected! Invalid order amount, please enter the correct order size!", "warning");
		} else if (data.result == "TickError") {
			Notification("Order Rejected! Invalid price amount, please enter the correct price size!", "warning");
		} else {
			Notification("Your limit order has been submitted!", "success");
			AOapi.Trading.getExecutions(AOui.Account.updateOrderStatus);
		}
	}, {
		ordPrice: price,
		ordAmt: document.getElementById('ordAmt').value,
		ordProd: document.getElementById('ordProd').innerHTML
	});

});

/***********************************************/

$("#sell-click").click(function () {
	if (document.getElementById("orderTypeDiv").style.display == "none") {
		var price = "0";
	} else {
		var price = document.getElementById('ordPrice').value;
	};
	AOapi.Trading.placeAsk(function (data) {
		if (data.result == "MarginError") {
			Notification("Order Rejected! Insufficient available buying power.", "warning");
		} else if (data.result == "OrderSizeError") {
			Notification("Order Rejected! Invalid order amount, please enter the correct order size!", "warning");
		} else if (data.result == "TickError") {
			Notification("Order Rejected! Invalid price amount, please enter the correct price size!", "warning");
		} else {
			Notification("Your limit order has been submitted!", "success");
			AOapi.Trading.getExecutions(AOui.Account.updateOrderStatus);
		}
	}, {
		ordPrice: price,
		ordAmt: document.getElementById('ordAmt').value,
		ordProd: document.getElementById('ordProd').innerHTML
	});

});

/***********************************************/

$("#save-click").click(function () {
	if (document.getElementById('newPassword').value == document.getElementById('confirmPassword').value) {
		AOapi.User.resetPassword(function (data) {
			Notification("Password Successfully Changed!", "success");
		}, {
			opword: document.getElementById('oldPassword').value,
			npword: document.getElementById('newPassword').value,
		});
	} else {
		Notification("Your new password and confirmation password do not match! Please double check! ", "warning");
	}
});

/***********************************************/

function checkKYC() {
	AOapi.User.changeUserPram(function (data) {
		if (data.result == "AttributeError") {
			Notification("Changes have not been made due to inccorect KYC inputs. Please double check!", "warning");
		} else {
			Notification("Your KYC info has been Successfully updated!", "success");
		}
	}, {
		first_name: document.getElementById('first_name').value,
		last_name: document.getElementById('last_name').value,
		dob: document.getElementById('dob').value,
		cell: document.getElementById('cell').value,
		addr_street: document.getElementById('addr_street').value,
		addr_city: document.getElementById('addr_city').value,
		addr_state: document.getElementById('addr_state').value,
		addr_zip: document.getElementById('addr_zip').value
	});
};

/***********************************************/

$("#logOut").click(function () {
	$.ajax({
		type: "POST",
		url: "https://aos-comp.alt-options.com/public/delete_session",
		dataType: "json",
		data: JSON.stringify({
			auth_token: localStorage.getItem('token')
		})

	}).done(function (data) {
		localStorage.clear();
		document.location.href = "../login.html";
	});
	return false;
});

/***********************************************/


$("#2FA_Enable").click(function () {
	AOapi.User.enable2FA(function (data) {

		if (data.result == "Success") {
			Notification("2FA has been enabled!", "success");
			AOapi.User.get2FAStatus(AOui.Settings.update2FAstatus)
		} else {
			Notification("2FA cannot be enabled due to some reason, please contact us!", "warning");
		}
	});
});


$("#2FA_Disable").click(function () {
	AOapi.User.disable2FA(function (data) {

		if (data.result == "Success") {
			Notification("2FA has been disabled!", "success");
			AOapi.User.get2FAStatus(AOui.Settings.update2FAstatus)
		} else {
			Notification("2FA cannot be disabled due to some reason, please contact us!", "warning");
		}
	});
});


/***********************************************/

function cancelOrd(ordId) {
	AOapi.Trading.cancelOrder(function (data) {
		AOapi.Account.getOpenOrders(AOui.Account.updateOpenOrders);
	}, {
		orderID: ordId
	});
}


/***********************************************/
function updateExecutions(ordId) {

	AOapi.Trading.getTrades(function (data) {

	}, {
		orderID: ordId
	});
}

function showExecutions(ordId) {

	AOapi.Trading.getTrades(
		AOui.Account.updateTradeDetails, {
			orderID: ordId
		});
	$('#execution_modal').modal("show");
}

/***********************************************/

function updOptChain(ordProd) {
	document.getElementById('ordProd').innerHTML = ordProd;
	AOapi.Product.getOrderBook(
		AOui.Product.updateDepth, {
			ordProd: ordProd
		});

}

/***********************************************/

function updOptPrice(ordPrice, id) {
	document.getElementById("optCheck").checked = true;
	document.getElementById("open-button").disabled = false;

	priceRefresh(ordPrice);

	$('#open-button').effect('highlight', {
		color: "#50b949"
	}, 200);
}

/***********************************************/

function priceRefresh(ordPrice) {

	$("[name='orderType']").bootstrapSwitch('state', true);
	document.getElementById('ordPrice').value = ordPrice;
	$('#ordPrice, #trade_cost').effect('highlight', {
		color: "#50b949"
	}, 200);

	document.getElementById('ordAmt').value = 10;

	var trade_cost = -document.getElementById('ordAmt').value * document.getElementById('ordPrice').value;
	var cost = Number(trade_cost).toFixed(2);

	if (document.getElementById('optCheck').checked) {
		var trade_commissions = 4.50 + document.getElementById('ordAmt').value * 0.49;
	} else {
		var trade_commissions = trade_cost * -0.01;
	}

	var commissions = Number(trade_commissions).toFixed(2);

	if (cost !== null) {
		document.getElementById('trade_cost').innerHTML = cost;
		document.getElementById('trade_commissions').innerHTML = commissions;
	}
}

/***********************************************/

function AmtRefresh(ordPrice) {
	if ($("[name='orderType']").bootstrapSwitch('state') == false) {
		var unit_cost = localStorage.getItem("BTCUSD");
	} else {
		var unit_cost = document.getElementById('ordPrice').value;
	};

	var trade_cost = -document.getElementById('ordAmt').value * unit_cost;
	var cost = Number(trade_cost).toFixed(2);

	if (document.getElementById('optCheck').checked) {
		var trade_commissions = 4.50 + document.getElementById('ordAmt').value * 0.49;
	} else {
		var trade_commissions = trade_cost * -0.01;
	}

	var commissions = Number(trade_commissions).toFixed(2);

	if (cost !== null) {
		document.getElementById('trade_cost').innerHTML = cost;
		document.getElementById('trade_commissions').innerHTML = commissions;
	}
}

/***********************************************/

function checkChange(lastPrice, i) {

	if ((lastPrice != lastCallArr[i]) && (lastCallArr[i] != null)) {
		if (lastPrice > lastCallArr[i]) {
			$('#lpc' + i).effect('highlight', {
				color: "#50b949"
			}, 1000);
		} else {
			$('#lpc' + i).effect('highlight', {
				color: "#FF6939"
			}, 1000);
		}
	};
};


/***********************************************/

function portAnalyzer() {
	$('#greektable').html("");
	$('#greektablefoot').html("");
	graphArray = [];
	expGraphArr = [];
	expGraphArr2 = [];
	strGraphArr = [];
	portDelta = 0;
	portGamma = 0;
	portRho = 0;
	portTheta = 0;
	portVega = 0;
	var sum = 0;
	var strike = 0;
	var count = 0;
	var holder, premium, holder2;
	var date = new Date();
	var term = Math.abs(Date.parse('2015-11-30T23:59:59') - Date.parse(date)) / (1000 * 60 * 60 * 24 * 365 * 365);

	AOapi.Product.getOrderBook(AOui.Product.updateSpot, {
		ordProd: 'XBT'
	});

	for (var i = 0; i < testPortArr2.length; i++) {

		name = testPortArr2[i].name;
		count = testPortArr2[i].amount;


		premium = (Number(testPortArr2[i].ask_price) + Number(testPortArr2[i].bid_price)) / 2;

		for (var y = (Number(spot) - 90), x = 0; y < (Number(spot)+90); y += 10, x++) {

			call_price_exp = blackScholes(y, testPortArr2[i].strike, 0, 1.21, 0.05, "call");
			put_price_exp = blackScholes(y, testPortArr2[i].strike, 0, 1.21, 0.05, "put");
			call_price_float = blackScholes(y, testPortArr2[i].strike, term, 1.21, 0.05, "call");
			put_price_float = blackScholes(y, testPortArr2[i].strike, term, 1.21, 0.05, "put");

			if (i == 0) {
				expGraphArr[x] = 0;
				expGraphArr2[x] = 0;
			}
			if (~name.indexOf('Call')) {
				expGraphArr[x] += ((call_price_exp - premium) * count);
				expGraphArr2[x] += ((call_price_float - premium) * count);

			} else {
				expGraphArr[x] += ((put_price_exp - premium) * count);
				expGraphArr2[x] += ((put_price_float - premium) * count);
			}
			strGraphArr[x] = y;
		}

		var tr = $('<tr/>');
		if (~name.indexOf('Call')) {
			call_delta = getDelta(spot, testPortArr2[i].strike, term, 1.21, 0.05, "call") * count;
			call_gamma = getGamma(spot, testPortArr2[i].strike, term, 1.21, 0.05, "call") * count;
			call_vega = getVega(spot, testPortArr2[i].strike, term, 1.21, 0.05, "call") * count;
			call_theta = getTheta(spot, testPortArr2[i].strike, term, 1.21, 0.05, "call") * count;
			portDelta += call_delta;
			portGamma += call_gamma;
			portVega += call_vega;
			portTheta += call_theta;
			// portRho += BS.crho(holder) * count;
			if (count != 0) {
				tr.append('<td>' + name + '</td>');
				tr.append('<td>' + (call_delta).toFixed(2) + '</td>');
				tr.append('<td>' + (call_gamma).toFixed(2) + '</td>');
				tr.append('<td>' + (call_vega).toFixed(2) + '</td>');
				tr.append('<td>' + (call_theta).toFixed(2) + '</td>');
			}
			// tr.append('<td>' + (BS.crho(holder) * count).toFixed(2) + '</td>');

		} else {

			put_delta = getDelta(spot, testPortArr2[i].strike, term, 1.21, 0.05, "put") * count;
			put_gamma = getGamma(spot, testPortArr2[i].strike, term, 1.21, 0.05, "put") * count;
			put_vega = getVega(spot, testPortArr2[i].strike, term, 1.21, 0.05, "put") * count;
			put_theta = getTheta(spot, testPortArr2[i].strike, term, 1.21, 0.05, "put") * count;

			portDelta += put_delta;
			portGamma += put_gamma;
			portVega += put_vega;
			portTheta += put_theta;
			// portRho += BS.prho(holder) * count;
			if (count != 0) {
				tr.append('<td>' + name + '</td>');
				tr.append('<td>' + (put_delta).toFixed(2) + '</td>');
				tr.append('<td>' + (put_gamma).toFixed(2) + '</td>');
				tr.append('<td>' + (put_vega).toFixed(2) + '</td>');
				tr.append('<td>' + (put_theta).toFixed(2) + '</td>');
			}
			// tr.append('<td>' + (BS.prho(holder) * count).toFixed(2) + '</td>');
		}


		$('#greektable').append(tr);

	}

	var tr = $('<tr/>');
	tr.append('<td> - </td><td> - </td><td> - </td><td> - </td><td> - </td>');
	$('#greektable').append(tr);

	var tr = $('<tr/>');
	tr.append('<td style="width:25%"> PORTFOLIO </td>');
	tr.append('<td>' + portDelta.toFixed(2) + '</td>');
	tr.append('<td>' + portGamma.toFixed(2) + '</td>');
	tr.append('<td>' + portVega.toFixed(2) + '</td>');
	tr.append('<td>' + portTheta.toFixed(2) + '</td>');
	// tr.append('<td>' + portRho.toFixed(2) + '</td>');
	$('#greektablefoot').append(tr);

	for (var x = 0; x < expGraphArr.length; x++) {
		graphArray[x] = [strGraphArr[x], expGraphArr2[x], expGraphArr[x]];
	}
	// createScenarios (objectArr);
	// updateScenariosTable ();
	// createScenariosP (testPortArr2);
}


/****************/
function indexOf(array, item) {
	for (var i = 0; i < array.length; i++) {
		if (array[i].name === item.name) return i;
	}
	return -1;
}

function addAnalyzer(data, chkNeg) {
	data = data.split("|");
	var check = {
		amount: chkNeg,
		name: data[0],
		bid_price: data[1],
		ask_price: data[2],
		strike: data[3]
	};
	if (indexOf(testPortArr2, check) == -1) {
		testPortArr2.push({
			amount: check.amount,
			ask_price: check.ask_price,
			bid_price: check.bid_price,
			name: check.name,
			strike: check.strike,
		});
	} else {
		testPortArr2[indexOf(testPortArr2, check)].amount = Number(testPortArr2[indexOf(testPortArr2, check)].amount) + chkNeg;
	}
	updateanalyzerAdded(testPortArr2);

};


function updateanalyzerAdded(testPortArr2) {
	$('#analyzerAdded').html("");
	for (var i = 0; i < testPortArr2.length; i++) {
		if (testPortArr2[i].amount != 0) {
			var tr = $('<tr/>');
			tr.append('<td>' + testPortArr2[i].name + '</td>');
			tr.append("<td>" + testPortArr2[i].amount + "</td>")
			tr.append("<td><button onclick=\"addAnalyzer('" + testPortArr2[i].name + "|" + testPortArr2[i].bid_price + "|" + testPortArr2[i].ask_price + "|" + testPortArr2[i].strike + "',1),portAnalyzer(),createRiskChart(),createSensitivity()\" class=\"btn btn-success cancelBtn\">+1</button><button onclick=\"addAnalyzer('" + testPortArr2[i].name + "|" + testPortArr2[i].bid_price + "|" + testPortArr2[i].ask_price + "|" + testPortArr2[i].strike + "',-1),portAnalyzer(),createRiskChart(),createSensitivity()\" class=\"btn btn-danger cancelBtn\">-1</button></td>")
			$('#analyzerAdded').append(tr);
		}
	}
}

/***sensitivites-table****/


function updateScenariosTable(data) {
	$("#sensitivites-table-tbody").empty();
	$("#sensitivites-table-tbody").html
	for (var i = 0; i <= 17; i++) {
		var tr = $('<tr/>');
		var num = ~~(Number(spot) / 10);
		var underlying = (num * 10 - 90) + i*10;
		tr.append('<td>' + underlying.toFixed(2) + '</td>');
		tr.append('<td>' + parseFloat(data[0][i]).toFixed(2) + '</td>');
		tr.append('<td>' + parseFloat(data[1][i]).toFixed(2) + '</td>');
		tr.append('<td>' + parseFloat(data[2][i]).toFixed(2) + '</td>');
		tr.append('<td>' + parseFloat(data[3][i]).toFixed(2) + '</td>');
		tr.append('<td>' + parseFloat(data[4][i]).toFixed(2) + '</td>');
		tr.append('<td>' + parseFloat(data[5][i]).toFixed(2) + '</td>');
		tr.append('<td>' + parseFloat(data[6][i]).toFixed(2) + '</td>');
		tr.append('<td>' + parseFloat(data[7][i]).toFixed(2) + '</td>');
		tr.append('<td>' + parseFloat(data[8][i]).toFixed(2) + '</td>');
		// tr.append('<td>' + parseFloat(data[9][i]).toFixed(2) + '</td>');
		$('#sensitivites-table-tbody').append(tr);
	}
}

/************New Function Tied Up To Sensitivity Table*********/


function createSensitivity() {

	var date = new Date();
	var currentTerm = Math.abs(Date.parse('2015-11-30T23:59:59') - Date.parse(date)) / (1000 * 60 * 60 * 24 * 365 * 365);

	var TDArr = new Array(10);
	for (var i = 0; i <= 9; i++) {
		TDArr[i] = new Array(17);
	}; //create the structure.

	for (var j = 0; j < testPortArr2.length; j++) {
		var name = testPortArr2[j].name;
		var premium = (Number(testPortArr2[j].ask_price) + Number(testPortArr2[j].bid_price)) / 2;
		var count = Number(testPortArr2[j].amount);
		if (j == 0) {

			if (~name.indexOf('Call')) {
				for (var y = 0; y < 18; y++) {
					var nspot = (Number(spot)-90) + y * 10;
					for (var i = 0; i <= 9; i++) {
						var nterm = Number(currentTerm) - i / 365;
						if (nterm <= 0) {
							nterm = 0.000000001;
						}
						call_price_float = blackScholes(nspot, testPortArr2[j].strike, nterm, 1.21, 0.05, "call");
						// console.log(nspot,testPortArr2[j].strike,currentTerm,nterm,"|",i,y,call_price_float); //debug
						TDArr[i][y] = (call_price_float - premium) * count;
					}
				}
			}

			if (~name.indexOf('Put')) {
				for (var y = 0; y < 18; y++) {
					var nspot = (Number(spot)-90) + y * 10;
					for (var i = 0; i <= 9; i++) {
						var nterm = Number(currentTerm) - i / 365;
						if (nterm <= 0) {
							nterm = 0.000000001;
						}
						put_price_float = blackScholes(nspot, testPortArr2[j].strike, nterm, 1.21, 0.05, "put");
						TDArr[i][y] = (put_price_float - premium) * count;
					}
				}
			}
			//if j is the next one and again if the count is > 0, we calculate the pnl for each scenraio and
			//that pnl into the table
		} else {
			if (~name.indexOf('Call')) {
				for (var y = 0; y < 18; y++) {
					var nspot = (Number(spot)-90) + y * 10;
					for (var i = 0; i <= 9; i++) {
						var nterm = Number(currentTerm) - i / 365;
						if (nterm <= 0) {
							nterm = 0.000000001;
						}
						call_price_float = blackScholes(nspot, testPortArr2[j].strike, nterm, 1.21, 0.05, "call");
						TDArr[i][y] = TDArr[i][y] + (call_price_float - premium) * count;
					}
				}
			}

			if (~name.indexOf('Put')) {
				for (var y = 0; y < 18; y++) {
					var nspot = (Number(spot)-90) + y * 10;
					for (var i = 0; i <= 9; i++) {
						var nterm = Number(currentTerm) - i / 365;
						if (nterm <= 0) {
							nterm = 0.000000001;
						}
						put_price_float = blackScholes(nspot, testPortArr2[j].strike, nterm, 1.21, 0.05, "put");
						TDArr[i][y] = TDArr[i][y] + (put_price_float - premium) * count;
					}
				}
			}

		}

	}
	updateScenariosTable(TDArr);
}


// function updateIV(){
//   getImpliedVolatility(expectedCost, s, k, t, r, callPut, estimate)
// }

function welcome_message() {
	console.log("Welcome to AOEX! The Most Professional Derivative Platform!");
	console.log("If you run into any problem, please contact info@alt-options.com.");
	console.log("Click the Skype button on the trading bar on the bottom of your screen!");
	console.log("If you find a BUG/Bad Request, please don't hesitate talk to our team!");
}
