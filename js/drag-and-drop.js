'use strict';

(function () {
  var LIMIT_TOP_Y = 130;
  var LIMIT_BOTTOM_Y = 630;

  var mapEl = document.querySelector('.map');
  var mapPinMain = mapEl.querySelector('.map__pin--main');

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

    window.showAddress();
  };

  var onMouseUp = function () {
    window.showAddress();

    document.removeEventListener('mousemove', onMouseMove);

    document.removeEventListener('mouseup', onMouseUp);
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

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

  mapPinMain.addEventListener('mousedown', onMouseDown);
})();
