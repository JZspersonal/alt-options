
// Code to get a link to a trading chart.

var generateUtmForUrlParams = function() {
  return "utmsource=" + encodeURI(window.location.hostname) + "&utmmedium=" + encodeURI(window.location.host + window.location.pathname)
};

var generateUrl = function(options) {
  var options = options;
  var site_path;
  if (options.customer === "cme") {
      site_path = "/cmewidgetembed/"
  } else if (options.customer) {
      site_path = "/" + options.customer + "/widgetembed/"
  } else {
      site_path = "/widgetembed/"
  }

  function arg(name, content, argNameOverride) {
      argNameOverride = argNameOverride || name;
      return options[name] ? "&" + argNameOverride + "=" + content : ""
  }

  function jsonArg(name, content, defaultValue) {
      defaultValue = defaultValue || {};
      return "&" + name + "=" + (options[name] ? encodeURIComponent(JSON.stringify(content)) : encodeURIComponent(JSON.stringify(defaultValue)))
  }
  var host = window.location.host.match(/eotpro\.com|mrn\.eotpro\.net|tradingview\.com|pyrrosinvestment\.com/i) == null ? "https://dwq4do82y8xi7.cloudfront.net" : "https://www.tradingview.com";
  var url = host + site_path + "?symbol=" + encodeURIComponent(options.symbol) + "&interval=" + encodeURIComponent(options.interval) + (options.hide_top_toolbar ? "&hidetoptoolbar=1" : "") + (typeof options.hide_side_toolbar === "undefined" ? "" : "&hidesidetoolbar=" + (options.hide_side_toolbar ? "1" : "0")) + (typeof options.allow_symbol_change === "undefined" ? "" : "&symboledit=" + (options.allow_symbol_change ? "1" : "0")) + (!options.save_image ? "&saveimage=0" : "") + "&toolbarbg=" + options.toolbar_bg.replace("#", "") + (options.watchlist && options.watchlist.length && options.watchlist.join ? "&watchlist=" + encodeURIComponent(options.watchlist.join("")) : "") + arg("details", "1") + arg("calendar", "1") + arg("hotlist", "1") + arg("news", "1") + (options.news_vendors ? "&newsvendors=" + encodeURIComponent(options.news_vendors.join("")) : "") + (options.studies ? "&studies=" + encodeURIComponent(options.studies.join("")) : "") + arg("widgetbar_width", options.widgetbar_width, "widgetbarwidth") + arg("hideideas", "1") + arg("theme", encodeURIComponent(options.theme)) + arg("style", encodeURIComponent(options.style)) + arg("timezone", encodeURIComponent(options.timezone)) + arg("eotprobtn", "1") + arg("hideideasbutton", "1") + arg("withdateranges", "1") + arg("logo", encodeURIComponent(options.logo)) + arg("show_popup_button", "1", "showpopupbutton") + jsonArg("studies_overrides", options.studies_overrides, {}) + jsonArg("overrides", options.overrides, {}) + jsonArg("enabled_features", options.enabled_features, []) + jsonArg("disabled_features", options.disabled_features, []) + (options.show_popup_button ? "&showpopupbutton=1" : "") + (options.publish_source ? "&publishsource=" + encodeURIComponent(options.publish_source) : "") + (options.enable_publishing ? "&enablepublishing=" + encodeURIComponent(options.enable_publishing) : "") + (options.idea_url ? "&idea_url=" + encodeURIComponent(options.idea_url) : "") + (options.venue ? "&venue=" + encodeURIComponent(options.venue) : "") + (options.symbology ? "&symbology=" + encodeURIComponent(options.symbology) : "") /*+ "&" + generateUtmForUrlParams()*/;
  return url
};


var getUrl = function() {
  //hardcoding embedded
  var options = {
   "width": "100%",
   "height": 340,
   "symbol": "ITBIT:BTCUSD",
   "interval": "D",
   "timezone": "exchange",
   "theme": "Black",
   "style": "1",
   "withdateranges": false,
   "allow_symbol_change": false,
   "save_image": false,
   "hideideas": true,
   "show_popup_button": false,
   "popup_width": "1000",
   "popup_height": "650",
   "toolbar_bg": 'rgba(255, 255, 255, 0.6)'
 }
  return generateUrl(options);
}
