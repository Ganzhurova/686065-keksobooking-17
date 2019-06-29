'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var SUCCESS_CODE = 200;

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === SUCCESS_CODE) {
          onLoad(xhr.response);
        } else {
          onError();
        }
      });

      xhr.addEventListener('error', function () {
        onError();
      });

      xhr.addEventListener('timeout', function () {
        onError();
      });

      xhr.open('GET', URL_LOAD);
      xhr.send();
    }
  };
})();
