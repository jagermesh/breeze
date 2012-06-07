// 
// Breeze Framework : Version 0.0.5
// (C) Sergiy Lavryk
// jagermesh@gmail.com
// 

!function (window, undefined) {

  window.br = window.br || {};

  var _helper = {

    pack: function(data) {
      return JSON.stringify(data);
    },

    unpack: function(data) {
      try {
        return JSON.parse(data);
      } catch(ex) {
        return null;
      }
    }

  }

  var storage = function(storage) {

    var _storage = storage;

    this.get = function(key, defaultValue) {
      if (br.isArray(key)) {
        var result = {};
        for(i in key) {
          result[key[i]] = this.get(key[i]);
        }
      } else {        
        var result = _helper.unpack(_storage.getItem(key));
      }
      return br.isEmpty(result) ? (br.isEmpty(defaultValue) ? result : defaultValue) : result;
    }

    this.set = function(key, value) {
      if (br.isObject(key)) {
        for(name in key) {
          this.set(name, key[name]);
        }
      } else {
        _storage.setItem(key, _helper.pack(value));
      }
      return this;
    }

    this.inc = function(key, increment, glue) {
      var value = this.get(key);
      if (br.isNumber(value)) {
        var increment = (br.isNumber(increment) ? increment : 1);
        this.set(key, value + increment);
      } else
      if (br.isString(value)) {
        if (!br.isEmpty(increment)) {
          if (glue === undefined) {
            glue = ', ';
          }
          if (!br.isEmpty(value)) {
            value = value + glue + increment;
          } else {
            value = increment;
          }
          this.set(key, value);
        }
      } else {
        var increment = (br.isNumber(increment) ? increment : 1);
        this.set(key, increment);
      }
      return this;
    }

    this.dec = function(key, increment) {
      var increment = (br.isNumber(increment) ? increment : 1);
      var value = this.get(key);
      this.set(key, br.isNumber(value) ? (value - increment) : increment);
      return this;
    }

    this.append = function(key, newValue) {
      if (!br.isEmpty(newValue)) {
        var value = this.get(key);
        if (!br.isArray(value)) {
          value = [];
        }
        if (br.isArray(newValue)) {
          for(i in newValue) {
            this.append(key, newValue[i]);
          }
        } else {
          value.push(newValue);
          this.set(key, value);
        }
      }
      return this;
    }

    this.push = function(key, newValue) { return this.append(key, newValue); }

    this.prepend = function(key, newValue) {
      if (!br.isEmpty(newValue)) {
        var value = this.get(key);
        if (!br.isArray(value)) {
          value = [];
        }
        if (br.isArray(newValue)) {
          for(i in newValue) {
            this.prepend(key, newValue[i]);
          }
        } else {
          value.unshift(newValue);
          this.set(key, value);
        }
      }
      return this;
    }

    this.takeLast = function(key) {
      var result = null;
      var value = this.get(key);
      if (br.isArray(value)) {
        if (value.length > 0) {
          var result = value.pop();
          this.set(key, value);
        }
      }
      return result;
    }

    this.pop = function(key, newValue) { return this.takeLast(key); }

    this.takeFirst = function(key) {
      var result = null;
      var value = this.get(key);
      if (br.isArray(value)) {
        if (value.length > 0) {
          var result = value.shift();
          this.set(key, value);
        }
      }
      return result;
    }

    this.extend = function(key, newValue) {
      if (!br.isEmpty(newValue)) {
        var value = this.get(key);
        if (!br.isObject(value)) {
          value = {};
        }
        if (br.isObject(newValue)) {
          for(i in newValue) {
            value[i] = newValue[i];
          }
          this.set(key, value);
        }
      }
      return this;
    }

    this.not = function(key) {
      var value = this.get(key);
      if (!br.isBoolean(value)) {
        value = false;
      }
      this.set(key, !value);
      return this;
    }

    this.clear = function() {
      _storage.clear();
      return this;
    }

    this.all = function() {
      var result = {};
      for(name in _storage) {
        result[name] = this.get(name);
      }
      return result;
    }

    this.remove = function() {
      for(i in arguments) {
        if (br.isObject(arguments[i])) {
          for(k in arguments[i]) {
            this.remove(arguments[i][k]);
          }
        } else {
          _storage.removeItem(arguments[i]);
        }
      }
      return this;
    }

  }

  window.br.storage = new storage(window.localStorage);
  window.br.session = new storage(window.sessionStorage);

}(window);
