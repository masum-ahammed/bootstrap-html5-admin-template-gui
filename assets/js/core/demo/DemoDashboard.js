(function (namespace, $) {
	"use strict";

	var DemoDashboard = function () {
		// Create reference to this instance
		var o = this;
		// Initialize app when document is ready
		$(document).ready(function () {
			o.initialize();
		});

	};
	var p = DemoDashboard.prototype;

	// =========================================================================
	// MEMBERS
	// =========================================================================

	p.rickshawSeries = [[], []];
	p.rickshawGraph = null;
	p.rickshawRandomData = null;
	p.rickshawTimer = null;

	// =========================================================================
	// INIT
	// =========================================================================

	p.initialize = function () {
		this._equalHeightRows();
		this._initMorris();

		//this._initFlotVisitors();
		//this._initRickshaw();
		//this._initKnob();
		//this._initFlotRegistration();
	};

	p._equalHeightRows = function(){
		var screenHeight = $('#base').outerHeight() - 135;
		console.log('screen height : '+ screenHeight);
		var rowHeight = screenHeight/2;
		console.log('rowHeight : '+ rowHeight);
		$('.section-body > .row').height(rowHeight);
	}
	// =========================================================================
	// Sparklines
	// =========================================================================

	p._initSparklines = function () {
		// Generate random sparkline data
		var points = [20, 10, 25, 15, 30, 20, 30, 10, 15, 10, 20, 25, 25, 15, 20, 25, 10, 67, 10, 20, 25, 15, 25, 97, 10, 30, 10, 38, 20, 15, 82, 44, 20, 25, 20, 10, 20, 38];

		materialadmin.App.callOnResize(function () {
			var options = $('.sparkline-revenue').data();
			options.type = 'line';
			options.width = '100%';
			options.height = $('.sparkline-revenue').height() + 'px';
			options.fillColor = false;
			$('.sparkline-revenue').sparkline(points, options);
		});

		materialadmin.App.callOnResize(function () {
			var parent = $('.sparkline-visits').closest('.card-body');
			var barWidth = 6;
			var spacing = (parent.width() - (points.length * barWidth)) / points.length;

			var options = $('.sparkline-visits').data();
			options.type = 'bar';
			options.barWidth = barWidth;
			options.barSpacing = spacing;
			options.height = $('.sparkline-visits').height() + 'px';
			options.fillColor = false;
			$('.sparkline-visits').sparkline(points, options);
		});
	};
	p._initMorris = function () {
		if (typeof Morris !== 'object') {
			return;
		}

		// Morris Donut demo
		if ($('#morris-donut-graph').length > 0) {
			Morris.Donut({
				element: 'morris-donut-graph',
				data: [
					{value: 70, label: 'foo', formatted: 'at least 70%'},
					{value: 15, label: 'bar', formatted: 'approx. 15%'},
					{value: 10, label: 'baz', formatted: 'approx. 10%'},
					{value: 5, label: 'A really really long label', formatted: 'at most 5%'}
				],
				colors: $('#morris-donut-graph').data('colors').split(','),
				formatter: function (x, data) {
					return data.formatted;
				}
			});
		}

		// Morris line demo
		if ($('#morris-line-graph').length > 0) {
			var decimal_data = [];
			for (var x = 0; x <= 360; x += 10) {
				decimal_data.push({
					x: x,
					y: 1.5 + 1.5 * Math.sin(Math.PI * x / 180).toFixed(4)
				});
			}
			window.m = Morris.Line({
				element: 'morris-line-graph',
				data: decimal_data,
				xkey: 'x',
				ykeys: ['y'],
				labels: ['sin(x)'],
				parseTime: false,
				resize: true,
				lineColors: $('#morris-line-graph').data('colors').split(','),
				hoverCallback: function (index, options, default_content) {
					var row = options.data[index];
					return default_content.replace("sin(x)", "1.5 + 1.5 sin(" + row.x + ")");
				},
				xLabelMargin: 10,
				integerYLabels: true
			});
		}

		// Morris Bar demo
		if ($('#fuel-efficiency-bar-graph').length > 0) {
			Morris.Bar({
				element: 'fuel-efficiency-bar-graph',
				data: [
					{x: '2011 Q1', y: 3, z: 2, a: 3},
					{x: '2011 Q2', y: 2, z: null, a: 1},
					{x: '2011 Q3', y: 0, z: 2, a: 4},
					{x: '2011 Q4', y: 2, z: 4, a: 3}
				],
				xkey: 'x',
				ykeys: ['y', 'z', 'a'],
				labels: ['Y', 'Z', 'A'],
				barColors: $('#fuel-efficiency-bar-graph').data('colors').split(',')
			});
		}

		if ($('#productive-efficiency-bar-graph').length > 0) {
			Morris.Bar({
				element: 'productive-efficiency-bar-graph',
				data: [
					{x: '2011 Q1', y: 3, z: 2, a: 3},
					{x: '2011 Q2', y: 2, z: null, a: 1},
					{x: '2011 Q3', y: 0, z: 2, a: 4},
					{x: '2011 Q4', y: 2, z: 4, a: 3}
				],
				xkey: 'x',
				ykeys: ['y', 'z', 'a'],
				labels: ['Y', 'Z', 'A'],
				barColors: $('#productive-efficiency-bar-graph').data('colors').split(',')
			});
		}
		//deviation-bar-graph
		if ($('#deviation-bar-graph').length > 0) {
			Morris.Bar({
				element: 'deviation-bar-graph',
				data: [
					{x: '2011 Q1', y: 3, z: 2, a: 3},
					{x: '2011 Q2', y: 2, z: null, a: 1},
					{x: '2011 Q3', y: 0, z: 2, a: 4},
					{x: '2011 Q4', y: 2, z: 4, a: 3}
				],
				xkey: 'x',
				ykeys: ['y', 'z', 'a'],
				labels: ['Y', 'Z', 'A'],
				barColors: $('#deviation-bar-graph').data('colors').split(',')
			});
		}

		//maintenance-cost-bar-graph
		if ($('#maintenance-cost-bar-graph').length > 0) {
			Morris.Bar({
				element: 'maintenance-cost-bar-graph',
				data: [
					{x: '2011 Q1', y: 6, z: 2, a: 6},
					{x: '2011 Q2', y: 2, z: null, a: 1},
					{x: '2011 Q3', y: 0, z: 2, a: 4},
					{x: '2011 Q4', y: 4, z: 8, a: 4}
				],
				xkey: 'x',
				ykeys: ['y', 'z', 'a'],
				labels: ['Y', 'Z', 'A'],
				barColors: $('#maintenance-cost-bar-graph').data('colors').split(',')
			});
		}
		// Morris stacked bar demo
		if ($('#morris-stacked-bar-graph').length > 0) {
			Morris.Bar({
				element: 'morris-stacked-bar-graph',
				data: [
					{x: '2011 Q1', y: 3, z: 2, a: 3},
					{x: '2011 Q2', y: 2, z: null, a: 1},
					{x: '2011 Q3', y: 0, z: 2, a: 4},
					{x: '2011 Q4', y: 2, z: 4, a: 3}
				],
				xkey: 'x',
				ykeys: ['y', 'z', 'a'],
				labels: ['Y', 'Z', 'A'],
				stacked: true,
				barColors: $('#morris-stacked-bar-graph').data('colors').split(',')
			});
		}

		// Morris Area demo
		if ($('#morris-area-graph').length > 0) {
			var labelColor = $('#morris-area-graph').css('color');
			Morris.Area({
				element: 'morris-area-graph',
				behaveLikeLine: true,
				data: [
					{x: '2011 Q1', y: 3, z: 3},
					{x: '2011 Q2', y: 2, z: 1},
					{x: '2011 Q3', y: 2, z: 4},
					{x: '2011 Q4', y: 3, z: 3}
				],
				xkey: 'x',
				ykeys: ['y', 'z'],
				labels: ['Y', 'Z'],
				gridTextColor: labelColor,
				lineColors: $('#morris-area-graph').data('colors').split(',')
			});
		}
	};
	// =========================================================================
	// FLOT
	// =========================================================================

	p._initFlotVisitors = function () {
		var o = this;
		var chart = $("#flot-visitors");
		
		// Elements check
		if (!$.isFunction($.fn.plot) || chart.length === 0) {
			return;
		}
		
		// Chart data
		var data = [
			{
				label: 'Pageviews',
				data: [
					[moment().subtract(168, 'hours').valueOf(), 50],
					[moment().subtract(144, 'hours').valueOf(), 620],
					[moment().subtract(108, 'hours').valueOf(), 380],
					[moment().subtract(70, 'hours').valueOf(), 880],
					[moment().subtract(30, 'hours').valueOf(), 450],
					[moment().subtract(12, 'hours').valueOf(), 600],
					[moment().valueOf(), 20]
				],
				last: true
			},
			{
				label: 'Visitors',
				data: [
					[moment().subtract(168, 'hours').valueOf(), 50],
					[moment().subtract(155, 'hours').valueOf(), 520],
					[moment().subtract(132, 'hours').valueOf(), 200],
					[moment().subtract(36, 'hours').valueOf(), 800],
					[moment().subtract(12, 'hours').valueOf(), 150],
					[moment().valueOf(), 20]
				],
				last: true
			}
		];
		
		// Chart options
		var labelColor = chart.css('color');
		var options = {
			colors: chart.data('color').split(','),
			series: {
				shadowSize: 0,
				lines: {
					show: true,
					lineWidth: false,
					fill: true
				},
				curvedLines: {
					apply: true,
					active: true,
					monotonicFit: false
			   }
			},
			legend: {
				container: $('#flot-visitors-legend')
			},
			xaxis: {
				mode: "time",
				timeformat: "%d %b",
				font: {color: labelColor}
			},
			yaxis: {
				font: {color: labelColor}
			},
			grid: {
				borderWidth: 0,
				color: labelColor,
				hoverable: true
			}
		};
		chart.width('100%');
		
		// Create chart
		var plot = $.plot(chart, data, options);

		// Hover function
		var tip, previousPoint = null;
		chart.bind("plothover", function (event, pos, item) {
			if (item) {
				if (previousPoint !== item.dataIndex) {
					previousPoint = item.dataIndex;

					var x = item.datapoint[0];
					var y = item.datapoint[1];
					var tipLabel = '<strong>' + $(this).data('title') + '</strong>';
					var tipContent = Math.round(y) + " " + item.series.label.toLowerCase() + " on " + moment(x).format('dddd');

					if (tip !== undefined) {
						$(tip).popover('destroy');
					}
					tip = $('<div></div>').appendTo('body').css({left: item.pageX, top: item.pageY - 5, position: 'absolute'});
					tip.popover({html: true, title: tipLabel, content: tipContent, placement: 'top'}).popover('show');
				}
			}
			else {
				if (tip !== undefined) {
					$(tip).popover('destroy');
				}
				previousPoint = null;
			}
		});
	};

	// =========================================================================
	// Rickshaw
	// =========================================================================

	p._initRickshaw = function () {
		// Don't init a rickshaw graph twice
		if (this.rickshawGraph !== null) {
			return;
		}

		var o = this;

		// Create random data
		this.rickshawRandomData = new Rickshaw.Fixtures.RandomData(50);
		for (var i = 0; i < 75; i++) {
			this.rickshawRandomData.addData(this.rickshawSeries);
		}
		
		// Update knob charts
		this._updateKnob();

		// Init Richshaw graph
		this.rickshawGraph = new Rickshaw.Graph({
			element: $('#rickshawGraph').get(0),
			width: $('#rickshawGraph').closest('.card-body').width(),
			height: $('#rickshawGraph').height(),
			interpolation: 'linear',
			renderer: 'area',
			series: [
				{
					data: this.rickshawSeries[0],
					color: $('#rickshawGraph').data('color1'),
					name: 'temperature'
				}, {
					data: this.rickshawSeries[1],
					color: $('#rickshawGraph').data('color2'),
					name: 'heat index'
				}
			]
		});

		// Add hover info
		var hoverDetail = new Rickshaw.Graph.HoverDetail({
			graph: this.rickshawGraph
		});

		// Render graph
		this.rickshawGraph.render();

		// Add animated data
		clearInterval(this.rickshawTimer);
		this.rickshawTimer = setInterval(function () {
			o._refreshRickshaw();
		}, 2000);

		materialadmin.App.callOnResize(function () {
			o.rickshawGraph.configure({
				height: $('#rickshawGraph').height(),
				width: $('#rickshawGraph').closest('.card-body').outerWidth()
			});
			o.rickshawGraph.render();
		});
	};

	p._refreshRickshaw = function () {
		this.rickshawRandomData.removeData(this.rickshawSeries);
		this.rickshawRandomData.addData(this.rickshawSeries);
		this.rickshawGraph.update();
		this._updateKnob();
	};

	// =========================================================================
	// KNOB
	// =========================================================================

	p._initKnob = function () {
		if (!$.isFunction($.fn.knob)) {
			return;
		}

		$('.dial').each(function () {
			var options = materialadmin.App.getKnobStyle($(this));
			$(this).knob(options);
		});
	};

	p._updateKnob = function () {
		var val1 = this.rickshawSeries[0][this.rickshawSeries[0].length - 2];
		var val2 = this.rickshawSeries[0][this.rickshawSeries[0].length - 1];

		$({animatedVal: val1.y}).animate({animatedVal: val2.y}, {
			duration: 1200,
			easing: "swing",
			step: function () {
				$('#serverStatusKnob input').val(Math.ceil(this.animatedVal)).trigger("change");
			}
		});
	};
	
	// =========================================================================
	// FLOT
	// =========================================================================

	p._initFlotRegistration = function () {
		var o = this;
		var chart = $("#flot-registrations");
		
		// Elements check
		if (!$.isFunction($.fn.plot) || chart.length === 0) {
			return;
		}
		
		// Chart data
		var data = [
			{
				label: 'Registrations',
				data: [
					[moment().subtract(11, 'month').valueOf(), 1100],
					[moment().subtract(10, 'month').valueOf(), 2450],
					[moment().subtract(9, 'month').valueOf(), 3800],
					[moment().subtract(8, 'month').valueOf(), 2650],
					[moment().subtract(7, 'month').valueOf(), 3905],
					[moment().subtract(6, 'month').valueOf(), 5250],
					[moment().subtract(5, 'month').valueOf(), 3600],
					[moment().subtract(4, 'month').valueOf(), 4900],
					[moment().subtract(3, 'month').valueOf(), 6200],
					[moment().subtract(2, 'month').valueOf(), 5195],
					[moment().subtract(1, 'month').valueOf(), 6500],
					[moment().valueOf(), 7805]
				],
				last: true
			}
		];

		// Chart options
		var labelColor = chart.css('color');
		var options = {
			colors: chart.data('color').split(','),
			series: {
				shadowSize: 0,
				lines: {
					show: true,
					lineWidth: 2
				},
				points: {
					show: true,
					radius: 3,
					lineWidth: 2
				}
			},
			legend: {
				show: false
			},
			xaxis: {
				mode: "time",
				timeformat: "%b %y",
				color: 'rgba(0, 0, 0, 0)',
				font: {color: labelColor}
			},
			yaxis: {
				font: {color: labelColor}
			},
			grid: {
				borderWidth: 0,
				color: labelColor,
				hoverable: true
			}
		};
		chart.width('100%');
		
		// Create chart
		var plot = $.plot(chart, data, options);

		// Hover function
		var tip, previousPoint = null;
		chart.bind("plothover", function (event, pos, item) {
			if (item) {
				if (previousPoint !== item.dataIndex) {
					previousPoint = item.dataIndex;

					var x = item.datapoint[0];
					var y = item.datapoint[1];
					var tipLabel = '<strong>' + $(this).data('title') + '</strong>';
					var tipContent = y + " " + item.series.label.toLowerCase() + " on " + moment(x).format('dddd');

					if (tip !== undefined) {
						$(tip).popover('destroy');
					}
					tip = $('<div></div>').appendTo('body').css({left: item.pageX, top: item.pageY - 5, position: 'absolute'});
					tip.popover({html: true, title: tipLabel, content: tipContent, placement: 'top'}).popover('show');
				}
			}
			else {
				if (tip !== undefined) {
					$(tip).popover('destroy');
				}
				previousPoint = null;
			}
		});
	};

	// =========================================================================
	namespace.DemoDashboard = new DemoDashboard;
}(this.materialadmin, jQuery)); // pass in (namespace, jQuery):
