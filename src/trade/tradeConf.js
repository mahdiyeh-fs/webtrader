﻿/*
 * Created by amin on December 4, 2015.
 */

define(['lodash', 'jquery', 'moment', 'websockets/binary_websockets', 'common/rivetsExtra', 'text!trade/tradeConf.html', 'css!trade/tradeConf.css' ],
  function(_, $, moment, liveapi, rv, html){

    rv.binders['tick-chart'] = {
      priority: 65, /* a low priority to apply last */
      bind: function(el) {
          var model = this.model;
          console.warn('rv-tick-chart.bind()',el);
          el.chart = new Highcharts.Chart({
            title: '',
            credits: {enabled: false},
            chart: {
                type: 'line',
                renderTo: el,
                backgroundColor: null,
                width: (el.getAttribute('width') || 350)*1,
                height: (el.getAttribute('height') || 120)*1,
            },
            tooltip: { formatter: function () {
                var tick = model.array[this.x-1];
                return (tick && tick.tooltip) || false;
            }},
            xAxis: {
                type: 'linear',
                min: 1,
                max: el.getAttribute('tick-count')*1 + 1 /* exist spot vertical plot will not be at the end */,
                labels: { enabled: false, }
            },
            yAxis: {
                labels: { align: 'left', x: 0, },
                title: ''
            },
            series: [{ data: [] }],
            exporting: {enabled: false, enableImages: false},
            legend: {enabled: false},
        });
      }, /* end of => bind() */
      routine: function(el, ticks){
        var addPlotLineX = function(chart, options) {
          chart.xAxis[0].addPlotLine({
             value: options.value,
             id: options.id || options.label,
             label: {text: options.label || 'label'},
             color: options.color || '#e98024',
             width: options.width || 2,
          });
        };

        var addPlotLineY = function(chart,tick) {
          chart.yAxis[0].addPlotLine({
            id: 'tick-barrier',
            value: tick.quote*1,
            label: {text: 'Barrier ('+tick.quote+')', align: 'center'},
            color: 'green',
            width: 2,
          });
        };

        var index = ticks.length;
        if(index == 0) return;

        var tick = _.last(ticks);
        el.chart.series[0].addPoint([index, tick.quote*1]);

        if(index === 1) {
           addPlotLineX(el.chart, {value: index, label: 'Entry Spot'});
           addPlotLineY(el.chart, tick);
           el.chart.barrier = tick.quote * 1;
        }
        if(index === el.getAttribute('tick-count')*1) {
          addPlotLineX(el.chart, {value:index, label: 'Exit Spot'});
        }
      } /* end of routine() */
    }

    /* called when the last tick have been received for 'Digits' or 'Up/Down' contracts */
    function ticks_done(state, last_tick) {
      var category = state.ticks.category,
          display = state.ticks.category_display;
      var css = {
            Digits: {
              matches: function(quote,expected) { return _.last(quote) === expected;},
              differs: function(quote,expected) { return _.last(quote) !== expected;}
            },
            'Up/Down': {
              rise: function(quote,expected) { return quote*1 > expected*1; },
              fall: function(quote,expected) { return quote*1 < expected*1; }
            }
          };
        /* set the css class */
        state.ticks.status = css[category][display](last_tick.quote, state.ticks.digits_value) ? 'won' : 'lost';
    }

    function register_ticks(state, passthrough){
      var tick_count = passthrough.tick_count * 1,
          symbol = passthrough.symbol,
          purchase_epoch = state.buy.purchase_time * 1;

      liveapi.events.on('tick', function (data) {
          if (tick_count === 0 || !data.tick || data.tick.symbol !== symbol || data.tick.epoch * 1 < purchase_epoch)
            return;
          var tick = data.tick;
          state.ticks.array.push({
            quote: tick.quote,
            epoch: tick.epoch,
            number: state.ticks.array.length+1,
            tooltip: moment.utc(tick.epoch*1000).format("dddd, MMM D, HH:mm:ss")
          });
          --tick_count;
          if(tick_count === 0) {
              ticks_done(state, _.last(state.ticks.array));
          }
      });
    }

    function init(data, show_callback){
      var root = $(html);
      var buy = data.buy,
          passthrough = data.echo_req.passthrough;
      var state = {
        title: {
          text: 'Contract Confirmation',
        },
        buy: {
          message: buy.longcode,
          balance_after: buy.balance_after,
          buy_price: buy.buy_price,
          purchase_time: buy.purchase_time,
          start_time: buy.start_time,
          transaction_id: buy.transaction_id,
          payout_amount: passthrough.payout_amount,
          currency: passthrough.currency,
          potential_profit : passthrough.payout_amount - buy.buy_price,
        },
        ticks: {
            array: [],
            tick_count: passthrough.tick_count,
            value: passthrough.digits_value * 1 || '0', // last digit value selected by the user
            category: passthrough.category,
            category_display: passthrough.category_display,
            status: 'waiting', /* could be 'waiting', 'lost' or 'won' */
        },
        arrow: { }
      };

      state.title.update = function() {
        state.title.text = { waiting: 'Contract Confirmation',
                              won : 'This contract won',
                              lost: 'This contract lost'
                            }[state.ticks.status];
      };

      if(_(['Digits','Up/Down']).contains(passthrough.category)) {
          register_ticks(state,passthrough);
      }

      console.warn(buy,passthrough);
      state.arrow.onclick = function(){
         $.growl.error({ message: 'Not implement yet!' });
      };

      var view = rv.bind(root[0], state)
      show_callback(root);

      /* TODO: development only! */
      window.state = state;
    }

    return {
      init: init
    }
});
