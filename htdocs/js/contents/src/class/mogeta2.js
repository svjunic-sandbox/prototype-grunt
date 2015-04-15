(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  (function(window, document, $) {
    "use strict";
    window.MOGETA = window.MOGETA || {};
    window.MOGETA.GLOBAL = window.MOGETA.GLOBAL || {};
    window.MOGETA.GLOBAL.Menu = (function() {
      var changeShowMode, _status;

      Menu.el = $('#global-nav');

      _status = '';

      function Menu(args) {
        return;
      }

      changeShowMode = function(args) {};

      Menu.prototype.update = function(args) {
        if (args) {
          return changeShowMode.call(this, args);
        }
      };

      Menu.property('mode', {
        get: function() {
          return this._mode;
        },
        set: function(foo) {
          return this._mode = mode;
        }
      });

      return Menu;

    })();
    return window.MOGETA.GLOBAL.Menu2 = (function(_super) {
      __extends(Menu2, _super);

      function Menu2(args) {
        return;
      }

      return Menu2;

    })(mogeta);
  })(window, document, jQuery);

}).call(this);
