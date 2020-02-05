/* eslint-disable no-console */
'use strict';

var SIMILAR_WIZARDS_COUNT = 4;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

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

var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

// находит окно настроек персонажа
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var titleInput = setup.querySelector('.setup-user-name');

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

// находит контейнер для похожих магов
var similarListContainer = document.querySelector('.setup-similar-list');

// находит шаблон похожего мага
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// получает случайное число в заданном диапазоне
var getRandomInt = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
};

// получает максимальный индекс массива
var getMaxIndex = function (array) {
  return array.length - 1;
};

// получает случайное имя
var getRandomName = function (names, surnames) {
  var firstName = names[getRandomInt(0, getMaxIndex(names))];
  var lastName = surnames[getRandomInt(0, getMaxIndex(surnames))];

  return firstName + ' ' + lastName;
};

// получает случайный цвет
var getRandomColor = function (colors) {
  return colors[getRandomInt(0, getMaxIndex(colors))];
};

// конструктор похожего мага
var CreateSimilarWizard = function (names, surnames, coatColors, eyeColors) {
  this.name = getRandomName(names, surnames);
  this.coatColor = getRandomColor(coatColors);
  this.eyeColor = getRandomColor(eyeColors);
};

// создает массив магов
var createWizardsList = function (count) {
  var result = [];

  for (var i = 0; i < count; i++) {
    var wizard = new CreateSimilarWizard(firstNames, lastNames, coatsColors, eyesColors);
    result.push(wizard);
  }

  return result;
};

// стилизует мага
var setWizard = function (elem, array) {
  elem.querySelector('.setup-similar-label').textContent = array.name;
  elem.querySelector('.wizard-coat').style.fill = array.coatColor;
  elem.querySelector('.wizard-eyes').style.fill = array.eyeColor;
};

// получает фрагмент магов
var getFragment = function (count) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < count; i++) {
    var element = similarWizardTemplate.cloneNode(true);
    setWizard(element, wizards[i]);
    fragment.appendChild(element);
  }

  return fragment;
};

// получает цвет
var getWizardItemsColor = function (array) {
  return array[getRandomInt(0, getMaxIndex(array))];
};

// обработчики событий
var onEscPress = function (evt) {
  if (evt.key === ESC_KEY && evt.target !== titleInput) {
    closePopup();
  }
};

var onSetupOpenEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
};

var onSetupCloseEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
};

var onWizardFireballClick = function () {
  var color = getWizardItemsColor(fireballColors);
  fireballInput.value = color;
  wizardFireball.style.backgroundColor = color;
};

var onWizardCoatClick = function () {
  var color = getWizardItemsColor(coatsColors);
  coatInput.value = color;
  wizardCoat.style.fill = color;
};

var onWizardEyesClick = function () {
  var color = getWizardItemsColor(eyesColors);
  eyesInput.value = color;
  wizardEyes.style.fill = color;
};

// открывает окно настроек персонажа
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onEscPress);
};

// закрывает окно настроек персонажа
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  onSetupOpenEnterPress(evt);
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  onSetupCloseEnterPress(evt);
});

// обработчики событий на модели мага
wizardCoat.addEventListener('click', onWizardCoatClick);
wizardEyes.addEventListener('click', onWizardEyesClick);
wizardFireball.addEventListener('click', onWizardFireballClick);

// действия
setup.querySelector('.setup-similar').classList.remove('hidden');

var wizards = createWizardsList(SIMILAR_WIZARDS_COUNT);
var wizardsFragment = getFragment(SIMILAR_WIZARDS_COUNT);
similarListContainer.appendChild(wizardsFragment);
