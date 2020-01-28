'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;

// bars

var HYST_HEIGHT = 150;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = HYST_HEIGHT - 2 * FONT_GAP;
var HYST_START = CLOUD_HEIGHT - HYST_HEIGHT - FONT_GAP;

// функция отрисовки облака статистики

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// функция отрисовки текста

var renderText = function (ctx) {
  var textLines = ['Ура, вы победили!', 'Список результатов:'];

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';

  for (var i = 0; i < textLines.length; i++) {
    ctx.fillText(textLines[i], CLOUD_X + 2 * GAP, CLOUD_Y + 2 * GAP + (FONT_GAP + GAP) * i);
  }

};

// получает максимальное число из массива

var getMaxElement = function (arr) {
  // проверяем крайний случай
  if (arr.length === 1) {
    return arr[0];
  }

  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

// получает цвет со случайной насыщенностью синего

var getColor = function () {
  var saturation = Math.round(Math.random() * 100);

  return 'hsl(240, ' + saturation + '%, 50%)';
};

// функция отрисовки столбиков гистограммы

var renderBars = function (ctx, names, times) {
  for (var i = 0; i < names.length; i++) {
    // определяет максимальное время прохождения игры игроком
    var maxTime = Math.ceil(getMaxElement(times));
    // определяет расстояние смещения
    var shift = Math.round(BAR_HEIGHT - (BAR_HEIGHT * times[i]) / maxTime);
    // пишет время над столбиком
    ctx.fillText(Math.ceil(times[i]), CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, HYST_START + shift);
    // условие для изменения цвета столбика
    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : getColor();
    // отрисовывает сам столбик
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, HYST_START + FONT_GAP + shift, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime);
    // пишет имя игрока
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - FONT_GAP);
  }
};

// рендер статистики

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');
  renderText(ctx);
  renderBars(ctx, names, times);
};
