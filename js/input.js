'use strict';

(function () {
  var onEnterPress = function (evt) {
    window.util.isEnterEvent(evt, function () {
      evt.preventDefault();

      var inputEl = evt.currentTarget;
      var event = new Event('change');

      if (inputEl.checked) {
        inputEl.checked = false;
        inputEl.dispatchEvent(event);
      } else {
        inputEl.checked = true;
        inputEl.dispatchEvent(event);
      }
    });
  };

  window.input = {
    checkedByEnter: function (input) {
      input.addEventListener('keydown', onEnterPress);
    }
  };
})();
