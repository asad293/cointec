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

    if($('body').sectionScroll.activeSection[0] != undefined) {
      var section_title = $('body').sectionScroll.activeSection[0].id;
      if(section_title == "scrollto-section-1" || section_title == "scrollto-section-7")
        $('.section-bullets').fadeOut(300, "linear");
      else{
        $('.section-bullets').css("display", "table-cell");
        $('.section-bullets').fadeIn(300, "linear");
      }

      switch (section_title) {
        case "scrollto-section-1":
          $('#home-btn').addClass('active');
          $('#features-btn').removeClass('active');
          $('#contact-btn').removeClass('active');
          break;
        // case "scrollto-section-7":
        //   $('#home-btn').removeClass('active');
        //   $('#features-btn').removeClass('active');
        //   $('#contact-btn').addClass('active');
        //   break;
        default:
          $('#home-btn').removeClass('active');
          $('#features-btn').addClass('active');
          $('#contact-btn').removeClass('active');
      }
    }
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
    $('#access-ovrly').fadeOut(300, "linear");
    $('#sign-up-ovrly').fadeIn(300, "linear");
  });

  $('#input-early-access-btn').click(function(){
    $('#sign-up-ovrly').fadeIn(300, "linear");
  });

  $('#bottom-input-early-access-btn').click(function(){
    $('#sign-up-ovrly').fadeIn(300, "linear");
  });

  $('#top-early-access').click(function(){
    $('#access-ovrly').fadeIn(300, "linear");
  });

  // $('#contact-btn').click(function(){
  //     $('body').scrollTo('#scrollto-section-7', 500);
  // });

});

})(jQuery)
