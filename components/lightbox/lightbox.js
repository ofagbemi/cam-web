var _ = require('underscore');
var $ = require('jquery');

function Lightbox() {
  this.$el = $('<div/>', {
    id: 'lightbox'
  });

  this.$content = $('<div/>', {
    'class': 'content'
  }).appendTo(this.$el);

  $('body').append(this.$el);
}

Lightbox.prototype.show = function(el, callback) {
  this.$showEl = $(el);
  this.$content.empty().append(this.$showEl);
  this.$el.addClass('show');

  setTimeout(_.bind(function() {
    callback = callback || _.noop;
    callback();
    setTimeout(_.bind(function() {
      this.$content.addClass('show');
    }, this));
  }, this), 600);
};

module.exports = new Lightbox();
