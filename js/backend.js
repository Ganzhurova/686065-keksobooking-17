'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var SUCCESS_CODE = 200;

  var method;
  var url;

  var sendRequest = function (data, onLoad, onError) {
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

    xhr.timeout = 10000;

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (onLoad, onError) {
      method = 'GET';
      url = URL_LOAD;
      var data = '';

      sendRequest(data, onLoad, onError);
    },

    save: function (data, onLoad, onError) {
      method = 'POST';
      url = URL_SAVE;

      sendRequest(data, onLoad, onError);
    }
  };
})();
