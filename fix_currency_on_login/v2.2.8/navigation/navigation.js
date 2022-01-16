define(["exports","jquery","moment","lodash","../websockets/binary_websockets","../common/rivetsExtra","text!./navigation.html","../workspace/workspace.js","../common/util","css!navigation/navigation.css"],function(e,a,t,n,o,i,l,u){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.init=e.getLandingCompany=void 0;var c=h(a),r=h(t),g=h(n),s=h(o),d=h(i),f=h(l),m=h(u);function h(e){return e&&e.__esModule?e:{default:e}}function _(e){var a=e.loginid||e.id;if(e&&a)return{MLT:"Gaming",MF:"Investment",VRTC:"Virtual",REAL:(e.currency||"").toUpperCase()||"Real"}[a=a.match(/^(MLT|MF|VRTC)/i)?a.match(/^(MLT|MF|VRTC)/i)[0]:"REAL"]+" Account"}function v(e){function t(e){(0,c.default)(".webtrader-dialog["+e+"]").each(function(e,a){var t=(0,c.default)(a);t.dialog("close"),t.one("dialogclose",function(){g.default.defer(function(){return t.dialog("instance")&&t.dialog("destroy")&&t.remove()})})})}var a=e.find(".account-menu"),n=e.find("span.time"),o={show_login:!local_storage.get("oauth"),login_disabled:!1,currency:"",logout_disabled:!1,account:{show:!1,type:"",id:"",balance:"",is_virtual:0},show_submenu:!1,show_new_account_link:!1,openRealAccount:function(){var e=getBinaryUrl("new_account/realws.html");window.open(e,"_blank")},openFinancialAccountMF:function(){var e=getBinaryUrl("new_account/maltainvestws");window.open(e,"_blank")}};function i(e){if(!o.currency){if(!local_storage.get("currency"))return;o.currency=local_storage.get("currency")}var a="0";if(e.authorize)a=e.authorize.balance;else{if(!e.balance)return;a=e.balance.balance}o.account.balance=formatPrice(a,o.currency)}o.oauth=local_storage.get("oauth")||[],o.oauth=o.oauth.map(function(e){return e.type=_(e),e}),o.showLoginWin=function(){o.login_disabled=!0,require(["oauth/login"],function(e){o.login_disabled=!1,e.init()})},o.toggleVisibility=function(e){o.show_submenu=e},o.logout=function(){s.default.invalidate(),o.logout_disabled=!0},o.switchAccount=function(e){t("data-account-specific=true"),s.default.switch_account(e).catch(function(e){c.default.growl.error({message:e.message}),"SelfExclusion"===e.code&&s.default.invalidate()})},d.default.bind(a,o),s.default.events.on("balance",function(e){if(local_storage.get("authorize")){var a=local_storage.get("authorize").loginid;e.balance&&e.balance.loginid===a&&i(e)}}),s.default.events.on("logout",function(){t("data-authorized=true"),t("data-account-specific=true"),o.logout_disabled=!1,o.account.show=!1,o.show_login=!0,o.account.id="",o.account.balance="",o.account.type="",o.currency="",local_storage.remove("currency")}),s.default.events.on("login",function(e){if(t("data-authorized=true"),o.show_login=!1,o.account.show=!0,o.account.id=e.authorize.loginid,o.account.is_virtual=e.authorize.is_virtual,o.oauth=local_storage.get("oauth")||[],o.oauth=o.oauth.map(function(e){return e.type=_(e),e}),o.account.type=_(e.authorize),o.currency=e.authorize.currency,local_storage.set("currency",o.currency),local_storage.get("authorize")){var a=local_storage.get("authorize").loginid;e.authorize&&e.authorize.loginid===a&&i(e)}e.authorize.is_virtual;y().then(function(e){o.show_financial_link="upgrade-mf"===e,o.show_realaccount_link="upgrade-mlt"===e;var a=loginids();if(o.has_real_account=g.default.some(a,{is_real:!0}),o.has_mf_or_mlt=g.default.some(a,{is_mf:!0})||g.default.some(a,{is_mlt:!0}),o.show_new_account_link="new-account"===e,o.has_disabled_account=g.default.some(a,{is_disabled:!0}),g.default.some(oAuthLoginIds(),{is_disabled:!0})){var t=g.default.filter(a,{s_disabled:!0}).map(function(e){return e.id}).join(",");c.default.growl.error({fixed:!0,message:"<a href='"+getBinaryUrl("contact.html")+"' target='_blank'>\n                "+"Your account (%) is locked, please contact customer support for more info.".i18n().replace("%",t)+"\n               </a>"})}})}),(0,c.default)(".login").on("login-error",function(e){o.show_login=!0}),n.text(r.default.utc().format("YYYY-MM-DD HH:mm:ss")+" GMT"),setInterval(function(){n.text(r.default.utc().format("YYYY-MM-DD HH:mm:ss")+" GMT")},1e3)}var p=[".trade",".instruments",".resources",".workspace"],y=e.getLandingCompany=function(){return s.default.cached.authorize().then(function(e){return Promise.all([s.default.cached.send({landing_company:e.authorize.country}),s.default.cached.send({landing_company_details:e.authorize.landing_company_name})]).then(function(e){var a=e[0],t="virtual"===a.landing_company.virtual_company?a.landing_company.financial_company||{}:e[1].landing_company_details||{},n=a.landing_company.financial_company,o=a.landing_company.gaming_company,i=loginids(),l=local_storage.get("oauth")[0];if(l.is_mlt=/MLT/.test(l.id),o&&n&&"maltainvest"===n.shortcode)return!g.default.some(i,{is_mlt:!0})||!g.default.some(i,{is_mf:!0})&&l.is_mlt?g.default.some(i,{is_mlt:!0})?"upgrade-mf":"upgrade-mlt":"do-nothing";if(n&&"maltainvest"===n.shortcode&&!o)return g.default.some(i,{is_mf:!0})?"do-nothing":"upgrade-mf";if(g.default.some(i,{is_mlt:!0})||g.default.some(i,{is_mx:!0}))return"do-nothing";var u=g.default.filter(i,{is_cr:!0});if(u.length&&t.legal_allowed_currencies){var c=local_storage.get("currencies_config")||{},r=g.default.some(u,{type:"fiat"}),s=g.default.difference(t.legal_allowed_currencies.filter(function(e){return"crypto"===c[e].type}),g.default.filter(u,{type:"crypto"}).map(function(e){return e.currency})),d=s.length&&s.length!==(t.legal_allowed_currencies.filter(function(e){return"crypto"===c[e].type})||[]).length,f=!s.length;return!r&&d||r&&!f?"new-account":"do-nothing"}return"upgrade-mlt"}).catch(function(e){c.default.growl.error({message:e.message})})}).catch(function(e){c.default.growl.error({message:e.message})})},w=e.init=function(e){var a=(0,c.default)(f.default).i18n();(0,c.default)("body").prepend(a),v(a),function(e){e=e.find("#topbar").addBack("#topbar");var n={lang:{value:"en",name:"English"},confirm:{visible:!1},languages:[{value:"en",name:"English"},{value:"de",name:"Deutsch"},{value:"es",name:"Español"},{value:"fr",name:"Français"},{value:"it",name:"Italiano"},{value:"pl",name:"Polish"},{value:"pt",name:"Português"},{value:"ru",name:"Русский"},{value:"th",name:"Thai"},{value:"vi",name:"Tiếng Việt"},{value:"zh_cn",name:"简体中文"},{value:"zh_tw",name:"繁體中文"}],onclick:function(e){n.confirm.visible=!1;var a=g.default.find(n.languages,{value:e});a&&n.lang&&a.value==n.lang.value||(local_storage.set("i18n",{value:a.value}),window.location.reload())},toggleVisibility:function(e){n.confirm.visible=e}},a=(local_storage.get("i18n")||{value:"en"}).value;n.lang=g.default.find(n.languages,{value:a});var t=document.getElementById("contact-us"),o=document.getElementById("logo-container");t.href=getBinaryUrl("contact.html"),o.href=getBinaryUrl("home.html"),d.default.bind(e[0],n),s.default.cached.send({website_status:1}).then(function(e){var a=(e.website_status||{}).supported_languages||[];a=g.default.map(a,function(e){return{value:e.toLowerCase()}});var t=g.default.intersectionBy(n.languages,a,"value")||[];n.languages.length=0,t.forEach(function(e){return n.languages.push(e)})}).catch(console.error)}(a),require(["themes/themes"]),(0,c.default)("#nav-menu .resources > ul").menu(),m.default.init((0,c.default)("#nav-menu .workspace")),e&&e((0,c.default)("#nav-menu")),is_beta()&&a.find("a.config").closest("li").show(),p.forEach(function(e){var a="nav #nav-menu",t=a+" "+e+" > ul",n=a+" "+e,o={visibility:"visible",opacity:1};(0,c.default)(n).click(function(e){(0,c.default)(t).fadeToggle("fast",function(){(0,c.default)(t).css(o)})}),(0,c.default)(document).mouseup(function(e){(0,c.default)(n).is(e.target)||0!==(0,c.default)(n).has(e.target).length||(0,c.default)(t).hide()})})};e.default={init:w,getLandingCompany:y}});