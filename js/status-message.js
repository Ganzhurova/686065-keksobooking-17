'use strict';

(function () {
  var Message = function (status) {
    this._renderMessage(status);
    this._init(status);
  };

  Message.prototype = {
    _renderMessage: function (status) {
      var main = document.querySelector('main');
      var messageTemplate = document.querySelector('#' + status)
        .content
        .querySelector('.' + status);
      var message = messageTemplate.cloneNode(true);

      main.appendChild(message);
    },

    _init: function (status) {
      var that = this;

      this.messageEl = document.querySelector('.' + status);
      this.messageButton = this.messageEl.querySelector('.' + status + '__button');

      document.addEventListener('keydown', this._onMessageEscPress.bind(this));

      this.messageEl.addEventListener('click', function () {
        that._closeMessage();
      });

      if (this.messageButton) {
        this.messageButton.addEventListener('click', function () {
          that._closeMessage();
        });
      }
    },

    _onMessageEscPress: function (evt) {
      window.util.isEscEvent(evt, this._closeMessage.bind(this));
    },

    _closeMessage: function () {
      this.messageEl.remove();

      document.removeEventListener('keydown', this._onMessageEscPress.bind(this));
    }
  };

  window.statusMessage = {
    showError: function () {
      var error = new Message('error');
      return error;
    },

    showSuccess: function () {
      var success = new Message('success');
      return success;
    }
  };
})();
