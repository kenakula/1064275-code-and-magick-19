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
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  window.render = function (data) {
    var takeNumber = data.length > SIMILAR_WIZARDS_COUNT ? SIMILAR_WIZARDS_COUNT : data.length;
    similarListContainer.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarListContainer.appendChild(renderWizard(data[i]));
    }
  };
})();
