define(["exports","jquery","../websockets/binary_websockets","../navigation/menu","../common/marketUtils","jquery-growl"],function(e,t,a,n,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.init=void 0;var r=o(t),s=o(a),u=o(n);function o(e){return e&&e.__esModule?e:{default:e}}function d(e){r.default.growl.error({message:e.message})}function l(){s.default.cached.authorize().then(function(){s.default.cached.send({active_symbols:"brief"}).then(function(e){var t=_(e.active_symbols).groupBy("market").map(function(e){var t=filterRestrictedSymbols(e),a=_.head(t),n={name:a.market,display_name:a.market_display_name};return n.submarkets=_(t).groupBy("submarket").map(function(e){var t=_.head(e),a={name:t.submarket,display_name:t.submarket_display_name};return a.instruments=_.map(e,function(e){return{symbol:e.symbol,display_name:e.display_name,is_disabled:e.is_trading_suspended||!e.exchange_is_open,pip:e.pip}}),a.is_disabled=_.every(a.instruments,"is_disabled"),a}).value(),n.is_disabled=_.every(n.submarkets,"is_disabled"),n}).value();t=(0,i.getSortedMarketSubmarkets)(t);var a=(0,r.default)("#nav-menu").find(".trade");u.default.refreshMenu(a,t,function(a,n,i){s.default.send({contracts_for:a}).then(function(t){require(["trade/tradeDialog"],function(e){return e.init({symbol:a,display_name:n,pip:i},t.contracts_for)})}).catch(d)})}).catch(d)})}var c=e.init=function(){require(["trade/tradeDialog"]),l(),require(["websockets/binary_websockets"],function(e){e.events.on("login",l),e.events.on("logout",l)})};e.default={init:c}});