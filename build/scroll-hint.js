/**
 * Modules in this bundle
 * @license
 *
 * scroll-hint:
 *   license: MIT (http://opensource.org/licenses/MIT)
 *   author: steelydylan
 *   version: 0.0.1
 *
 * es6-object-assign:
 *   license: MIT (http://opensource.org/licenses/MIT)
 *   author: Rubén Norte <rubennorte@gmail.com>
 *   maintainers: rubennorte <rubennorte@gmail.com>
 *   homepage: https://github.com/rubennorte/es6-object-assign
 *   version: 1.1.0
 *
 * This header is generated by licensify (https://github.com/twada/licensify)
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ScrollHint = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Code refactored from Mozilla Developer Network:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 */

'use strict';

function assign(target, firstSource) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert first argument to object');
  }

  var to = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var nextSource = arguments[i];
    if (nextSource === undefined || nextSource === null) {
      continue;
    }

    var keysArray = Object.keys(Object(nextSource));
    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
      var nextKey = keysArray[nextIndex];
      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
      if (desc !== undefined && desc.enumerable) {
        to[nextKey] = nextSource[nextKey];
      }
    }
  }
  return to;
}

function polyfill() {
  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: assign
    });
  }
}

module.exports = {
  assign: assign,
  polyfill: polyfill
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _es6ObjectAssign = require('es6-object-assign');

var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaults = {
  scrollableClass: 'is-scrollable'
};

var ScrollHint = function () {
  function ScrollHint(ele, option) {
    var _this = this;

    _classCallCheck(this, ScrollHint);

    this.opt = (0, _es6ObjectAssign.assign)({}, defaults, option);
    this.items = [];
    var elements = typeof ele === 'string' ? document.querySelectorAll(ele) : ele;
    [].forEach.call(elements, function (element) {
      element.style.position = 'relative';
      element.style.overflow = 'auto';
      var item = {
        element: element,
        scrolledIn: false,
        interacted: false
      };
      element.addEventListener('scroll', function () {
        item.interacted = true;
        _this.updateItem(item);
      });
      (0, _util.append)(element, '<div class="scroll-hint"><span></span></div>');
      _this.items.push(item);
    });
    window.addEventListener('scroll', function () {
      _this.updateItems();
    });
    window.addEventListener('resize', function () {
      _this.updateItems();
    });
    this.updateItems();
  }

  _createClass(ScrollHint, [{
    key: 'canScroll',
    value: function canScroll(item) {
      var element = item.element,
          scrolledIn = item.scrolledIn,
          interacted = item.interacted;

      return !interacted && scrolledIn && element.offsetHeight === element.scrollHeight && element.clientWidth <= element.scrollWidth;
    }
  }, {
    key: 'updateItems',
    value: function updateItems() {
      var _this2 = this;

      [].forEach.call(this.items, function (item) {
        _this2.updateItem(item);
      });
    }
  }, {
    key: 'checkPosition',
    value: function checkPosition(item) {
      var element = item.element,
          scrolledIn = item.scrolledIn,
          interacted = item.interacted;

      if (scrolledIn) {
        return;
      }
      if ((0, _util.getOffset)(element).top < (0, _util.getScrollTop)() + window.innerHeight) {
        item.scrolledIn = true;
      }
    }
  }, {
    key: 'updateItem',
    value: function updateItem(item) {
      var opt = this.opt;
      var element = item.element;

      this.checkPosition(item);
      if (this.canScroll(item)) {
        (0, _util.addClass)(element, opt.scrollableClass);
      } else {
        (0, _util.removeClass)(element, opt.scrollableClass);
      }
    }
  }]);

  return ScrollHint;
}();

exports.default = ScrollHint;
module.exports = exports['default'];

},{"./util":3,"es6-object-assign":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var append = exports.append = function append(element, string) {
  var div = document.createElement('div');
  div.innerHTML = string;
  while (div.children.length > 0) {
    element.appendChild(div.children[0]);
  }
};

var addClass = exports.addClass = function addClass(element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ' ' + className;
  }
};

var removeClass = exports.removeClass = function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

var getScrollTop = exports.getScrollTop = function getScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};

var getScrollLeft = exports.getScrollLeft = function getScrollLeft() {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
};

var getOffset = exports.getOffset = function getOffset(el) {
  var rect = el.getBoundingClientRect();
  return {
    top: rect.top + getScrollTop(),
    left: rect.left + getScrollLeft()
  };
};

},{}]},{},[2])(2)
});