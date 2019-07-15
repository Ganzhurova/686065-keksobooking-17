'use strict';

(function () {
  var cards = [];

  var housing = window.housingFilter.renderValue();

  var pinsListEl = document.querySelector('.map__pins');
  var pinMain = pinsListEl.querySelector('.map__pin--main');

  var renderCardHandler = function (pinEl, card) {
    pinEl.addEventListener('click', function () {
      window.card.render(card);
    });
  };

  var addClickHandler = function (cardsData) {
    var pinsEl = window.pin.get();

    for (var i = 0; i < pinsEl.length; i++) {
      renderCardHandler(pinsEl[i], cardsData[i]);
    }
  };

  var getPriceOption = function (price) {
    if (price < 10000) {
      var option = 'low';
    } else if (price > 50000) {
      option = 'high';
    } else {
      option = 'middle';
    }

    return option;
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
    var priceCard = card.offer.price;
    card.offer.price = getPriceOption(card.offer.price);

    for (var key in housing) {
      if (housing.hasOwnProperty(key)) {
        var filterValue = housing[key];
        var cardValue = String(card.offer[key]);

        if (filterValue === 'any') {
          rank++;
        } else if (filterValue === cardValue) {
          rank++;
        } else if (cardValue === 'undefined') {
          for (var i = 0; i < card.offer.features.length; i++) {
            if (filterValue === card.offer.features[i]) {
              rank++;
            }
          }
        }
      }
    }

    card.offer.price = priceCard;
    return rank;
  };

  var updatePins = function () {
    window.card.remove();

    var newCards = cards.filter(function (card) {
      var maxRank = getMaxRank();
      var cardRank = getCardRank(card);

      return cardRank === maxRank;
    });

    window.pin.render(newCards);
    addClickHandler(newCards);
  };

  var addOnChange = function (key) {
    var filter = window.housingFilter[key];
    filter.onChange = function (newValue) {
      housing[key] = newValue;
      updatePins();
    };
  };

  var addChangeHandler = function () {
    for (var key in window.housingFilter) {
      if (window.housingFilter.hasOwnProperty(key)) {
        addOnChange(key);
      }
    }
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
      addChangeHandler();
    }
  });
})();
