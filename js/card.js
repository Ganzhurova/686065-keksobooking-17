'use strict';

(function () {
  var data = window.data;

  var createCard = function (ad) {
    var card = {
      author: {
        avatar: 'img/avatars/user' + ad.userAvatarNumber + '.png'
      },
      offer: {
        type: ad.housingType
      },
      location: {
        x: ad.x,
        y: ad.y
      }
    };

    return card;
  };

  var createCardsArr = function () {
    var cards = [];

    for (var i = 0; i < data.length; i++) {
      var cardItem = createCard(data[i]);
      cards.push(cardItem);
    }

    return cards;
  };

  window.cards = createCardsArr();
})();
