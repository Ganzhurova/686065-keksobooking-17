'use strict';

(function () {
  var HOUSING_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var mapEl = document.querySelector('.map');

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

  var maxNumberAvatars = 8;

  var avatarNumbers = getArr(1, maxNumberAvatars);

  var heightMapPin = 70;
  var topMapPinY = 130;
  var bottomMapPinY = 630;
  var leftX = 0;
  var rightX = mapEl.clientWidth;
  var topY = topMapPinY + heightMapPin;
  var bottomY = bottomMapPinY + heightMapPin;

  var arrX = getArr(leftX, rightX);
  var arrY = getArr(topY, bottomY);

  var createData = function () {
    var data = [];

    for (var i = 0; i < maxNumberAvatars; i++) {
      var objData = {
        userAvatarNumber: '0' + String(getRandomValue(avatarNumbers, true)),
        housingType: getRandomValue(HOUSING_TYPE, false),
        x: getRandomValue(arrX, false),
        y: getRandomValue(arrY, false)
      };

      data.push(objData);
    }

    return data;
  };

  window.data = createData();
})();
