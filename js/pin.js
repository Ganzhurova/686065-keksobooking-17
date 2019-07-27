'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_MAX_NUMBER = 5;

  var mapEl = document.querySelector('.map');

  var renderPin = function (card) {
    var pinTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
    var pinEl = pinTemplate.cloneNode(true);
    var pinImg = pinEl.querySelector('img');

    var x = card.location.x - PIN_WIDTH / 2;
    var y = card.location.y - PIN_HEIGHT;

    pinEl.style.left = x + 'px';
    pinEl.style.top = y + 'px';

    pinImg.src = card.author.avatar;
    pinImg.alt = card.offer.title;

    pinEl.addEventListener('click', function () {
      pinEl.classList.add('map__pin--active');
      window.card.render(card, pinEl);
    });

    return pinEl;
  };

  var getPins = function () {
    var pins = mapEl.querySelectorAll('[class = "map__pin"]');
    return pins;
  };

  var removePins = function () {
    var pins = getPins();

    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  window.pin = {
    render: function (data) {
      var pinsListEl = mapEl.querySelector('.map__pins');

      removePins();

      var takeNumber = Math.min(data.length, PIN_MAX_NUMBER);
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < takeNumber; i++) {
        fragment.appendChild(renderPin(data[i]));
      }
      pinsListEl.appendChild(fragment);
    },

    get: getPins,

    remove: removePins
  };
})();
