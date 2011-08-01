$(document).ready(function () {
  var $buttonBar = $('.button_bar');
  var $aboveButtonBar = $('<div class="above_button_bar"></div>');
  var originalWidth = $buttonBar.width();
  // FIXME I know that originalOffset is supposed to use position, but should
  // originalLeft?
  var originalLeft = $buttonBar.position().left;
  var originalOffset = $buttonBar.position().top;

  // the width and left will change on you when you scroll unless you specify
  // them back on in the style attribute. I can't actually reproduce that the
  // the left changes (the width definitely does), but It's What Gmail
  // Does so I've left it in. :(
  var scrolledStyle = 'position:fixed!important; top:0px; width: '+originalWidth.toString(10) +'px; '+originalLeft.toString(10)+'px;';

  $(window).scroll(function(){
    var offsetTop = $buttonBar.offset().top;
    // Get distance from the top of window through which we have scrolled
    var s = parseInt($(window).scrollTop(), 10);

    if(s > offsetTop){
      // Somehow, inserting an item of the same height makes this work.
      // I don't understand why. Others do not do this, and are forced to use
      // position:absolute; and top in the defintion of .button_bar. By doing
      // this, we do not require it.
      $aboveButtonBar.insertBefore($buttonBar)
      // For reasons unknown to me, this must be a style setting, not an
      // addClass. Adding a class with the same CSS simply doesn't work.
      $buttonBar.attr('style', scrolledStyle)
    }
    if(s < parseInt(originalOffset, 10)){
      $aboveButtonBar.remove()
      $buttonBar.attr('style', '');
    }
  });
});
