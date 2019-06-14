'use strict';

(function () {
  var HOUSING_TYPE = ['palace', 'flat', 'house', 'bungalo'];

  var removeClass = function (element, removeClassName) {
    element.classList.remove(removeClassName);
  };

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

  var getMapPinsArr = function (element, quantity) {
    var arr = [];

    var avatarNumbers = getArr(1, 8);

    var heightMapPin = 70;
    var topMapPinY = 130;
    var bottomMapPinY = 630;
    var leftX = 0;
    var rightX = element.clientWidth;
    var topY = topMapPinY + heightMapPin;
    var bottomY = bottomMapPinY + heightMapPin;
    var arrX = getArr(leftX, rightX);
    var arrY = getArr(topY, bottomY);

    for (var i = 0; i < quantity; i++) {
      var avatarNumberValue = getRandomValue(avatarNumbers, true);
      var userAvatarNumber = '0' + String(avatarNumberValue);

      var housingType = getRandomValue(HOUSING_TYPE, false);

      var x = getRandomValue(arrX, false);
      var y = getRandomValue(arrY, false);

      var mapPin = {
        author: {
          avatar: 'img/avatars/user' + userAvatarNumber + '.png'
        },
        offer: {
          type: housingType
        },
        location: {
          x: x,
          y: y
        }
      };

      arr.push(mapPin);
    }

    return arr;
  };

  var renderMapPin = function (mapPin, templatePin) {
    var mapPinElement = templatePin.cloneNode(true);
    var mapPinImg = mapPinElement.querySelector('img');

    var widthMapPin = 50;
    var heightMapPin = 70;
    var x = mapPin.location.x - widthMapPin / 2;
    var y = mapPin.location.y - heightMapPin;

    mapPinElement.style = 'left: ' + x + 'px; top: ' + y + 'px;';
    mapPinImg.src = mapPin.author.avatar;
    mapPinImg.alt = '';

    return mapPinElement;
  };

  var showMapPins = function (element) {
    var mapPinsListElement = element.querySelector('.map__pins');
    var mapPinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

    var fragment = document.createDocumentFragment();

    var numberMapPins = 8;
    var mapPins = getMapPinsArr(element, numberMapPins);

    for (var i = 0; i < mapPins.length; i++) {
      fragment.appendChild(renderMapPin(mapPins[i], mapPinTemplate));
    }
    mapPinsListElement.appendChild(fragment);
  };

  var showMap = function (element) {
    removeClass(element, 'map--faded');
  };

  var initModule = function () {
    var map = document.querySelector('.map');

    showMap(map);
    showMapPins(map);
  };

  initModule();
})();
