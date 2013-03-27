/**
 * Density v0.1.0
 * MIT licensed
 *
 * Copyright (C) 2012 usabli.ca - By Afshin Mehrabani
 */ 
 (function () {
  //Default config/variables
  var VERSION = "0.1.0";
  //Check for nodeJS
  var hasModule = (typeof module !== 'undefined' && module.exports);
  //import node modules
  var fs = require('fs');

  /**
   * Density main class
   *
   * @class Density
   */
  function Density(str) {
    this._str = str.toLowerCase();

    //default options
    this._options = {
      stopWordFile: "stopwords.json",
      minKeywordLength: 2,
      maxKeywordLength: 50
    };
  }

  /**
   * Remove all stop words from the text from given setting file
   *
   * @method _removeStopWords
   */
  function _removeStopWords() {
    var fileData = fs.readFileSync(this._options.stopWordFile, 'utf8').toLowerCase();
    var stopwords = JSON.parse(fileData);
    for (var i = stopwords.length - 1; i >= 0; i--) {
      var regex  = new RegExp("( |^)" + stopwords[i].replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1") + "( |$)", "g");
      this._str = this._str.replace(regex, "$1$2");
    };
  }

  /**
   * Convert HTML to Text
   * Thanks to: https://github.com/mtrimpe/jsHtmlToText
   *
   * @method _htmlToText
   */
  function _htmlToText() {
    var text = this._str;

    text = text
    // Remove line breaks
    .replace(/(?:\n|\r\n|\r)/ig, " ")
    // Remove content in script tags.
    .replace(/<\s*script[^>]*>[\s\S]*?<\/script>/mig, "")
    // Remove content in style tags.
    .replace(/<\s*style[^>]*>[\s\S]*?<\/style>/mig, "")
    // Remove content in comments.
    .replace(/<!--.*?-->/mig, "")
    // Remove !DOCTYPE
    .replace(/<!DOCTYPE.*?>/ig, "");

    /* I scanned http://en.wikipedia.org/wiki/HTML_element for all html tags.
    I put those tags that should affect plain text formatting in two categories:
    those that should be replaced with two newlines and those that should be
    replaced with one newline. */
    var doubleNewlineTags = ['p', 'h[1-6]', 'dl', 'dt', 'dd', 'ol', 'ul', 'dir', 'address', 'blockquote', 'center', 'div', 'hr', 'pre', 'form', 'textarea', 'table'];

    var singleNewlineTags = ['li', 'del', 'ins', 'fieldset', 'legend','tr', 'th', 'caption', 'thead', 'tbody', 'tfoot'];

    for (var i = 0; i < doubleNewlineTags.length; i++) {
      var r = RegExp('</?\\s*' + doubleNewlineTags[i] + '[^>]*>', 'ig');
      text = text.replace(r, ' ');
    }

    for (var i = 0; i < singleNewlineTags.length; i++) {
      var r = RegExp('<\\s*' + singleNewlineTags[i] + '[^>]*>', 'ig');
      text = text.replace(r, ' ');
    }

    // Replace <br> and <br/> with a single newline
    text = text.replace(/<\s*br[^>]*\/?\s*>/ig, ' ');

    text = text
    // Remove all remaining tags.
    .replace(/(<([^>]+)>)/ig, "")
    // Trim rightmost whitespaces for all lines
    .replace(/([^\n\S]+)\n/g, " ")
    .replace(/([^\n\S]+)$/, "")
    // Make sure there are never more than two
    // consecutive linebreaks.
    .replace(/\n{2,}/g, " ")
    // Remove newlines at the beginning of the text.
    .replace(/^\n+/, "")
    // Remove newlines at the end of the text.
    .replace(/\n+$/, "")
    // Remove HTML entities.
    .replace(/&([^;]+);/g, ' ')
    //remove all tabs and replace them with whitespace
    .replace(/\t/g, " ")
    //remove whitespace > 2
    .replace(/ {2,}/g, " ");

    this._str = text;
  }

  /**
   * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
   * via: http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
   *
   * @param obj1
   * @param obj2
   * @returns obj3 a new object based on obj1 and obj2
   */
  function _mergeOptions(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) {
      obj3[attrname] = obj1[attrname];
    }
    for (var attrname in obj2) {
      obj3[attrname] = obj2[attrname];
    }
    return obj3;
  }

  /**
   * Calculate keyword density in the given text
   *
   * @method _calculateKeywordsDensity
   * @return {Object} Keywords density
   */
  function _calculateKeywordsDensity() {
    //convert html to text
    _htmlToText.call(this);

    //remove all stop words
    _removeStopWords.call(this);
    //split the text with space
    var words = this._str.split(" ");
    var density = [];

    //sort the array
    words = words.sort(function (a, b) {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    //used for store the word count
    var currentWordCount = 1;
    for (var i = words.length - 1; i >= 0; i--) {
      if (words[i].length <= this._options.minKeywordLength || words[i].length >= this._options.maxKeywordLength)
        continue;
      if (words[i] == words[i - 1]) {
        //a new duplicate keyword
        ++currentWordCount;
      } else {
        //add the keyword with density to the array
        density.push({
          word: words[i],
          count: currentWordCount
        });
        //reset the keyword density counter
        currentWordCount = 1;
      }
    }
    //sort the array with density of keywords
    density = density.sort(function (a, b) {
      if (a.count > b.count) return -1;
      if (a.count < b.count) return 1;
      return 0;
    });

    return density;
  }

  var density = function (inputStr) {
    if (inputStr === "" || inputStr === null) {
      return null;
    }
    return new Density(inputStr);
  };

  /**
   * Current Density version
   *
   * @property version 
   * @type String
   */
  density.version = VERSION;

  //Prototype
  density.fn = Density.prototype = {
    clone: function () {
      return new Density(this);
    },
    value: function () {
      return this._str;
    },
    toString: function () {
      return this._str.toString();
    },
    set: function (value) {
      this._str = String(value);
      return this;
    },
    setOption: function (option, value) {
      this._options[option] = value;
      return this;
    },
    setOptions: function (options) {
      this._options = _mergeOptions(this._options, options);
      return this;
    },
    getDensity: function () {
      return _calculateKeywordsDensity.call(this);
    }
  };

  //Expose Density
  //CommonJS module is defined
  if (hasModule) {
    module.exports = density;
  }
  //global ender:false
  if (typeof ender === 'undefined') {
    // here, `this` means `window` in the browser, or `global` on the server
    // add `density` as a global object via a string identifier,
    // for Closure Compiler "advanced" mode
    this['density'] = density;
  }
  //global define:false
  if (typeof define === 'function' && define.amd) {
    define('density', [], function () {
      return density;
    });
  }
})();