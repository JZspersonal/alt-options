/** @jsx React.DOM */


/* React Components */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var TradeHistory = React.createClass({

  render: function() {
    var data = this.props.data;
    var repRows = [];
    for (var i = 0; i < data.length-1; i++){
      var order = data[i];
      if (data[i].price >= data[i+1].price) {
        repRows.push(
          React.createElement(
            "tr",
            { "className": "trade", "key": order.id },
            React.createElement(
                      "td",
                      null,
                      Number(order.amount).toFixed(8)
            ),
            React.createElement(
                      "td",
                      { style:{color:"#50B949" }},
                      '$'+ Number(order.price).toFixed(2),
                      React.createElement(
                        "i",
                        { className: "fa fa-caret-up"}
                      )

            ),
            React.createElement(
                      "td",
                      null,
                      order.time.slice(11,19)
            )
          )
        )
      } else {
        repRows.push(
          React.createElement(
            "tr",
            { "className": "trade", "key": order.id },
            React.createElement(
                      "td",
                      null,
                      Number(order.amount).toFixed(8)
            ),
            React.createElement(
                      "td",
                      { style:{color:"#FF6939" }},
                      '$'+ Number(order.price).toFixed(2),
                      React.createElement(
                        "i",
                        { className: "fa fa-caret-down"}
                      )

            ),
            React.createElement(
                      "td",
                      null,
                      order.time.slice(11,19)
            )
          )
        )
      }
    }

    return (
      React.createElement(
  "div",
  { "className": "container-fluid" },
  React.createElement(
    "div",
    { "className": "row section-head" },
    React.createElement(
      "h5",
      null,
      "Trade History"
    )
  ),

  React.createElement(
    "table",
    { "className": "table scroll table-condensed", style:{ height:"800px" }},
    React.createElement(
      "thead",
      null,
      React.createElement(
        "tr",
        null,
        React.createElement(
          "th",
          null,
          "SIZE"
        ),
        React.createElement(
          "th",
          null,
          "PRICE"
        ),
        React.createElement(
          "th",
          null,
          "TIME"
        )
      )
    ),

    React.createElement(
        ReactCSSTransitionGroup,
        { component: "tbody", id: "LTtable", style: {height:"800px"},  transitionName: "example", transitionEnterTimeout: 500, transitionLeaveTimeout: 300 },
        repRows
      )
    )
    )
  );
    }
});
