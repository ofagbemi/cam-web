function Gallery($el) {
  this.$el = $el;
}

Gallery.prototype.init = function() {
  if (this._init) { return; }
  this._init = true;

  this.$grid = this.$el.find('.grid');
  this.masonry();
};

Gallery.prototype.masonry = function() {
  var msnry = new Masonry( this.$grid.get(0), {
    itemSelector: '.grid-item',
    columnWidth: 150,
    transitionDuration: 0
  });
//  this.$grid.masonry({
//    itemSelector: '.grid-item',
//    columnWidth: 150
//  });
};

module.exports = Gallery;
