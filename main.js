var dragElem = document.querySelector('#parent div'),
    dragElemWidth = parseInt(dragElem.clientWidth),
    dragElemHeight = parseInt(dragElem.clientHeight);

var parentElem = document.querySelector('#parent'),
    parentElemWidth = parseInt(parentElem.clientWidth),
    parentElemHeight = parseInt(parentElem.clientHeight);

var posx = parseInt(window.getComputedStyle(dragElem).left),
    posy = parseInt(window.getComputedStyle(dragElem).top);

var initLeft = posx,
    initTop = posy;

dragElem.addEventListener('mousedown', function mdown(estart) {

  estart.preventDefault();

  var startx = estart.pageX - posx;
  var starty = estart.pageY - posy;

  function mmove(emove) {

    posx = getLimit(emove.pageX - startx, dragElemWidth, parentElemWidth);
    posy = getLimit(emove.pageY - starty, dragElemHeight, parentElemHeight);

    if (transSupport) {
      dragElem.style.transform = 'translateZ(0) translate3d(' + (posx - initLeft) + 'px, ' + (posy - initTop) + 'px, 0px)';
    } else {
      dragElem.style.left = posx + 'px';
      dragElem.style.top = posy + 'px';
    }  
  }

  window.addEventListener('mousemove', mmove);

  window.addEventListener('mouseup', function mup (eup) {
    window.removeEventListener('mouseup', mup);
    window.removeEventListener('mousemove', mmove)
  });

});


function getLimit(pos, elemBounds, parentBounds) {

  if (pos < 0) return 0
  else if (pos + elemBounds > parentBounds) return parentBounds - elemBounds;
  else return pos

}

var transSupport = (function supportsTransitions() {
  var b = document.body || document.documentElement,
      s = b.style,
      p = 'transition';

  if (typeof s[p] == 'string') { return true; }

  // Tests for vendor specific prop
  var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
  p = p.charAt(0).toUpperCase() + p.substr(1);

  for (var i=0; i<v.length; i++) {
      if (typeof s[v[i] + p] == 'string') { return true; }
  }

  return false;
})();
