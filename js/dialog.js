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

  var changeSumbitButtonState = function (string, boolean) {
    submitButton.textContent = string;
    submitButton.disabled = boolean;
  };

  var getErrorBanner = function (errorMessage) {
    var node = document.createElement('div');

    node.classList.add('error-banner');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var removeErrorBanner = function () {
    var banner = document.querySelector('.error-banner');

    if (banner) {
      banner.parentNode.removeChild(banner);
    }
  };

  var successHandler = function () {
    changeSumbitButtonState('Сохранить', false);
    closePopup();
    removeErrorBanner();
  };

  var errorHandler = function (errorMessage) {
    removeErrorBanner();
    getErrorBanner(errorMessage);
    changeSumbitButtonState('Сохранить', false);
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
    evt.preventDefault();

    changeSumbitButtonState('Данные отправляются', true);
    window.backend.save(new FormData(form), successHandler, errorHandler);
  });

})();
