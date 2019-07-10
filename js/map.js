'use strict';

(function () {
  var cards = [];
  var housingType;

  var pinsListEl = document.querySelector('.map__pins');
  var pinMain = pinsListEl.querySelector('.map__pin--main');

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
      window.card.render(card);
      closeCardHandler();
    });
  };

  var addClickkHandler = function (cardsData) {
    var pinsEl = window.pin.get();

    for (var i = 0; i < pinsEl.length; i++) {
      renderCardHandler(pinsEl[i], cardsData[i]);
    }
  };

  var updatePins = function () {
    window.card.remove();

    if (housingType === 'any') {
      window.pin.render(cards);
      addClickkHandler(cards);
    } else {
      var newCards = cards.filter(function (card) {
        return card.offer.type === housingType;
      });
      window.pin.render(newCards);
      addClickkHandler(newCards);
    }
  };

  window.mapFilter.onHousingTypeChange = function (newHousingType) {
    housingType = newHousingType;
    updatePins();
  };

  var successfulLoadHandler = function (data) {
    cards = data;

    window.pin.render(cards);
    addClickkHandler(cards);
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
