'use strict';

(function () {
  var pins = [];
  var housingType;

  var updatePins = function () {
    if (housingType === 'any') {
      window.renderPins(pins);
    } else {
      window.renderPins(pins.filter(function (pin) {
        return pin.offer.type === housingType;
      }));
    }
  };

  window.mapFilter.onHousingTypeChange = function (newHousingType) {
    housingType = newHousingType;
    updatePins();
  };

  // cards = window.data;
  // window.renderPins(cards);

  // Заблокировано для отрисовки меток из моков

  var successfulLoadHandler = function (data) {
    pins = data;
    window.renderPins(pins);
  };

  var errorHandler = function () {
    var main = document.querySelector('main');
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorEl = errorTemplate.cloneNode(true);

    main.appendChild(errorEl);
  };

  window.backend.load(successfulLoadHandler, errorHandler);
})();
