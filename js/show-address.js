'use strict';

(function () {
  var mapEl = document.querySelector('.map');
  var mapPinMain = mapEl.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  var getCoordsAddressPinMain = function () {
    var mapPinMainWidth = mapPinMain.offsetWidth;
    var mapPinMainHeight = mapPinMain.offsetHeight;
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
      addressCoords.y = mapPinMainCoords.y + Math.round(mapPinMainHeight / 2);
    } else {
      var pseudoAfterHeight = parseInt(getComputedStyle(mapPinMain, ':after').height, 10);

      mapPinMainHeight += pseudoAfterHeight;
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
