/* eslint-disable no-console */
'use strict';

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
var wizards = [];

var createWizardsList = function (count, array) {

  for (var i = 0; i < count; i++) {
    var wizard = new CreateSimilarWizard(firstNames, lastNames, coatsColors, eyesColors);
    array.push(wizard);
  }

  return wizards;
};

createWizardsList(SIMILAR_WIZARDS_COUNT, wizards);

// стилизует мага
var setWizard = function (elem, array, index) {
  elem.querySelector('.setup-similar-label').textContent = array[index].name;
  elem.querySelector('.wizard-coat').style.fill = array[index].coatColor;
  elem.querySelector('.wizard-eyes').style.fill = array[index].eyeColor;
};

// показывает необходимые окна
document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

// находит контейнер для похожих магов
var similarListContainer = document.querySelector('.setup-similar-list');

// находит шаблон похожего мага
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

// отрисовывает магов
var renderWizards = function (count, container) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < count; i++) {
    var element = similarWizardTemplate.cloneNode(true);
    setWizard(element, wizards, i);
    fragment.appendChild(element);
  }

  container.appendChild(fragment);
};

renderWizards(SIMILAR_WIZARDS_COUNT, similarListContainer);
