'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var titleInput = setup.querySelector('.setup-user-name');
  var form = setup.querySelector('.setup-wizard-form');
  var submitButton = form.querySelector('.setup-submit');

  var resetPopupPosition = function () {
    setup.style.top = '';
    setup.style.left = '';
  };

  var onEscPress = function (evt) {
    if (evt.key === ESC_KEY && evt.target !== titleInput) {
      closePopup();
      resetPopupPosition();
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
      resetPopupPosition();
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
  };

  var successHandler = function () {
    submitButton.textContent = 'Сохранить';
    submitButton.disabled = false;
    setup.classList.add('hidden');
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

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    onSetupOpenEnterPress(evt);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
    resetPopupPosition();
  });

  setupClose.addEventListener('keydown', function (evt) {
    onSetupCloseEnterPress(evt);
  });

  form.addEventListener('submit', function (evt) {
    submitButton.textContent = 'Данные отправляются';
    submitButton.disabled = true;
    window.backend.save(new FormData(form), successHandler, errorHandler);
    evt.preventDefault();
  });

})();
