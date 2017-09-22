
/*CLICK HANDLERS*/

//connect with Angular method click handler
function updateOrders(reactComponent, ordPrice, ordAmt) {

  return function(e){
    var scope = reactComponent.scope.$root;
    scope.$apply(
        scope.updateOrderInputS(ordPrice,ordAmt)
    );
  }
}

/* React Components */

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var OrderBook = React.createClass({


  //fixed properties

  asks: [],
  bids: [],
  spread: 0,
  rerender: false,

  //animation on value updates
  componentWillUpdate: function(nextProps){
    this.rerender = true;
    var reactComponent = this.props;

    var asks = nextProps.data.asks;
    var bids = nextProps.data.bids;
    var oasks = this.props.data.asks;
    var obids = this.props.data.bids;

    var rendAsks = [];
    var rendBids = [];

    var spread;
    var ospread;

    if (asks[0] == null || asks[0] == undefined || bids[0] == null || bids[0] == undefined) {
      spread = "N/A";
    } else {
      spread = Number(asks[asks.length-1].price - bids[0].price);
      spread = spread.toFixed(2);
    }

    if (oasks[0] == null || oasks[0] == undefined || obids[0] == null || obids[0] == undefined) {
      ospread = "N/A";
    } else {
      ospread = Number(oasks[oasks.length-1].price - obids[0].price);
      ospread = ospread.toFixed(2);
    }

    this.spread = React.createElement(
        "td",
        {"className": ospread == spread ? {} : ospread > spread ? "highlight-red" : "highlight-green" },
        spread
    );

    for (var i = 0; i < asks.length; i++) {
      var found = false;
      for (var j = 0; j < oasks.length; j++){
        if (oasks[j].price == asks[i].price){
            found = true;
            rendAsks.push(React.createElement(
              "tr",
              {"className": "trade", "key": asks[i].price, "onClick": updateOrders(reactComponent, asks[i].price, asks[i].amount) },
              React.createElement(
                        "td",
                          { "className": oasks[j].amount > asks[i] ? "highlight-red" : "highlight-green"},
                        Number(asks[i].amount).toFixed(8)
              ),
              React.createElement(
                        "td",
                        { style: {color: "#FF6939"}},
                        '$'+ Number(asks[i].price).toFixed(2)
              )
            ));
            break;
        }
      }
      if (found == false) {
        rendAsks.push(React.createElement(
          "tr",
          { "className": "trade", "key": asks[i].price, "onClick": updateOrders(reactComponent, asks[i].price, asks[i].amount) },
          React.createElement(
                    "td",
                    null,
                    Number(asks[i].amount).toFixed(8)
          ),
          React.createElement(
                    "td",
                    { style: {color: "#FF6939"}},
                    '$'+ Number(asks[i].price).toFixed(2)
          )
        )
      );
      }
    }

    for (var i = 0; i < bids.length; i++) {
      var found = false;
      for (var j = 0; j < obids.length; j++){
        if (obids[j].price == bids[i].price){
            found = true;
            rendBids.push(React.createElement(
              "tr",
              { "className": "trade","key": bids[i].price, "onClick": updateOrders(reactComponent, bids[i].price, bids[i].amount) },
              React.createElement(
                        "td",
                        { "className": obids[j].amount > bids[i].amount ? "highlight-red" : "highlight-green"},
                        Number(bids[i].amount).toFixed(8)
              ),
              React.createElement(
                        "td",
                        { style: {color: "#50b949"}},
                        '$'+ Number(bids[i].price).toFixed(2)
              )
            ));
            break;
        }
      }
      if (found == false) {
        rendBids.push(React.createElement(
          "tr",
          { "className": "trade", "key": bids[i].price, "onClick": updateOrders(reactComponent, bids[i].price, bids[i].amount) },
          React.createElement(
                    "td",
                    null,
                    Number(bids[i].amount).toFixed(8)
          ),
          React.createElement(
                    "td",
                    { style: {color: "#50b949"}},
                    '$'+ Number(bids[i].price).toFixed(2)
          )
        ))
      }
    }

       this.asks = rendAsks;
       this.bids = rendBids;
  },

  //method to create React rows for display
  createRows: function() {

    var reactComponent = this.props;
    var asks = this.props.data.asks;
    var bids = this.props.data.bids;
    var asksRows = [];
    var bidsRows = [];

    var spread;
    if (asks[0] == null || asks[0] == undefined || bids[0] == null || bids[0] == undefined) {
      spread = "N/A";
    } else {
      spread = Number(asks[asks.length-1].price - bids[0].price);
      spread = spread.toFixed(2);
    }

    for (var i = 0; i < asks.length; i++) {
      var ask = asks[i];
      asksRows.push(
        React.createElement(
          "tr",
          { "className": "trade", "key": ask.price, "onClick": updateOrders(reactComponent, ask.price, ask.amount) },
          React.createElement(
                    "td",
                    null,
                    Number(ask.amount).toFixed(8)
          ),
          React.createElement(
                    "td",
                    { style: {color: "#FF6939"}},
                    '$'+ Number(ask.price).toFixed(2)
          )
        )
      )
    };

    for (var i = 0; i < bids.length; i++) {
      var bid = bids[i];
      bidsRows.push(
        React.createElement(
          "tr",
          { "className": "trade", "key": bid.price, "onClick": updateOrders(reactComponent,bid.price, bid.amount) },
          React.createElement(
                    "td",
                    null,
                    Number(bid.amount).toFixed(8)
          ),
          React.createElement(
                    "td",
                    { style: {color: "#50b949"} },
                    '$'+ Number(bid.price).toFixed(2)
          )
        )
      )
    };

     this.asks = asksRows;
     this.bids = bidsRows;
     this.spread = React.createElement(
       "td",
       null,
       spread
     );
  },

  render: function() {
    if (this.rerender == false) {
      this.createRows();
    }
    return (
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { "className": "row section-head" },
          React.createElement(
            "h5",
            null,
            "DEPTH:",
            React.createElement("span", { id: "mktDptProd", style:{color:"white" }})
          )
        ),
        React.createElement(
          "table",
          { "className": "table scroll table-condensed", style:{textAlign:"center"} },
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
              )
            )
          ),
          React.createElement(
             ReactCSSTransitionGroup,
             { component: "tbody", id: "MDtable", style: {height:"800px"}, transitionName: "example", transitionEnterTimeout: 500, transitionLeaveTimeout: 300 },
            this.asks,
            React.createElement(
              "tr",
              { style: {borderTop: "1px solid #4B555C", borderBottom: "1px solid #4B555C", display:"block"} },
              React.createElement(
                "td",
                null,
                "Spread:"
              ),
              this.spread
            ),
            this.bids
          )
        )
      )
  );
  }
});
