'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

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

  var initModule = function () {
    var inputTitle = adForm.querySelector('#title');
    var inputPrice = adForm.querySelector('#price');
    var selectHousingType = adForm.querySelector('#type');
    var selectTimeIn = adForm.querySelector('#timein');
    var selectTimeOut = adForm.querySelector('#timeout');

    window.showAddress();

    setAttributesInputPrice(selectHousingType, inputPrice);

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
  };

  initModule();
})();
