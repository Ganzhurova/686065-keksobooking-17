'use strict';

window.supportFunction = (function () {
  var getArr = function (min, max) {
    var arr = [];

    for (var i = min; i <= max; i++) {
      arr.push(i);
    }

    return arr;
  };

  var getRandomValue = function (arr, isNotRepeat) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    if (isNotRepeat) {
      var removableArr = arr.splice(randomIndex, 1);
      var value = removableArr[0];
      return value;
    } else {
      value = arr[randomIndex];
      return value;
    }
  };

  var getArrayQuantity = function (arr) {
    var arrayQuantity = arr.map(function (arrItem, index) {
      var quantity = index + 1;
      return quantity;
    });

    return arrayQuantity;
  };

  var getArrayRandomLength = function (arr) {
    var randomNumber = getRandomValue(getArrayQuantity(arr), false);
    var randomArray = arr.slice(0, randomNumber);
    return randomArray;
  };

  return {
    getArr: getArr,
    getRandomValue: getRandomValue,
    getArrayRandomLength: getArrayRandomLength
  };
})();
