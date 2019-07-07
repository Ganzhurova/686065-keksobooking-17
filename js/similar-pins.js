'use strict';

(function () {
  var cards = [];
  var housingType;

  var updateCards = function () {
    if (housingType === 'any') {
      window.renderPins(cards);
    } else {
      window.renderPins(cards.filter(function (card) {
        return card.offer.type === housingType;
      }));
    }
  };

  window.mapFilter.onHousingTypeChange = function (newHousingType) {
    housingType = newHousingType;
    updateCards();
  };

  cards = window.data;
  window.renderPins(cards);

  // Заблокировано для отрисовки меток из моков

  // var successfulLoadHandler = function (data) {
  //   cards = data;
  //   window.renderPins(cards);
  // };
  //
  // var errorHandler = function () {
  //   var main = document.querySelector('main');
  //   var errorTemplate = document.querySelector('#error')
  //     .content
  //     .querySelector('.error');
  //   var errorEl = errorTemplate.cloneNode(true);
  //
  //   main.appendChild(errorEl);
  // };
  //
  // window.backend.load(successfulLoadHandler, errorHandler);
})();
