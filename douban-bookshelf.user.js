// ==UserScript==
// @name               豆瓣读书书架
// @name:zh            豆瓣读书书架
// @namespace          https://github.com/ilyydy/tampermonkey-script
// @version            0.0.1
// @author             ilyydy
// @description        无需登录，快速选择书籍加入书架，复制导出书籍信息
// @description:zh     无需登录，快速选择书籍加入书架，复制导出书籍信息
// @description:zh-CN  无需登录，快速选择书籍加入书架，复制导出书籍信息
// @license            MIT
// @icon               https://img3.doubanio.com/favicon.ico
// @supportURL         https://github.com/ilyydy/tampermonkey-script/issues
// @downloadURL        https://github.com/ilyydy/tampermonkey-script/raw/douban-bookshelf/douban-bookshelf.user.js
// @updateURL          https://github.com/ilyydy/tampermonkey-script/raw/douban-bookshelf/douban-bookshelf.meta.js
// @match              http*://*book.douban.com/*
// @match              http*://search.douban.com/book/*
// @require            https://cdn.jsdelivr.net/npm/vue@3.2.45/dist/vue.global.prod.js
// @require            https://cdn.sheetjs.com/xlsx-0.19.0/package/dist/xlsx.full.min.js
// @resource           element-plus/dist/index.css  https://cdn.jsdelivr.net/npm/element-plus@2.2.19/dist/index.css
// @connect            book.douban.com
// @grant              GM_getResourceText
// @grant              GM_getValue
// @grant              GM_setClipboard
// @grant              GM_setValue
// @grant              GM_xmlhttpRequest
// ==/UserScript==

(e=>{const t=document.createElement("style");t.dataset.source="vite-plugin-monkey",t.innerText=e,document.head.appendChild(t)})(".book-field[data-v-5f2bdcc9]{margin-bottom:5px}.item[data-v-bdb4b0de]{display:grid;grid-template-columns:80% 20%}.item-button[data-v-bdb4b0de]{display:grid}.affix[data-v-0665e06d]{position:fixed;bottom:50px;right:50px}.book-list-container[data-v-0665e06d]{margin:auto 20px}.book-list-container-header[data-v-0665e06d]{margin-bottom:20px}.book-list-container-header-select[data-v-0665e06d]{margin-left:10px;width:140px}.book-list-container-header-switch[data-v-0665e06d]{margin-left:10px}.book-list-container-empty p[data-v-0665e06d]{font-size:18px;text-align:center}.book-list-container-book-item[data-v-0665e06d]{margin-bottom:20px}");

