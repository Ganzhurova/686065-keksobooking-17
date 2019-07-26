'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var previewParents = [];

  var makeImgEl = function () {
    var imgEl = document.createElement('img');
    imgEl.style = 'width: 100%';
    // imgEl.src = '';

    return imgEl;
  };

  var fillPreviewParentsArr = function (containerEl, previewParentTemplate, previewParentSelector, src) {
    var parent = {
      container: containerEl,
      initialState: previewParentTemplate,
      selector: previewParentSelector,
      srcDefault: src
    };

    previewParents.push(parent);
  };

  window.picture = {
    download: function (inputSelector, previewParentSelector, isManyPictures) {
      var fileChooser = document.querySelector(inputSelector);
      var previewParent = document.querySelector(previewParentSelector);
      var container = previewParent.parentNode;

      var initialPreviewParent = previewParent.cloneNode(true);

      if (previewParent.children.length) {
        var preview = previewParent.querySelector('img');
      } else {
        preview = makeImgEl();
        previewParent.appendChild(preview);
      }

      fillPreviewParentsArr(container, initialPreviewParent, previewParentSelector, preview.src);

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
    },

    reset: function () {
      for (var i = 0; i < previewParents.length; i++) {
        var parent = previewParents[i];
        var parentsEl = parent.container.querySelectorAll(parent.selector);


        if (parentsEl.length > 1) {
          for (var j = 0; j < parentsEl.length - 1; j++) {
            parentsEl[j].remove();
          }
        }

        var previewImg = parentsEl[parentsEl.length - 1].querySelector('img');

        if (parent.srcDefault === '') {
          previewImg.removeAttribute('src');
        }

        if (previewImg.hasAttribute('src')) {
          previewImg.src = parent.srcDefault;
        }

        // parent.container.replaceChild(parent.initialState, parentsEl[0]);

      }
    }
  };
})();
