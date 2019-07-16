'use strict';

(function () {
  var cards = [];

  var housing = window.housingFilter.renderValue();

  var pinMain = document.querySelector('.map__pin--main');

  var getPriceOption = function (price) {
    if (price < 10000) {
      return 'low';
    } else if (price > 50000) {
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
      var cardRank = getCardRank(card);

      return cardRank === maxRank;
    });

    window.pin.render(newCards);
  };

  window.housingFilter._onChange = function (newValue, key) {
    housing[key] = newValue;
    updatePins();
  };


  var successfulLoadHandler = function (data) {
    cards = data;
    updatePins();
  };

  var errorHandler = function () {
    window.statusMessage.error();
  };

  pinMain.addEventListener('mousedown', function () {
    if (window.pageMode.isBlocked()) {
      window.pageMode.active();
      window.backend.load(successfulLoadHandler, errorHandler);
    }
  });
})();
