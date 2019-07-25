'use strict';

(function () {
  var mapEl = document.querySelector('.map');
  var mapPinMain = mapEl.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  var getCoordsAddressPinMain = function () {
    var mapPinMainWidth = mapPinMain.offsetWidth;
    var mapPinMainHeight = 0;
    var mapPinMainStyle = getComputedStyle(mapPinMain);

    var mapPinMainCoords = {
      x: parseInt(mapPinMainStyle.left, 10),
      y: parseInt(mapPinMainStyle.top, 10)
    };

    var addressCoords = {
      x: mapPinMainCoords.x + Math.round(mapPinMainWidth / 2),
      y: 0
    };

    if (mapEl.classList.contains('map--faded')) {
      mapPinMainHeight = 65;
      addressCoords.y = mapPinMainCoords.y + Math.round(mapPinMainHeight / 2);
    } else {
      mapPinMainHeight = 87;
      addressCoords.y = mapPinMainCoords.y + mapPinMainHeight;
    }

    return addressCoords;
  };

  window.showAddress = function () {
    var inputAddress = adForm.querySelector('#address');
    var coords = getCoordsAddressPinMain();

    inputAddress.value = coords.x + ', ' + coords.y;
  };
})();
