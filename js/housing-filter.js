'use strict';

(function () {
  var HousingFilter = function () {
    this.type = null;
    this.price = null;
    this.rooms = null;
    this.guests = null;
    this.wifi = null;
    this.dishwasher = null;
    this.parking = null;
    this.washer = null;
    this.elevator = null;
    this.conditioner = null;
  };

  HousingFilter.prototype = {
    init: function () {
      var filtersForm = document.querySelector('.map__filters');

      this.type = filtersForm.querySelector('#housing-type');
      this.price = filtersForm.querySelector('#housing-price');
      this.rooms = filtersForm.querySelector('#housing-rooms');
      this.guests = filtersForm.querySelector('#housing-guests');
      this.wifi = filtersForm.querySelector('#filter-wifi');
      this.dishwasher = filtersForm.querySelector('#filter-dishwasher');
      this.parking = filtersForm.querySelector('#filter-parking');
      this.washer = filtersForm.querySelector('#filter-washer');
      this.elevator = filtersForm.querySelector('#filter-elevator');
      this.conditioner = filtersForm.querySelector('#filter-conditioner');

      this._addHandlers();
    },

    _onChange: function () {},

    _addChangeHandler: function (key) {
      var that = this;

      this[key].addEventListener('change', function () {
        var value = that._getValue(that[key]);
        that[key]._onChange = that._onChange;
        that[key]._onChange(value, key);
      });
    },

    _addKeydownHandler: function (key) {
      var that = this;

      if (this[key].tagName.toLowerCase() === 'input') {
        this[key].addEventListener('keydown', function (evt) {
          if (evt.keyCode === 13) {
            var event = new Event('change');

            if (!that[key].hasAttribute('checked')) {
              that[key].setAttribute('checked', 'checked');
              that[key].dispatchEvent(event);
            } else {
              that[key].removeAttribute('checked');
              that[key].dispatchEvent(event);
            }
          }
        });
      }
    },

    _addHandlers: function () {
      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          this._addChangeHandler(key);
          this._addKeydownHandler(key);
        }
      }
    },

    _getValue: function (el) {
      var value = el.value;

      if (el.tagName.toLowerCase() === 'input' && !el.checked) {
        value = 'any';
      }

      return value;
    },

    renderValue: function () {
      var housing = {};

      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          var value = this._getValue(this[key]);
          housing[key] = value;
        }
      }

      return housing;
    },
  };

  window.housingFilter = new HousingFilter();
  window.housingFilter.init();
})();