(function(vue, XLSX2) {
  "use strict";
  const cssLoader = (e) => {
    const t = GM_getResourceText(e), o = document.createElement("style");
    return o.innerText = t, document.head.append(o), t;
  };
  cssLoader("element-plus/dist/index.css");
  var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
  const freeGlobal$1 = freeGlobal;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal$1 || freeSelf || Function("return this")();
  const root$1 = root;
  var Symbol$1 = root$1.Symbol;
  const Symbol$2 = Symbol$1;
  var objectProto$4 = Object.prototype;
  var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
  var nativeObjectToString$1 = objectProto$4.toString;
  var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty$4.call(value, symToStringTag$1), tag = value[symToStringTag$1];
    try {
      value[symToStringTag$1] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString$1.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag$1] = tag;
      } else {
        delete value[symToStringTag$1];
      }
    }
    return result;
  }
  var objectProto$3 = Object.prototype;
  var nativeObjectToString = objectProto$3.toString;
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
  function baseGetTag(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  function isObjectLike(value) {
    return value != null && typeof value == "object";
  }
  var symbolTag = "[object Symbol]";
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
  }
  function arrayMap(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length, result = Array(length);
    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }
  var isArray$1 = Array.isArray;
  const isArray$2 = isArray$1;
  var INFINITY$1 = 1 / 0;
  var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
  function baseToString(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isArray$2(value)) {
      return arrayMap(value, baseToString) + "";
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
  }
  function isObject$1(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  var asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
  function isFunction$1(value) {
    if (!isObject$1(value)) {
      return false;
    }
    var tag = baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }
  var coreJsData = root$1["__core-js_shared__"];
  const coreJsData$1 = coreJsData;
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  var funcProto$1 = Function.prototype;
  var funcToString$1 = funcProto$1.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString$1.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto = Function.prototype, objectProto$2 = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty$3 = objectProto$2.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString.call(hasOwnProperty$3).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value) {
    if (!isObject$1(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
  function isKey(value, object) {
    if (isArray$2(value)) {
      return false;
    }
    var type = typeof value;
    if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
  }
  var nativeCreate = getNative(Object, "create");
  const nativeCreate$1 = nativeCreate;
  function hashClear() {
    this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
    this.size = 0;
  }
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
  var objectProto$1 = Object.prototype;
  var hasOwnProperty$2 = objectProto$1.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate$1) {
      var result = data[key];
      return result === HASH_UNDEFINED$1 ? void 0 : result;
    }
    return hasOwnProperty$2.call(data, key) ? data[key] : void 0;
  }
  var objectProto = Object.prototype;
  var hasOwnProperty$1 = objectProto.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$1.call(data, key);
  }
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  function Hash(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  function ListCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  var Map = getNative(root$1, "Map");
  const Map$1 = Map;
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map$1 || ListCache)(),
      "string": new Hash()
    };
  }
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  function MapCache(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  var FUNC_ERROR_TEXT = "Expected a function";
  function memoize(func, resolver) {
    if (typeof func != "function" || resolver != null && typeof resolver != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache)();
    return memoized;
  }
  memoize.Cache = MapCache;
  var MAX_MEMOIZE_SIZE = 500;
  function memoizeCapped(func) {
    var result = memoize(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });
    var cache = result.cache;
    return result;
  }
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46) {
      result.push("");
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
    });
    return result;
  });
  const stringToPath$1 = stringToPath;
  function toString(value) {
    return value == null ? "" : baseToString(value);
  }
  function castPath(value, object) {
    if (isArray$2(value)) {
      return value;
    }
    return isKey(value, object) ? [value] : stringToPath$1(toString(value));
  }
  var INFINITY = 1 / 0;
  function toKey(value) {
    if (typeof value == "string" || isSymbol(value)) {
      return value;
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  function baseGet(object, path) {
    path = castPath(path, object);
    var index = 0, length = path.length;
    while (object != null && index < length) {
      object = object[toKey(path[index++])];
    }
    return index && index == length ? object : void 0;
  }
  function get(object, path, defaultValue) {
    var result = object == null ? void 0 : baseGet(object, path);
    return result === void 0 ? defaultValue : result;
  }
  function fromPairs(pairs) {
    var index = -1, length = pairs == null ? 0 : pairs.length, result = {};
    while (++index < length) {
      var pair = pairs[index];
      result[pair[0]] = pair[1];
    }
    return result;
  }
  function isNil(value) {
    return value == null;
  }
  var _a$1;
  const isClient = typeof window !== "undefined";
  const isBoolean = (val) => typeof val === "boolean";
  const isNumber = (val) => typeof val === "number";
  const isString$1 = (val) => typeof val === "string";
  const noop = () => {
  };
  isClient && ((_a$1 = window == null ? void 0 : window.navigator) == null ? void 0 : _a$1.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
  function resolveUnref(r) {
    return typeof r === "function" ? r() : vue.unref(r);
  }
  function identity(arg) {
    return arg;
  }
  function tryOnScopeDispose(fn) {
    if (vue.getCurrentScope()) {
      vue.onScopeDispose(fn);
      return true;
    }
    return false;
  }
  function tryOnMounted(fn, sync = true) {
    if (vue.getCurrentInstance())
      vue.onMounted(fn);
    else if (sync)
      fn();
    else
      vue.nextTick(fn);
  }
  function useTimeoutFn(cb, interval, options = {}) {
    const {
      immediate = true
    } = options;
    const isPending = vue.ref(false);
    let timer = null;
    function clear() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }
    function stop() {
      isPending.value = false;
      clear();
    }
    function start(...args) {
      clear();
      isPending.value = true;
      timer = setTimeout(() => {
        isPending.value = false;
        timer = null;
        cb(...args);
      }, resolveUnref(interval));
    }
    if (immediate) {
      isPending.value = true;
      if (isClient)
        start();
    }
    tryOnScopeDispose(stop);
    return {
      isPending,
      start,
      stop
    };
  }
  function unrefElement(elRef) {
    var _a2;
    const plain = resolveUnref(elRef);
    return (_a2 = plain == null ? void 0 : plain.$el) != null ? _a2 : plain;
  }
  const defaultWindow = isClient ? window : void 0;
  function useEventListener(...args) {
    let target;
    let event;
    let listener;
    let options;
    if (isString$1(args[0])) {
      [event, listener, options] = args;
      target = defaultWindow;
    } else {
      [target, event, listener, options] = args;
    }
    if (!target)
      return noop;
    let cleanup = noop;
    const stopWatch = vue.watch(() => unrefElement(target), (el) => {
      cleanup();
      if (!el)
        return;
      el.addEventListener(event, listener, options);
      cleanup = () => {
        el.removeEventListener(event, listener, options);
        cleanup = noop;
      };
    }, { immediate: true, flush: "post" });
    const stop = () => {
      stopWatch();
      cleanup();
    };
    tryOnScopeDispose(stop);
    return stop;
  }
  function useSupported(callback, sync = false) {
    const isSupported = vue.ref();
    const update = () => isSupported.value = Boolean(callback());
    update();
    tryOnMounted(update, sync);
    return isSupported;
  }
  const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  const globalKey = "__vueuse_ssr_handlers__";
  _global[globalKey] = _global[globalKey] || {};
  _global[globalKey];
  var __getOwnPropSymbols$f = Object.getOwnPropertySymbols;
  var __hasOwnProp$f = Object.prototype.hasOwnProperty;
  var __propIsEnum$f = Object.prototype.propertyIsEnumerable;
  var __objRest$2 = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp$f.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols$f)
      for (var prop of __getOwnPropSymbols$f(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum$f.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  function useResizeObserver(target, callback, options = {}) {
    const _a2 = options, { window: window2 = defaultWindow } = _a2, observerOptions = __objRest$2(_a2, ["window"]);
    let observer;
    const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
    const cleanup = () => {
      if (observer) {
        observer.disconnect();
        observer = void 0;
      }
    };
    const stopWatch = vue.watch(() => unrefElement(target), (el) => {
      cleanup();
      if (isSupported.value && window2 && el) {
        observer = new ResizeObserver(callback);
        observer.observe(el, observerOptions);
      }
    }, { immediate: true, flush: "post" });
    const stop = () => {
      cleanup();
      stopWatch();
    };
    tryOnScopeDispose(stop);
    return {
      isSupported,
      stop
    };
  }
  var SwipeDirection;
  (function(SwipeDirection2) {
    SwipeDirection2["UP"] = "UP";
    SwipeDirection2["RIGHT"] = "RIGHT";
    SwipeDirection2["DOWN"] = "DOWN";
    SwipeDirection2["LEFT"] = "LEFT";
    SwipeDirection2["NONE"] = "NONE";
  })(SwipeDirection || (SwipeDirection = {}));
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  const _TransitionPresets = {
    easeInSine: [0.12, 0, 0.39, 0],
    easeOutSine: [0.61, 1, 0.88, 1],
    easeInOutSine: [0.37, 0, 0.63, 1],
    easeInQuad: [0.11, 0, 0.5, 0],
    easeOutQuad: [0.5, 1, 0.89, 1],
    easeInOutQuad: [0.45, 0, 0.55, 1],
    easeInCubic: [0.32, 0, 0.67, 0],
    easeOutCubic: [0.33, 1, 0.68, 1],
    easeInOutCubic: [0.65, 0, 0.35, 1],
    easeInQuart: [0.5, 0, 0.75, 0],
    easeOutQuart: [0.25, 1, 0.5, 1],
    easeInOutQuart: [0.76, 0, 0.24, 1],
    easeInQuint: [0.64, 0, 0.78, 0],
    easeOutQuint: [0.22, 1, 0.36, 1],
    easeInOutQuint: [0.83, 0, 0.17, 1],
    easeInExpo: [0.7, 0, 0.84, 0],
    easeOutExpo: [0.16, 1, 0.3, 1],
    easeInOutExpo: [0.87, 0, 0.13, 1],
    easeInCirc: [0.55, 0, 1, 0.45],
    easeOutCirc: [0, 0.55, 0.45, 1],
    easeInOutCirc: [0.85, 0, 0.15, 1],
    easeInBack: [0.36, 0, 0.66, -0.56],
    easeOutBack: [0.34, 1.56, 0.64, 1],
    easeInOutBack: [0.68, -0.6, 0.32, 1.6]
  };
  __spreadValues({
    linear: identity
  }, _TransitionPresets);
  const NOOP = () => {
  };
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const isArray = Array.isArray;
  const isFunction = (val) => typeof val === "function";
  const isString = (val) => typeof val === "string";
  const isObject = (val) => val !== null && typeof val === "object";
  const cacheStringFunction = (fn) => {
    const cache = /* @__PURE__ */ Object.create(null);
    return (str) => {
      const hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  const camelizeRE = /-(\w)/g;
  const camelize = cacheStringFunction((str) => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
  });
  const isUndefined = (val) => val === void 0;
  const isElement = (e) => {
    if (typeof Element === "undefined")
      return false;
    return e instanceof Element;
  };
  const keysOf = (arr) => Object.keys(arr);
  class ElementPlusError extends Error {
    constructor(m) {
      super(m);
      this.name = "ElementPlusError";
    }
  }
  function throwError(scope, m) {
    throw new ElementPlusError(`[${scope}] ${m}`);
  }
  const classNameToArray = (cls = "") => cls.split(" ").filter((item) => !!item.trim());
  const hasClass = (el, cls) => {
    if (!el || !cls)
      return false;
    if (cls.includes(" "))
      throw new Error("className should not contain space.");
    return el.classList.contains(cls);
  };
  const addClass = (el, cls) => {
    if (!el || !cls.trim())
      return;
    el.classList.add(...classNameToArray(cls));
  };
  const removeClass = (el, cls) => {
    if (!el || !cls.trim())
      return;
    el.classList.remove(...classNameToArray(cls));
  };
  const getStyle = (element, styleName) => {
    var _a2;
    if (!isClient || !element || !styleName)
      return "";
    let key = camelize(styleName);
    if (key === "float")
      key = "cssFloat";
    try {
      const style = element.style[key];
      if (style)
        return style;
      const computed2 = (_a2 = document.defaultView) == null ? void 0 : _a2.getComputedStyle(element, "");
      return computed2 ? computed2[key] : "";
    } catch (e) {
      return element.style[key];
    }
  };
  function addUnit(value, defaultUnit = "px") {
    if (!value)
      return "";
    if (isString(value)) {
      return value;
    } else if (isNumber(value)) {
      return `${value}${defaultUnit}`;
    }
  }
  let scrollBarWidth;
  const getScrollBarWidth = (namespace) => {
    var _a2;
    if (!isClient)
      return 0;
    if (scrollBarWidth !== void 0)
      return scrollBarWidth;
    const outer = document.createElement("div");
    outer.className = `${namespace}-scrollbar__wrap`;
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.position = "absolute";
    outer.style.top = "-9999px";
    document.body.appendChild(outer);
    const widthNoScroll = outer.offsetWidth;
    outer.style.overflow = "scroll";
    const inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);
    const widthWithScroll = inner.offsetWidth;
    (_a2 = outer.parentNode) == null ? void 0 : _a2.removeChild(outer);
    scrollBarWidth = widthNoScroll - widthWithScroll;
    return scrollBarWidth;
  };
  var export_helper_default = (sfc, props) => {
    let target = sfc.__vccOpts || sfc;
    for (let [key, val] of props)
      target[key] = val;
    return target;
  };
  var arrow_left_vue_vue_type_script_lang_default = {
    name: "ArrowLeft"
  };
  var _hoisted_18 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_28 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
  }, null, -1), _hoisted_38 = [
    _hoisted_28
  ];
  function _sfc_render8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_18, _hoisted_38);
  }
  var arrow_left_default = /* @__PURE__ */ export_helper_default(arrow_left_vue_vue_type_script_lang_default, [["render", _sfc_render8], ["__file", "arrow-left.vue"]]);
  var circle_close_filled_vue_vue_type_script_lang_default = {
    name: "CircleCloseFilled"
  };
  var _hoisted_150 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_250 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336L512 457.664z"
  }, null, -1), _hoisted_349 = [
    _hoisted_250
  ];
  function _sfc_render50(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_150, _hoisted_349);
  }
  var circle_close_filled_default = /* @__PURE__ */ export_helper_default(circle_close_filled_vue_vue_type_script_lang_default, [["render", _sfc_render50], ["__file", "circle-close-filled.vue"]]);
  var close_vue_vue_type_script_lang_default = {
    name: "Close"
  };
  var _hoisted_156 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_256 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
  }, null, -1), _hoisted_355 = [
    _hoisted_256
  ];
  function _sfc_render56(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_156, _hoisted_355);
  }
  var close_default = /* @__PURE__ */ export_helper_default(close_vue_vue_type_script_lang_default, [["render", _sfc_render56], ["__file", "close.vue"]]);
  var info_filled_vue_vue_type_script_lang_default = {
    name: "InfoFilled"
  };
  var _hoisted_1143 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_2143 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64zm67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344zM590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
  }, null, -1), _hoisted_3142 = [
    _hoisted_2143
  ];
  function _sfc_render143(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1143, _hoisted_3142);
  }
  var info_filled_default = /* @__PURE__ */ export_helper_default(info_filled_vue_vue_type_script_lang_default, [["render", _sfc_render143], ["__file", "info-filled.vue"]]);
  var loading_vue_vue_type_script_lang_default = {
    name: "Loading"
  };
  var _hoisted_1150 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_2150 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
  }, null, -1), _hoisted_3149 = [
    _hoisted_2150
  ];
  function _sfc_render150(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1150, _hoisted_3149);
  }
  var loading_default = /* @__PURE__ */ export_helper_default(loading_vue_vue_type_script_lang_default, [["render", _sfc_render150], ["__file", "loading.vue"]]);
  var success_filled_vue_vue_type_script_lang_default = {
    name: "SuccessFilled"
  };
  var _hoisted_1249 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_2249 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
  }, null, -1), _hoisted_3248 = [
    _hoisted_2249
  ];
  function _sfc_render249(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1249, _hoisted_3248);
  }
  var success_filled_default = /* @__PURE__ */ export_helper_default(success_filled_vue_vue_type_script_lang_default, [["render", _sfc_render249], ["__file", "success-filled.vue"]]);
  var warning_filled_vue_vue_type_script_lang_default = {
    name: "WarningFilled"
  };
  var _hoisted_1287 = {
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg"
  }, _hoisted_2287 = /* @__PURE__ */ vue.createElementVNode("path", {
    fill: "currentColor",
    d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"
  }, null, -1), _hoisted_3286 = [
    _hoisted_2287
  ];
  function _sfc_render287(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1287, _hoisted_3286);
  }
  var warning_filled_default = /* @__PURE__ */ export_helper_default(warning_filled_vue_vue_type_script_lang_default, [["render", _sfc_render287], ["__file", "warning-filled.vue"]]);
  const epPropKey = "__epPropKey";
  const definePropType = (val) => val;
  const isEpProp = (val) => isObject(val) && !!val[epPropKey];
  const buildProp = (prop, key) => {
    if (!isObject(prop) || isEpProp(prop))
      return prop;
    const { values, required, default: defaultValue, type, validator } = prop;
    const _validator = values || validator ? (val) => {
      let valid = false;
      let allowedValues = [];
      if (values) {
        allowedValues = Array.from(values);
        if (hasOwn(prop, "default")) {
          allowedValues.push(defaultValue);
        }
        valid || (valid = allowedValues.includes(val));
      }
      if (validator)
        valid || (valid = validator(val));
      if (!valid && allowedValues.length > 0) {
        const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
        vue.warn(`Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
      }
      return valid;
    } : void 0;
    const epProp = {
      type,
      required: !!required,
      validator: _validator,
      [epPropKey]: true
    };
    if (hasOwn(prop, "default"))
      epProp.default = defaultValue;
    return epProp;
  };
  const buildProps = (props) => fromPairs(Object.entries(props).map(([key, option]) => [
    key,
    buildProp(option, key)
  ]));
  const iconPropType = definePropType([
    String,
    Object,
    Function
  ]);
  const CloseComponents = {
    Close: close_default
  };
  const TypeComponents = {
    Close: close_default,
    SuccessFilled: success_filled_default,
    InfoFilled: info_filled_default,
    WarningFilled: warning_filled_default,
    CircleCloseFilled: circle_close_filled_default
  };
  const TypeComponentsMap = {
    success: success_filled_default,
    warning: warning_filled_default,
    error: circle_close_filled_default,
    info: info_filled_default
  };
  const withInstall = (main, extra) => {
    main.install = (app) => {
      for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
        app.component(comp.name, comp);
      }
    };
    if (extra) {
      for (const [key, comp] of Object.entries(extra)) {
        main[key] = comp;
      }
    }
    return main;
  };
  const withInstallFunction = (fn, name) => {
    fn.install = (app) => {
      fn._context = app._context;
      app.config.globalProperties[name] = fn;
    };
    return fn;
  };
  const withNoopInstall = (component) => {
    component.install = NOOP;
    return component;
  };
  const composeRefs = (...refs) => {
    return (el) => {
      refs.forEach((ref) => {
        if (isFunction(ref)) {
          ref(el);
        } else {
          ref.value = el;
        }
      });
    };
  };
  const EVENT_CODE = {
    tab: "Tab",
    enter: "Enter",
    space: "Space",
    left: "ArrowLeft",
    up: "ArrowUp",
    right: "ArrowRight",
    down: "ArrowDown",
    esc: "Escape",
    delete: "Delete",
    backspace: "Backspace",
    numpadEnter: "NumpadEnter",
    pageUp: "PageUp",
    pageDown: "PageDown",
    home: "Home",
    end: "End"
  };
  const UPDATE_MODEL_EVENT = "update:modelValue";
  const componentSizes = ["", "default", "small", "large"];
  var PatchFlags = /* @__PURE__ */ ((PatchFlags2) => {
    PatchFlags2[PatchFlags2["TEXT"] = 1] = "TEXT";
    PatchFlags2[PatchFlags2["CLASS"] = 2] = "CLASS";
    PatchFlags2[PatchFlags2["STYLE"] = 4] = "STYLE";
    PatchFlags2[PatchFlags2["PROPS"] = 8] = "PROPS";
    PatchFlags2[PatchFlags2["FULL_PROPS"] = 16] = "FULL_PROPS";
    PatchFlags2[PatchFlags2["HYDRATE_EVENTS"] = 32] = "HYDRATE_EVENTS";
    PatchFlags2[PatchFlags2["STABLE_FRAGMENT"] = 64] = "STABLE_FRAGMENT";
    PatchFlags2[PatchFlags2["KEYED_FRAGMENT"] = 128] = "KEYED_FRAGMENT";
    PatchFlags2[PatchFlags2["UNKEYED_FRAGMENT"] = 256] = "UNKEYED_FRAGMENT";
    PatchFlags2[PatchFlags2["NEED_PATCH"] = 512] = "NEED_PATCH";
    PatchFlags2[PatchFlags2["DYNAMIC_SLOTS"] = 1024] = "DYNAMIC_SLOTS";
    PatchFlags2[PatchFlags2["HOISTED"] = -1] = "HOISTED";
    PatchFlags2[PatchFlags2["BAIL"] = -2] = "BAIL";
    return PatchFlags2;
  })(PatchFlags || {});
  const mutable = (val) => val;
  const buttonGroupContextKey = Symbol("buttonGroupContextKey");
  const configProviderContextKey = Symbol();
  const dialogInjectionKey = Symbol("dialogInjectionKey");
  const formContextKey = Symbol("formContextKey");
  const formItemContextKey = Symbol("formItemContextKey");
  const useProp = (name) => {
    const vm = vue.getCurrentInstance();
    return vue.computed(() => {
      var _a2, _b;
      return (_b = ((_a2 = vm.proxy) == null ? void 0 : _a2.$props)[name]) != null ? _b : void 0;
    });
  };
  const globalConfig = vue.ref();
  function useGlobalConfig(key, defaultValue = void 0) {
    const config = vue.getCurrentInstance() ? vue.inject(configProviderContextKey, globalConfig) : globalConfig;
    if (key) {
      return vue.computed(() => {
        var _a2, _b;
        return (_b = (_a2 = config.value) == null ? void 0 : _a2[key]) != null ? _b : defaultValue;
      });
    } else {
      return config;
    }
  }
  const provideGlobalConfig = (config, app, global2 = false) => {
    var _a2;
    const inSetup = !!vue.getCurrentInstance();
    const oldConfig = inSetup ? useGlobalConfig() : void 0;
    const provideFn = (_a2 = app == null ? void 0 : app.provide) != null ? _a2 : inSetup ? vue.provide : void 0;
    if (!provideFn) {
      return;
    }
    const context = vue.computed(() => {
      const cfg = vue.unref(config);
      if (!(oldConfig == null ? void 0 : oldConfig.value))
        return cfg;
      return mergeConfig(oldConfig.value, cfg);
    });
    provideFn(configProviderContextKey, context);
    if (global2 || !globalConfig.value) {
      globalConfig.value = context.value;
    }
    return context;
  };
  const mergeConfig = (a, b) => {
    var _a2;
    const keys = [.../* @__PURE__ */ new Set([...keysOf(a), ...keysOf(b)])];
    const obj = {};
    for (const key of keys) {
      obj[key] = (_a2 = b[key]) != null ? _a2 : a[key];
    }
    return obj;
  };
  const useSizeProp = buildProp({
    type: String,
    values: componentSizes,
    required: false
  });
  const useSize = (fallback, ignore = {}) => {
    const emptyRef = vue.ref(void 0);
    const size = ignore.prop ? emptyRef : useProp("size");
    const globalConfig2 = ignore.global ? emptyRef : useGlobalConfig("size");
    const form = ignore.form ? { size: void 0 } : vue.inject(formContextKey, void 0);
    const formItem = ignore.formItem ? { size: void 0 } : vue.inject(formItemContextKey, void 0);
    return vue.computed(() => size.value || vue.unref(fallback) || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalConfig2.value || "");
  };
  const useDisabled = (fallback) => {
    const disabled = useProp("disabled");
    const form = vue.inject(formContextKey, void 0);
    return vue.computed(() => disabled.value || vue.unref(fallback) || (form == null ? void 0 : form.disabled) || false);
  };
  const useDeprecated = ({ from, replacement, scope, version, ref, type = "API" }, condition) => {
    vue.watch(() => vue.unref(condition), (val) => {
    }, {
      immediate: true
    });
  };
  const useDraggable = (targetRef, dragRef, draggable) => {
    let transform = {
      offsetX: 0,
      offsetY: 0
    };
    const onMousedown = (e) => {
      const downX = e.clientX;
      const downY = e.clientY;
      const { offsetX, offsetY } = transform;
      const targetRect = targetRef.value.getBoundingClientRect();
      const targetLeft = targetRect.left;
      const targetTop = targetRect.top;
      const targetWidth = targetRect.width;
      const targetHeight = targetRect.height;
      const clientWidth = document.documentElement.clientWidth;
      const clientHeight = document.documentElement.clientHeight;
      const minLeft = -targetLeft + offsetX;
      const minTop = -targetTop + offsetY;
      const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
      const maxTop = clientHeight - targetTop - targetHeight + offsetY;
      const onMousemove = (e2) => {
        const moveX = Math.min(Math.max(offsetX + e2.clientX - downX, minLeft), maxLeft);
        const moveY = Math.min(Math.max(offsetY + e2.clientY - downY, minTop), maxTop);
        transform = {
          offsetX: moveX,
          offsetY: moveY
        };
        targetRef.value.style.transform = `translate(${addUnit(moveX)}, ${addUnit(moveY)})`;
      };
      const onMouseup = () => {
        document.removeEventListener("mousemove", onMousemove);
        document.removeEventListener("mouseup", onMouseup);
      };
      document.addEventListener("mousemove", onMousemove);
      document.addEventListener("mouseup", onMouseup);
    };
    const onDraggable = () => {
      if (dragRef.value && targetRef.value) {
        dragRef.value.addEventListener("mousedown", onMousedown);
      }
    };
    const offDraggable = () => {
      if (dragRef.value && targetRef.value) {
        dragRef.value.removeEventListener("mousedown", onMousedown);
      }
    };
    vue.onMounted(() => {
      vue.watchEffect(() => {
        if (draggable.value) {
          onDraggable();
        } else {
          offDraggable();
        }
      });
    });
    vue.onBeforeUnmount(() => {
      offDraggable();
    });
  };
  const defaultNamespace = "el";
  const statePrefix = "is-";
  const _bem = (namespace, block, blockSuffix, element, modifier) => {
    let cls = `${namespace}-${block}`;
    if (blockSuffix) {
      cls += `-${blockSuffix}`;
    }
    if (element) {
      cls += `__${element}`;
    }
    if (modifier) {
      cls += `--${modifier}`;
    }
    return cls;
  };
  const useNamespace = (block) => {
    const namespace = useGlobalConfig("namespace", defaultNamespace);
    const b = (blockSuffix = "") => _bem(namespace.value, block, blockSuffix, "", "");
    const e = (element) => element ? _bem(namespace.value, block, "", element, "") : "";
    const m = (modifier) => modifier ? _bem(namespace.value, block, "", "", modifier) : "";
    const be = (blockSuffix, element) => blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, "") : "";
    const em = (element, modifier) => element && modifier ? _bem(namespace.value, block, "", element, modifier) : "";
    const bm = (blockSuffix, modifier) => blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, "", modifier) : "";
    const bem = (blockSuffix, element, modifier) => blockSuffix && element && modifier ? _bem(namespace.value, block, blockSuffix, element, modifier) : "";
    const is = (name, ...args) => {
      const state = args.length >= 1 ? args[0] : true;
      return name && state ? `${statePrefix}${name}` : "";
    };
    const cssVar = (object) => {
      const styles = {};
      for (const key in object) {
        if (object[key]) {
          styles[`--${namespace.value}-${key}`] = object[key];
        }
      }
      return styles;
    };
    const cssVarBlock = (object) => {
      const styles = {};
      for (const key in object) {
        if (object[key]) {
          styles[`--${namespace.value}-${block}-${key}`] = object[key];
        }
      }
      return styles;
    };
    const cssVarName = (name) => `--${namespace.value}-${name}`;
    const cssVarBlockName = (name) => `--${namespace.value}-${block}-${name}`;
    return {
      namespace,
      b,
      e,
      m,
      be,
      em,
      bm,
      bem,
      is,
      cssVar,
      cssVarName,
      cssVarBlock,
      cssVarBlockName
    };
  };
  const defaultIdInjection = {
    prefix: Math.floor(Math.random() * 1e4),
    current: 0
  };
  const ID_INJECTION_KEY = Symbol("elIdInjection");
  const useId = (deterministicId) => {
    const idInjection = vue.inject(ID_INJECTION_KEY, defaultIdInjection);
    const namespace = useGlobalConfig("namespace", defaultNamespace);
    const idRef = vue.computed(() => vue.unref(deterministicId) || `${namespace.value}-id-${idInjection.prefix}-${idInjection.current++}`);
    return idRef;
  };
  const useFormItem = () => {
    const form = vue.inject(formContextKey, void 0);
    const formItem = vue.inject(formItemContextKey, void 0);
    return {
      form,
      formItem
    };
  };
  var English = {
    name: "en",
    el: {
      colorpicker: {
        confirm: "OK",
        clear: "Clear",
        defaultLabel: "color picker",
        description: "current color is {color}. press enter to select a new color."
      },
      datepicker: {
        now: "Now",
        today: "Today",
        cancel: "Cancel",
        clear: "Clear",
        confirm: "OK",
        dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
        monthTablePrompt: "Use the arrow keys and enter to select the month",
        yearTablePrompt: "Use the arrow keys and enter to select the year",
        selectedDate: "Selected date",
        selectDate: "Select date",
        selectTime: "Select time",
        startDate: "Start Date",
        startTime: "Start Time",
        endDate: "End Date",
        endTime: "End Time",
        prevYear: "Previous Year",
        nextYear: "Next Year",
        prevMonth: "Previous Month",
        nextMonth: "Next Month",
        year: "",
        month1: "January",
        month2: "February",
        month3: "March",
        month4: "April",
        month5: "May",
        month6: "June",
        month7: "July",
        month8: "August",
        month9: "September",
        month10: "October",
        month11: "November",
        month12: "December",
        week: "week",
        weeks: {
          sun: "Sun",
          mon: "Mon",
          tue: "Tue",
          wed: "Wed",
          thu: "Thu",
          fri: "Fri",
          sat: "Sat"
        },
        weeksFull: {
          sun: "Sunday",
          mon: "Monday",
          tue: "Tuesday",
          wed: "Wednesday",
          thu: "Thursday",
          fri: "Friday",
          sat: "Saturday"
        },
        months: {
          jan: "Jan",
          feb: "Feb",
          mar: "Mar",
          apr: "Apr",
          may: "May",
          jun: "Jun",
          jul: "Jul",
          aug: "Aug",
          sep: "Sep",
          oct: "Oct",
          nov: "Nov",
          dec: "Dec"
        }
      },
      inputNumber: {
        decrease: "decrease number",
        increase: "increase number"
      },
      select: {
        loading: "Loading",
        noMatch: "No matching data",
        noData: "No data",
        placeholder: "Select"
      },
      dropdown: {
        toggleDropdown: "Toggle Dropdown"
      },
      cascader: {
        noMatch: "No matching data",
        loading: "Loading",
        placeholder: "Select",
        noData: "No data"
      },
      pagination: {
        goto: "Go to",
        pagesize: "/page",
        total: "Total {total}",
        pageClassifier: "",
        deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
      },
      dialog: {
        close: "Close this dialog"
      },
      drawer: {
        close: "Close this dialog"
      },
      messagebox: {
        title: "Message",
        confirm: "OK",
        cancel: "Cancel",
        error: "Illegal input",
        close: "Close this dialog"
      },
      upload: {
        deleteTip: "press delete to remove",
        delete: "Delete",
        preview: "Preview",
        continue: "Continue"
      },
      slider: {
        defaultLabel: "slider between {min} and {max}",
        defaultRangeStartLabel: "pick start value",
        defaultRangeEndLabel: "pick end value"
      },
      table: {
        emptyText: "No Data",
        confirmFilter: "Confirm",
        resetFilter: "Reset",
        clearFilter: "All",
        sumText: "Sum"
      },
      tree: {
        emptyText: "No Data"
      },
      transfer: {
        noMatch: "No matching data",
        noData: "No data",
        titles: ["List 1", "List 2"],
        filterPlaceholder: "Enter keyword",
        noCheckedFormat: "{total} items",
        hasCheckedFormat: "{checked}/{total} checked"
      },
      image: {
        error: "FAILED"
      },
      pageHeader: {
        title: "Back"
      },
      popconfirm: {
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }
    }
  };
  const buildTranslator = (locale) => (path, option) => translate(path, option, vue.unref(locale));
  const translate = (path, option, locale) => get(locale, path, path).replace(/\{(\w+)\}/g, (_, key) => {
    var _a2;
    return `${(_a2 = option == null ? void 0 : option[key]) != null ? _a2 : `{${key}}`}`;
  });
  const buildLocaleContext = (locale) => {
    const lang = vue.computed(() => vue.unref(locale).name);
    const localeRef = vue.isRef(locale) ? locale : vue.ref(locale);
    return {
      lang,
      locale: localeRef,
      t: buildTranslator(locale)
    };
  };
  const useLocale = () => {
    const locale = useGlobalConfig("locale");
    return buildLocaleContext(vue.computed(() => locale.value || English));
  };
  let activeEffectScope;
  function recordEffectScope(effect, scope = activeEffectScope) {
    if (scope && scope.active) {
      scope.effects.push(effect);
    }
  }
  const createDep = (effects) => {
    const dep = new Set(effects);
    dep.w = 0;
    dep.n = 0;
    return dep;
  };
  const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
  const newTracked = (dep) => (dep.n & trackOpBit) > 0;
  const initDepMarkers = ({ deps }) => {
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].w |= trackOpBit;
      }
    }
  };
  const finalizeDepMarkers = (effect) => {
    const { deps } = effect;
    if (deps.length) {
      let ptr = 0;
      for (let i = 0; i < deps.length; i++) {
        const dep = deps[i];
        if (wasTracked(dep) && !newTracked(dep)) {
          dep.delete(effect);
        } else {
          deps[ptr++] = dep;
        }
        dep.w &= ~trackOpBit;
        dep.n &= ~trackOpBit;
      }
      deps.length = ptr;
    }
  };
  let effectTrackDepth = 0;
  let trackOpBit = 1;
  const maxMarkerBits = 30;
  let activeEffect;
  class ReactiveEffect {
    constructor(fn, scheduler = null, scope) {
      this.fn = fn;
      this.scheduler = scheduler;
      this.active = true;
      this.deps = [];
      this.parent = void 0;
      recordEffectScope(this, scope);
    }
    run() {
      if (!this.active) {
        return this.fn();
      }
      let parent = activeEffect;
      let lastShouldTrack = shouldTrack;
      while (parent) {
        if (parent === this) {
          return;
        }
        parent = parent.parent;
      }
      try {
        this.parent = activeEffect;
        activeEffect = this;
        shouldTrack = true;
        trackOpBit = 1 << ++effectTrackDepth;
        if (effectTrackDepth <= maxMarkerBits) {
          initDepMarkers(this);
        } else {
          cleanupEffect(this);
        }
        return this.fn();
      } finally {
        if (effectTrackDepth <= maxMarkerBits) {
          finalizeDepMarkers(this);
        }
        trackOpBit = 1 << --effectTrackDepth;
        activeEffect = this.parent;
        shouldTrack = lastShouldTrack;
        this.parent = void 0;
        if (this.deferStop) {
          this.stop();
        }
      }
    }
    stop() {
      if (activeEffect === this) {
        this.deferStop = true;
      } else if (this.active) {
        cleanupEffect(this);
        if (this.onStop) {
          this.onStop();
        }
        this.active = false;
      }
    }
  }
  function cleanupEffect(effect) {
    const { deps } = effect;
    if (deps.length) {
      for (let i = 0; i < deps.length; i++) {
        deps[i].delete(effect);
      }
      deps.length = 0;
    }
  }
  let shouldTrack = true;
  function trackEffects(dep, debuggerEventExtraInfo) {
    let shouldTrack2 = false;
    if (effectTrackDepth <= maxMarkerBits) {
      if (!newTracked(dep)) {
        dep.n |= trackOpBit;
        shouldTrack2 = !wasTracked(dep);
      }
    } else {
      shouldTrack2 = !dep.has(activeEffect);
    }
    if (shouldTrack2) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
    }
  }
  function triggerEffects(dep, debuggerEventExtraInfo) {
    const effects = isArray(dep) ? dep : [...dep];
    for (const effect of effects) {
      if (effect.computed) {
        triggerEffect(effect);
      }
    }
    for (const effect of effects) {
      if (!effect.computed) {
        triggerEffect(effect);
      }
    }
  }
  function triggerEffect(effect, debuggerEventExtraInfo) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
  function toRaw(observed) {
    const raw = observed && observed["__v_raw"];
    return raw ? toRaw(raw) : observed;
  }
  function trackRefValue(ref) {
    if (shouldTrack && activeEffect) {
      ref = toRaw(ref);
      {
        trackEffects(ref.dep || (ref.dep = createDep()));
      }
    }
  }
  function triggerRefValue(ref, newVal) {
    ref = toRaw(ref);
    if (ref.dep) {
      {
        triggerEffects(ref.dep);
      }
    }
  }
  var _a;
  class ComputedRefImpl {
    constructor(getter, _setter, isReadonly, isSSR) {
      this._setter = _setter;
      this.dep = void 0;
      this.__v_isRef = true;
      this[_a] = false;
      this._dirty = true;
      this.effect = new ReactiveEffect(getter, () => {
        if (!this._dirty) {
          this._dirty = true;
          triggerRefValue(this);
        }
      });
      this.effect.computed = this;
      this.effect.active = this._cacheable = !isSSR;
      this["__v_isReadonly"] = isReadonly;
    }
    get value() {
      const self2 = toRaw(this);
      trackRefValue(self2);
      if (self2._dirty || !self2._cacheable) {
        self2._dirty = false;
        self2._value = self2.effect.run();
      }
      return self2._value;
    }
    set value(newValue) {
      this._setter(newValue);
    }
  }
  _a = "__v_isReadonly";
  function computed(getterOrOptions, debugOptions, isSSR = false) {
    let getter;
    let setter;
    const onlyGetter = isFunction(getterOrOptions);
    if (onlyGetter) {
      getter = getterOrOptions;
      setter = NOOP;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
    return cRef;
  }
  const useLockscreen = (trigger) => {
    if (!vue.isRef(trigger)) {
      throwError("[useLockscreen]", "You need to pass a ref param to this function");
    }
    const ns = useNamespace("popup");
    const hiddenCls = computed(() => ns.bm("parent", "hidden"));
    if (!isClient || hasClass(document.body, hiddenCls.value)) {
      return;
    }
    let scrollBarWidth2 = 0;
    let withoutHiddenClass = false;
    let bodyWidth = "0";
    const cleanup = () => {
      setTimeout(() => {
        removeClass(document.body, hiddenCls.value);
        if (withoutHiddenClass) {
          document.body.style.width = bodyWidth;
        }
      }, 200);
    };
    vue.watch(trigger, (val) => {
      if (!val) {
        cleanup();
        return;
      }
      withoutHiddenClass = !hasClass(document.body, hiddenCls.value);
      if (withoutHiddenClass) {
        bodyWidth = document.body.style.width;
      }
      scrollBarWidth2 = getScrollBarWidth(ns.namespace.value);
      const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
      const bodyOverflowY = getStyle(document.body, "overflowY");
      if (scrollBarWidth2 > 0 && (bodyHasOverflow || bodyOverflowY === "scroll") && withoutHiddenClass) {
        document.body.style.width = `calc(100% - ${scrollBarWidth2}px)`;
      }
      addClass(document.body, hiddenCls.value);
    });
    vue.onScopeDispose(() => cleanup());
  };
  const useSameTarget = (handleClick) => {
    if (!handleClick) {
      return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP };
    }
    let mousedownTarget = false;
    let mouseupTarget = false;
    const onClick = (e) => {
      if (mousedownTarget && mouseupTarget) {
        handleClick(e);
      }
      mousedownTarget = mouseupTarget = false;
    };
    const onMousedown = (e) => {
      mousedownTarget = e.target === e.currentTarget;
    };
    const onMouseup = (e) => {
      mouseupTarget = e.target === e.currentTarget;
    };
    return { onClick, onMousedown, onMouseup };
  };
  let registeredEscapeHandlers = [];
  const cachedHandler = (e) => {
    const event = e;
    if (event.key === EVENT_CODE.esc) {
      registeredEscapeHandlers.forEach((registeredHandler) => registeredHandler(event));
    }
  };
  const useEscapeKeydown = (handler) => {
    vue.onMounted(() => {
      if (registeredEscapeHandlers.length === 0) {
        document.addEventListener("keydown", cachedHandler);
      }
      if (isClient)
        registeredEscapeHandlers.push(handler);
    });
    vue.onBeforeUnmount(() => {
      registeredEscapeHandlers = registeredEscapeHandlers.filter((registeredHandler) => registeredHandler !== handler);
      if (registeredEscapeHandlers.length === 0) {
        if (isClient)
          document.removeEventListener("keydown", cachedHandler);
      }
    });
  };
  const zIndex = vue.ref(0);
  const useZIndex = () => {
    const initialZIndex = useGlobalConfig("zIndex", 2e3);
    const currentZIndex = vue.computed(() => initialZIndex.value + zIndex.value);
    const nextZIndex = () => {
      zIndex.value++;
      return currentZIndex.value;
    };
    return {
      initialZIndex,
      currentZIndex,
      nextZIndex
    };
  };
  var _export_sfc$1 = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const iconProps = buildProps({
    size: {
      type: definePropType([Number, String])
    },
    color: {
      type: String
    }
  });
  const __default__$6 = vue.defineComponent({
    name: "ElIcon",
    inheritAttrs: false
  });
  const _sfc_main$d = /* @__PURE__ */ vue.defineComponent({
    ...__default__$6,
    props: iconProps,
    setup(__props) {
      const props = __props;
      const ns = useNamespace("icon");
      const style = vue.computed(() => {
        const { size, color } = props;
        if (!size && !color)
          return {};
        return {
          fontSize: isUndefined(size) ? void 0 : addUnit(size),
          "--color": color
        };
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
          class: vue.unref(ns).b(),
          style: vue.unref(style)
        }, _ctx.$attrs), [
          vue.renderSlot(_ctx.$slots, "default")
        ], 16);
      };
    }
  });
  var Icon = /* @__PURE__ */ _export_sfc$1(_sfc_main$d, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue"]]);
  const ElIcon = withInstall(Icon);
  const FOCUS_AFTER_TRAPPED = "focus-trap.focus-after-trapped";
  const FOCUS_AFTER_RELEASED = "focus-trap.focus-after-released";
  const FOCUSOUT_PREVENTED = "focus-trap.focusout-prevented";
  const FOCUS_AFTER_TRAPPED_OPTS = {
    cancelable: true,
    bubbles: false
  };
  const FOCUSOUT_PREVENTED_OPTS = {
    cancelable: true,
    bubbles: false
  };
  const ON_TRAP_FOCUS_EVT = "focusAfterTrapped";
  const ON_RELEASE_FOCUS_EVT = "focusAfterReleased";
  const FOCUS_TRAP_INJECTION_KEY = Symbol("elFocusTrap");
  const focusReason = vue.ref();
  const lastUserFocusTimestamp = vue.ref(0);
  const lastAutomatedFocusTimestamp = vue.ref(0);
  let focusReasonUserCount = 0;
  const obtainAllFocusableElements = (element) => {
    const nodes = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (node) => {
        const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
        if (node.disabled || node.hidden || isHiddenInput)
          return NodeFilter.FILTER_SKIP;
        return node.tabIndex >= 0 || node === document.activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    while (walker.nextNode())
      nodes.push(walker.currentNode);
    return nodes;
  };
  const getVisibleElement = (elements, container) => {
    for (const element of elements) {
      if (!isHidden(element, container))
        return element;
    }
  };
  const isHidden = (element, container) => {
    if (getComputedStyle(element).visibility === "hidden")
      return true;
    while (element) {
      if (container && element === container)
        return false;
      if (getComputedStyle(element).display === "none")
        return true;
      element = element.parentElement;
    }
    return false;
  };
  const getEdges = (container) => {
    const focusable = obtainAllFocusableElements(container);
    const first = getVisibleElement(focusable, container);
    const last = getVisibleElement(focusable.reverse(), container);
    return [first, last];
  };
  const isSelectable = (element) => {
    return element instanceof HTMLInputElement && "select" in element;
  };
  const tryFocus = (element, shouldSelect) => {
    if (element && element.focus) {
      const prevFocusedElement = document.activeElement;
      element.focus({ preventScroll: true });
      lastAutomatedFocusTimestamp.value = window.performance.now();
      if (element !== prevFocusedElement && isSelectable(element) && shouldSelect) {
        element.select();
      }
    }
  };
  function removeFromStack(list, item) {
    const copy = [...list];
    const idx = list.indexOf(item);
    if (idx !== -1) {
      copy.splice(idx, 1);
    }
    return copy;
  }
  const createFocusableStack = () => {
    let stack = [];
    const push = (layer) => {
      const currentLayer = stack[0];
      if (currentLayer && layer !== currentLayer) {
        currentLayer.pause();
      }
      stack = removeFromStack(stack, layer);
      stack.unshift(layer);
    };
    const remove = (layer) => {
      var _a2, _b;
      stack = removeFromStack(stack, layer);
      (_b = (_a2 = stack[0]) == null ? void 0 : _a2.resume) == null ? void 0 : _b.call(_a2);
    };
    return {
      push,
      remove
    };
  };
  const focusFirstDescendant = (elements, shouldSelect = false) => {
    const prevFocusedElement = document.activeElement;
    for (const element of elements) {
      tryFocus(element, shouldSelect);
      if (document.activeElement !== prevFocusedElement)
        return;
    }
  };
  const focusableStack = createFocusableStack();
  const isFocusCausedByUserEvent = () => {
    return lastUserFocusTimestamp.value > lastAutomatedFocusTimestamp.value;
  };
  const notifyFocusReasonPointer = () => {
    focusReason.value = "pointer";
    lastUserFocusTimestamp.value = window.performance.now();
  };
  const notifyFocusReasonKeydown = () => {
    focusReason.value = "keyboard";
    lastUserFocusTimestamp.value = window.performance.now();
  };
  const useFocusReason = () => {
    vue.onMounted(() => {
      if (focusReasonUserCount === 0) {
        document.addEventListener("mousedown", notifyFocusReasonPointer);
        document.addEventListener("touchstart", notifyFocusReasonPointer);
        document.addEventListener("keydown", notifyFocusReasonKeydown);
      }
      focusReasonUserCount++;
    });
    vue.onBeforeUnmount(() => {
      focusReasonUserCount--;
      if (focusReasonUserCount <= 0) {
        document.removeEventListener("mousedown", notifyFocusReasonPointer);
        document.removeEventListener("touchstart", notifyFocusReasonPointer);
        document.removeEventListener("keydown", notifyFocusReasonKeydown);
      }
    });
    return {
      focusReason,
      lastUserFocusTimestamp,
      lastAutomatedFocusTimestamp
    };
  };
  const createFocusOutPreventedEvent = (detail) => {
    return new CustomEvent(FOCUSOUT_PREVENTED, {
      ...FOCUSOUT_PREVENTED_OPTS,
      detail
    });
  };
  const _sfc_main$c = vue.defineComponent({
    name: "ElFocusTrap",
    inheritAttrs: false,
    props: {
      loop: Boolean,
      trapped: Boolean,
      focusTrapEl: Object,
      focusStartEl: {
        type: [Object, String],
        default: "first"
      }
    },
    emits: [
      ON_TRAP_FOCUS_EVT,
      ON_RELEASE_FOCUS_EVT,
      "focusin",
      "focusout",
      "focusout-prevented",
      "release-requested"
    ],
    setup(props, { emit }) {
      const forwardRef = vue.ref();
      let lastFocusBeforeTrapped;
      let lastFocusAfterTrapped;
      const { focusReason: focusReason2 } = useFocusReason();
      useEscapeKeydown((event) => {
        if (props.trapped && !focusLayer.paused) {
          emit("release-requested", event);
        }
      });
      const focusLayer = {
        paused: false,
        pause() {
          this.paused = true;
        },
        resume() {
          this.paused = false;
        }
      };
      const onKeydown = (e) => {
        if (!props.loop && !props.trapped)
          return;
        if (focusLayer.paused)
          return;
        const { key, altKey, ctrlKey, metaKey, currentTarget, shiftKey } = e;
        const { loop } = props;
        const isTabbing = key === EVENT_CODE.tab && !altKey && !ctrlKey && !metaKey;
        const currentFocusingEl = document.activeElement;
        if (isTabbing && currentFocusingEl) {
          const container = currentTarget;
          const [first, last] = getEdges(container);
          const isTabbable = first && last;
          if (!isTabbable) {
            if (currentFocusingEl === container) {
              const focusoutPreventedEvent = createFocusOutPreventedEvent({
                focusReason: focusReason2.value
              });
              emit("focusout-prevented", focusoutPreventedEvent);
              if (!focusoutPreventedEvent.defaultPrevented) {
                e.preventDefault();
              }
            }
          } else {
            if (!shiftKey && currentFocusingEl === last) {
              const focusoutPreventedEvent = createFocusOutPreventedEvent({
                focusReason: focusReason2.value
              });
              emit("focusout-prevented", focusoutPreventedEvent);
              if (!focusoutPreventedEvent.defaultPrevented) {
                e.preventDefault();
                if (loop)
                  tryFocus(first, true);
              }
            } else if (shiftKey && [first, container].includes(currentFocusingEl)) {
              const focusoutPreventedEvent = createFocusOutPreventedEvent({
                focusReason: focusReason2.value
              });
              emit("focusout-prevented", focusoutPreventedEvent);
              if (!focusoutPreventedEvent.defaultPrevented) {
                e.preventDefault();
                if (loop)
                  tryFocus(last, true);
              }
            }
          }
        }
      };
      vue.provide(FOCUS_TRAP_INJECTION_KEY, {
        focusTrapRef: forwardRef,
        onKeydown
      });
      vue.watch(() => props.focusTrapEl, (focusTrapEl) => {
        if (focusTrapEl) {
          forwardRef.value = focusTrapEl;
        }
      }, { immediate: true });
      vue.watch([forwardRef], ([forwardRef2], [oldForwardRef]) => {
        if (forwardRef2) {
          forwardRef2.addEventListener("keydown", onKeydown);
          forwardRef2.addEventListener("focusin", onFocusIn);
          forwardRef2.addEventListener("focusout", onFocusOut);
        }
        if (oldForwardRef) {
          oldForwardRef.removeEventListener("keydown", onKeydown);
          oldForwardRef.removeEventListener("focusin", onFocusIn);
          oldForwardRef.removeEventListener("focusout", onFocusOut);
        }
      });
      const trapOnFocus = (e) => {
        emit(ON_TRAP_FOCUS_EVT, e);
      };
      const releaseOnFocus = (e) => emit(ON_RELEASE_FOCUS_EVT, e);
      const onFocusIn = (e) => {
        const trapContainer = vue.unref(forwardRef);
        if (!trapContainer)
          return;
        const target = e.target;
        const relatedTarget = e.relatedTarget;
        const isFocusedInTrap = target && trapContainer.contains(target);
        if (!props.trapped) {
          const isPrevFocusedInTrap = relatedTarget && trapContainer.contains(relatedTarget);
          if (!isPrevFocusedInTrap) {
            lastFocusBeforeTrapped = relatedTarget;
          }
        }
        if (isFocusedInTrap)
          emit("focusin", e);
        if (focusLayer.paused)
          return;
        if (props.trapped) {
          if (isFocusedInTrap) {
            lastFocusAfterTrapped = target;
          } else {
            tryFocus(lastFocusAfterTrapped, true);
          }
        }
      };
      const onFocusOut = (e) => {
        const trapContainer = vue.unref(forwardRef);
        if (focusLayer.paused || !trapContainer)
          return;
        if (props.trapped) {
          const relatedTarget = e.relatedTarget;
          if (!isNil(relatedTarget) && !trapContainer.contains(relatedTarget)) {
            setTimeout(() => {
              if (!focusLayer.paused && props.trapped) {
                const focusoutPreventedEvent = createFocusOutPreventedEvent({
                  focusReason: focusReason2.value
                });
                emit("focusout-prevented", focusoutPreventedEvent);
                if (!focusoutPreventedEvent.defaultPrevented) {
                  tryFocus(lastFocusAfterTrapped, true);
                }
              }
            }, 0);
          }
        } else {
          const target = e.target;
          const isFocusedInTrap = target && trapContainer.contains(target);
          if (!isFocusedInTrap)
            emit("focusout", e);
        }
      };
      async function startTrap() {
        await vue.nextTick();
        const trapContainer = vue.unref(forwardRef);
        if (trapContainer) {
          focusableStack.push(focusLayer);
          const prevFocusedElement = trapContainer.contains(document.activeElement) ? lastFocusBeforeTrapped : document.activeElement;
          lastFocusBeforeTrapped = prevFocusedElement;
          const isPrevFocusContained = trapContainer.contains(prevFocusedElement);
          if (!isPrevFocusContained) {
            const focusEvent = new Event(FOCUS_AFTER_TRAPPED, FOCUS_AFTER_TRAPPED_OPTS);
            trapContainer.addEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);
            trapContainer.dispatchEvent(focusEvent);
            if (!focusEvent.defaultPrevented) {
              vue.nextTick(() => {
                let focusStartEl = props.focusStartEl;
                if (!isString(focusStartEl)) {
                  tryFocus(focusStartEl);
                  if (document.activeElement !== focusStartEl) {
                    focusStartEl = "first";
                  }
                }
                if (focusStartEl === "first") {
                  focusFirstDescendant(obtainAllFocusableElements(trapContainer), true);
                }
                if (document.activeElement === prevFocusedElement || focusStartEl === "container") {
                  tryFocus(trapContainer);
                }
              });
            }
          }
        }
      }
      function stopTrap() {
        const trapContainer = vue.unref(forwardRef);
        if (trapContainer) {
          trapContainer.removeEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);
          const releasedEvent = new CustomEvent(FOCUS_AFTER_RELEASED, {
            ...FOCUS_AFTER_TRAPPED_OPTS,
            detail: {
              focusReason: focusReason2.value
            }
          });
          trapContainer.addEventListener(FOCUS_AFTER_RELEASED, releaseOnFocus);
          trapContainer.dispatchEvent(releasedEvent);
          if (!releasedEvent.defaultPrevented && (focusReason2.value == "keyboard" || !isFocusCausedByUserEvent())) {
            tryFocus(lastFocusBeforeTrapped != null ? lastFocusBeforeTrapped : document.body, true);
          }
          trapContainer.removeEventListener(FOCUS_AFTER_RELEASED, trapOnFocus);
          focusableStack.remove(focusLayer);
        }
      }
      vue.onMounted(() => {
        if (props.trapped) {
          startTrap();
        }
        vue.watch(() => props.trapped, (trapped) => {
          if (trapped) {
            startTrap();
          } else {
            stopTrap();
          }
        });
      });
      vue.onBeforeUnmount(() => {
        if (props.trapped) {
          stopTrap();
        }
      });
      return {
        onKeydown
      };
    }
  });
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.renderSlot(_ctx.$slots, "default", { handleKeydown: _ctx.onKeydown });
  }
  var ElFocusTrap = /* @__PURE__ */ _export_sfc$1(_sfc_main$c, [["render", _sfc_render$1], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);
  const badgeProps = buildProps({
    value: {
      type: [String, Number],
      default: ""
    },
    max: {
      type: Number,
      default: 99
    },
    isDot: Boolean,
    hidden: Boolean,
    type: {
      type: String,
      values: ["primary", "success", "warning", "info", "danger"],
      default: "danger"
    }
  });
  const _hoisted_1$9 = ["textContent"];
  const __default__$5 = vue.defineComponent({
    name: "ElBadge"
  });
  const _sfc_main$b = /* @__PURE__ */ vue.defineComponent({
    ...__default__$5,
    props: badgeProps,
    setup(__props, { expose }) {
      const props = __props;
      const ns = useNamespace("badge");
      const content = vue.computed(() => {
        if (props.isDot)
          return "";
        if (isNumber(props.value) && isNumber(props.max)) {
          return props.max < props.value ? `${props.max}+` : `${props.value}`;
        }
        return `${props.value}`;
      });
      expose({
        content
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(vue.unref(ns).b())
        }, [
          vue.renderSlot(_ctx.$slots, "default"),
          vue.createVNode(vue.Transition, {
            name: `${vue.unref(ns).namespace.value}-zoom-in-center`,
            persisted: ""
          }, {
            default: vue.withCtx(() => [
              vue.withDirectives(vue.createElementVNode("sup", {
                class: vue.normalizeClass([
                  vue.unref(ns).e("content"),
                  vue.unref(ns).em("content", _ctx.type),
                  vue.unref(ns).is("fixed", !!_ctx.$slots.default),
                  vue.unref(ns).is("dot", _ctx.isDot)
                ]),
                textContent: vue.toDisplayString(vue.unref(content))
              }, null, 10, _hoisted_1$9), [
                [vue.vShow, !_ctx.hidden && (vue.unref(content) || _ctx.isDot)]
              ])
            ]),
            _: 1
          }, 8, ["name"])
        ], 2);
      };
    }
  });
  var Badge = /* @__PURE__ */ _export_sfc$1(_sfc_main$b, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/badge/src/badge.vue"]]);
  const ElBadge = withInstall(Badge);
  const useButton = (props, emit) => {
    useDeprecated({
      from: "type.text",
      replacement: "link",
      version: "3.0.0",
      scope: "props",
      ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
    }, vue.computed(() => props.type === "text"));
    const buttonGroupContext = vue.inject(buttonGroupContextKey, void 0);
    const globalConfig2 = useGlobalConfig("button");
    const { form } = useFormItem();
    const _size = useSize(vue.computed(() => buttonGroupContext == null ? void 0 : buttonGroupContext.size));
    const _disabled = useDisabled();
    const _ref = vue.ref();
    const slots = vue.useSlots();
    const _type = vue.computed(() => props.type || (buttonGroupContext == null ? void 0 : buttonGroupContext.type) || "");
    const autoInsertSpace = vue.computed(() => {
      var _a2, _b, _c;
      return (_c = (_b = props.autoInsertSpace) != null ? _b : (_a2 = globalConfig2.value) == null ? void 0 : _a2.autoInsertSpace) != null ? _c : false;
    });
    const shouldAddSpace = vue.computed(() => {
      var _a2;
      const defaultSlot = (_a2 = slots.default) == null ? void 0 : _a2.call(slots);
      if (autoInsertSpace.value && (defaultSlot == null ? void 0 : defaultSlot.length) === 1) {
        const slot = defaultSlot[0];
        if ((slot == null ? void 0 : slot.type) === vue.Text) {
          const text = slot.children;
          return /^\p{Unified_Ideograph}{2}$/u.test(text.trim());
        }
      }
      return false;
    });
    const handleClick = (evt) => {
      if (props.nativeType === "reset") {
        form == null ? void 0 : form.resetFields();
      }
      emit("click", evt);
    };
    return {
      _disabled,
      _size,
      _type,
      _ref,
      shouldAddSpace,
      handleClick
    };
  };
  const buttonTypes = [
    "default",
    "primary",
    "success",
    "warning",
    "info",
    "danger",
    "text",
    ""
  ];
  const buttonNativeTypes = ["button", "submit", "reset"];
  const buttonProps = buildProps({
    size: useSizeProp,
    disabled: Boolean,
    type: {
      type: String,
      values: buttonTypes,
      default: ""
    },
    icon: {
      type: iconPropType
    },
    nativeType: {
      type: String,
      values: buttonNativeTypes,
      default: "button"
    },
    loading: Boolean,
    loadingIcon: {
      type: iconPropType,
      default: () => loading_default
    },
    plain: Boolean,
    text: Boolean,
    link: Boolean,
    bg: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean,
    color: String,
    dark: Boolean,
    autoInsertSpace: {
      type: Boolean,
      default: void 0
    }
  });
  const buttonEmits = {
    click: (evt) => evt instanceof MouseEvent
  };
  function bound01(n, max) {
    if (isOnePointZero(n)) {
      n = "100%";
    }
    var isPercent = isPercentage(n);
    n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
    if (isPercent) {
      n = parseInt(String(n * max), 10) / 100;
    }
    if (Math.abs(n - max) < 1e-6) {
      return 1;
    }
    if (max === 360) {
      n = (n < 0 ? n % max + max : n % max) / parseFloat(String(max));
    } else {
      n = n % max / parseFloat(String(max));
    }
    return n;
  }
  function clamp01(val) {
    return Math.min(1, Math.max(0, val));
  }
  function isOnePointZero(n) {
    return typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
  }
  function isPercentage(n) {
    return typeof n === "string" && n.indexOf("%") !== -1;
  }
  function boundAlpha(a) {
    a = parseFloat(a);
    if (isNaN(a) || a < 0 || a > 1) {
      a = 1;
    }
    return a;
  }
  function convertToPercentage(n) {
    if (n <= 1) {
      return "".concat(Number(n) * 100, "%");
    }
    return n;
  }
  function pad2(c) {
    return c.length === 1 ? "0" + c : String(c);
  }
  function rgbToRgb(r, g, b) {
    return {
      r: bound01(r, 255) * 255,
      g: bound01(g, 255) * 255,
      b: bound01(b, 255) * 255
    };
  }
  function rgbToHsl(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;
    if (max === min) {
      s = 0;
      h = 0;
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h, s, l };
  }
  function hue2rgb(p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * (6 * t);
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  }
  function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);
    if (s === 0) {
      g = l;
      b = l;
      r = l;
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
  }
  function rgbToHsv(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var v = max;
    var d = max - min;
    var s = max === 0 ? 0 : d / max;
    if (max === min) {
      h = 0;
    } else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h, s, v };
  }
  function hsvToRgb(h, s, v) {
    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);
    var i = Math.floor(h);
    var f = h - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    var mod = i % 6;
    var r = [v, q, p, p, t, v][mod];
    var g = [t, v, v, q, p, p][mod];
    var b = [p, p, t, v, v, q][mod];
    return { r: r * 255, g: g * 255, b: b * 255 };
  }
  function rgbToHex(r, g, b, allow3Char) {
    var hex = [
      pad2(Math.round(r).toString(16)),
      pad2(Math.round(g).toString(16)),
      pad2(Math.round(b).toString(16))
    ];
    if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join("");
  }
  function rgbaToHex(r, g, b, a, allow4Char) {
    var hex = [
      pad2(Math.round(r).toString(16)),
      pad2(Math.round(g).toString(16)),
      pad2(Math.round(b).toString(16)),
      pad2(convertDecimalToHex(a))
    ];
    if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }
    return hex.join("");
  }
  function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
  }
  function convertHexToDecimal(h) {
    return parseIntFromHex(h) / 255;
  }
  function parseIntFromHex(val) {
    return parseInt(val, 16);
  }
  function numberInputToObject(color) {
    return {
      r: color >> 16,
      g: (color & 65280) >> 8,
      b: color & 255
    };
  }
  var names = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    goldenrod: "#daa520",
    gold: "#ffd700",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavenderblush: "#fff0f5",
    lavender: "#e6e6fa",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
  };
  function inputToRGB(color) {
    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;
    if (typeof color === "string") {
      color = stringInputToObject(color);
    }
    if (typeof color === "object") {
      if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
        rgb = rgbToRgb(color.r, color.g, color.b);
        ok = true;
        format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
        s = convertToPercentage(color.s);
        v = convertToPercentage(color.v);
        rgb = hsvToRgb(color.h, s, v);
        ok = true;
        format = "hsv";
      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
        s = convertToPercentage(color.s);
        l = convertToPercentage(color.l);
        rgb = hslToRgb(color.h, s, l);
        ok = true;
        format = "hsl";
      }
      if (Object.prototype.hasOwnProperty.call(color, "a")) {
        a = color.a;
      }
    }
    a = boundAlpha(a);
    return {
      ok,
      format: color.format || format,
      r: Math.min(255, Math.max(rgb.r, 0)),
      g: Math.min(255, Math.max(rgb.g, 0)),
      b: Math.min(255, Math.max(rgb.b, 0)),
      a
    };
  }
  var CSS_INTEGER = "[-\\+]?\\d+%?";
  var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
  var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
  var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
  var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
  var matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
  function stringInputToObject(color) {
    color = color.trim().toLowerCase();
    if (color.length === 0) {
      return false;
    }
    var named = false;
    if (names[color]) {
      color = names[color];
      named = true;
    } else if (color === "transparent") {
      return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }
    var match = matchers.rgb.exec(color);
    if (match) {
      return { r: match[1], g: match[2], b: match[3] };
    }
    match = matchers.rgba.exec(color);
    if (match) {
      return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    match = matchers.hsl.exec(color);
    if (match) {
      return { h: match[1], s: match[2], l: match[3] };
    }
    match = matchers.hsla.exec(color);
    if (match) {
      return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    match = matchers.hsv.exec(color);
    if (match) {
      return { h: match[1], s: match[2], v: match[3] };
    }
    match = matchers.hsva.exec(color);
    if (match) {
      return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    match = matchers.hex8.exec(color);
    if (match) {
      return {
        r: parseIntFromHex(match[1]),
        g: parseIntFromHex(match[2]),
        b: parseIntFromHex(match[3]),
        a: convertHexToDecimal(match[4]),
        format: named ? "name" : "hex8"
      };
    }
    match = matchers.hex6.exec(color);
    if (match) {
      return {
        r: parseIntFromHex(match[1]),
        g: parseIntFromHex(match[2]),
        b: parseIntFromHex(match[3]),
        format: named ? "name" : "hex"
      };
    }
    match = matchers.hex4.exec(color);
    if (match) {
      return {
        r: parseIntFromHex(match[1] + match[1]),
        g: parseIntFromHex(match[2] + match[2]),
        b: parseIntFromHex(match[3] + match[3]),
        a: convertHexToDecimal(match[4] + match[4]),
        format: named ? "name" : "hex8"
      };
    }
    match = matchers.hex3.exec(color);
    if (match) {
      return {
        r: parseIntFromHex(match[1] + match[1]),
        g: parseIntFromHex(match[2] + match[2]),
        b: parseIntFromHex(match[3] + match[3]),
        format: named ? "name" : "hex"
      };
    }
    return false;
  }
  function isValidCSSUnit(color) {
    return Boolean(matchers.CSS_UNIT.exec(String(color)));
  }
  var TinyColor = function() {
    function TinyColor2(color, opts) {
      if (color === void 0) {
        color = "";
      }
      if (opts === void 0) {
        opts = {};
      }
      var _a2;
      if (color instanceof TinyColor2) {
        return color;
      }
      if (typeof color === "number") {
        color = numberInputToObject(color);
      }
      this.originalInput = color;
      var rgb = inputToRGB(color);
      this.originalInput = color;
      this.r = rgb.r;
      this.g = rgb.g;
      this.b = rgb.b;
      this.a = rgb.a;
      this.roundA = Math.round(100 * this.a) / 100;
      this.format = (_a2 = opts.format) !== null && _a2 !== void 0 ? _a2 : rgb.format;
      this.gradientType = opts.gradientType;
      if (this.r < 1) {
        this.r = Math.round(this.r);
      }
      if (this.g < 1) {
        this.g = Math.round(this.g);
      }
      if (this.b < 1) {
        this.b = Math.round(this.b);
      }
      this.isValid = rgb.ok;
    }
    TinyColor2.prototype.isDark = function() {
      return this.getBrightness() < 128;
    };
    TinyColor2.prototype.isLight = function() {
      return !this.isDark();
    };
    TinyColor2.prototype.getBrightness = function() {
      var rgb = this.toRgb();
      return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
    };
    TinyColor2.prototype.getLuminance = function() {
      var rgb = this.toRgb();
      var R;
      var G;
      var B;
      var RsRGB = rgb.r / 255;
      var GsRGB = rgb.g / 255;
      var BsRGB = rgb.b / 255;
      if (RsRGB <= 0.03928) {
        R = RsRGB / 12.92;
      } else {
        R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
      }
      if (GsRGB <= 0.03928) {
        G = GsRGB / 12.92;
      } else {
        G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
      }
      if (BsRGB <= 0.03928) {
        B = BsRGB / 12.92;
      } else {
        B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
      }
      return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    };
    TinyColor2.prototype.getAlpha = function() {
      return this.a;
    };
    TinyColor2.prototype.setAlpha = function(alpha) {
      this.a = boundAlpha(alpha);
      this.roundA = Math.round(100 * this.a) / 100;
      return this;
    };
    TinyColor2.prototype.toHsv = function() {
      var hsv = rgbToHsv(this.r, this.g, this.b);
      return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
    };
    TinyColor2.prototype.toHsvString = function() {
      var hsv = rgbToHsv(this.r, this.g, this.b);
      var h = Math.round(hsv.h * 360);
      var s = Math.round(hsv.s * 100);
      var v = Math.round(hsv.v * 100);
      return this.a === 1 ? "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toHsl = function() {
      var hsl = rgbToHsl(this.r, this.g, this.b);
      return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
    };
    TinyColor2.prototype.toHslString = function() {
      var hsl = rgbToHsl(this.r, this.g, this.b);
      var h = Math.round(hsl.h * 360);
      var s = Math.round(hsl.s * 100);
      var l = Math.round(hsl.l * 100);
      return this.a === 1 ? "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)") : "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toHex = function(allow3Char) {
      if (allow3Char === void 0) {
        allow3Char = false;
      }
      return rgbToHex(this.r, this.g, this.b, allow3Char);
    };
    TinyColor2.prototype.toHexString = function(allow3Char) {
      if (allow3Char === void 0) {
        allow3Char = false;
      }
      return "#" + this.toHex(allow3Char);
    };
    TinyColor2.prototype.toHex8 = function(allow4Char) {
      if (allow4Char === void 0) {
        allow4Char = false;
      }
      return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
    };
    TinyColor2.prototype.toHex8String = function(allow4Char) {
      if (allow4Char === void 0) {
        allow4Char = false;
      }
      return "#" + this.toHex8(allow4Char);
    };
    TinyColor2.prototype.toRgb = function() {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a
      };
    };
    TinyColor2.prototype.toRgbString = function() {
      var r = Math.round(this.r);
      var g = Math.round(this.g);
      var b = Math.round(this.b);
      return this.a === 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toPercentageRgb = function() {
      var fmt = function(x) {
        return "".concat(Math.round(bound01(x, 255) * 100), "%");
      };
      return {
        r: fmt(this.r),
        g: fmt(this.g),
        b: fmt(this.b),
        a: this.a
      };
    };
    TinyColor2.prototype.toPercentageRgbString = function() {
      var rnd = function(x) {
        return Math.round(bound01(x, 255) * 100);
      };
      return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toName = function() {
      if (this.a === 0) {
        return "transparent";
      }
      if (this.a < 1) {
        return false;
      }
      var hex = "#" + rgbToHex(this.r, this.g, this.b, false);
      for (var _i = 0, _a2 = Object.entries(names); _i < _a2.length; _i++) {
        var _b = _a2[_i], key = _b[0], value = _b[1];
        if (hex === value) {
          return key;
        }
      }
      return false;
    };
    TinyColor2.prototype.toString = function(format) {
      var formatSet = Boolean(format);
      format = format !== null && format !== void 0 ? format : this.format;
      var formattedString = false;
      var hasAlpha = this.a < 1 && this.a >= 0;
      var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith("hex") || format === "name");
      if (needsAlphaFormat) {
        if (format === "name" && this.a === 0) {
          return this.toName();
        }
        return this.toRgbString();
      }
      if (format === "rgb") {
        formattedString = this.toRgbString();
      }
      if (format === "prgb") {
        formattedString = this.toPercentageRgbString();
      }
      if (format === "hex" || format === "hex6") {
        formattedString = this.toHexString();
      }
      if (format === "hex3") {
        formattedString = this.toHexString(true);
      }
      if (format === "hex4") {
        formattedString = this.toHex8String(true);
      }
      if (format === "hex8") {
        formattedString = this.toHex8String();
      }
      if (format === "name") {
        formattedString = this.toName();
      }
      if (format === "hsl") {
        formattedString = this.toHslString();
      }
      if (format === "hsv") {
        formattedString = this.toHsvString();
      }
      return formattedString || this.toHexString();
    };
    TinyColor2.prototype.toNumber = function() {
      return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    };
    TinyColor2.prototype.clone = function() {
      return new TinyColor2(this.toString());
    };
    TinyColor2.prototype.lighten = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.l += amount / 100;
      hsl.l = clamp01(hsl.l);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.brighten = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var rgb = this.toRgb();
      rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
      rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
      rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
      return new TinyColor2(rgb);
    };
    TinyColor2.prototype.darken = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.l -= amount / 100;
      hsl.l = clamp01(hsl.l);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.tint = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      return this.mix("white", amount);
    };
    TinyColor2.prototype.shade = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      return this.mix("black", amount);
    };
    TinyColor2.prototype.desaturate = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.s -= amount / 100;
      hsl.s = clamp01(hsl.s);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.saturate = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.s += amount / 100;
      hsl.s = clamp01(hsl.s);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.greyscale = function() {
      return this.desaturate(100);
    };
    TinyColor2.prototype.spin = function(amount) {
      var hsl = this.toHsl();
      var hue = (hsl.h + amount) % 360;
      hsl.h = hue < 0 ? 360 + hue : hue;
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.mix = function(color, amount) {
      if (amount === void 0) {
        amount = 50;
      }
      var rgb1 = this.toRgb();
      var rgb2 = new TinyColor2(color).toRgb();
      var p = amount / 100;
      var rgba = {
        r: (rgb2.r - rgb1.r) * p + rgb1.r,
        g: (rgb2.g - rgb1.g) * p + rgb1.g,
        b: (rgb2.b - rgb1.b) * p + rgb1.b,
        a: (rgb2.a - rgb1.a) * p + rgb1.a
      };
      return new TinyColor2(rgba);
    };
    TinyColor2.prototype.analogous = function(results, slices) {
      if (results === void 0) {
        results = 6;
      }
      if (slices === void 0) {
        slices = 30;
      }
      var hsl = this.toHsl();
      var part = 360 / slices;
      var ret = [this];
      for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(new TinyColor2(hsl));
      }
      return ret;
    };
    TinyColor2.prototype.complement = function() {
      var hsl = this.toHsl();
      hsl.h = (hsl.h + 180) % 360;
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.monochromatic = function(results) {
      if (results === void 0) {
        results = 6;
      }
      var hsv = this.toHsv();
      var h = hsv.h;
      var s = hsv.s;
      var v = hsv.v;
      var res = [];
      var modification = 1 / results;
      while (results--) {
        res.push(new TinyColor2({ h, s, v }));
        v = (v + modification) % 1;
      }
      return res;
    };
    TinyColor2.prototype.splitcomplement = function() {
      var hsl = this.toHsl();
      var h = hsl.h;
      return [
        this,
        new TinyColor2({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
        new TinyColor2({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })
      ];
    };
    TinyColor2.prototype.onBackground = function(background) {
      var fg = this.toRgb();
      var bg = new TinyColor2(background).toRgb();
      return new TinyColor2({
        r: bg.r + (fg.r - bg.r) * fg.a,
        g: bg.g + (fg.g - bg.g) * fg.a,
        b: bg.b + (fg.b - bg.b) * fg.a
      });
    };
    TinyColor2.prototype.triad = function() {
      return this.polyad(3);
    };
    TinyColor2.prototype.tetrad = function() {
      return this.polyad(4);
    };
    TinyColor2.prototype.polyad = function(n) {
      var hsl = this.toHsl();
      var h = hsl.h;
      var result = [this];
      var increment = 360 / n;
      for (var i = 1; i < n; i++) {
        result.push(new TinyColor2({ h: (h + i * increment) % 360, s: hsl.s, l: hsl.l }));
      }
      return result;
    };
    TinyColor2.prototype.equals = function(color) {
      return this.toRgbString() === new TinyColor2(color).toRgbString();
    };
    return TinyColor2;
  }();
  function darken(color, amount = 20) {
    return color.mix("#141414", amount).toString();
  }
  function useButtonCustomStyle(props) {
    const _disabled = useDisabled();
    const ns = useNamespace("button");
    return vue.computed(() => {
      let styles = {};
      const buttonColor = props.color;
      if (buttonColor) {
        const color = new TinyColor(buttonColor);
        const activeBgColor = props.dark ? color.tint(20).toString() : darken(color, 20);
        if (props.plain) {
          styles = ns.cssVarBlock({
            "bg-color": props.dark ? darken(color, 90) : color.tint(90).toString(),
            "text-color": buttonColor,
            "border-color": props.dark ? darken(color, 50) : color.tint(50).toString(),
            "hover-text-color": `var(${ns.cssVarName("color-white")})`,
            "hover-bg-color": buttonColor,
            "hover-border-color": buttonColor,
            "active-bg-color": activeBgColor,
            "active-text-color": `var(${ns.cssVarName("color-white")})`,
            "active-border-color": activeBgColor
          });
          if (_disabled.value) {
            styles[ns.cssVarBlockName("disabled-bg-color")] = props.dark ? darken(color, 90) : color.tint(90).toString();
            styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? darken(color, 50) : color.tint(50).toString();
            styles[ns.cssVarBlockName("disabled-border-color")] = props.dark ? darken(color, 80) : color.tint(80).toString();
          }
        } else {
          const hoverBgColor = props.dark ? darken(color, 30) : color.tint(30).toString();
          const textColor = color.isDark() ? `var(${ns.cssVarName("color-white")})` : `var(${ns.cssVarName("color-black")})`;
          styles = ns.cssVarBlock({
            "bg-color": buttonColor,
            "text-color": textColor,
            "border-color": buttonColor,
            "hover-bg-color": hoverBgColor,
            "hover-text-color": textColor,
            "hover-border-color": hoverBgColor,
            "active-bg-color": activeBgColor,
            "active-border-color": activeBgColor
          });
          if (_disabled.value) {
            const disabledButtonColor = props.dark ? darken(color, 50) : color.tint(50).toString();
            styles[ns.cssVarBlockName("disabled-bg-color")] = disabledButtonColor;
            styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? "rgba(255, 255, 255, 0.5)" : `var(${ns.cssVarName("color-white")})`;
            styles[ns.cssVarBlockName("disabled-border-color")] = disabledButtonColor;
          }
        }
      }
      return styles;
    });
  }
  const _hoisted_1$8 = ["aria-disabled", "disabled", "autofocus", "type"];
  const __default__$4 = vue.defineComponent({
    name: "ElButton"
  });
  const _sfc_main$a = /* @__PURE__ */ vue.defineComponent({
    ...__default__$4,
    props: buttonProps,
    emits: buttonEmits,
    setup(__props, { expose, emit }) {
      const props = __props;
      const buttonStyle = useButtonCustomStyle(props);
      const ns = useNamespace("button");
      const { _ref, _size, _type, _disabled, shouldAddSpace, handleClick } = useButton(props, emit);
      expose({
        ref: _ref,
        size: _size,
        type: _type,
        disabled: _disabled,
        shouldAddSpace
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("button", {
          ref_key: "_ref",
          ref: _ref,
          class: vue.normalizeClass([
            vue.unref(ns).b(),
            vue.unref(ns).m(vue.unref(_type)),
            vue.unref(ns).m(vue.unref(_size)),
            vue.unref(ns).is("disabled", vue.unref(_disabled)),
            vue.unref(ns).is("loading", _ctx.loading),
            vue.unref(ns).is("plain", _ctx.plain),
            vue.unref(ns).is("round", _ctx.round),
            vue.unref(ns).is("circle", _ctx.circle),
            vue.unref(ns).is("text", _ctx.text),
            vue.unref(ns).is("link", _ctx.link),
            vue.unref(ns).is("has-bg", _ctx.bg)
          ]),
          "aria-disabled": vue.unref(_disabled) || _ctx.loading,
          disabled: vue.unref(_disabled) || _ctx.loading,
          autofocus: _ctx.autofocus,
          type: _ctx.nativeType,
          style: vue.normalizeStyle(vue.unref(buttonStyle)),
          onClick: _cache[0] || (_cache[0] = (...args) => vue.unref(handleClick) && vue.unref(handleClick)(...args))
        }, [
          _ctx.loading ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            _ctx.$slots.loading ? vue.renderSlot(_ctx.$slots, "loading", { key: 0 }) : (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
              key: 1,
              class: vue.normalizeClass(vue.unref(ns).is("loading"))
            }, {
              default: vue.withCtx(() => [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.loadingIcon)))
              ]),
              _: 1
            }, 8, ["class"]))
          ], 64)) : _ctx.icon || _ctx.$slots.icon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), { key: 1 }, {
            default: vue.withCtx(() => [
              _ctx.icon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.icon), { key: 0 })) : vue.renderSlot(_ctx.$slots, "icon", { key: 1 })
            ]),
            _: 3
          })) : vue.createCommentVNode("v-if", true),
          _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 2,
            class: vue.normalizeClass({ [vue.unref(ns).em("text", "expand")]: vue.unref(shouldAddSpace) })
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 2)) : vue.createCommentVNode("v-if", true)
        ], 14, _hoisted_1$8);
      };
    }
  });
  var Button = /* @__PURE__ */ _export_sfc$1(_sfc_main$a, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button.vue"]]);
  const buttonGroupProps = {
    size: buttonProps.size,
    type: buttonProps.type
  };
  const __default__$3 = vue.defineComponent({
    name: "ElButtonGroup"
  });
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$3,
    props: buttonGroupProps,
    setup(__props) {
      const props = __props;
      vue.provide(buttonGroupContextKey, vue.reactive({
        size: vue.toRef(props, "size"),
        type: vue.toRef(props, "type")
      }));
      const ns = useNamespace("button");
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(`${vue.unref(ns).b("group")}`)
        }, [
          vue.renderSlot(_ctx.$slots, "default")
        ], 2);
      };
    }
  });
  var ButtonGroup = /* @__PURE__ */ _export_sfc$1(_sfc_main$9, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/button/src/button-group.vue"]]);
  const ElButton = withInstall(Button, {
    ButtonGroup
  });
  withNoopInstall(ButtonGroup);
  const messageConfig = {};
  const configProviderProps = buildProps({
    a11y: {
      type: Boolean,
      default: true
    },
    locale: {
      type: definePropType(Object)
    },
    size: useSizeProp,
    button: {
      type: definePropType(Object)
    },
    experimentalFeatures: {
      type: definePropType(Object)
    },
    keyboardNavigation: {
      type: Boolean,
      default: true
    },
    message: {
      type: definePropType(Object)
    },
    zIndex: Number,
    namespace: {
      type: String,
      default: "el"
    }
  });
  vue.defineComponent({
    name: "ElConfigProvider",
    props: configProviderProps,
    setup(props, { slots }) {
      vue.watch(() => props.message, (val) => {
        Object.assign(messageConfig, val != null ? val : {});
      }, { immediate: true, deep: true });
      const config = provideGlobalConfig(props);
      return () => vue.renderSlot(slots, "default", { config: config == null ? void 0 : config.value });
    }
  });
  const overlayProps = buildProps({
    mask: {
      type: Boolean,
      default: true
    },
    customMaskEvent: {
      type: Boolean,
      default: false
    },
    overlayClass: {
      type: definePropType([
        String,
        Array,
        Object
      ])
    },
    zIndex: {
      type: definePropType([String, Number])
    }
  });
  const overlayEmits = {
    click: (evt) => evt instanceof MouseEvent
  };
  var Overlay = vue.defineComponent({
    name: "ElOverlay",
    props: overlayProps,
    emits: overlayEmits,
    setup(props, { slots, emit }) {
      const ns = useNamespace("overlay");
      const onMaskClick = (e) => {
        emit("click", e);
      };
      const { onClick, onMousedown, onMouseup } = useSameTarget(props.customMaskEvent ? void 0 : onMaskClick);
      return () => {
        return props.mask ? vue.createVNode("div", {
          class: [ns.b(), props.overlayClass],
          style: {
            zIndex: props.zIndex
          },
          onClick,
          onMousedown,
          onMouseup
        }, [vue.renderSlot(slots, "default")], PatchFlags.STYLE | PatchFlags.CLASS | PatchFlags.PROPS, ["onClick", "onMouseup", "onMousedown"]) : vue.h("div", {
          class: props.overlayClass,
          style: {
            zIndex: props.zIndex,
            position: "fixed",
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px"
          }
        }, [vue.renderSlot(slots, "default")]);
      };
    }
  });
  const ElOverlay = Overlay;
  const dialogContentProps = buildProps({
    center: {
      type: Boolean,
      default: false
    },
    alignCenter: {
      type: Boolean,
      default: false
    },
    closeIcon: {
      type: iconPropType
    },
    customClass: {
      type: String,
      default: ""
    },
    draggable: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    showClose: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    }
  });
  const dialogContentEmits = {
    close: () => true
  };
  const _hoisted_1$7 = ["aria-label"];
  const _hoisted_2$5 = ["id"];
  const __default__$2 = vue.defineComponent({ name: "ElDialogContent" });
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$2,
    props: dialogContentProps,
    emits: dialogContentEmits,
    setup(__props) {
      const props = __props;
      const { t } = useLocale();
      const { Close } = CloseComponents;
      const { dialogRef, headerRef, bodyId, ns, style } = vue.inject(dialogInjectionKey);
      const { focusTrapRef } = vue.inject(FOCUS_TRAP_INJECTION_KEY);
      const composedDialogRef = composeRefs(focusTrapRef, dialogRef);
      const draggable = vue.computed(() => props.draggable);
      useDraggable(dialogRef, headerRef, draggable);
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          ref: vue.unref(composedDialogRef),
          class: vue.normalizeClass([
            vue.unref(ns).b(),
            vue.unref(ns).is("fullscreen", _ctx.fullscreen),
            vue.unref(ns).is("draggable", vue.unref(draggable)),
            vue.unref(ns).is("align-center", _ctx.alignCenter),
            { [vue.unref(ns).m("center")]: _ctx.center },
            _ctx.customClass
          ]),
          style: vue.normalizeStyle(vue.unref(style)),
          tabindex: "-1"
        }, [
          vue.createElementVNode("header", {
            ref_key: "headerRef",
            ref: headerRef,
            class: vue.normalizeClass(vue.unref(ns).e("header"))
          }, [
            vue.renderSlot(_ctx.$slots, "header", {}, () => [
              vue.createElementVNode("span", {
                role: "heading",
                class: vue.normalizeClass(vue.unref(ns).e("title"))
              }, vue.toDisplayString(_ctx.title), 3)
            ]),
            _ctx.showClose ? (vue.openBlock(), vue.createElementBlock("button", {
              key: 0,
              "aria-label": vue.unref(t)("el.dialog.close"),
              class: vue.normalizeClass(vue.unref(ns).e("headerbtn")),
              type: "button",
              onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
            }, [
              vue.createVNode(vue.unref(ElIcon), {
                class: vue.normalizeClass(vue.unref(ns).e("close"))
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.closeIcon || vue.unref(Close))))
                ]),
                _: 1
              }, 8, ["class"])
            ], 10, _hoisted_1$7)) : vue.createCommentVNode("v-if", true)
          ], 2),
          vue.createElementVNode("div", {
            id: vue.unref(bodyId),
            class: vue.normalizeClass(vue.unref(ns).e("body"))
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 10, _hoisted_2$5),
          _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock("footer", {
            key: 0,
            class: vue.normalizeClass(vue.unref(ns).e("footer"))
          }, [
            vue.renderSlot(_ctx.$slots, "footer")
          ], 2)) : vue.createCommentVNode("v-if", true)
        ], 6);
      };
    }
  });
  var ElDialogContent = /* @__PURE__ */ _export_sfc$1(_sfc_main$8, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog-content.vue"]]);
  const dialogProps = buildProps({
    ...dialogContentProps,
    appendToBody: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      type: definePropType(Function)
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    modal: {
      type: Boolean,
      default: true
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0
    },
    top: {
      type: String
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    modalClass: String,
    width: {
      type: [String, Number]
    },
    zIndex: {
      type: Number
    },
    trapFocus: {
      type: Boolean,
      default: false
    }
  });
  const dialogEmits = {
    open: () => true,
    opened: () => true,
    close: () => true,
    closed: () => true,
    [UPDATE_MODEL_EVENT]: (value) => isBoolean(value),
    openAutoFocus: () => true,
    closeAutoFocus: () => true
  };
  const useDialog = (props, targetRef) => {
    const instance = vue.getCurrentInstance();
    const emit = instance.emit;
    const { nextZIndex } = useZIndex();
    let lastPosition = "";
    const titleId = useId();
    const bodyId = useId();
    const visible = vue.ref(false);
    const closed = vue.ref(false);
    const rendered = vue.ref(false);
    const zIndex2 = vue.ref(props.zIndex || nextZIndex());
    let openTimer = void 0;
    let closeTimer = void 0;
    const namespace = useGlobalConfig("namespace", defaultNamespace);
    const style = vue.computed(() => {
      const style2 = {};
      const varPrefix = `--${namespace.value}-dialog`;
      if (!props.fullscreen) {
        if (props.top) {
          style2[`${varPrefix}-margin-top`] = props.top;
        }
        if (props.width) {
          style2[`${varPrefix}-width`] = addUnit(props.width);
        }
      }
      return style2;
    });
    const overlayDialogStyle = vue.computed(() => {
      if (props.alignCenter) {
        return { display: "flex" };
      }
      return {};
    });
    function afterEnter() {
      emit("opened");
    }
    function afterLeave() {
      emit("closed");
      emit(UPDATE_MODEL_EVENT, false);
      if (props.destroyOnClose) {
        rendered.value = false;
      }
    }
    function beforeLeave() {
      emit("close");
    }
    function open() {
      closeTimer == null ? void 0 : closeTimer();
      openTimer == null ? void 0 : openTimer();
      if (props.openDelay && props.openDelay > 0) {
        ({ stop: openTimer } = useTimeoutFn(() => doOpen(), props.openDelay));
      } else {
        doOpen();
      }
    }
    function close() {
      openTimer == null ? void 0 : openTimer();
      closeTimer == null ? void 0 : closeTimer();
      if (props.closeDelay && props.closeDelay > 0) {
        ({ stop: closeTimer } = useTimeoutFn(() => doClose(), props.closeDelay));
      } else {
        doClose();
      }
    }
    function handleClose() {
      function hide(shouldCancel) {
        if (shouldCancel)
          return;
        closed.value = true;
        visible.value = false;
      }
      if (props.beforeClose) {
        props.beforeClose(hide);
      } else {
        close();
      }
    }
    function onModalClick() {
      if (props.closeOnClickModal) {
        handleClose();
      }
    }
    function doOpen() {
      if (!isClient)
        return;
      visible.value = true;
    }
    function doClose() {
      visible.value = false;
    }
    function onOpenAutoFocus() {
      emit("openAutoFocus");
    }
    function onCloseAutoFocus() {
      emit("closeAutoFocus");
    }
    function onFocusoutPrevented(event) {
      var _a2;
      if (((_a2 = event.detail) == null ? void 0 : _a2.focusReason) === "pointer") {
        event.preventDefault();
      }
    }
    if (props.lockScroll) {
      useLockscreen(visible);
    }
    function onCloseRequested() {
      if (props.closeOnPressEscape) {
        handleClose();
      }
    }
    vue.watch(() => props.modelValue, (val) => {
      if (val) {
        closed.value = false;
        open();
        rendered.value = true;
        zIndex2.value = props.zIndex ? zIndex2.value++ : nextZIndex();
        vue.nextTick(() => {
          emit("open");
          if (targetRef.value) {
            targetRef.value.scrollTop = 0;
          }
        });
      } else {
        if (visible.value) {
          close();
        }
      }
    });
    vue.watch(() => props.fullscreen, (val) => {
      if (!targetRef.value)
        return;
      if (val) {
        lastPosition = targetRef.value.style.transform;
        targetRef.value.style.transform = "";
      } else {
        targetRef.value.style.transform = lastPosition;
      }
    });
    vue.onMounted(() => {
      if (props.modelValue) {
        visible.value = true;
        rendered.value = true;
        open();
      }
    });
    return {
      afterEnter,
      afterLeave,
      beforeLeave,
      handleClose,
      onModalClick,
      close,
      doClose,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onCloseRequested,
      onFocusoutPrevented,
      titleId,
      bodyId,
      closed,
      style,
      overlayDialogStyle,
      rendered,
      visible,
      zIndex: zIndex2
    };
  };
  const _hoisted_1$6 = ["aria-label", "aria-labelledby", "aria-describedby"];
  const __default__$1 = vue.defineComponent({
    name: "ElDialog",
    inheritAttrs: false
  });
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    ...__default__$1,
    props: dialogProps,
    emits: dialogEmits,
    setup(__props, { expose }) {
      const props = __props;
      const slots = vue.useSlots();
      useDeprecated({
        scope: "el-dialog",
        from: "the title slot",
        replacement: "the header slot",
        version: "3.0.0",
        ref: "https://element-plus.org/en-US/component/dialog.html#slots"
      }, vue.computed(() => !!slots.title));
      useDeprecated({
        scope: "el-dialog",
        from: "custom-class",
        replacement: "class",
        version: "2.3.0",
        ref: "https://element-plus.org/en-US/component/dialog.html#attributes",
        type: "Attribute"
      }, vue.computed(() => !!props.customClass));
      const ns = useNamespace("dialog");
      const dialogRef = vue.ref();
      const headerRef = vue.ref();
      const dialogContentRef = vue.ref();
      const {
        visible,
        titleId,
        bodyId,
        style,
        overlayDialogStyle,
        rendered,
        zIndex: zIndex2,
        afterEnter,
        afterLeave,
        beforeLeave,
        handleClose,
        onModalClick,
        onOpenAutoFocus,
        onCloseAutoFocus,
        onCloseRequested,
        onFocusoutPrevented
      } = useDialog(props, dialogRef);
      vue.provide(dialogInjectionKey, {
        dialogRef,
        headerRef,
        bodyId,
        ns,
        rendered,
        style
      });
      const overlayEvent = useSameTarget(onModalClick);
      const draggable = vue.computed(() => props.draggable && !props.fullscreen);
      expose({
        visible,
        dialogContentRef
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.Teleport, {
          to: "body",
          disabled: !_ctx.appendToBody
        }, [
          vue.createVNode(vue.Transition, {
            name: "dialog-fade",
            onAfterEnter: vue.unref(afterEnter),
            onAfterLeave: vue.unref(afterLeave),
            onBeforeLeave: vue.unref(beforeLeave),
            persisted: ""
          }, {
            default: vue.withCtx(() => [
              vue.withDirectives(vue.createVNode(vue.unref(ElOverlay), {
                "custom-mask-event": "",
                mask: _ctx.modal,
                "overlay-class": _ctx.modalClass,
                "z-index": vue.unref(zIndex2)
              }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("div", {
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-label": _ctx.title || void 0,
                    "aria-labelledby": !_ctx.title ? vue.unref(titleId) : void 0,
                    "aria-describedby": vue.unref(bodyId),
                    class: vue.normalizeClass(`${vue.unref(ns).namespace.value}-overlay-dialog`),
                    style: vue.normalizeStyle(vue.unref(overlayDialogStyle)),
                    onClick: _cache[0] || (_cache[0] = (...args) => vue.unref(overlayEvent).onClick && vue.unref(overlayEvent).onClick(...args)),
                    onMousedown: _cache[1] || (_cache[1] = (...args) => vue.unref(overlayEvent).onMousedown && vue.unref(overlayEvent).onMousedown(...args)),
                    onMouseup: _cache[2] || (_cache[2] = (...args) => vue.unref(overlayEvent).onMouseup && vue.unref(overlayEvent).onMouseup(...args))
                  }, [
                    vue.createVNode(vue.unref(ElFocusTrap), {
                      loop: "",
                      trapped: vue.unref(visible),
                      "focus-start-el": "container",
                      onFocusAfterTrapped: vue.unref(onOpenAutoFocus),
                      onFocusAfterReleased: vue.unref(onCloseAutoFocus),
                      onFocusoutPrevented: vue.unref(onFocusoutPrevented),
                      onReleaseRequested: vue.unref(onCloseRequested)
                    }, {
                      default: vue.withCtx(() => [
                        vue.unref(rendered) ? (vue.openBlock(), vue.createBlock(ElDialogContent, vue.mergeProps({
                          key: 0,
                          ref_key: "dialogContentRef",
                          ref: dialogContentRef
                        }, _ctx.$attrs, {
                          "custom-class": _ctx.customClass,
                          center: _ctx.center,
                          "align-center": _ctx.alignCenter,
                          "close-icon": _ctx.closeIcon,
                          draggable: vue.unref(draggable),
                          fullscreen: _ctx.fullscreen,
                          "show-close": _ctx.showClose,
                          title: _ctx.title,
                          onClose: vue.unref(handleClose)
                        }), vue.createSlots({
                          header: vue.withCtx(() => [
                            !_ctx.$slots.title ? vue.renderSlot(_ctx.$slots, "header", {
                              key: 0,
                              close: vue.unref(handleClose),
                              titleId: vue.unref(titleId),
                              titleClass: vue.unref(ns).e("title")
                            }) : vue.renderSlot(_ctx.$slots, "title", { key: 1 })
                          ]),
                          default: vue.withCtx(() => [
                            vue.renderSlot(_ctx.$slots, "default")
                          ]),
                          _: 2
                        }, [
                          _ctx.$slots.footer ? {
                            name: "footer",
                            fn: vue.withCtx(() => [
                              vue.renderSlot(_ctx.$slots, "footer")
                            ])
                          } : void 0
                        ]), 1040, ["custom-class", "center", "align-center", "close-icon", "draggable", "fullscreen", "show-close", "title", "onClose"])) : vue.createCommentVNode("v-if", true)
                      ]),
                      _: 3
                    }, 8, ["trapped", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusoutPrevented", "onReleaseRequested"])
                  ], 46, _hoisted_1$6)
                ]),
                _: 3
              }, 8, ["mask", "overlay-class", "z-index"]), [
                [vue.vShow, vue.unref(visible)]
              ])
            ]),
            _: 3
          }, 8, ["onAfterEnter", "onAfterLeave", "onBeforeLeave"])
        ], 8, ["disabled"]);
      };
    }
  });
  var Dialog = /* @__PURE__ */ _export_sfc$1(_sfc_main$7, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog.vue"]]);
  const ElDialog = withInstall(Dialog);
  const drawerProps = buildProps({
    ...dialogProps,
    direction: {
      type: String,
      default: "rtl",
      values: ["ltr", "rtl", "ttb", "btt"]
    },
    size: {
      type: [String, Number],
      default: "30%"
    },
    withHeader: {
      type: Boolean,
      default: true
    },
    modalFade: {
      type: Boolean,
      default: true
    }
  });
  const drawerEmits = dialogEmits;
  const _sfc_main$6 = vue.defineComponent({
    name: "ElDrawer",
    components: {
      ElOverlay,
      ElFocusTrap,
      ElIcon,
      Close: close_default
    },
    props: drawerProps,
    emits: drawerEmits,
    setup(props, { slots }) {
      useDeprecated({
        scope: "el-drawer",
        from: "the title slot",
        replacement: "the header slot",
        version: "3.0.0",
        ref: "https://element-plus.org/en-US/component/drawer.html#slots"
      }, vue.computed(() => !!slots.title));
      const drawerRef = vue.ref();
      const focusStartRef = vue.ref();
      const ns = useNamespace("drawer");
      const { t } = useLocale();
      const isHorizontal = vue.computed(() => props.direction === "rtl" || props.direction === "ltr");
      const drawerSize = vue.computed(() => addUnit(props.size));
      return {
        ...useDialog(props, drawerRef),
        drawerRef,
        focusStartRef,
        isHorizontal,
        drawerSize,
        ns,
        t
      };
    }
  });
  const _hoisted_1$5 = ["aria-label", "aria-labelledby", "aria-describedby"];
  const _hoisted_2$4 = ["id"];
  const _hoisted_3$2 = ["aria-label"];
  const _hoisted_4$1 = ["id"];
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_close = vue.resolveComponent("close");
    const _component_el_icon = vue.resolveComponent("el-icon");
    const _component_el_focus_trap = vue.resolveComponent("el-focus-trap");
    const _component_el_overlay = vue.resolveComponent("el-overlay");
    return vue.openBlock(), vue.createBlock(vue.Teleport, {
      to: "body",
      disabled: !_ctx.appendToBody
    }, [
      vue.createVNode(vue.Transition, {
        name: _ctx.ns.b("fade"),
        onAfterEnter: _ctx.afterEnter,
        onAfterLeave: _ctx.afterLeave,
        onBeforeLeave: _ctx.beforeLeave,
        persisted: ""
      }, {
        default: vue.withCtx(() => [
          vue.withDirectives(vue.createVNode(_component_el_overlay, {
            mask: _ctx.modal,
            "overlay-class": _ctx.modalClass,
            "z-index": _ctx.zIndex,
            onClick: _ctx.onModalClick
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_focus_trap, {
                loop: "",
                trapped: _ctx.visible,
                "focus-trap-el": _ctx.drawerRef,
                "focus-start-el": _ctx.focusStartRef,
                onReleaseRequested: _ctx.onCloseRequested
              }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("div", {
                    ref: "drawerRef",
                    "aria-modal": "true",
                    "aria-label": _ctx.title || void 0,
                    "aria-labelledby": !_ctx.title ? _ctx.titleId : void 0,
                    "aria-describedby": _ctx.bodyId,
                    class: vue.normalizeClass([_ctx.ns.b(), _ctx.direction, _ctx.visible && "open", _ctx.customClass]),
                    style: vue.normalizeStyle(_ctx.isHorizontal ? "width: " + _ctx.drawerSize : "height: " + _ctx.drawerSize),
                    role: "dialog",
                    onClick: _cache[1] || (_cache[1] = vue.withModifiers(() => {
                    }, ["stop"]))
                  }, [
                    vue.createElementVNode("span", {
                      ref: "focusStartRef",
                      class: vue.normalizeClass(_ctx.ns.e("sr-focus")),
                      tabindex: "-1"
                    }, null, 2),
                    _ctx.withHeader ? (vue.openBlock(), vue.createElementBlock("header", {
                      key: 0,
                      class: vue.normalizeClass(_ctx.ns.e("header"))
                    }, [
                      !_ctx.$slots.title ? vue.renderSlot(_ctx.$slots, "header", {
                        key: 0,
                        close: _ctx.handleClose,
                        titleId: _ctx.titleId,
                        titleClass: _ctx.ns.e("title")
                      }, () => [
                        !_ctx.$slots.title ? (vue.openBlock(), vue.createElementBlock("span", {
                          key: 0,
                          id: _ctx.titleId,
                          role: "heading",
                          class: vue.normalizeClass(_ctx.ns.e("title"))
                        }, vue.toDisplayString(_ctx.title), 11, _hoisted_2$4)) : vue.createCommentVNode("v-if", true)
                      ]) : vue.renderSlot(_ctx.$slots, "title", { key: 1 }, () => [
                        vue.createCommentVNode(" DEPRECATED SLOT ")
                      ]),
                      _ctx.showClose ? (vue.openBlock(), vue.createElementBlock("button", {
                        key: 2,
                        "aria-label": _ctx.t("el.drawer.close"),
                        class: vue.normalizeClass(_ctx.ns.e("close-btn")),
                        type: "button",
                        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClose && _ctx.handleClose(...args))
                      }, [
                        vue.createVNode(_component_el_icon, {
                          class: vue.normalizeClass(_ctx.ns.e("close"))
                        }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_close)
                          ]),
                          _: 1
                        }, 8, ["class"])
                      ], 10, _hoisted_3$2)) : vue.createCommentVNode("v-if", true)
                    ], 2)) : vue.createCommentVNode("v-if", true),
                    _ctx.rendered ? (vue.openBlock(), vue.createElementBlock("div", {
                      key: 1,
                      id: _ctx.bodyId,
                      class: vue.normalizeClass(_ctx.ns.e("body"))
                    }, [
                      vue.renderSlot(_ctx.$slots, "default")
                    ], 10, _hoisted_4$1)) : vue.createCommentVNode("v-if", true),
                    _ctx.$slots.footer ? (vue.openBlock(), vue.createElementBlock("div", {
                      key: 2,
                      class: vue.normalizeClass(_ctx.ns.e("footer"))
                    }, [
                      vue.renderSlot(_ctx.$slots, "footer")
                    ], 2)) : vue.createCommentVNode("v-if", true)
                  ], 14, _hoisted_1$5)
                ]),
                _: 3
              }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onReleaseRequested"])
            ]),
            _: 3
          }, 8, ["mask", "overlay-class", "z-index", "onClick"]), [
            [vue.vShow, _ctx.visible]
          ])
        ]),
        _: 3
      }, 8, ["name", "onAfterEnter", "onAfterLeave", "onBeforeLeave"])
    ], 8, ["disabled"]);
  }
  var Drawer = /* @__PURE__ */ _export_sfc$1(_sfc_main$6, [["render", _sfc_render], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/drawer/src/drawer.vue"]]);
  const ElDrawer = withInstall(Drawer);
  const messageTypes = ["success", "info", "warning", "error"];
  const messageDefaults = mutable({
    customClass: "",
    center: false,
    dangerouslyUseHTMLString: false,
    duration: 3e3,
    icon: void 0,
    id: "",
    message: "",
    onClose: void 0,
    showClose: false,
    type: "info",
    offset: 16,
    zIndex: 0,
    grouping: false,
    repeatNum: 1,
    appendTo: isClient ? document.body : void 0
  });
  const messageProps = buildProps({
    customClass: {
      type: String,
      default: messageDefaults.customClass
    },
    center: {
      type: Boolean,
      default: messageDefaults.center
    },
    dangerouslyUseHTMLString: {
      type: Boolean,
      default: messageDefaults.dangerouslyUseHTMLString
    },
    duration: {
      type: Number,
      default: messageDefaults.duration
    },
    icon: {
      type: iconPropType,
      default: messageDefaults.icon
    },
    id: {
      type: String,
      default: messageDefaults.id
    },
    message: {
      type: definePropType([
        String,
        Object,
        Function
      ]),
      default: messageDefaults.message
    },
    onClose: {
      type: definePropType(Function),
      required: false
    },
    showClose: {
      type: Boolean,
      default: messageDefaults.showClose
    },
    type: {
      type: String,
      values: messageTypes,
      default: messageDefaults.type
    },
    offset: {
      type: Number,
      default: messageDefaults.offset
    },
    zIndex: {
      type: Number,
      default: messageDefaults.zIndex
    },
    grouping: {
      type: Boolean,
      default: messageDefaults.grouping
    },
    repeatNum: {
      type: Number,
      default: messageDefaults.repeatNum
    }
  });
  const messageEmits = {
    destroy: () => true
  };
  const instances = vue.shallowReactive([]);
  const getInstance = (id) => {
    const idx = instances.findIndex((instance) => instance.id === id);
    const current = instances[idx];
    let prev;
    if (idx > 0) {
      prev = instances[idx - 1];
    }
    return { current, prev };
  };
  const getLastOffset = (id) => {
    const { prev } = getInstance(id);
    if (!prev)
      return 0;
    return prev.vm.exposed.bottom.value;
  };
  const _hoisted_1$4 = ["id"];
  const _hoisted_2$3 = ["innerHTML"];
  const __default__ = vue.defineComponent({
    name: "ElMessage"
  });
  const _sfc_main$5 = /* @__PURE__ */ vue.defineComponent({
    ...__default__,
    props: messageProps,
    emits: messageEmits,
    setup(__props, { expose }) {
      const props = __props;
      const { Close } = TypeComponents;
      const ns = useNamespace("message");
      const messageRef = vue.ref();
      const visible = vue.ref(false);
      const height = vue.ref(0);
      let stopTimer = void 0;
      const badgeType = vue.computed(() => props.type ? props.type === "error" ? "danger" : props.type : "info");
      const typeClass = vue.computed(() => {
        const type = props.type;
        return { [ns.bm("icon", type)]: type && TypeComponentsMap[type] };
      });
      const iconComponent = vue.computed(() => props.icon || TypeComponentsMap[props.type] || "");
      const lastOffset = vue.computed(() => getLastOffset(props.id));
      const offset = vue.computed(() => props.offset + lastOffset.value);
      const bottom = vue.computed(() => height.value + offset.value);
      const customStyle = vue.computed(() => ({
        top: `${offset.value}px`,
        zIndex: props.zIndex
      }));
      function startTimer() {
        if (props.duration === 0)
          return;
        ({ stop: stopTimer } = useTimeoutFn(() => {
          close();
        }, props.duration));
      }
      function clearTimer() {
        stopTimer == null ? void 0 : stopTimer();
      }
      function close() {
        visible.value = false;
      }
      function keydown({ code }) {
        if (code === EVENT_CODE.esc) {
          close();
        }
      }
      vue.onMounted(() => {
        startTimer();
        visible.value = true;
      });
      vue.watch(() => props.repeatNum, () => {
        clearTimer();
        startTimer();
      });
      useEventListener(document, "keydown", keydown);
      useResizeObserver(messageRef, () => {
        height.value = messageRef.value.getBoundingClientRect().height;
      });
      expose({
        visible,
        bottom,
        close
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.Transition, {
          name: vue.unref(ns).b("fade"),
          onBeforeLeave: _ctx.onClose,
          onAfterLeave: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("destroy")),
          persisted: ""
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createElementVNode("div", {
              id: _ctx.id,
              ref_key: "messageRef",
              ref: messageRef,
              class: vue.normalizeClass([
                vue.unref(ns).b(),
                { [vue.unref(ns).m(_ctx.type)]: _ctx.type && !_ctx.icon },
                vue.unref(ns).is("center", _ctx.center),
                vue.unref(ns).is("closable", _ctx.showClose),
                _ctx.customClass
              ]),
              style: vue.normalizeStyle(vue.unref(customStyle)),
              role: "alert",
              onMouseenter: clearTimer,
              onMouseleave: startTimer
            }, [
              _ctx.repeatNum > 1 ? (vue.openBlock(), vue.createBlock(vue.unref(ElBadge), {
                key: 0,
                value: _ctx.repeatNum,
                type: vue.unref(badgeType),
                class: vue.normalizeClass(vue.unref(ns).e("badge"))
              }, null, 8, ["value", "type", "class"])) : vue.createCommentVNode("v-if", true),
              vue.unref(iconComponent) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                key: 1,
                class: vue.normalizeClass([vue.unref(ns).e("icon"), vue.unref(typeClass)])
              }, {
                default: vue.withCtx(() => [
                  (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(iconComponent))))
                ]),
                _: 1
              }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                !_ctx.dangerouslyUseHTMLString ? (vue.openBlock(), vue.createElementBlock("p", {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(ns).e("content"))
                }, vue.toDisplayString(_ctx.message), 3)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                  vue.createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "),
                  vue.createElementVNode("p", {
                    class: vue.normalizeClass(vue.unref(ns).e("content")),
                    innerHTML: _ctx.message
                  }, null, 10, _hoisted_2$3)
                ], 2112))
              ]),
              _ctx.showClose ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                key: 2,
                class: vue.normalizeClass(vue.unref(ns).e("closeBtn")),
                onClick: vue.withModifiers(close, ["stop"])
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(vue.unref(Close))
                ]),
                _: 1
              }, 8, ["class", "onClick"])) : vue.createCommentVNode("v-if", true)
            ], 46, _hoisted_1$4), [
              [vue.vShow, visible.value]
            ])
          ]),
          _: 3
        }, 8, ["name", "onBeforeLeave"]);
      };
    }
  });
  var MessageConstructor = /* @__PURE__ */ _export_sfc$1(_sfc_main$5, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/message/src/message.vue"]]);
  let seed = 1;
  const normalizeOptions = (params) => {
    const options = !params || isString(params) || vue.isVNode(params) || isFunction(params) ? { message: params } : params;
    const normalized = {
      ...messageDefaults,
      ...options
    };
    if (!normalized.appendTo) {
      normalized.appendTo = document.body;
    } else if (isString(normalized.appendTo)) {
      let appendTo = document.querySelector(normalized.appendTo);
      if (!isElement(appendTo)) {
        appendTo = document.body;
      }
      normalized.appendTo = appendTo;
    }
    return normalized;
  };
  const closeMessage = (instance) => {
    const idx = instances.indexOf(instance);
    if (idx === -1)
      return;
    instances.splice(idx, 1);
    const { handler } = instance;
    handler.close();
  };
  const createMessage = ({ appendTo, ...options }, context) => {
    const { nextZIndex } = useZIndex();
    const id = `message_${seed++}`;
    const userOnClose = options.onClose;
    const container = document.createElement("div");
    const props = {
      ...options,
      zIndex: nextZIndex() + options.zIndex,
      id,
      onClose: () => {
        userOnClose == null ? void 0 : userOnClose();
        closeMessage(instance);
      },
      onDestroy: () => {
        vue.render(null, container);
      }
    };
    const vnode = vue.createVNode(MessageConstructor, props, isFunction(props.message) || vue.isVNode(props.message) ? {
      default: isFunction(props.message) ? props.message : () => props.message
    } : null);
    vnode.appContext = context || message._context;
    vue.render(vnode, container);
    appendTo.appendChild(container.firstElementChild);
    const vm = vnode.component;
    const handler = {
      close: () => {
        vm.exposed.visible.value = false;
      }
    };
    const instance = {
      id,
      vnode,
      vm,
      handler,
      props: vnode.component.props
    };
    return instance;
  };
  const message = (options = {}, context) => {
    if (!isClient)
      return { close: () => void 0 };
    if (isNumber(messageConfig.max) && instances.length >= messageConfig.max) {
      return { close: () => void 0 };
    }
    const normalized = normalizeOptions(options);
    if (normalized.grouping && instances.length) {
      const instance2 = instances.find(({ vnode: vm }) => {
        var _a2;
        return ((_a2 = vm.props) == null ? void 0 : _a2.message) === normalized.message;
      });
      if (instance2) {
        instance2.props.repeatNum += 1;
        instance2.props.type = normalized.type;
        return instance2.handler;
      }
    }
    const instance = createMessage(normalized, context);
    instances.push(instance);
    return instance.handler;
  };
  messageTypes.forEach((type) => {
    message[type] = (options = {}, appContext) => {
      const normalized = normalizeOptions(options);
      return message({ ...normalized, type }, appContext);
    };
  });
  function closeAll(type) {
    for (const instance of instances) {
      if (!type || type === instance.props.type) {
        instance.handler.close();
      }
    }
  }
  message.closeAll = closeAll;
  message._context = null;
  const ElMessage = withInstallFunction(message, "$message");
  var monkeyWindow = window;
  var GM_setValue = /* @__PURE__ */ (() => monkeyWindow.GM_setValue)();
  var GM_xmlhttpRequest = /* @__PURE__ */ (() => monkeyWindow.GM_xmlhttpRequest)();
  var GM_setClipboard = /* @__PURE__ */ (() => monkeyWindow.GM_setClipboard)();
  var GM_getValue = /* @__PURE__ */ (() => monkeyWindow.GM_getValue)();
  const BOOK_SHELF_KEY = "tampermonkey_douban_books";
  let books;
  function useStore$1(force = false) {
    if (!books || force) {
      {
        books = vue.reactive(JSON.parse(GM_getValue(BOOK_SHELF_KEY, "[]")));
        vue.watch(books, (newValue) => {
          GM_setValue(BOOK_SHELF_KEY, JSON.stringify(newValue));
        });
      }
    }
    return books;
  }
  function getBookIdx(id) {
    return books.findIndex((i) => i.id === id);
  }
  function getBook$1(id) {
    return books.find((i) => i.id === id);
  }
  function hasBook(id) {
    return getBookIdx(id) !== -1;
  }
  function addBook(book) {
    if (!hasBook(book.id)) {
      books.push({ ...book, addTime: Date.now() });
      return { success: true, msg: "" };
    } else {
      return { success: false, msg: `《${book.title}》 已在书架中` };
    }
  }
  function removeBook(id) {
    const idx = getBookIdx(id);
    if (idx === -1)
      return false;
    books.splice(idx, 1);
    return true;
  }
  function clearBook() {
    books.splice(0, books.length);
  }
  const booksStore = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    BOOK_SHELF_KEY,
    get books() {
      return books;
    },
    useStore: useStore$1,
    getBookIdx,
    getBook: getBook$1,
    hasBook,
    addBook,
    removeBook,
    clearBook
  }, Symbol.toStringTag, { value: "Module" }));
  function useStore(force = false) {
    useStore$1(force);
    return { booksStore };
  }
  function success(msg) {
    return ElMessage.success({ message: msg, showClose: true, grouping: true });
  }
  function warning(msg) {
    console.warn(msg);
    return ElMessage.warning({ message: msg, showClose: true, grouping: true });
  }
  function error(msg) {
    console.error(msg);
    return ElMessage.error({ message: msg, showClose: true, grouping: true });
  }
  const BOOK_FIELD_MAP = {
    id: "id",
    title: "书名",
    subTitle: "副标题",
    originName: "原作名",
    authors: "作者",
    translators: "译者",
    publishingHouse: "出版社",
    publishingTime: "出版时间",
    seriesName: "丛书",
    page: "页数",
    ISBN: "ISBN",
    score: "评分",
    scorePeopleCount: "评分人数",
    coverUrl: "封面图链接",
    doubanUrl: "豆瓣链接",
    contentBrief: "内容简介"
  };
  const defaultBookFields = Object.keys(BOOK_FIELD_MAP);
  const exportExcelName = "豆瓣书籍导出.xlsx";
  const excelFormatterMap = defaultBookFields.reduce((pre, field) => {
    switch (field) {
      case "authors":
      case "translators":
        pre[field] = (book) => book[field].join(", ");
        break;
      default:
        pre[field] = (book) => book[field];
        break;
    }
    return pre;
  }, {});
  const specialBookItemFormatters = [
    {
      key: "id",
      label: BOOK_FIELD_MAP.id,
      type: "link",
      getLink: (book) => book.doubanUrl
    },
    {
      key: "doubanUrl",
      label: BOOK_FIELD_MAP.doubanUrl,
      type: "link",
      getLink: (book) => book.doubanUrl
    },
    {
      key: "coverUrl",
      label: BOOK_FIELD_MAP.coverUrl,
      type: "link",
      getLink: (book) => book.coverUrl
    },
    {
      key: "authors",
      label: BOOK_FIELD_MAP.authors,
      type: "string",
      getText: (book) => book.authors.join(", ")
    },
    {
      key: "translators",
      label: BOOK_FIELD_MAP.translators,
      type: "string",
      getText: (book) => book.translators.join(", ")
    },
    {
      key: "contentBrief",
      label: BOOK_FIELD_MAP.contentBrief,
      type: "string",
      getText: (book) => book.contentBrief,
      styleObj: {
        "line-height": "30px",
        "white-space": "pre-line",
        "max-height": "300px",
        "padding-right": "20px",
        width: "98%",
        display: "inline-block",
        overflow: "auto"
      }
    }
  ];
  const bookItemFormatters = defaultBookFields.map((field) => {
    const v = specialBookItemFormatters.find((i) => i.key === field);
    if (v)
      return v;
    return {
      key: field,
      label: BOOK_FIELD_MAP[field],
      type: "string",
      getText: (book) => book[field]
    };
  });
  function getBookViewText(book, fields = defaultBookFields) {
    const textList = [];
    fields.forEach((i) => {
      const v = book[i];
      if (Array.isArray(v)) {
        if (v.length > 0)
          textList.push(`${BOOK_FIELD_MAP[i]}: ${v.join(", ")}`);
      } else if (v) {
        textList.push(`${BOOK_FIELD_MAP[i]}: ${v}`);
      }
    });
    return textList.join("\n");
  }
  async function copyBook(book, fields = defaultBookFields) {
    const text = getBookViewText(book, fields);
    GM_setClipboard(text, "text");
  }
  async function copyBookWithTip(book, fields = defaultBookFields) {
    try {
      await copyBook(book);
      success("复制成功");
    } catch (err) {
      error(err.msg);
    }
  }
  function exportExcel(rows, filename = exportExcelName, aoa2SheetOpts, writingOptions) {
    const worksheet = XLSX2.utils.aoa_to_sheet(rows, aoa2SheetOpts);
    const workbook = XLSX2.utils.book_new();
    XLSX2.utils.book_append_sheet(workbook, worksheet);
    XLSX2.writeFile(workbook, filename, writingOptions);
  }
  function exportBookExcel(books2, filename = exportExcelName, aoa2SheetOpts, writingOptions) {
    const header = defaultBookFields.map((field) => BOOK_FIELD_MAP[field]);
    const data = [header];
    books2.forEach((book) => {
      const row = defaultBookFields.map((field) => {
        return excelFormatterMap[field](book);
      });
      data.push(row);
    });
    exportExcel(data, filename, aoa2SheetOpts, writingOptions);
  }
  const _hoisted_1$3 = { key: 0 };
  const _hoisted_2$2 = { key: 1 };
  const _hoisted_3$1 = ["href"];
  const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
    __name: "BookFormatter",
    props: {
      book: null,
      fields: { default: () => defaultBookFields },
      hideEmptyField: { type: Boolean, default: true }
    },
    setup(__props) {
      const props = __props;
      const bookFormatter = vue.computed(
        () => bookItemFormatters.filter((i) => {
          if (!props.fields.includes(i.key))
            return false;
          if (!props.hideEmptyField)
            return true;
          const v = props.book[i.key];
          if (Array.isArray(v))
            return v.length > 0;
          return !!props.book[i.key];
        })
      );
      return (_ctx, _cache) => {
        return vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(bookFormatter), (item) => {
          return vue.openBlock(), vue.createElementBlock("div", {
            class: "book-field",
            key: item.key
          }, [
            item.key === "contentBrief" ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, vue.toDisplayString(item.label) + ":", 1)) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_2$2, vue.toDisplayString(item.label) + ": ", 1)),
            item.type === "string" ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 2,
              style: vue.normalizeStyle(item.styleObj)
            }, vue.toDisplayString(item.getText ? item.getText(__props.book) : __props.book[item.key]), 5)) : item.type === "link" ? (vue.openBlock(), vue.createElementBlock("a", {
              key: 3,
              href: item.getLink ? item.getLink(__props.book) : `${__props.book[item.key]}`,
              target: "_blank",
              style: vue.normalizeStyle(item.styleObj)
            }, vue.toDisplayString(__props.book[item.key]), 13, _hoisted_3$1)) : vue.createCommentVNode("", true)
          ]);
        }), 128);
      };
    }
  });
  const BookFormatter_vue_vue_type_style_index_0_scoped_5f2bdcc9_lang = "";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const BookFormatter = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-5f2bdcc9"]]);
  const _hoisted_1$2 = { class: "item" };
  const _hoisted_2$1 = { class: "item-button" };
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "BookItem",
    props: {
      book: null
    },
    emits: ["select"],
    setup(__props, { emit }) {
      const props = __props;
      const { booksStore: booksStore2 } = useStore();
      const briefFields = ["id", "title", "authors", "score", "ISBN"];
      function select() {
        emit("select", props.book);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
          vue.createElementVNode("div", null, [
            vue.createVNode(BookFormatter, {
              book: __props.book,
              fields: briefFields,
              "hide-empty-field": false
            }, null, 8, ["book"])
          ]),
          vue.createElementVNode("div", _hoisted_2$1, [
            vue.createElementVNode("div", null, [
              vue.createVNode(vue.unref(ElButton), {
                round: "",
                size: "small",
                type: "primary",
                onClick: select
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("详情")
                ]),
                _: 1
              })
            ]),
            vue.createElementVNode("div", null, [
              vue.createVNode(vue.unref(ElButton), {
                round: "",
                size: "small",
                type: "primary",
                onClick: _cache[0] || (_cache[0] = () => vue.unref(copyBookWithTip)(__props.book))
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("复制")
                ]),
                _: 1
              })
            ]),
            vue.createElementVNode("div", null, [
              vue.createVNode(vue.unref(ElButton), {
                round: "",
                size: "small",
                type: "danger",
                onClick: _cache[1] || (_cache[1] = ($event) => vue.unref(booksStore2).removeBook(__props.book.id))
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("移除")
                ]),
                _: 1
              })
            ])
          ])
        ]);
      };
    }
  });
  const BookItem_vue_vue_type_style_index_0_scoped_bdb4b0de_lang = "";
  const BookItem = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-bdb4b0de"]]);
  const _hoisted_1$1 = { key: 0 };
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "BookDetail",
    props: {
      book: null,
      show: { type: Boolean }
    },
    emits: ["close"],
    setup(__props, { emit }) {
      function handleClose() {
        emit("close");
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.unref(ElDialog), {
          "model-value": __props.show && !!__props.book,
          title: "书籍详情",
          width: "70%",
          style: { "max-height": "80vh" },
          "before-close": handleClose
        }, {
          default: vue.withCtx(() => [
            !!__props.book ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
              vue.createVNode(BookFormatter, { book: __props.book }, null, 8, ["book"])
            ])) : vue.createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["model-value"]);
      };
    }
  });
  const _withScopeId = (n) => (vue.pushScopeId("data-v-0665e06d"), n = n(), vue.popScopeId(), n);
  const _hoisted_1 = { class: "affix" };
  const _hoisted_2 = { class: "book-list-container" };
  const _hoisted_3 = { class: "book-list-container-header" };
  const _hoisted_4 = { class: "book-list-container-body" };
  const _hoisted_5 = { key: 0 };
  const _hoisted_6 = {
    key: 1,
    class: "book-list-container-empty"
  };
  const _hoisted_7 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("p", null, "书架为空", -1));
  const _hoisted_8 = [
    _hoisted_7
  ];
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "BookShelf",
    setup(__props) {
      const { booksStore: booksStore2 } = useStore();
      const showDrawer = vue.ref(false);
      const sortKey = vue.ref("addTime");
      const sortAsc = vue.ref(true);
      const books2 = vue.computed(() => {
        return [...booksStore2.books].sort((a, b) => {
          const aValue = a[sortKey.value];
          const bValue = b[sortKey.value];
          if (Array.isArray(aValue) || Array.isArray(bValue))
            return 0;
          return aValue > bValue ? sortAsc.value ? 1 : -1 : sortAsc.value ? -1 : 1;
        });
      });
      const selectedBook = vue.ref(void 0);
      const showDetail = vue.ref(false);
      function selectBook(book) {
        selectedBook.value = book;
        showDetail.value = true;
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.withDirectives(vue.createElementVNode("div", _hoisted_1, [
            vue.createVNode(vue.unref(ElButton), {
              icon: vue.unref(arrow_left_default),
              circle: "",
              type: "primary",
              onClick: _cache[0] || (_cache[0] = ($event) => showDrawer.value = !showDrawer.value)
            }, null, 8, ["icon"])
          ], 512), [
            [vue.vShow, !showDrawer.value]
          ]),
          vue.createVNode(vue.unref(ElDrawer), {
            modelValue: showDrawer.value,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => showDrawer.value = $event),
            title: "书架"
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("div", _hoisted_2, [
                vue.createElementVNode("div", _hoisted_3, [
                  vue.createVNode(vue.unref(ElButton), {
                    round: "",
                    type: "primary",
                    disabled: vue.unref(books2).length === 0,
                    onClick: _cache[1] || (_cache[1] = () => vue.unref(exportBookExcel)(vue.unref(books2)))
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("导出")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  vue.createVNode(vue.unref(ElButton), {
                    round: "",
                    type: "danger",
                    disabled: vue.unref(books2).length === 0,
                    onClick: vue.unref(booksStore2).clearBook
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("清空")
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"])
                ]),
                vue.createElementVNode("div", _hoisted_4, [
                  vue.unref(books2).length > 0 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(books2), (book) => {
                      return vue.openBlock(), vue.createElementBlock("div", {
                        class: "book-list-container-book-item",
                        key: book.id
                      }, [
                        vue.createVNode(BookItem, {
                          book,
                          onSelect: selectBook
                        }, null, 8, ["book"])
                      ]);
                    }), 128))
                  ])) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_6, _hoisted_8))
                ])
              ])
            ]),
            _: 1
          }, 8, ["modelValue"]),
          vue.createVNode(_sfc_main$2, {
            book: selectedBook.value,
            show: showDetail.value,
            onClose: _cache[3] || (_cache[3] = ($event) => showDetail.value = false)
          }, null, 8, ["book", "show"])
        ], 64);
      };
    }
  });
  const BookShelf_vue_vue_type_style_index_0_scoped_0665e06d_lang = "";
  const BookShelf = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-0665e06d"]]);
  function getMetaInfo(subjectDoc) {
    const data = {
      id: "",
      doubanUrl: "",
      title: "",
      ISBN: "",
      authors: []
    };
    const jsonElement = subjectDoc.querySelector('[type="application/ld+json"]');
    if (!jsonElement || !jsonElement.textContent) {
      return data;
    }
    const obj = JSON.parse(jsonElement.textContent);
    data.doubanUrl = obj.url;
    const id = obj.url.split("/")[4];
    data.id = id;
    data.title = obj.name;
    data.ISBN = obj.isbn;
    data.authors = obj.author.map((i) => i.name);
    return data;
  }
  function getFromA(element) {
    const aElements = [];
    let current = element;
    while (current) {
      const next = current.nextElementSibling;
      if (!next || next.tagName !== "A")
        break;
      current = next;
      aElements.push(current);
    }
    return aElements.map((i) => {
      var _a2;
      return (_a2 = i.textContent) == null ? void 0 : _a2.trim();
    });
  }
  function getFromText(element) {
    var _a2, _b;
    const text = (_b = (_a2 = element.nextSibling) == null ? void 0 : _a2.textContent) == null ? void 0 : _b.trim();
    if (!text || text === ":")
      return "";
    return text;
  }
  function getFromAOrText(element) {
    const resultFromA = getFromA(element);
    if (resultFromA.length !== 0) {
      return resultFromA;
    }
    const resultFromText = getFromText(element);
    return resultFromText ? [resultFromText] : [];
  }
  function getExtraInfo(subjectDoc) {
    const data = {
      publishingHouse: "",
      subTitle: "",
      originName: "",
      publishingTime: "",
      seriesName: "",
      page: 0,
      translators: []
    };
    const plElements = subjectDoc.querySelectorAll("#info .pl");
    Array.from(plElements).forEach((element) => {
      var _a2;
      switch ((_a2 = element.textContent) == null ? void 0 : _a2.trim()) {
        case "出版社:":
          data.publishingHouse = getFromAOrText(element)[0] ?? "";
          break;
        case "副标题:":
          data.subTitle = getFromText(element);
          break;
        case "原作名:":
          data.originName = getFromText(element);
          break;
        case "译者":
          data.translators = getFromAOrText(element);
          break;
        case "出版年:":
          data.publishingTime = getFromText(element);
          break;
        case "页数:": {
          const pageStr = getFromText(element);
          data.page = pageStr ? Number.parseInt(pageStr, 10) : 0;
          break;
        }
        case "丛书:":
          data.seriesName = getFromAOrText(element)[0] ?? "";
          break;
      }
    });
    return data;
  }
  function getScoreInfo(subjectDoc) {
    var _a2, _b, _c, _d;
    const element = subjectDoc.getElementById("interest_sectl");
    const scoreStr = (_b = (_a2 = element == null ? void 0 : element.querySelector("strong")) == null ? void 0 : _a2.textContent) == null ? void 0 : _b.trim();
    const scorePeopleCountStr = (_d = (_c = element == null ? void 0 : element.querySelector(".rating_people > span")) == null ? void 0 : _c.textContent) == null ? void 0 : _d.trim();
    let scorePeopleCount = 0;
    if (scorePeopleCountStr && !scorePeopleCountStr.includes("目前无人评价")) {
      scorePeopleCount = Number.parseInt(scorePeopleCountStr, 10);
    }
    return {
      score: scoreStr ? Number.parseFloat(scoreStr) : 0,
      scorePeopleCount
    };
  }
  function getContentBrief(subjectDoc) {
    var _a2;
    const introElements = Array.from(
      subjectDoc == null ? void 0 : subjectDoc.querySelectorAll("#link-report .intro")
    );
    if (introElements.length === 0)
      return "";
    const pElements = ((_a2 = introElements[introElements.length - 1]) == null ? void 0 : _a2.getElementsByTagName("p")) ?? [];
    return Array.from(pElements).reduce((str, current, idx) => {
      var _a3;
      const text = (_a3 = current.textContent) == null ? void 0 : _a3.trim();
      if (text)
        str += idx === 0 ? text : `
${text}`;
      return str;
    }, "");
  }
  function getCoverUrl(subjectDoc) {
    var _a2;
    const imgElement = (_a2 = subjectDoc.getElementById("mainpic")) == null ? void 0 : _a2.querySelector("img");
    return (imgElement == null ? void 0 : imgElement.src) ?? "";
  }
  function getBook(subjectDoc) {
    const book = {
      ...getMetaInfo(subjectDoc),
      ...getScoreInfo(subjectDoc),
      ...getExtraInfo(subjectDoc),
      contentBrief: getContentBrief(subjectDoc),
      coverUrl: getCoverUrl(subjectDoc)
    };
    return book;
  }
  function getAlreadyReadButton(subjectDoc) {
    return subjectDoc.querySelector("#interest_sect_level > a:nth-child(3)");
  }
  function getLasButton(subjectDoc) {
    return subjectDoc.querySelector(
      "#interest_sect_level > a:nth-last-of-type(1)"
    );
  }
  const parseHeaders = (rawHeaders = "") => {
    const headers = new Headers();
    const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
    preProcessedHeaders.split("\r").map(function(header) {
      return header.startsWith(`
`) ? header.substring(1) : header;
    }).forEach(function(line) {
      var _a2;
      const parts = line.split(":");
      const key = (_a2 = parts.shift()) == null ? void 0 : _a2.trim();
      if (key) {
        const value = parts.join(":").trim();
        headers.append(key, value);
      }
    });
    return headers;
  };
  async function GM_Fetch(xhrRequest) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "GET",
        async onload(e) {
          const resp = new Response(e.response ?? e.responseText, {
            status: e.status,
            statusText: e.statusText,
            headers: parseHeaders(e.responseHeaders)
          });
          Object.defineProperty(resp, "url", { value: e.finalUrl });
          resolve(resp);
        },
        async onerror() {
          reject(new TypeError("Network request failed"));
        },
        async ontimeout() {
          reject(new TypeError("Network request failed"));
        },
        async onabort() {
          reject(new DOMException("Aborted", "AbortError"));
        },
        ...xhrRequest
      });
    });
  }
  const IDENTIFY_CLASS = "douban_shelf_button";
  function createBtn(doc, id, text, clickHandler, style) {
    const btn = doc.createElement("a");
    btn.classList.add("j", "a_show_login", "colbutt", "ll");
    btn.id = id;
    btn.href = "#";
    btn.rel = "nofollow";
    if (style) {
      Object.entries(style).map(([k, v]) => {
        btn.style[k] = v;
      });
    }
    const span = doc.createElement("span");
    span.classList.add(IDENTIFY_CLASS);
    span.textContent = text;
    span.style.fontSize = "13px";
    btn.appendChild(span);
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      clickHandler();
    });
    return btn;
  }
  const COPY_ID = "douban-book-copy";
  const ADD_SHELF_ID = "douban-book-add-shelf";
  const COPY = "复制";
  const ADD_SHELF = "加入书架";
  function createCopyBtn(doc, getBook2, id = COPY_ID, style) {
    const btn = createBtn(
      doc,
      id,
      COPY,
      async () => {
        const book = await getBook2(doc);
        if (!book)
          return;
        try {
          await copyBookWithTip(book);
          btn.dispatchEvent(new CustomEvent(COPY, { detail: true }));
        } catch (error2) {
          btn.dispatchEvent(new CustomEvent(COPY, { detail: false }));
          throw error2;
        }
      },
      style
    );
    return btn;
  }
  function createAddBtn(doc, getBook2, id = ADD_SHELF_ID, style) {
    const btn = createBtn(
      doc,
      id,
      ADD_SHELF,
      async () => {
        const book = await getBook2(doc);
        const { booksStore: booksStore2 } = useStore();
        const r = booksStore2.addBook(book);
        if (!r.success) {
          btn.dispatchEvent(new CustomEvent(ADD_SHELF, { detail: false }));
          warning(r.msg);
        } else {
          btn.dispatchEvent(new CustomEvent(ADD_SHELF, { detail: true }));
          success("加入成功");
        }
      },
      style
    );
    return btn;
  }
  async function getBookPageHtmlByUrl(url) {
    const response = await GM_Fetch({ url });
    if (response.status !== 200) {
      return null;
    }
    const text = await response.text();
    return text;
  }
  function useInitBtns$2(doc) {
    const lastButton = getLasButton(doc);
    if (!lastButton) {
      warning(`定位'读过'按钮失败`);
      return;
    }
    const span = lastButton.querySelector("span");
    if ((span == null ? void 0 : span.textContent) === ADD_SHELF) {
      return;
    }
    const input = span == null ? void 0 : span.querySelector("input");
    const alreadyReadButton = (input == null ? void 0 : input.value) === "读过" ? lastButton : getAlreadyReadButton(doc);
    if (!alreadyReadButton) {
      warning(`定位'读过'按钮失败`);
      return;
    }
    const copyBtn = createCopyBtn(doc, getBook);
    const addBtn = createAddBtn(doc, getBook);
    alreadyReadButton.after(copyBtn);
    copyBtn.after(addBtn);
    return { copyBtn, addBtn };
  }
  function init$2(doc) {
    useInitBtns$2(doc);
  }
  function getBookItemList$1(searchDoc) {
    const rootEle = searchDoc.querySelector("#wrapper #root");
    if (!rootEle)
      return [];
    return Array.from(rootEle.querySelectorAll(".item-root")).reduce(
      (list, cur) => {
        var _a2, _b, _c, _d, _e;
        const aEle = cur.querySelector("a");
        if ((_a2 = aEle == null ? void 0 : aEle.href) == null ? void 0 : _a2.startsWith("https://book.douban.com/subject/")) {
          const name = ((_c = (_b = cur.querySelector(".detail .title")) == null ? void 0 : _b.querySelector("a")) == null ? void 0 : _c.textContent) ?? "";
          const id = ((_e = (_d = aEle == null ? void 0 : aEle.href) == null ? void 0 : _d.split("https://book.douban.com/subject/")[1]) == null ? void 0 : _e.split("/")[0]) ?? "";
          list.push({
            element: cur,
            url: aEle == null ? void 0 : aEle.href,
            id,
            name
          });
        }
        return list;
      },
      []
    );
  }
  function useInitBtns$1(doc) {
    const btn = doc.getElementById(`${COPY_ID}-0`);
    if (btn) {
      return false;
    }
    const { booksStore: booksStore2 } = useStore();
    const list = getBookItemList$1(doc);
    list.forEach(({ element, url, name, id }, idx) => {
      var _a2;
      let bookCache = void 0;
      const getBook$12 = async () => {
        if (bookCache)
          return bookCache;
        const bookInStore = booksStore2.getBook(id);
        if (bookInStore) {
          bookCache = {
            ...bookInStore
          };
          delete bookCache.addTime;
          return bookCache;
        }
        const html = await getBookPageHtmlByUrl(url);
        if (!html) {
          throw new Error(`获取《${name}》页面失败`);
        }
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(html, "text/html");
        const book = getBook(htmlDoc);
        bookCache = book;
        return book;
      };
      const style = {
        marginTop: "7px"
      };
      const copyBtn = createCopyBtn(doc, getBook$12, `${COPY_ID}-${idx}`, style);
      const addBtn = createAddBtn(doc, getBook$12, `${ADD_SHELF_ID}-${idx}`, style);
      (_a2 = element.querySelector(".detail")) == null ? void 0 : _a2.appendChild(copyBtn);
      copyBtn.after(addBtn);
    });
    return true;
  }
  function init$1(doc) {
    useInitBtns$1(doc);
  }
  function getBookItemList(seriesDoc) {
    return Array.from(
      seriesDoc.querySelectorAll("#content .subject-item")
    ).reduce((list, cur) => {
      var _a2, _b, _c, _d;
      const aEle = (_a2 = cur.querySelector(".info")) == null ? void 0 : _a2.querySelector("a");
      if ((_b = aEle == null ? void 0 : aEle.href) == null ? void 0 : _b.startsWith("https://book.douban.com/subject/")) {
        const id = ((_d = (_c = aEle == null ? void 0 : aEle.href) == null ? void 0 : _c.split("https://book.douban.com/subject/")[1]) == null ? void 0 : _d.split("/")[0]) ?? "";
        list.push({
          element: cur,
          url: aEle == null ? void 0 : aEle.href,
          id,
          name: (aEle == null ? void 0 : aEle.textContent) ?? ""
        });
      }
      return list;
    }, []);
  }
  function useInitBtns(doc) {
    const btn = doc.getElementById(`${COPY_ID}-0`);
    if (btn) {
      return false;
    }
    const { booksStore: booksStore2 } = useStore();
    const list = getBookItemList(doc);
    list.forEach(({ element, url, name, id }, idx) => {
      var _a2;
      let bookCache = void 0;
      const getBook$12 = async () => {
        if (bookCache)
          return bookCache;
        const bookInStore = booksStore2.getBook(id);
        if (bookInStore) {
          bookCache = {
            ...bookInStore
          };
          delete bookCache.addTime;
          return bookCache;
        }
        const html = await getBookPageHtmlByUrl(url);
        if (!html) {
          throw new Error(`获取《${name}》页面失败`);
        }
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(html, "text/html");
        const book = getBook(htmlDoc);
        bookCache = book;
        return book;
      };
      const style = {
        marginTop: "7px"
      };
      const copyBtn = createCopyBtn(doc, getBook$12, `${COPY_ID}-${idx}`, style);
      const addBtn = createAddBtn(doc, getBook$12, `${ADD_SHELF_ID}-${idx}`, style);
      (_a2 = element.querySelector(".info")) == null ? void 0 : _a2.appendChild(copyBtn);
      copyBtn.after(addBtn);
    });
    return true;
  }
  function init(doc) {
    useInitBtns(doc);
  }
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      vue.onMounted(async () => {
        const map = {
          ["book.douban.com/subject"]: init$2,
          ["search.douban.com/book"]: init$1,
          ["book.douban.com/series"]: init
        };
        const url = new URL(document.URL);
        const initFunc = map[url.host + url.pathname.split("/").slice(0, 2).join("/")];
        if (initFunc) {
          initFunc(document);
        } else {
          console.warn(`${url} 没有对应的处理方法`);
        }
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(BookShelf);
      };
    }
  });
  async function run(doc) {
    const app = document.createElement("div");
    doc.body.appendChild(app);
    setTimeout(() => {
      vue.createApp(_sfc_main).mount(app);
    });
  }
  run(document);
})(Vue, XLSX);
