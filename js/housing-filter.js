'use strict';

(function () {
  var HousingFilter = function () {
    this._init();
    this._addHandlers();
  };

  HousingFilter.prototype = {
    _init: function () {
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
    },

    _addChangeHandler: function (key) {
      var that = this;

      this[key].addEventListener('change', function () {
        var value = that._getValue(that[key]);
        that[key].onChange(value);
      });
    },

    _addHandlers: function () {
      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          this._addChangeHandler(key);
        }
      }
    },

    _getValue: function (el) {
      var filter = el;
      var value = el.value;

      if (filter.tagName.toLowerCase() === 'input') {
        if (!filter.checked) {
          value = 'any';
        }
      }

      return value;
    },

    renderValue: function () {
      var housing = {};

      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          if (this[key].tagName.toLowerCase() === 'input') {
            var value = this._getValue(this[key]);
            housing[key] = value;
          } else {
            housing[key] = this[key].value;
          }

        }
      }

      return housing;
    },
  };

  window.housingFilter = new HousingFilter();
})();
