// Only load the dynamic import polyfill if we need it
function __loadDynamicImportCheck(src) {
  window.polyfillDynamicImport = false;
  try {
    new Function('import("./' + src + '")')();
  } catch (e) {
    var s = document.createElement('script');
    s.src = '/src/polyfill-dynamicimport.js';
    s.dataset.main = src;
    document.head.appendChild(s);
    window.polyfillDynamicImport = true;

    s.onload = () => {
      __import(src);
    }
  }
}
__loadDynamicImportCheck('cr-uni-pwa.js');

// shim dynamic import() to workaround Firefox throwing parse error for
// dynamic import() in FF65
function __import(src) {
  if (window.polyfillDynamicImport) {
    return importModule(`./src/${src}`);
  } else {
    return new Function('return import("./' + src + '")')();
  }
}
