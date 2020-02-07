'use strict';

(function () {
  var SIMILAR_WIZARDS_COUNT = 4;

  var firstNames = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  var lastNames = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var coatsColors = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];

  var eyesColors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];

  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

  var similarListContainer = document.querySelector('.setup-similar-list');

  var CreateSimilarWizard = function (names, surnames, coatColors, eyeColors) {
    this.name = window.util.getRandomName(names, surnames);
    this.coatColor = window.util.getRandomColor(coatColors);
    this.eyeColor = window.util.getRandomColor(eyeColors);
  };

  var createWizardsList = function (count) {
    var result = [];

    for (var i = 0; i < count; i++) {
      var wizard = new CreateSimilarWizard(firstNames, lastNames, coatsColors, eyesColors);
      result.push(wizard);
    }

    return result;
  };

  var setWizard = function (elem, array) {
    elem.querySelector('.setup-similar-label').textContent = array.name;
    elem.querySelector('.wizard-coat').style.fill = array.coatColor;
    elem.querySelector('.wizard-eyes').style.fill = array.eyeColor;
  };

  var getFragment = function (count) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < count; i++) {
      var element = similarWizardTemplate.cloneNode(true);
      setWizard(element, wizards[i]);
      fragment.appendChild(element);
    }

    return fragment;
  };

  var wizards = createWizardsList(SIMILAR_WIZARDS_COUNT);
  var wizardsFragment = getFragment(SIMILAR_WIZARDS_COUNT);
  similarListContainer.appendChild(wizardsFragment);

})();
