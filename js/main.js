'use strict';

(function () {
  var HOUSING_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var LIMIT_TOP_Y = 130;
  var LIMIT_BOTTOM_Y = 630;
  var CLASS_NAMES_FOR_TOGGLE = ['map--faded', 'ad-form--disabled'];

  var mapEl = document.querySelector('.map');
  var mapFilters = mapEl.querySelector('.map__filters');
  var mapPinMain = mapEl.querySelector('.map__pin--main');

  var adForm = document.querySelector('.ad-form');

  var removeClass = function (element, removeClassName) {
    element.classList.remove(removeClassName);
  };

  var addClass = function (element, addClassName) {
    element.classList.add(addClassName);
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

  var setFormMode = function (isBlocked) {
    var elFormArr = [mapFilters, adForm];
    for (var i = 0; i < elFormArr.length; i++) {
      var elForm = elFormArr[i];
      var inputForm = elForm.querySelectorAll('input');
      var selectForm = elForm.querySelectorAll('select');
      var fieldsetForm = elForm.querySelectorAll('fieldset');
      var elements = [inputForm, selectForm, fieldsetForm];

      for (var j = 0; j < elements.length; j++) {
        var element = elements[j];
        for (var k = 0; k < element.length; k++) {
          element[k].disabled = isBlocked;
        }
      }
    }
  };

  var setBlockMode = function (isBlocked) {
    var elBlockArr = [mapEl, adForm];
    for (var i = 0; i < elBlockArr.length; i++) {
      var elBlock = elBlockArr[i];
      var toggleClassName = CLASS_NAMES_FOR_TOGGLE[i];

      if (isBlocked) {
        addClass(elBlock, toggleClassName);
      } else {
        removeClass(elBlock, toggleClassName);
      }
    }
  };

  var isBlockedPinModeStatus = true;

  var isBlockedPinMode = function () {
    return isBlockedPinModeStatus;
  };

  var toggleActivePinMode = function () {
    isBlockedPinModeStatus = !isBlockedPinModeStatus;
  };

  var toggleModeActivePage = function () {
    setBlockMode(isBlockedPinMode());
    setFormMode(isBlockedPinMode());
    toggleActivePinMode();
  };

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

  var validationInputTitle = function (elTitleInput) {
    if (elTitleInput.validity.tooShort) {
      elTitleInput.setCustomValidity('Заголовок должен состоять минимум из 30-и символов');
    } else if (elTitleInput.validity.tooLong) {
      elTitleInput.setCustomValidity('Заголовок не должно превышать ста символов');
    } else if (elTitleInput.validity.valueMissing) {
      elTitleInput.setCustomValidity('Обязательное поле');
    } else {
      elTitleInput.setCustomValidity('');
    }
  };

  var checkInputTitle = function (evt) {
    var target = evt.target;
    if (target.value.length < 30) {
      target.setCustomValidity('Заголовок должен состоять минимум из 30-и символов');
    } else {
      target.setCustomValidity('');
    }
  };

  var setAttributesInputPrice = function (elHousingType, elPriceInput) {
    if (elHousingType.value === 'bungalo') {
      elPriceInput.min = '0';
      elPriceInput.placeholder = '0';
    } else if (elHousingType.value === 'flat') {
      elPriceInput.min = '1000';
      elPriceInput.placeholder = '1000';
    } else if (elHousingType.value === 'house') {
      elPriceInput.min = '5000';
      elPriceInput.placeholder = '5000';
    } else if (elHousingType.value === 'palace') {
      elPriceInput.min = '10000';
      elPriceInput.placeholder = '10000';
    }
  };

  var getMinPrice = function (elPriceInput) {
    var minPrice = elPriceInput.getAttribute('placeholder');
    return minPrice;
  };

  var validationInputPrice = function (elPriceInput) {
    var minPrice = getMinPrice(elPriceInput);
    if (elPriceInput.validity.rangeOverflow) {
      elPriceInput.setCustomValidity('Максимальная цена 1 000 000');
    } else if (elPriceInput.validity.rangeUnderflow) {
      elPriceInput.setCustomValidity('Минимальная цена ' + minPrice);
    } else if (elPriceInput.validity.valueMissing) {
      elPriceInput.setCustomValidity('Обязательное поле');
    } else {
      elPriceInput.setCustomValidity('');
    }
  };

  var checkInputPrice = function (evt, elPriceInput) {
    var minPrice = getMinPrice(elPriceInput);
    var target = evt.target;
    if (target.value > 1000000) {
      target.setCustomValidity('Максимальная цена 1 000 000');
    } else if (target.value < minPrice) {
      target.setCustomValidity('Минимальная цена ' + minPrice);
    } else {
      target.setCustomValidity('');
    }
  };

  var syncTimeInOut = function (elTime, syncElTime) {
    var time = elTime.value;
    syncElTime.value = time;
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

    if (!isBlockedPinMode()) {
      toggleModeActivePage();
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
    var inputTitle = adForm.querySelector('#title');
    var inputPrice = adForm.querySelector('#price');
    var selectHousingType = adForm.querySelector('#type');
    var selectTimeIn = adForm.querySelector('#timein');
    var selectTimeOut = adForm.querySelector('#timeout');

    displayAddress();
    setAttributesInputPrice(selectHousingType, inputPrice);
    toggleModeActivePage();

    mapPinMain.addEventListener('mousedown', onMouseDown);

    inputTitle.addEventListener('invalid', function () {
      validationInputTitle(inputTitle);
    });

    inputTitle.addEventListener('input', function (evt) {
      checkInputTitle(evt);
    });

    selectHousingType.addEventListener('change', function () {
      setAttributesInputPrice(selectHousingType, inputPrice);
    });

    inputPrice.addEventListener('invalid', function () {
      validationInputPrice(inputPrice);
    });

    inputPrice.addEventListener('input', function (evt) {
      checkInputPrice(evt, inputPrice);
    });

    selectTimeIn.addEventListener('change', function () {
      syncTimeInOut(selectTimeIn, selectTimeOut);
    });

    selectTimeOut.addEventListener('change', function () {
      syncTimeInOut(selectTimeOut, selectTimeIn);
    });

    showMapPins(mapEl);
  };

  initModule();
})();
