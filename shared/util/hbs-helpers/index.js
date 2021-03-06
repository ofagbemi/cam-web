exports.head = function(options) {
  this._extend_head = options.fn(this);
  return null;
}

/**
 * Taken from http://jsfiddle.net/mpetrovich/wMmHS/
 */
exports.math = function(lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue) || 0;
  rvalue = parseFloat(rvalue) || 0;

  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue
  }[operator];
};

exports.valueAt = function(key, object) {
  if (object && (key !== undefined)) {
    return object[key];
  }
};

exports.json = function(obj) {
  return JSON.stringify(obj);
};

exports.xif = function(l, op, r, options) {
  var success = false;
  switch(op) {
    case '===':
      success = l === r;
      break;
    case '>':
      success = l > r;
      break;
    case '<':
      success = l < r;
      break;
    case '&&':
      success = l && r;
      break;
    case 'contains':
      l = l || [];
      success = l.indexOf(r) !== -1;
      break;
  }

  return success ? options.fn(this) : options.inverse(this);
};

/**
 * Taken from https://github.com/SparkartGroupInc/handlebars-helper/blob/master/lib/helpers/reverse.js
 */
exports.eachReverse = function(collection, options) {
  var result = '';
  collection = collection || [];
  for(var i = collection.length - 1; i >= 0; i--) {
    result += options.fn( collection[i] );
  }
  return result;
};
