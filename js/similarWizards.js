/* eslint-disable no-console */
'use strict';

(function () {
  var SIMILAR_WIZARDS_COUNT = 4;

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
  var similarListContainer = document.querySelector('.setup-similar-list');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;

    return wizardElement;
  };

  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();


    for (var i = 0; i < SIMILAR_WIZARDS_COUNT; i++) {
      var getRandomWizard = wizards[window.util.getRandomInt(0, window.util.getMaxIndex(wizards))];

      fragment.appendChild(renderWizard(getRandomWizard));
    }

    similarListContainer.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);
})();
