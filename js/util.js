'use strict';

(function () {
  var KEY_ENTER = 'Enter';

  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomItem = function (array) {
    return array[getRandomValue(0, array.length - 1)];
  };

  var getArrayRandomLength = function (array) {
    var randomValue = getRandomValue(0, array.length - 1);
    var arrayRendomLength = [];
    for (var i = 0; i < randomValue; i++) {
      arrayRendomLength.push(getRandomItem(array));
    }
    return arrayRendomLength;
  };

  window.util = {
    getRandomValue: getRandomValue,
    getRandomItem: getRandomItem,
    getArrayRandomLength: getArrayRandomLength,
    KEY_ENTER: KEY_ENTER,
  };
})();
