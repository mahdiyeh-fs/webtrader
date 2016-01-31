define(["jquery","jquery-ui","color-picker","ddslick"],function(a){function b(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function c(c,d){require(["css!charts/indicators/kama/kama.css"]),require(["text!charts/indicators/kama/kama.html"],function(e){var f="#cd0a0a";e=a(e),e.appendTo("body"),e.find("input[type='button']").button(),e.find("#kama_stroke").colorpicker({part:{map:{size:128},bar:{size:128}},select:function(b,c){a("#kama_stroke").css({background:"#"+c.formatted}).val(""),f="#"+c.formatted},ok:function(b,c){a("#kama_stroke").css({background:"#"+c.formatted}).val(""),f="#"+c.formatted}});var g="Solid";a("#kama_dashStyle").ddslick({imagePosition:"left",width:158,background:"white",onSelected:function(b){a("#kama_dashStyle .dd-selected-image").css("max-width","125px"),g=b.selectedData.value}}),a("#kama_dashStyle .dd-option-image").css("max-width","125px"),e.dialog({autoOpen:!1,resizable:!1,width:335,modal:!0,my:"center",at:"center",of:window,dialogClass:"kama-ui-dialog",buttons:[{text:"OK",click:function(){var c=!0;if(a(".kama_input_width_for_period").each(function(){if(!isNumericBetween(parseInt(a(this).val()),parseInt(a(this).attr("min")),parseInt(a(this).attr("max")))){var b=a(this);return require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+b.attr("min")+" to "+b.attr("max")+" is allowed for "+b.closest("tr").find("td:first").text()+"!"})}),void(c=!1)}}),c){var d={period:parseInt(e.find("#kama_period").val()),fastPeriod:parseInt(e.find("#kama_fast_period").val()),slowPeriod:parseInt(e.find("#kama_slow_period").val()),stroke:f,strokeWidth:parseInt(e.find("#kama_strokeWidth").val()),dashStyle:g,appliedTo:parseInt(e.find("#kama_appliedTo").val())};a(a(".kama").data("refererChartID")).highcharts().series[0].addIndicator("kama",d),b.call(e)}}},{text:"Cancel",click:function(){b.call(this)}}]}),a.isFunction(d)&&d(c)})}return{open:function(b){return 0==a(".kama").length?void c(b,this.open):void a(".kama").data("refererChartID",b).dialog("open")}}});