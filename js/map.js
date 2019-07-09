'use strict';

(function () {
  var cards = [];
  var housingType;

  var pinsListEl = document.querySelector('.map__pins');
  var pinMain = pinsListEl.querySelector('.map__pin--main');

  var getPins = function () {
    var pinsArr = [];
    var pins = pinsListEl.querySelectorAll('.map__pin');

    for (var i = 0; i < pins.length; i++) {
      if (pins[i].className === 'map__pin') {
        pinsArr.push(pins[i]);
      }
    }

    return pinsArr;
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === 27) {
      closeCardPopup();
    }
  };

  var closeCardPopup = function () {
    var cardEl = document.querySelector('.map__card');
    cardEl.remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var closeCardHandler = function () {
    var cardCloseButton = document.querySelector('.popup__close');

    document.addEventListener('keydown', onPopupEscPress);

    cardCloseButton.addEventListener('click', function () {
      closeCardPopup();
    });
  };

  var renderCardHandler = function (pinEl, card) {
    pinEl.addEventListener('click', function () {
      window.renderCard(card);
      closeCardHandler();
    });
  };

  var addClickkHandler = function (cardsData) {
    var pinsEl = getPins();

    for (var i = 0; i < pinsEl.length; i++) {
      renderCardHandler(pinsEl[i], cardsData[i]);
    }
  };

  var updatePins = function () {
    if (housingType === 'any') {
      window.renderPins(cards);
      addClickkHandler(cards);
    } else {
      var newCards = cards.filter(function (card) {
        return card.offer.type === housingType;
      });
      window.renderPins(newCards);
      addClickkHandler(newCards);
    }
  };

  window.mapFilter.onHousingTypeChange = function (newHousingType) {
    housingType = newHousingType;
    updatePins();
  };

  var successfulLoadHandler = function (data) {
    cards = data;

    window.renderPins(cards);
    addClickkHandler(cards);
  };

  var errorHandler = function () {
    var main = document.querySelector('main');
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorEl = errorTemplate.cloneNode(true);

    main.appendChild(errorEl);
  };

  pinMain.addEventListener('mousedown', function () {
    if (window.pageMode.isBlocked()) {
      window.pageMode.active();
      window.backend.load(successfulLoadHandler, errorHandler);
    }
  });
})();
