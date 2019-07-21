'use strict';

(function () {
  var LIMIT_PRICE_LOW = 10000;
  var LIMIT_PRICE_MIDDLE = 50000;

  var cards = [];

  var housing = window.housingFilter.renderValue();

  var pinMain = document.querySelector('.map__pin--main');

  var getPriceOption = function (price) {
    if (price < LIMIT_PRICE_LOW) {
      return 'low';
    } else if (price > LIMIT_PRICE_MIDDLE) {
      return 'high';
    } else {
      return 'middle';
    }
  };

  var transformData = function (data) {
    var modifiedData = {};

    for (var key in data.offer) {
      if (data.offer.hasOwnProperty(key)) {
        var propertyData = data.offer[key];

        if (housing[key]) {
          modifiedData[key] = String(propertyData);
        }

        switch (key) {
          case 'price':
            modifiedData[key] = getPriceOption(propertyData);
            break;

          case 'features':
            for (var i = 0; i < propertyData.length; i++) {
              modifiedData[propertyData[i]] = propertyData[i];
            }
            break;
        }
      }
    }
    return modifiedData;
  };

  var getMaxRank = function () {
    var maxRank = 0;

    for (var key in housing) {
      if (housing.hasOwnProperty(key)) {
        maxRank++;
      }
    }

    return maxRank;
  };

  var getCardRank = function (card) {
    var rank = 0;

    var dataForRank = transformData(card);

    for (var key in housing) {
      if (housing.hasOwnProperty(key)) {

        var filterValue = housing[key];
        var cardValue = dataForRank[key];

        if (filterValue === 'any' || filterValue === cardValue) {
          rank++;
        }
      }
    }

    return rank;
  };

  var maxRank = getMaxRank();

  var updatePins = function () {
    window.card.remove();

    var newCards = cards.filter(function (card) {
      if (card.hasOwnProperty('offer')) {
        var cardRank = getCardRank(card);
      }

      return cardRank === maxRank;
    });

    window.pin.render(newCards);
  };

  window.housingFilter._onChange = window.debounce(function (newValue, key) {
    housing[key] = newValue;
    updatePins();
  });

  var successfulLoadHandler = function (data) {
    cards = data;
    updatePins();
  };

  var errorHandler = function () {
    window.statusMessage.showError();
  };

  pinMain.addEventListener('mousedown', function () {
    if (window.pageMode.isBlocked()) {
      window.pageMode.active();
      window.backend.load(successfulLoadHandler, errorHandler);
    }
  });
})();
