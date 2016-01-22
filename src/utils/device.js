'use strict';

import {Dimensions} from 'react-native';

// ----------------
// public methods
// ----------------

function isTablet() {
  var dimensions = Dimensions.get('window'),
      w = dimensions.width,
      h = dimensions.height,
      checkBy = w;

  if (w > h) {
    checkBy = h;
  }
  return checkBy > 750;
}

function size(value) {
  value = Number(value);
  return isTablet() ? value * 1.1 : value;
}

function fontSize(value) {
  value = Number(value);
  return isTablet() ? value * 1.15 : value;
}

// ---------
// interface
// ---------

export {
  isTablet,
  size,
  fontSize
};
