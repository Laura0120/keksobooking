'use strict';

(function () {
  var ARROW_HEIGHT = 22;
  var markElement = document.querySelector('.map__pin--main');
  var MIN_COORDINATES_Y = 130;
  var MAX_COORDINATES_Y = 630;
  var location = {
    x: markElement.offsetLeft + markElement.offsetWidth / 2,
    y: markElement.offsetTop + markElement.offsetHeight / 2,
  };

  markElement.addEventListener('keydown', function (evt) {
    if (evt.code === window.util.KEY_ENTER) {
      window.map.showMap();
    }
  });

  markElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (evt.which !== window.util.LEFT_MOUSE_BUTTON) {
      return;
    }
    window.map.showMap();
    location = {
      x: markElement.offsetLeft + markElement.offsetWidth / 2,
      y: markElement.offsetTop + markElement.offsetHeight + ARROW_HEIGHT,
    };

    window.form.setAddress(location.x, location.y);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      var currentCoords = {
        x: markElement.offsetLeft - shift.x,
        y: markElement.offsetTop - shift.y,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      if (currentCoords.x + markElement.offsetWidth / 2 >= 0 && currentCoords.x + markElement.offsetWidth / 2 <= window.map.getWidth()) {
        markElement.style.left = currentCoords.x + 'px';
        location.x = currentCoords.x + markElement.offsetWidth / 2;
        window.form.setAddress(location.x, location.y);
      }
      if (
        currentCoords.y + markElement.offsetHeight + ARROW_HEIGHT >= MIN_COORDINATES_Y &&
        currentCoords.y + markElement.offsetHeight + ARROW_HEIGHT <= MAX_COORDINATES_Y
      ) {
        markElement.style.top = currentCoords.y + 'px';
        location.y = currentCoords.y + markElement.offsetHeight + ARROW_HEIGHT;
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.userPin = {
    location: location,
  };
})();
