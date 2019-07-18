'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var makeImgEl = function () {
    var imgEl = document.createElement('img');
    imgEl.style = 'width: 100%';

    return imgEl;
  };

  window.picture = {
    download: function (inputSelector, previewParentSelector, isManyPictures) {
      var fileChooser = document.querySelector(inputSelector);
      var previewParent = document.querySelector(previewParentSelector);
      var container = previewParent.parentNode;

      if (previewParent.children.length) {
        var preview = previewParent.querySelector('img');
      } else {
        preview = makeImgEl();
        previewParent.appendChild(preview);
      }

      fileChooser.addEventListener('change', function () {
        var file = fileChooser.files[0];
        var fileName = file.name.toLowerCase();

        if (isManyPictures && preview.src) {
          var previewTemplate = previewParent.cloneNode(true);

          preview = previewTemplate.querySelector('img');
          container.appendChild(previewTemplate);
        }

        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });

        if (matches) {
          var reader = new FileReader();

          reader.addEventListener('load', function () {
            preview.src = reader.result;
          });

          reader.readAsDataURL(file);
        }
      });
    }
  };
})();
