'use strict';

(function () {
  var mapEl = document.querySelector('.map');

  var housingTypeDictionary = {
    'palace': 'дворец',
    'flat': 'квартира',
    'house': 'дом',
    'bungalo': 'бунгало'
  };

  var feature = {
    tagName: 'li',
    className: 'popup__feature'
  };

  var photo = {
    tagName: 'img',
    className: 'popup__photo',
    width: 45,
    height: 40,
    alt: 'Фотография жилья'
  };

  var makeElement = function (objEl, cardItemArr) {
    var el = document.createElement(objEl.tagName);
    el.classList.add(objEl.className);

    if (objEl.tagName === 'li') {
      var additionalClassName = objEl.className + '--' + cardItemArr;
      el.classList.add(additionalClassName);
    }

    if (objEl.tagName === 'img') {
      el.src = cardItemArr;
      el.width = objEl.width;
      el.height = objEl.height;
      el.alt = objEl.alt;
    }

    return el;
  };

  var renderElement = function (objEl, parentEl, cardItemArr) {
    var fragment = document.createDocumentFragment();

    parentEl.innerHTML = '';

    for (var i = 0; i < cardItemArr.length; i++) {
      fragment.appendChild(makeElement(objEl, cardItemArr[i]));
    }

    parentEl.appendChild(fragment);
  };

  var fillCard = function (card) {
    var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');
    var cardEl = cardTemplate.cloneNode(true);

    var cardAvatar = cardEl.querySelector('.popup__avatar');
    var cardTitle = cardEl.querySelector('.popup__title');
    var cardAddress = cardEl.querySelector('.popup__text--address');
    var cardPrice = cardEl.querySelector('.popup__text--price');
    var cardType = cardEl.querySelector('.popup__type');
    var cardCapacity = cardEl.querySelector('.popup__text--capacity');
    var cardTime = cardEl.querySelector('.popup__text--time');
    var cardFeatures = cardEl.querySelector('.popup__features');
    var cardDescription = cardEl.querySelector('.popup__description');
    var cardPhotos = cardEl.querySelector('.popup__photos');

    cardAvatar.src = card.author.avatar;
    cardTitle.textContent = card.offer.title;
    cardAddress.textContent = card.offer.address;
    cardPrice.textContent = card.offer.price + '\u20BD' + '/ночь';
    cardType.textContent = housingTypeDictionary[card.offer.type];
    cardCapacity.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardTime.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardDescription.textContent = card.offer.description;

    renderElement(feature, cardFeatures, card.offer.features);
    renderElement(photo, cardPhotos, card.offer.photos);

    return cardEl;
  };

  window.renderCard = function (card) {
    var mapFilter = mapEl.querySelector('.map__filters-container');
    var cardEl = mapEl.querySelector('.map__card');

    if (cardEl) {
      cardEl.remove();
    }

    cardEl = fillCard(card);

    mapEl.insertBefore(cardEl, mapFilter);
  };
})();
