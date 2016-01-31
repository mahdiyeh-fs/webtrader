define(["jquery","jquery-ui","color-picker","ddslick"],function(a){function b(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function c(c,d){require(["css!charts/indicators/rocr/rocr.css"]);var e=[];require(["text!charts/indicators/rocr/rocr.html"],function(f){var g="#cd0a0a";f=a(f),f.appendTo("body"),f.find("input[type='button']").button(),f.find("#rocr_stroke").colorpicker({part:{map:{size:128},bar:{size:128}},select:function(b,c){a("#rocr_stroke").css({background:"#"+c.formatted}).val(""),g="#"+c.formatted},ok:function(b,c){a("#rocr_stroke").css({background:"#"+c.formatted}).val(""),g="#"+c.formatted}});var h="Solid";a("#rocr_dashStyle").ddslick({imagePosition:"left",width:118,background:"white",onSelected:function(b){a("#rocr_dashStyle .dd-selected-image").css("max-width","85px"),h=b.selectedData.value}}),a("#rocr_dashStyle .dd-option-image").css("max-width","85px");var i=f.find("#rocr_levels").DataTable({paging:!1,scrollY:100,autoWidth:!0,searching:!1,info:!1,columnDefs:[{className:"dt-center",targets:[0,1,2,3]}],aoColumnDefs:[{bSortable:!1,aTargets:[1,3]}]});a.each(e,function(b,c){a(i.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})}),f.find("#rocr_level_delete").click(function(){i.rows(".selected").indexes().length<=0?require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Select levels to delete!"})}):i.rows(".selected").remove().draw()}),f.find("#rocr_level_add").click(function(){require(["charts/indicators/rocr/rocr_level"],function(b){b.open(c,function(b){a.each(b,function(b,c){a(i.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})})})})}),f.dialog({autoOpen:!1,resizable:!1,width:350,modal:!0,my:"center",at:"center",of:window,dialogClass:"rocr-ui-dialog",buttons:[{text:"OK",click:function(){if(!isNumericBetween(f.find(".rocr_input_width_for_period").val(),parseInt(f.find(".rocr_input_width_for_period").attr("min")),parseInt(f.find(".rocr_input_width_for_period").attr("max"))))return void require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+f.find(".rocr_input_width_for_period").attr("min")+" to "+f.find(".rocr_input_width_for_period").attr("max")+" is allowed for "+f.find(".rocr_input_width_for_period").closest("tr").find("td:first").text()+"!"})});var c=[];a.each(i.rows().nodes(),function(){var b=a(this).data("level");b&&c.push({color:b.stroke,dashStyle:b.dashStyle,width:b.strokeWidth,value:b.level,label:{text:b.level}})});var d={period:parseInt(f.find(".rocr_input_width_for_period").val()),stroke:g,strokeWidth:parseInt(f.find("#rocr_strokeWidth").val()),dashStyle:h,levels:c};a(a(".rocr").data("refererChartID")).highcharts().series[0].addIndicator("rocr",d),b.call(f)}},{text:"Cancel",click:function(){b.call(this)}}]}),"function"==typeof d&&d(c)})}return{open:function(b){return 0==a(".rocr").length?void c(b,this.open):void a(".rocr").data("refererChartID",b).dialog("open")}}});