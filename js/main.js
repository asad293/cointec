(function($){

var jump=function(e)
{
   if (e){
       e.preventDefault();
       var target = $(this).attr("href");
   }else{
       var target = location.hash;
   }

   $('html,body').animate(
   {
       scrollTop: $(target).offset().top
   },1000,function()
   {
       location.hash = target;
   });

   // window.history.replaceState({}, document.title, "index.html");

}

$('html, body').hide()

$(document).ready(function () {

  // $('a[href^=#]').bind("click", jump);

  if (location.hash){
      setTimeout(function(){
          $('html, body').scrollTop(0).show()
          jump()

      }, 0);
  }else{
    $('html, body').show()
  }

  $(window).resize(function(){

    $('.bullets-container').css('margin-right', $('#scrollto-section-1').css('margin-right'));

    if($(window).width() < 769){
      $('#input-early-access').attr('placeholder', 'Enter your email');
      $('#bottom-input-early-access').attr('placeholder', 'Enter your email');
    }
  });

  if($(window).width() < 769){
    $('#input-early-access').attr('placeholder', 'Enter your email');
    $('#bottom-input-early-access').attr('placeholder', 'Enter your email');
  }

  $('body').sectionScroll();

  $('body').on('section-reached', function(){

    $('.bullets-container').css('margin-right', $('#scrollto-section-1').css('margin-right'));

    if($('body').sectionScroll.activeSection[0] != undefined) {
      var section_title = $('body').sectionScroll.activeSection[0].id;
      if(section_title == "scrollto-section-1" || section_title == "scrollto-section-7"){
        $('.section-bullets').fadeOut(300, "linear");
        $('.bullets-container').css("pointer-events", "none");
      }
      else {
        $('.bullets-container').css("pointer-events", "auto");
        $('.section-bullets').css("display", "table-cell");
        $('.section-bullets').fadeIn(300, "linear");
      }

      switch (section_title) {
        case "scrollto-section-1":
          $('#home-btn').addClass('active');
          $('#features-btn').removeClass('active');
          $('#contact-btn').removeClass('active');
          // $('#white-top').fadeOut(300, "linear");
          break;
        case "scrollto-section-7":
          // $('#top-menu').animate({backgroundColor: '#FF0000'}, 'slow');
          // $('#white-top').fadeIn(300, "linear");
          // $('#home-btn').removeClass('active');
          // $('#features-btn').removeClass('active');
          // $('#contact-btn').addClass('active');
          break;
        default:
          // $('#white-top').fadeOut(300, "linear");
          $('#home-btn').removeClass('active');
          $('#features-btn').addClass('active');
          $('#contact-btn').removeClass('active');
      }
    }
  });

  $('#footer').appear();

  $('#footer').on('appear', function(event, $all_appeared_elements) {
    $('#top-menu').removeClass('inverted');
    $('#top-logo').attr('src', "img/bottom_logo.svg");
    $('#white-top').delay(20).fadeIn(90);
  });

  $('#footer').on('disappear', function(event, $all_disappeared_elements) {
    $('#top-menu').addClass('inverted');
    $('#top-logo').attr('src', "img/top_logo.svg");
    $('#white-top').fadeOut(90);
  });

  $('#home-btn').click(function(){
    $('body').scrollTo('#scrollto-section-1', 500);
  });

  $('#features-btn').click(function(){
    $('body').scrollTo('#scrollto-section-2', 500);
  });

  $('#close_pop1').click(function(){
    $('#sign-up-ovrly').fadeOut(300, "linear");
  });

  $('#close_pop2').click(function(){
    $('#access-ovrly').fadeOut(300, "linear");
  });

  $('#popup-input-early-access-btn').click(function(){
    if(isEmail($('#popup-input-early-access').val())){
      //call
      $('#popup-input-early-access').val('');
      $('#popup-input-early-access').removeClass('input-error');
      $('#access-ovrly').fadeOut(300, "linear");
      $('#sign-up-ovrly').fadeIn(300, "linear");
    } else {
      $('#popup-input-early-access').addClass('input-error');
    }
  });

  $('#input-early-access-btn').click(function(){
    if(isEmail($('#input-early-access').val())){
      //call
      $('#input-early-access').val('');
      $('#input-early-access').removeClass('input-error');
      $('#input-early-access-btn').removeClass('input-button-error');
      $('#sign-up-ovrly').fadeIn(300, "linear");
    } else {
      $('#input-early-access').addClass('input-error');
      $('#input-early-access-btn').addClass('input-button-error');
    }
  });

  $('#bottom-input-early-access-btn').click(function(){
    if(isEmail($('#bottom-input-early-access').val())){
      //call
      $('#bottom-input-early-access').val('');
      $('#bottom-input-early-access').removeClass('input-error');
      $('#sign-up-ovrly').fadeIn(300, "linear");
    } else {
      $('#bottom-input-early-access').addClass('input-error');
    }
  });

  $('#top-early-access').click(function(){
    $('#access-ovrly').fadeIn(300, "linear");
  });

  function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  }

  // $('#contact-btn').click(function(){
  //     $('body').scrollTo('#scrollto-section-7', 500);
  // });

});

})(jQuery)
