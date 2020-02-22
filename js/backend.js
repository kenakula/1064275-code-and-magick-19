'use strict';

(function () {
  var TIMEOUT_IN_MS = 10000; // 10 s
  var RESPONSE_TYPE = 'json';
  var DOWNLOAD_LINK = 'https://js.dump.academy/code-and-magick/data';
  var UPLOAD_LINK = 'https://js.dump.academy/code-and-magick';
  var Method = {
    GET: 'GET',
    POST: 'POST',
  };
  var ResponseCode = {
    OK: 200,
    NOT_FOUND: 404,
    UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
  };
  window.backend = {};

  var responseHandler = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case ResponseCode.OK:
          onLoad(xhr.response);
          break;
        case ResponseCode.NOT_FOUND:
          onError('Запрашиваемыe данные не существуют!');
          break;
        case ResponseCode.UNAVAILABLE:
          onError('Ошибка сервера, побробуйте снова позже');
          break;
        case ResponseCode.GATEWAY_TIMEOUT:
          onError('Слишком долгое ожидание ответа сервера, возможно медленное интернет-соединение');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Проверьте соединение');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  var createXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT_IN_MS;
    responseHandler(xhr, onSuccess, onError);

    return xhr;
  };

  window.backend.load = function (onLoad, onError) {
    var xhr = createXhr(onLoad, onError);

    xhr.open(Method.GET, DOWNLOAD_LINK);
    xhr.send();
  };

  window.backend.save = function (data, onLoad, onError) {
    var xhr = createXhr(onLoad, onError);

    xhr.open(Method.POST, UPLOAD_LINK);
    xhr.send(data);
  };

})();
