'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

  var inputTitle = adForm.querySelector('#title');
  var inputPrice = adForm.querySelector('#price');

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
    var housingType = {
      bungalo: {
        minPrice: '0'
      },
      flat: {
        minPrice: '1000'
      },
      house: {
        minPrice: '5000'
      },
      palace: {
        minPrice: '10000'
      }
    };

    var type = housingType[elHousingType.value];

    elPriceInput.min = type.minPrice;
    elPriceInput.placeholder = type.minPrice;
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

  var checkRoomCapacity = function (rooms, capacity) {
    var indexRoom = rooms.options.selectedIndex;
    var indexGuest = capacity.options.selectedIndex;

    var roomsNumber = {
      '1': {
        minGuests: '1',
        maxGuests: '1'
      },
      '2': {
        minGuests: '1',
        maxGuests: '2'
      },
      '3': {
        minGuests: '1',
        maxGuests: '3'
      },
      '100': {
        minGuests: '0',
        maxGuests: '0'
      }
    };

    var roomsSelected = rooms.options[indexRoom];

    var housingSelected = roomsNumber[roomsSelected.value];
    var guestsSelected = capacity.options[indexGuest];

    var roomsText = roomsSelected.text;

    for (var i = 0; i < rooms.options.length; i++) {
      var housing = roomsNumber[rooms.options[i].value];

      for (var j = 0; j < capacity.options.length; j++) {
        var guests = capacity.options[j];
        var guestsValue = guests.value;

        if (housing.maxGuests === guestsValue) {
          guests.min = housing.minGuests;
          guests.max = housing.maxGuests;
        }
      }
    }

    for (i = 0; i < capacity.options.length; i++) {
      if (housingSelected.maxGuests === capacity.options[i].value) {
        if (housingSelected.minGuests === housingSelected.maxGuests) {
          var message = roomsText + ' ' + capacity.options[i].text;
        } else {
          message = roomsText + ' от ' + housingSelected.minGuests + ' до ' + housingSelected.maxGuests + ' гостей';
        }
      }
    }

    if (guestsSelected.min !== housingSelected.minGuests || guestsSelected.max > housingSelected.maxGuests) {
      capacity.setCustomValidity(message);
    } else {
      capacity.setCustomValidity('');
    }
  };

  var resetPage = function () {
    window.pageMode.blocked();
    adForm.reset();
    window.pin.remove();
    window.card.remove();
    window.pinMain.reset();
    window.showAddress();
  };

  var successfulSaveHandler = function () {
    resetPage();
    window.statusMessage.showSuccess();
  };

  var errorHandler = function () {
    window.statusMessage.showError();
  };

  var initModule = function () {

    var selectHousingType = adForm.querySelector('#type');
    var selectTimeIn = adForm.querySelector('#timein');
    var selectTimeOut = adForm.querySelector('#timeout');
    var selectRoom = adForm.querySelector('#room_number');
    var selectCapacity = adForm.querySelector('#capacity');
    var resetButton = adForm.querySelector('.ad-form__reset');

    window.showAddress();

    setAttributesInputPrice(selectHousingType, inputPrice);

    checkRoomCapacity(selectRoom, selectCapacity);

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

    selectRoom.addEventListener('change', function () {
      checkRoomCapacity(selectRoom, selectCapacity);
    });

    selectCapacity.addEventListener('change', function () {
      checkRoomCapacity(selectRoom, selectCapacity);
    });

    resetButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      resetPage();
    });

    adForm.addEventListener('submit', function (evt) {
      window.backend.save(new FormData(adForm), successfulSaveHandler, errorHandler);
      evt.preventDefault();
    });

    window.picture.download('.ad-form-header__input', '.ad-form-header__preview', false);
    window.picture.download('.ad-form__input', '.ad-form__photo', true);
  };

  initModule();
})();
