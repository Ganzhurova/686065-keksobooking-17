'use strict';

(function () {
  var mapEl = document.querySelector('.map');

  var housingTypeFilter = mapEl.querySelector('#housing-type');

  var mapFilter = {
    onHousingTypeChange: function () {},
  };

  housingTypeFilter.addEventListener('change', function () {
    var newHousingType = housingTypeFilter.value;
    mapFilter.onHousingTypeChange(newHousingType);
  });

  window.mapFilter = mapFilter;
})();
