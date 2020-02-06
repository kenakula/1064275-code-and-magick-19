/* eslint-disable no-console */
'use strict';

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

var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

// находит окно настроек персонажа
var setup = document.querySelector('.setup');

// находит модель персонажа мага
var wizardModel = setup.querySelector('.setup-wizard');
var playerSetup = setup.querySelector('.setup-player');
var wizardCoat = wizardModel.querySelector('.wizard-coat');
var wizardEyes = wizardModel.querySelector('.wizard-eyes');
var wizardFireball = playerSetup.querySelector('.setup-fireball-wrap');

// находит скрытые инпуты
var coatInput = playerSetup.querySelector('input[name="coat-color"]');
var eyesInput = playerSetup.querySelector('input[name="eyes-color"]');
var fireballInput = playerSetup.querySelector('input[name="fireball-color"]');


var onWizardFireballClick = function () {
  var color = window.util.getWizardItemsColor(fireballColors);
  fireballInput.value = color;
  wizardFireball.style.backgroundColor = color;
};

var onWizardCoatClick = function () {
  var color = window.util.getWizardItemsColor(coatsColors);
  coatInput.value = color;
  wizardCoat.style.fill = color;
};

var onWizardEyesClick = function () {
  var color = window.util.getWizardItemsColor(eyesColors);
  eyesInput.value = color;
  wizardEyes.style.fill = color;
};

// обработчики событий на модели мага
wizardCoat.addEventListener('click', onWizardCoatClick);
wizardEyes.addEventListener('click', onWizardEyesClick);
wizardFireball.addEventListener('click', onWizardFireballClick);

// действия
setup.querySelector('.setup-similar').classList.remove('hidden');


