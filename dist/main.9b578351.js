// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var titleText = document.title;
var hashMap = xObject || [{
  logo: 'https://www.acfun.cn/favicon.ico',
  url: 'https://www.acfun.cn'
}, {
  logo: "https://www.bilibili.com/favicon.ico",
  url: 'https://www.bilibili.com'
}]; //简化展示的url链接

var removeUrl = function removeUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
}; //获取正确的favicon图标的地址


var faviconUrl = function faviconUrl(url) {
  return url.replace(/com\/.*/g, 'com').replace(/cn\/.*/g, 'cn').replace(/net\/.*/g, 'net').replace(/top\/.*/g, 'top').replace(/gov\/.*/g, 'gov');
}; //如果图片不能正常显示则替换掉


$noShowImg = function $noShowImg(showImg) {
  var errorImg = "./images/error.png";
  showImg.src = errorImg;
};

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n            <a href=\"".concat(node.url, "\">\n            <div class=\"sitebox\">\n            <div class=\"site\">\n           \n                <div class=\"logo\">\n                <img id=\"img\" src=\"").concat(faviconUrl(node.url), "/favicon.ico\" width=\"24\" height=\"24\" >\n                </div>\n                <div class=\"link\">").concat(removeUrl(node.url), "</div >\n                <div class=\"close\">\n                    <svg class=\"icon\" aria-hidden=\"true\">\n                        <use xlink:href=\"#icon-close-circle\"></use>\n                    </svg>\n                </div>  \n            </div >     \n            </div >\n            </a >\n        </li > ")).insertBefore($lastLi);
    $li.on('click', '.close', function (e) {
      e.preventDefault();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$('.addButton').on('click', function () {
  var url = window.prompt('请问输入您要添加的网址：');

  if (url.indexOf('http') != 0) {
    url = 'http://' + url;
  }

  console.log(url);
  hashMap.push({
    logo: url.replace('https://', '').replace('http://', '').replace('www.', '')[0],
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
}; //通过首字母获取键盘KEY触发URL
// $(document).on('keypress', (e) => {
//     const key = e.key
//     for (let i = 0; i < hashMap.length; i++) {
//         if (hashMap[i].logo.toLowerCase() === key) {
//             window.open(hashMap[i].url)
//         }
//     }
// })
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.9b578351.js.map