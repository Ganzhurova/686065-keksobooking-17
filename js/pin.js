'use strict';

(function () {
  var mapEl = document.querySelector('.map');

  var widthPin = 50;
  var heightPin = 70;

  var renderPin = function (card) {
    var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
    var pinEl = pinTemplate.cloneNode(true);
    var pinImg = pinEl.querySelector('img');

    var x = card.location.x - widthPin / 2;
    var y = card.location.y - heightPin;

    pinEl.style.left = x + 'px';
    pinEl.style.top = y + 'px';

    pinImg.src = card.author.avatar;
    pinImg.alt = card.offer.title;

    return pinEl;
  };

  var successfulLoadHandler = function (cards) {
    var pinsListEl = mapEl.querySelector('.map__pins');

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < cards.length; i++) {
      fragment.appendChild(renderPin(cards[i]));
    }
    pinsListEl.appendChild(fragment);
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
