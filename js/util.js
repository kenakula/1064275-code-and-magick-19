'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var getMaxIndex = function (array) {
    return array.length - 1;
  };

  var getRandomInt = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
  };

  var getRandomName = function (names, surnames) {
    var firstName = names[getRandomInt(0, getMaxIndex(names))];
    var lastName = surnames[getRandomInt(0, getMaxIndex(surnames))];

    return firstName + ' ' + lastName;
  };

  var getRandomColor = function (colors) {
    return colors[getRandomInt(0, getMaxIndex(colors))];
  };

  var getWizardItemsColor = function (array) {
    return array[getRandomInt(0, getMaxIndex(array))];
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  var isEscEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };

  var getColor = function () {
    var saturation = Math.round(Math.random() * 100);

    return 'hsl(240, ' + saturation + '%, 50%)';
  };

  var getMaxElement = function (arr) {
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

  window.util = {
    getMaxIndex: getMaxIndex,
    getRandomInt: getRandomInt,
    getRandomName: getRandomName,
    getRandomColor: getRandomColor,
    getWizardItemsColor: getWizardItemsColor,
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    getColor: getColor,
    getMaxElement: getMaxElement,
  };

})();
