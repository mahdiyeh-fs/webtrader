"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();define(["jquery","charts/chartWindow","common/rivetsExtra"],function(a,b,c){require(["text!charts/chartTemplateManager.html"]),local_storage.get("templates")||local_storage.set("templates",[]);var d=function(){function d(a,b){var e=this;_classCallCheck(this,d);var f=this.init_state(a,b);require(["text!charts/chartTemplateManager.html"],function(b){a.append(b.i18n()),e.view=c.bind(a[0],f)})}return _createClass(d,[{key:"init_state",value:function(c,d){var e=(a("#"+d+"_chart").highcharts(),{route:{value:"menu"},menu:{save_changes_disabled:!0},templates:{array:local_storage.get("templates"),save_as_value:"",rename_tmpl:null,rename_value:"",current:null}}),f=e.route,g=e.templates,h=e.menu,i=b.get_chart_options(d);-1!==_.findIndex(g.array,function(a){return a.name===i.name})&&(g.current=i),f.update=function(a){f.value=a},h.save_as=function(){var a=b.get_chart_options(d)||{};a.name=[a.timePeriod+" "+a.type].concat(a.indicators.map(function(a){return a.name})).concat(a.overlays.map(function(a){return a.displaySymbol})).join(" + "),g.save_as_value=a.name.substring(0,20),f.update("save-as")},h.templates=function(){g.array=local_storage.get("templates"),f.update("templates")},h.save_changes=function(){var c=b.get_chart_options(d),e=c.name,f=local_storage.get("templates"),h=_.findIndex(f,function(a){return a.name===e});-1!==h?f[h]=c:f.push(c),local_storage.set("templates",f),g.array=f,g.current=c,a.growl.notice({message:a("<div/>").text("Template changes saved ".i18n()+"("+c.name+")").html()})},h.open_file_selector=function(b){a(b.target).next().click()},h.upload=function(b){var c=b.target.files[0];if(c){var d=new FileReader;d.onload=function(b){var c=b.target.result,d=null;try{d=JSON.parse(c);var e=d.random;if(delete d.random,e!==j(JSON.stringify(d)))throw new UserException("InvalidHash");if(!d.indicators)return void a.growl.error({message:"Invalid template type.".i18n()})}catch(b){return void a.growl.error({message:"Invalid json file.".i18n()})}g.apply(d);for(var f=local_storage.get("templates"),h=!1,i=1,k=d.name;!h;)f.map(function(a){return a.name}).includes(k)?(k=d.name+" ("+i+")",i++):(d.name=k,h=!0);f.push(d),local_storage.set("templates",f),g.array=f,a.growl.notice({message:"Successfully applied the template and saved it as ".i18n()+"<b>"+d.name+"</b>"})},d.readAsText(c)}},g.save_as=function(c){c.preventDefault();var e=g.save_as_value.substring(0,20),h=b.get_chart_options(d);if(h){h.name=e;var i=local_storage.get("templates");if(i.map(function(a){return a.name}).includes(e))return void a.growl.error({message:"Template name already exists".i18n()});i.push(h),g.current=h,local_storage.set("templates",i),g.array=i,f.update("menu"),b.set_chart_options(d,h)}},g.download=function(b){b.random=j(JSON.stringify(b));var c=JSON.stringify(b);download_file_in_browser(b.name+".json","text/json;charset=utf-8;",c),a.growl.notice({message:"Downloading template as <b>".i18n()+b.name+".json</b>"})},g.remove=function(a){var b=local_storage.get("templates");g.array=b.filter(function(b){return b.name!==a.name}),local_storage.set("templates",g.array),g.current&&a.name===g.current.name&&(g.current=null)},g.rename=function(a){g.rename_value=a.name,g.rename_tmpl=a,f.update("rename")},g.do_rename=function(c){c.preventDefault();var e=g.rename_tmpl.name,h=g.rename_value.substring(0,20),i=local_storage.get("templates");if(i.map(function(a){return a.name}).includes(h))return void a.growl.error({message:"Template name already exists".i18n()});var j=i.find(function(a){return a.name===e});if(j){j.name=h,local_storage.set("templates",i),g.array=i,f.update("templates");var k=b.get_chart_options(d);k.name==e&&(g.current=k,k.name=h,b.set_chart_options(d,k))}},g.apply=function(a){b.apply_chart_options(d,a),g.current=a},g.confirm=function(a,b){f.update("confirm");var c=b.currentTarget.text;g.confirm_prevMenu=c==="Delete".i18n()?"templates":"menu",g.confirm_text="Delete"===c?"Are you sure you want to delete template?".i18n():"Are you sure you want to overwrite current template?".i18n(),g.confirm_yes=function(){c==="Delete".i18n()?g.remove(a):h.save_changes(),g.confirm_no()},g.confirm_no=function(){f.update(g.confirm_prevMenu)}};var j=function(a){return a.split("").reduce(function(a,b){return a=(a<<5)-a+b.charCodeAt(0),a&a},0)};return e}},{key:"unbind",value:function(){this.view&&this.view.unbind(),this.view=null}}]),d}();return{init:function(a,b){return new d(a,b)}}});