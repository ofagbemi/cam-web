exports.json = function(obj) {
  return JSON.stringify(obj);
};

exports.xif = function(l, op, r, options) {
  switch(op) {
    case '===':
      return l === r ? options.fn(this) : options.inverse(this);
    case '>':
      return l > r ? options.fn(this) : options.inverse(this);
    case '<':
      return l < r ? options.fn(this) : options.inverse(this);
  }
};
