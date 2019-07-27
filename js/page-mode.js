'use strict';

(function () {
  var PageMode = function () {
    this._init();
  };

  PageMode.prototype = {
    _isBlockedStatus: false,

    _init: function () {
      this.pageBlocks = [
        {
          el: document.querySelector('.map'),
          form: false,
          blockingClassName: 'map--faded'
        },
        {
          el: document.querySelector('.map__filters'),
          form: true
        },
        {
          el: document.querySelector('.ad-form'),
          form: true,
          blockingClassName: 'ad-form--disabled'
        }
      ];
    },

    isBlocked: function () {
      return this._isBlockedStatus;
    },

    _toggleModeStatus: function () {
      this._isBlockedStatus = !this._isBlockedStatus;
    },

    _toggleMode: function (isBlocked) {
      this.pageBlocks.forEach(function (pageBlock) {

        if (pageBlock.blockingClassName) {
          if (isBlocked) {
            pageBlock.el.classList.remove(pageBlock.blockingClassName);
          } else {
            pageBlock.el.classList.add(pageBlock.blockingClassName);
          }
        }

        if (pageBlock.form) {
          var formElements = pageBlock.el.querySelectorAll('input, select, fieldset');
          for (var i = 0; i < formElements.length; i++) {
            formElements[i].disabled = !isBlocked;
          }
        }
      });

      if (this.isBlocked() === isBlocked) {
        this._toggleModeStatus();
      }
    },

    active: function () {
      this._toggleMode(true);
    },

    blocked: function () {
      this._toggleMode(false);
    }
  };

  window.pageMode = new PageMode();

  window.pageMode.blocked();
})();
