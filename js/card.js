'use strict';

(function () {
  var Card = function () {};

  Card.prototype = {
    _mapEl: document.querySelector('.map'),

    _template: document.querySelector('#card')
      .content
      .querySelector('.map__card'),

    _housingTypeDictionary: {
      'palace': 'дворец',
      'flat': 'квартира',
      'house': 'дом',
      'bungalo': 'бунгало'
    },

    _createCard: function (data) {
      var cardObj = {
        avatar: {
          className: 'popup__avatar',
          src: data.author.avatar
        },
        title: {
          className: 'popup__title',
          text: data.offer.title
        },
        address: {
          className: 'popup__text--address',
          text: data.offer.address
        },
        price: {
          className: 'popup__text--price',
          text: data.offer.price + '\u20BD' + '/ночь'
        },
        type: {
          className: 'popup__type',
          text: this._housingTypeDictionary[data.offer.type]
        },
        capacity: {
          className: 'popup__text--capacity',
          text: data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей'
        },
        time: {
          className: 'popup__text--time',
          text: 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout
        },
        features: {
          className: 'popup__features',
          list: data.offer.features,
          itemTagName: 'li',
          itemClassName: 'popup__feature'
        },
        description: {
          className: 'popup__description',
          text: data.offer.description
        },
        photos: {
          className: 'popup__photos',
          list: data.offer.photos,
          itemTagName: 'img',
          itemClassName: 'popup__photo'
        }
      };

      return cardObj;
    },

    _makeItemElement: function (itemEl, objEl, itemArr) {
      var el = itemEl.cloneNode(true);

      if (objEl.itemTagName === 'li') {
        el.classList.remove(el.classList[1]);
        el.classList.add(objEl.itemClassName + '--' + itemArr);
      }

      if (objEl.itemTagName === 'img') {
        el.src = itemArr;
      }

      return el;
    },

    _fill: function (data) {
      var that = this;
      var cardClone = this._template.cloneNode(true);
      var card = this._createCard(data);

      for (var key in card) {
        if (card.hasOwnProperty(key)) {
          var itemCard = cardClone.querySelector('.' + card[key].className);

          if (card[key].text) {
            itemCard.textContent = card[key].text;
          }

          if (card[key].src) {
            itemCard.src = card[key].src;
          }

          if (card[key].list) {
            var fragment = document.createDocumentFragment();
            var itemClone = itemCard.children[0].cloneNode(true);

            itemCard.innerHTML = '';

            card[key].list.forEach(function (item) {
              fragment.appendChild(that._makeItemElement(itemClone, card[key], item));
            });

            itemCard.appendChild(fragment);
          }
        }
      }

      var closeButton = cardClone.querySelector('.popup__close');

      document.addEventListener('keydown', this._onPopupEscPress.bind(this));

      closeButton.addEventListener('click', function () {
        that._closeCard();
      });

      return cardClone;
    },

    _closeCard: function () {
      var that = this;

      this.remove();
      document.removeEventListener('keydown', that._onPopupEscPress);
    },

    _onPopupEscPress: function (evt) {
      var that = this;

      if (evt.keyCode === 27) {
        that._closeCard();
      }
    },

    remove: function () {
      var cardEl = this._mapEl.querySelector('.map__card');

      if (cardEl) {
        cardEl.remove();
      }
    },

    render: function (data) {
      var mapFilter = this._mapEl.querySelector('.map__filters-container');

      this.remove();

      var cardEl = this._fill(data);

      this._mapEl.insertBefore(cardEl, mapFilter);
    }
  };

  window.card = new Card();
})();
