'use strict';

(function () {
  var LIMIT_TOP_Y = 130;
  var LIMIT_BOTTOM_Y = 630;


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
      x: mapPinMainCoords.x + mapPinMainWidth / 2,
      y: 0
    };

    if (mapEl.classList.contains('map--faded')) {
      mapPinMainHeight = 65;
      addressCoords.y = mapPinMainCoords.y + mapPinMainHeight / 2;
    } else {
      mapPinMainHeight = 87;
      addressCoords.y = mapPinMainCoords.y + mapPinMainHeight;
    }

    return addressCoords;
  };

  var displayAddress = function () {
    var inputAddress = adForm.querySelector('#address');
    var coords = getCoordsAddressPinMain();

    inputAddress.value = coords.x + ', ' + coords.y;
  };

  var getEndCoords = function (moveEvt, mouseOffset) {
    var mapLimitCoords = {
      topY: mapEl.offsetTop + LIMIT_TOP_Y,
      rightX: mapEl.offsetLeft + mapEl.offsetWidth - mapPinMain.offsetWidth,
      bottomY: mapEl.offsetTop + LIMIT_BOTTOM_Y,
      leftX: mapEl.offsetLeft
    };

    var endCoords = {
      x: 0,
      y: 0
    };

    if (moveEvt.pageX - mouseOffset.x > mapLimitCoords.rightX) {
      endCoords.x = mapLimitCoords.rightX + mouseOffset.x;
    } else if (moveEvt.pageX - mouseOffset.x < mapLimitCoords.leftX) {
      endCoords.x = mapLimitCoords.leftX + mouseOffset.x;
    } else {
      endCoords.x = moveEvt.pageX;
    }

    if (moveEvt.pageY - mouseOffset.y > mapLimitCoords.bottomY) {
      endCoords.y = mapLimitCoords.bottomY + mouseOffset.y;
    } else if (moveEvt.pageY - mouseOffset.y < mapLimitCoords.topY) {
      endCoords.y = mapLimitCoords.topY + mouseOffset.y;
    } else {
      endCoords.y = moveEvt.pageY;
    }
    return endCoords;
  };

  var mouseOffset = {
    x: 0,
    y: 0
  };

  var startCoords = {
    x: 0,
    y: 0
  };

  var onMouseMove = function (evt) {
    evt.preventDefault();

    var endCoords = getEndCoords(evt, mouseOffset);

    var shift = {
      x: startCoords.x - endCoords.x,
      y: startCoords.y - endCoords.y
    };

    startCoords = {
      x: endCoords.x,
      y: endCoords.y
    };

    mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

    displayAddress();
  };

  var onMouseUp = function () {
    displayAddress();

    document.removeEventListener('mousemove', onMouseMove);

    document.removeEventListener('mouseup', onMouseUp);
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    if (window.pageMode.isBlocked()) {
      window.pageMode.active();
    }

    var pinBlock = mapPinMain.getBoundingClientRect();

    var pinCoords = {
      x: pinBlock.left + pageXOffset,
      y: pinBlock.top + pageYOffset
    };

    mouseOffset = {
      x: evt.pageX - pinCoords.x,
      y: evt.pageY - pinCoords.y
    };

    startCoords = {
      x: evt.pageX,
      y: evt.pageY
    };

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', onMouseUp);
  };

  var initModule = function () {
    displayAddress();
    window.pageMode.blocked();

    mapPinMain.addEventListener('mousedown', onMouseDown);
  };

  initModule();
})();
