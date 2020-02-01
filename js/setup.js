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
var wizardModel = document.querySelector('.setup-wizard');
var wizardCoat = wizardModel.querySelector('.wizard-coat');
var wizardEyes = wizardModel.querySelector('.wizard-eyes');
var wizardFireball = document.querySelector('.setup-fireball-wrap');

// находит скрытые инпуты
var playerSetup = document.querySelector('.setup-player');
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

// изменяет цвет и знчение атрибута скрытого инпута
var changeColor = function (array, input) {
  var color = array[getRandomInt(0, getMaxIndex(array))];
  input.value = color;

  return color;
};

// обработчики событий
var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var onInputEscStopProp = function (evt) {
  if (evt.key === ESC_KEY) {
    evt.stopPropagation();
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

// открывает окно настроек персонажа
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// закрывает окно настроек персонажа
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
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

titleInput.addEventListener('keydown', function (evt) {
  onInputEscStopProp(evt);
});

// обработчики событий на модели мага
wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = changeColor(coatsColors, coatInput);
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = changeColor(eyesColors, eyesInput);
});

wizardFireball.addEventListener('click', function () {
  wizardFireball.style.backgroundColor = changeColor(fireballColors, fireballInput);
});

// действия
setup.querySelector('.setup-similar').classList.remove('hidden');

var wizards = createWizardsList(SIMILAR_WIZARDS_COUNT);
var wizardsFragment = getFragment(SIMILAR_WIZARDS_COUNT);
similarListContainer.appendChild(wizardsFragment);
