'use strict';

(function () {
  var HOUSING_TYPE = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  var TIME = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var mapEl = document.querySelector('.map');

  var pin = {
    height: 70,
    topY: 130,
    bottomY: 630
  };

  var coords = {
    leftX: 0,
    rightX: mapEl.clientWidth,
    topY: pin.topY + pin.height,
    bottomY: pin.bottomY + pin.height
  };

  var maxNumberAvatars = 8;

  var avatarNumbers = window.supportFunction.getArr(1, maxNumberAvatars);

  var arrX = window.supportFunction.getArr(coords.leftX, coords.rightX);
  var arrY = window.supportFunction.getArr(coords.topY, coords.bottomY);

  var DataObj = function () {
    this._render(this._getCoord(arrX), this._getCoord(arrY));
  };

  DataObj.prototype = {
    title: 'Миленькое помещение',
    price: 10000,
    rooms: 4,
    guests: 3,

    _render: function (x, y) {
      this.author = {
        avatar: 'img/avatars/user' + this._getUserAvatarNumber() + '.png'
      };
      this.offer = {
        title: this.title,
        address: String(x) + ', ' + String(y),
        price: this.price,
        type: window.supportFunction.getRandomValue(HOUSING_TYPE, false),
        rooms: this.rooms,
        guests: this.guests,
        checkin: window.supportFunction.getRandomValue(TIME, false),
        checkout: window.supportFunction.getRandomValue(TIME, false),
        features: window.supportFunction.getArrayRandomLength(FEATURES),
        description: 'Рядом стадион',
        photos: window.supportFunction.getArrayRandomLength(photos)
      };
      this.location = {
        x: x,
        y: y
      };
    },

    _getUserAvatarNumber: function () {
      var userAvatarNumber = '0' + String(window.supportFunction.getRandomValue(avatarNumbers, true));

      return userAvatarNumber;
    },

    _getCoord: function (arr) {
      var coord = window.supportFunction.getRandomValue(arr, false);

      return coord;
    }
  };

  var createData = function () {
    var data = [];

    for (var i = 0; i < maxNumberAvatars; i++) {
      var objData = new DataObj();

      data.push(objData);
    }

    return data;
  };

  window.data = createData();
})();
