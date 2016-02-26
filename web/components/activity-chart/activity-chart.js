var _ = require('underscore');
var $ = require('jquery');
var Chart = require('chart.js');


Chart.defaults.global.animation = false;
_.extend(Chart.defaults.global, {
  animation: false,
  scaleBeginAtZero: true
});

ActivityChart.CHART_OPTIONS = {

  ///Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines : true,

  //String - Colour of the grid lines
  scaleGridLineColor : "rgba(0,0,0,.05)",

  //Number - Width of the grid lines
  scaleGridLineWidth : 1,

  //Boolean - Whether to show horizontal lines (except X axis)
  scaleShowHorizontalLines: true,

  //Boolean - Whether to show vertical lines (except Y axis)
  scaleShowVerticalLines: true,

  //Boolean - Whether the line is curved between points
  bezierCurve : true,

  //Number - Tension of the bezier curve between points
  bezierCurveTension : 0.4,

  //Boolean - Whether to show a dot for each point
  pointDot : true,

  //Number - Radius of each point dot in pixels
  pointDotRadius : 4,

  //Number - Pixel width of point dot stroke
  pointDotStrokeWidth : 1,

  //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
  pointHitDetectionRadius : 20,

  //Boolean - Whether to show a stroke for datasets
  datasetStroke : true,

  //Number - Pixel width of dataset stroke
  datasetStrokeWidth : 2,

  //Boolean - Whether to fill the dataset with a colour
  datasetFill : true

};

function ActivityChart($el) {
  this.$el = $el;
}

ActivityChart.prototype.init = function() {
  if (this._init) { return; }
  this._init = true;

  this.data = JSON.parse(this.$el.find('script.data').html());

  this.$canvas = this.$el.find('canvas.chart');
  this.context = this.$canvas.get(0).getContext('2d');

  this.chart = this.initializeChart(this.context);

  this.$legendUsers = this.$el.find('.legend .user');
  this.$legendUsers.on('click', {
    activityChart: this
  }, this._handleLegendUserClick);
};


ActivityChart.prototype._handleLegendUserClick = function(e) {
  var activityChart = e.data.activityChart;

  var $this = $(this);


  // TODO: name might not be unique
  var name = $this.attr('data-name');

  if ($this.hasClass('active')) {
    activityChart.deselect(name);
    $this.removeClass('active');
  } else {
    activityChart.select(name);
    activityChart.$legendUsers.filter('.active').removeClass('active');
    $this.addClass('active')

  }
};

ActivityChart.prototype.select = function(name) {
  var selected = _.findWhere(this.chart.datasets, {label: name});
  if (selected) {
    selected.strokeColor = _.findWhere(this.data, {name: name}).color;
  } else { return; }

  var notSelected = _.reject(this.chart.datasets, function(data) {
    return data.label === name;
  });
  if (notSelected.length) {
    _.each(notSelected, function(user) {
      user.strokeColor = 'transparent';
    });
  }
  this.chart.update();
};

ActivityChart.prototype.deselect = function(name) {
  var deselected = _.findWhere(this.chart.datasets, {label: name});
  if (deselected) {
    _.each(this.chart.datasets, _.bind(function(user) {
      user.strokeColor = _.findWhere(this.data, {name: user.label}).color;
    }, this));
  }
  this.chart.update();
};

ActivityChart.prototype.initializeChart = function(context) {

  var datasets = this.data.map(function(user) {
    return {
      label: user.name,
      data: user.points,
      fillColor: "transparent",
      strokeColor: user.color,
      pointColor: user.color,
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)"
    };
  });

  var data = {
    labels: [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August', 'September',
      'October', 'November', 'December'],
    datasets: datasets
  };

  return new Chart(context).Line(data, ActivityChart.CHART_OPTIONS);
};

module.exports = ActivityChart;
