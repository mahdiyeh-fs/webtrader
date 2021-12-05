var contact_us_el=document.getElementById("contact-us"),logo_el=document.getElementById("logo"),footer_eu_el=document.getElementById("footer-eu"),footer_non_eu_el=document.getElementById("footer-non-eu"),href=window.location.href,default_app_id=11,params_str=-1!=href.indexOf("#")?href.split("#")[1]:href.split("?")[1],lang=(params_str&&params_str.match(/lang=[a-zA-Z]+/g)||[]).map(function(e){return e.split("=")[1]})[0]||local_storage.get("i18n")&&local_storage.get("i18n").value||"en";function loadAppId(n){$.getJSON(VERSION+"oauth/app_id.json").then(function(e){n(!1,e)}).catch(function(e){n(e)})}function getUrl(){return"wss://"+(localStorage.getItem("config.server_url")||"frontend.binaryws.com")+"/websockets/v3"}function processRedirect(c){loadAppId(function(e,n){var r,o,s=local_storage.get("oauth")[0].token,a=e?default_app_id:function(e){var n="";for(var a in e)0===href.lastIndexOf(a,0)&&(n=e[a]);return n||default_app_id}(n),t=getUrl()+"?l="+c+"&app_id="+a,i=new WebSocket(t);function l(e){i.send(JSON.stringify(e))}i.onopen=function(e){l({website_status:1})},i.onmessage=function(e){var n=JSON.parse(e.data);if(n.website_status)r=n.website_status.clients_country,function(e){l({authorize:e})}(s);else if(n.authorize){var a=n.authorize.country;o=n.authorize.account_list;var t=!1;for(var i in o)if("maltainvest"===i.landing_company_name)return void(t=!0);!isEuCountrySelected(r)&&t||isEuCountrySelected(a)&&1==o.length?window.location.href=getBinaryUrlWithoutLng("move-to-deriv"):window.location.href=VERSION+"main.html"}},getUrl()})}function processPageLanguage(){var e,a;e=getSupportedLanguages(),a=document.getElementById("select_language"),e.map(function(e){var n=document.createElement("li");n.className=e.value,"en"===n.value&&(n.className="invisible"),n.innerHTML='<a href="/" data-lang='+e.value+">"+e.name+"</a>",a.appendChild(n)});var n=(window.local_storage.get("i18n")||{value:"en"}).value;local_storage.get("oauth")?processRedirect(n):(document.getElementById("loading_container").style.display="none",document.getElementById("main_container").style.display="block",$(function(){$("body").css("display","block"),setTime(),setInterval(setTime,1e3),$.getJSON(VERSION+"i18n/"+n+".json",function(e){setupi18nTranslation(e),processFooter(n)}),function(e){$("#select_language").find(".invisible").removeClass("invisible");var n=$("#select_language").find("."+e),a=$("#select_language .current .language");$("#display_language .language").text(n.text()),a.text(n.text()),n.addClass("invisible"),$(".languages #select_language li").each(function(e,n){$(n).click(function(){var e=$(n).find("a").data("lang");return e&&(local_storage.set("i18n",{value:e}),window.location.reload()),!1})})}(n)}))}function checkRedirectToken(n){if(/acct1=/.test(href)&&/token1=/.test(href)){for(var e=c(/acct\d=[\w\d]+/g),a=c(/token\d=[\w\d-]+/g),t=c(/cur\d=[\w\d]+/g),i=[],r=0;r<e.length;r++){var o=e[r],s=a[r],l=t[r];i.push({id:o,token:s,currency:l})}function c(e){return(n.match(e)||[]).map(function(e){return e.split("=")[1]})}local_storage.set("oauth",i),local_storage.set("oauth-login",{value:!0})}}function checkWindowSize(){isSmallView()&&window.location.assign(VERSION+"unsupported_browsers/unsupported_browsers.html")}function setTime(){var e=moment.utc().format("YYYY-MM-DD HH:mm:ss")+" GMT";$(".time").text(e)}function openTradingPage(){window.location.href=VERSION+"main.html"}function processFooter(o){loadAppId(function(e,n){var f,a=e?default_app_id:function(e){var n="";for(var a in e)0===href.lastIndexOf(a,0)&&(n=e[a]);return n||default_app_id}(n),t=getUrl()+"?l="+o+"&app_id="+a,h=new WebSocket(t);function r(e){h.send(JSON.stringify(e))}h.onopen=function(e){r({website_status:1})},h.onmessage=function(e){var n=JSON.parse(e.data);if(n.error)return;n.website_status?function(e){r({landing_company:e})}(f=n.website_status.clients_country):n.landing_company&&function(e){var n=getBinaryUrl("responsible-trading.html"),a=getBinaryUrl("regulation.html"),t={P1:{TEXT:"In the EU, financial products are offered by Binary Investments (Europe) Ltd., W Business Centre, Level 3, Triq Dun Karm, Birkirkara, BKR 9033, Malta, regulated as a Category 3 Investment Services provider by the Malta Financial Services Authority ([_1]licence no. IS/70156[_2]).".i18n(),TAGS:['<a href="https://www.binary.com/download/WS-Binary-Investments-Europe-Limited.pdf" target="_blank" rel="noopener noreferrer">',"</a>"]},P2:{TEXT:"Outside the EU, financial products are offered by Binary (SVG) Ltd, Hinds Building, Kingstown, St. Vincent and the Grenadines; Binary (V) Ltd, Govant Building, Port Vila, PO Box 1276, Vanuatu, regulated by the Vanuatu Financial Services Commission ([_1]view licence[_2]); Binary (BVI) Ltd, Kingston Chambers, P.O. Box 173, Road Town, Tortola, British Virgin Islands, regulated by the British Virgin Islands Financial Services Commission ([_3]licence no. SIBA/L/18/1114[_4]); and Binary (FX) Ltd., Lot No. F16, First Floor, Paragon Labuan, Jalan Tun Mustapha, 87000 Labuan, Malaysia, regulated by the Labuan Financial Services Authority to carry on a money-broking business ([_5]licence no. MB/18/0024[_6]).".i18n(),TAGS:['<a href="https://www.vfsc.vu/wp-content/uploads/2015/12/List-of-Licensees-under-Dealers-in-Securities-Licensing-Act-CAP-70-18.11.2016.pdf" target="_blank" rel="noopener noreferrer">',"</a>",'<a href="https://www.binary.com/download/regulation/BVI_license.pdf" target="_blank" rel="noopener noreferrer">',"</a>",'<a href="https://www.binary.com/download/regulation/Labuan-license.pdf" target="_blank">',"</a>"]},P3:{TEXT:"This website's services are not made available in certain countries such as the USA, Canada, Hong Kong, Japan, or to persons under age 18.".i18n()},P4:{TEXT:'The products offered via this website include binary options, contracts for difference ("CFDs") and other complex derivatives. Trading binary options may not be suitable for everyone. Trading CFDs carries a high level of risk since leverage can work both to your advantage and disadvantage. As a result, the products offered on this website may not be suitable for all investors because of the risk of losing all of your invested capital. You should never invest money that you cannot afford to lose, and never trade with borrowed money. Before trading in the complex products offered, please be sure to understand the risks involved and learn about [_1]Responsible Trading[_2].'.i18n(),TAGS:["<a href="+n+' target="_blank">',"</a>"]}},r={P1:{TEXT:"In the EU, financial products are offered by Binary Investments (Europe) Ltd., W Business Centre, Level 3, Triq Dun Karm, Birkirkara, BKR 9033, Malta, licensed and regulated as a Category 3 Investment Services provider by the Malta Financial Services Authority ([_1]licence no. IS/70156[_2]).".i18n(),TAGS:['<a href="https://www.binary.com/download/WS-Binary-Investments-Europe-Limited.pdf" target="_blank" rel="noopener noreferrer">',"</a>"]},P2:{TEXT:"In the Isle of Man and the UK, Synthetic Indices are offered by Binary (IOM) Ltd., First Floor, Millennium House, Victoria Road, Douglas, IM2 4RW, Isle of Man, British Isles; licensed and regulated respectively by (1) the Gambling Supervision Commission in the Isle of Man (current licence issued on 31 August 2017) and by (2) the Gambling Commission in the UK (licence [_1]reference no: 39172[_2]).".i18n(),TAGS:['<a href="https://secure.gamblingcommission.gov.uk/PublicRegister/Search/Detail/39172" target="_blank" rel="noopener noreferrer">',"</a>"]},P3:{TEXT:"In the rest of the EU, Synthetic Indices are offered by Binary (Europe) Ltd., W Business Centre, Level 3, Triq Dun Karm, Birkirkara, BKR 9033, Malta; licensed and regulated by (1) the Malta Gaming Authority in Malta (licence no. MGA/B2C/102/2000 issued on 01 August 2018), for UK clients by (2) the UK Gambling Commission (licence [_1]reference no: 39495[_2]), and for Irish clients by (3) the Revenue Commissioners in Ireland (Remote Bookmaker's Licence no. 1010285 issued on 1 July 2017). View complete [_3]Regulatory Information[_4].".i18n(),TAGS:['<a href="https://secure.gamblingcommission.gov.uk/PublicRegister/Search/Detail/39495" target="_blank" rel="noopener noreferrer">',"</a>","<a href="+a+' target="_blank">',"</a>"]},P4:{TEXT:"Binary.com is an award-winning online trading provider that helps its clients to trade on financial markets through binary options and CFDs. Trading binary options and CFDs on Synthetic Indices is classified as a gambling activity. Remember that gambling can be addictive - please play responsibly. Learn more about [_1]Responsible Trading[_2]. Some products are not available in all countries. This website's services are not made available in certain countries such as the USA, Canada, Hong Kong, or to persons under age 18.".i18n(),TAGS:["<a href="+n+' target="_blank">',"</a>"]},P5:{TEXT:"Trading binary options may not be suitable for everyone, so please ensure that you fully understand the risks involved. Your losses can exceed your initial deposit and you do not own or have any interest in the underlying asset.".i18n()},P6:{TEXT:"CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. Between 74-89% of retail investor accounts lose money when trading CFDs. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money.".i18n()}},o=function(e){var n=new RegExp("^(maltainvest|malta|iom)$"),a=new RegExp("^mt$"),t=!!e.financial_company&&e.financial_company.shortcode,i=!!e.gaming_company&&e.gaming_company.shortcode;return t||i?n.test(t)||n.test(i):a.test(f)}(e.landing_company),s=o?r:t;for(var l in showBanner(o),o?footer_eu_el.classList.add("data-show"):footer_non_eu_el.classList.add("data-show"),s){var c=s[l].TEXT,u=s[l].TAGS,d=g(c,u);$("."+l.toLowerCase()).html(d)}function g(e,n){if(!Array.isArray(n)||n.length<0)return e;for(i=0;i<n.length;i++)e=e.replace("[_"+(i+1)+"]",n[i]);return e}h.close()}(n)},getUrl()})}function showBanner(e){document.getElementById("close_banner_btn_iom").href=getDerivUrl(""),e?document.getElementById("close_banner_container").classList.remove("invisible"):document.getElementById("close_banner_container").classList.add("invisible")}contact_us_el.href=getBinaryUrl("contact.html"),logo_el.href=getBinaryUrl("home.html"),checkRedirectToken(params_str),setLanguage(lang),clearUrlQuerystring(href),checkWindowSize(),processPageLanguage();