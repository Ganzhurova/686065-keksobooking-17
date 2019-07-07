'use strict';

(function () {
  var CLASS_NAMES_FOR_TOGGLE = ['map--faded', 'ad-form--disabled'];

  var mapEl = document.querySelector('.map');
  var mapFilter = mapEl.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');

  var isBlockedPinModeStatus = true;

  var setFormMode = function (isBlocked) {
    var elFormArr = [mapFilter, adForm];
    for (var i = 0; i < elFormArr.length; i++) {
      var elForm = elFormArr[i];
      var inputForm = elForm.querySelectorAll('input');
      var selectForm = elForm.querySelectorAll('select');
      var fieldsetForm = elForm.querySelectorAll('fieldset');
      var elements = [inputForm, selectForm, fieldsetForm];

      for (var j = 0; j < elements.length; j++) {
        var element = elements[j];
        for (var k = 0; k < element.length; k++) {
          element[k].disabled = isBlocked;
        }
      }
    }
  };

  var setBlockMode = function (isBlocked) {
    var elBlockArr = [mapEl, adForm];
    for (var i = 0; i < elBlockArr.length; i++) {
      var elBlock = elBlockArr[i];
      var toggleClassName = CLASS_NAMES_FOR_TOGGLE[i];

      if (isBlocked) {
        elBlock.classList.add(toggleClassName);
      } else {
        elBlock.classList.remove(toggleClassName);
      }
    }
  };

  window.isBlockedPinMode = function () {
    return isBlockedPinModeStatus;
  };

  var toggleActivePinMode = function () {
    isBlockedPinModeStatus = !isBlockedPinModeStatus;
  };

  window.toggleModeActivePage = function () {
    setBlockMode(window.isBlockedPinMode());
    setFormMode(window.isBlockedPinMode());
    toggleActivePinMode();
  };
})();
