'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var titleInput = setup.querySelector('.setup-user-name');

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

})();
