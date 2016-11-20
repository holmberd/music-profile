/**
 * Sort Module
 * Sorts an array of elements in descending order of number of times they occur.
 * 
 * Dag Holmberg
 * https://github.com/holmberd
 */

/*jshint node: true */
/*jshint esversion: 6 */

'use strict';

var Sort = function() {
  this.listMap = new Map();
};

/**
 * Sorts an `array` of elements after number of times they occur.
 * Returns an `array` with the elements in descending order.
 * @param  {array}
 * @return {array}
 */
 Sort.prototype.mapSort = function(array, options) {
  var _keyValues = [], _sortedKeyValues = [], _keys = [];

  for (var i = 0, len = array.length; i < len; i++) {
    this.update(array[i]); // Array to Map.
  }

  /** 
  * Prior ES6 solution, instead of 'spread' or 'Array.from'.
  *
  * this.listMap.forEach(function(value, key) {
  *   _arr.push([key, value]);
  * }, this.listMap);
  */
  _keyValues = [...this.listMap]; // Spread Map to 2D key-value array.
  _sortedKeyValues = this.sortDesc(_keyValues); // Sort key-value array.

  if (options.isKeyValue) {
    return _sortedKeyValues;
  }

  // Cleans array key-value from value.
  for (var k = 0, s = _sortedKeyValues.length; k < s; k++){
    _keys[k] = _sortedKeyValues[k][0];
  }
  return _keys;
};

Sort.prototype.update = function(g){
  
  if (this.listMap.has(g)){
    var num = this.listMap.get(g);
    num++;
    this.listMap.set(g, num);
  }
  else {
    this.listMap.set(g, 1);
  }
};

/**
 * Sorts array numbers in descending order.
 * @param  {2D key-value Array}
 * @return {2D key-value Array}
 */
Sort.prototype.sortDesc = function(a){
  var c = [];
  for (var i = 0, len = a.length; i < len; ++i) {
    for (var j = i + 1, n = a.length; j < n; ++j) {
      if (a[i][1] < a[j][1]) {
        c = a[i];
        a[i] = a[j];
        a[j] = c;
      }
    }
  }
  return a;
};

module.exports = Sort;