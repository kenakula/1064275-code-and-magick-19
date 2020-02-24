'use strict';

(function () {
  var Colors = {
    COAT: [
      'rgb(146, 100, 161)',
      'rgb(215, 210, 55)',
      'rgb(241, 43, 107)',
      'rgb(101, 137, 164)',
      'rgb(0, 0, 0)',
      'rgb(215, 210, 55)',
      'rgb(56, 159, 117)',
      'rgb(241, 43, 107)',
    ],
    EYES: [
      'red',
      'orange',
      'yellow',
      'green',
      'lightblue',
      'blue',
      'purple',
    ],
    FIREBALL: [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848',
    ],
  };

  var setup = document.querySelector('.setup');
  var playerSetup = setup.querySelector('.setup-player');

  var wizardElement = document.querySelector('.setup-wizard');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  var wizardFireball = playerSetup.querySelector('.setup-fireball-wrap');

  // находит скрытые инпуты
  var coatInput = playerSetup.querySelector('input[name="coat-color"]');
  var eyesInput = playerSetup.querySelector('input[name="eyes-color"]');
  var fireballInput = playerSetup.querySelector('input[name="fireball-color"]');

  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };

  var onWizardCoatClick = function () {
    var newColor = window.util.getWizardItemsColor(Colors.COAT);
    wizardCoatElement.style.fill = newColor;
    coatInput.value = newColor;
    wizard.onCoatChange(newColor);
  };

  var onWizardEyeClick = function () {
    var newColor = window.util.getWizardItemsColor(Colors.EYES);
    wizardEyesElement.style.fill = newColor;
    eyesInput.value = newColor;
    wizard.onEyesChange(newColor);
  };

  var onWizardFireballClick = function () {
    var color = window.util.getWizardItemsColor(Colors.FIREBALL);
    fireballInput.value = color;
    wizardFireball.style.backgroundColor = color;
  };

  wizardCoatElement.addEventListener('click', onWizardCoatClick);
  wizardEyesElement.addEventListener('click', onWizardEyeClick);
  wizardFireball.addEventListener('click', onWizardFireballClick);

  window.wizard = wizard;
})();
