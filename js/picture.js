'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var previews = [];

  var makeImgEl = function () {
    var imgEl = document.createElement('img');
    imgEl.style = 'width: 100%';

    return imgEl;
  };

  var createImgEl = function (parentEl) {
    if (parentEl.children.length === 0) {
      var imgEl = makeImgEl();
      parentEl.appendChild(imgEl);
    }
  };

  window.picture = {
    download: function (inputSelector, previewParentSelector, isManyPictures) {
      var fileChooser = document.querySelector(inputSelector);
      var previewParent = document.querySelector(previewParentSelector);
      var container = previewParent.parentNode;

      createImgEl(previewParent);

      var previewImg = previewParent.querySelector('img');

      var preview = {
        container: container,
        parentSelector: previewParentSelector,
        element: previewImg,
        srcDefault: previewImg.src
      };

      previews.push(preview);

      fileChooser.addEventListener('change', function () {
        var file = fileChooser.files[0];
        var fileName = file.name.toLowerCase();

        if (isManyPictures && previewImg.src) {
          var previewTemplate = previewParent.cloneNode(true);
          previewImg = previewTemplate.querySelector('img');
          container.appendChild(previewTemplate);
          preview.element = previewImg;
        }

        var matches = FILE_TYPES.some(function (it) {
          return fileName.endsWith(it);
        });

        if (matches) {
          var reader = new FileReader();

          reader.addEventListener('load', function () {
            previewImg.src = reader.result;
          });

          reader.readAsDataURL(file);
        }
      });
    },

    reset: function () {
      for (var i = 0; i < previews.length; i++) {
        var preview = previews[i];
        var images = preview.container.querySelectorAll(preview.parentSelector + ' img');
        var previewEl = preview.element;

        for (var j = 0; j < images.length; j++) {
          if (images[j] !== previewEl) {
            images[j].parentNode.remove();
          }
        }

        if (preview.srcDefault === '') {
          previewEl.removeAttribute('src');
        }

        if (previewEl.hasAttribute('src')) {
          previewEl.src = preview.srcDefault;
        }
      }
    }
  };
})();
