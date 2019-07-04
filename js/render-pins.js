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

  window.renderPins = function (data) {
    var pinsListEl = mapEl.querySelector('.map__pins');

    var pinButtons = pinsListEl.querySelectorAll('button');

    for (var i = 0; i < pinButtons.length; i++) {
      var pinButton = pinButtons[i];
      if (!pinButton.classList.contains('map__pin--main')) {
        pinButton.remove();
      }
    }

    var takeNumber = data.length > 5 ? 5 : data.length;
    var fragment = document.createDocumentFragment();

    for (i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderPin(data[i]));
    }
    pinsListEl.appendChild(fragment);
  };
})();
