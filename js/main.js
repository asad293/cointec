(function ($) {

    $(document).ready(function () {

        //////////jQuery Fullpage plugin Settings//////////

        $(document).ready(function () {
            $('#fullpage').fullpage({
                navigation: true,
                anchors: [
                    'section-1',
                    'section-2',
                    'section-3',
                    'section-4',
                    'section-5',
                    'section-6',
                    'section-7',
                    'section-8'
                ],
                recordHistory: false
            });
        });

        //////////jQuery Fullpage plugin Settings End//////////

        //////////Animations Code//////////

        //control navigation colors
        var menuTl = new TimelineMax({paused:true});

        var controller = new ScrollMagic.Controller();

        var startScroll = new ScrollMagic.Scene({
            triggerElement: "#scrollto-section-7",
            triggerHook: "onEnter",
            reverse:true
        });

        startScroll.on("enter", function(){
            $('#top-menu').removeClass('inverted');
            $('#top-logo').attr('src', "img/bottom_logo.svg");
            $('#white-top').delay(20).fadeIn(90);
        });

        startScroll.on("leave", function(){
            $('#top-menu').addClass('inverted');
            $('#top-logo').attr('src', "img/top_logo.svg");
            $('#white-top').fadeOut(90);
        });

        startScroll.addTo(controller);

        ///////////////////////Line Animation Section 1
        var blueFill = document.getElementById("blue-fill"),
            redFill = document.getElementById("red-fill"),
            greenFill = document.getElementById("green-fill"),
            orangeFill = document.getElementById("orange-fill");

        var anim1tl = new TimelineMax({repeat:-1,paused:true});
        anim1tl.set([blueFill,redFill,greenFill,orangeFill],{attr:{x1:17428.4883,x2:19918.5117}});
        anim1tl.to(orangeFill,1.5,{attr:{x1:22428.4883}},0)
            .to(orangeFill,1.5,{attr:{x2:24918.5117}},0)
            .to(orangeFill,5,{})
            .to(greenFill,1.5,{attr:{x1:22428.4883}},6.5)
            .to(greenFill,1.5,{attr:{x2:24918.5117}},6.5)
            .to(greenFill,5,{})
            .to(redFill,1.5,{attr:{x1:22428.4883}},13)
            .to(redFill,1.5,{attr:{x2:24918.5117}},13)
            .to(redFill,5,{})
            .to(blueFill,1.5,{attr:{x1:22428.4883}},19.5)
            .to(blueFill,1.5,{attr:{x2:24918.5117}},19.5)
            .to(blueFill,5,{});

        var graph1 = document.querySelector("#graph1"),
            graph2 = document.querySelector("#graph2"),
            graph3 = document.querySelector("#graph3"),
            point1 = document.querySelector("#point1"),
            firstCircle = document.querySelector("#first-circle"),
            point2 = document.querySelector("#point2"),
            line1 = document.querySelector("#XMLID_63_"),
            line2 = document.querySelector("#XMLID_64_"),
            green1 = document.querySelector("#XMLID_69_"),
            green2 = document.querySelector("#XMLID_66_"),
            text = document.querySelector("#text");

        var startStopAnim1 = new ScrollMagic.Scene({
            triggerElement: "#scrollto-section-1",
            duration:"100%"
        });

        startStopAnim1.on("enter", function(){
            anim1tl.play();
        });

        startStopAnim1.on("leave", function(){
            anim1tl.restart();
            anim1tl.pause(0);
        });

        startStopAnim1.addTo(controller);

        ///////////////////////Graph Animation Section 2
        var anim2tl = new TimelineMax({repeat:-1});
        anim2tl.to(graph1,24,{x:-1500,ease:Linear.easeNone});

        var anim2tl2 = new TimelineMax({repeat:-1,delay:12});
        anim2tl2.to(graph2,24,{x:-1500,ease:Linear.easeNone});

        var anim2tl6 = new TimelineMax({});
        anim2tl6.to(graph3,24,{x:-1500,ease:Linear.easeNone});

        var anim2tl3 = new TimelineMax({repeat:-1,delay:3.7,repeatDelay:8.5});
        anim2tl3.set([point1,firstCircle],{opacity:0})
            .set(line1,{transformOrigin:"bottom center",scaleY:0})
            .set(green1,{drawSVG:"0%"})
            .to(point1,0.25,{opacity:1})
            .to(point1,0.25,{opacity:0})
            .to(firstCircle,0.25,{opacity:1},0.25)
            .to(firstCircle,0.25,{opacity:0},0.5)
            .fromTo(green1,3,{drawSVG:"100% 100%",ease:Linear.easeNone}, {drawSVG:"0% 100%",ease:Linear.easeNone},0)
            .to(green1,0.25,{opacity:0})
            .to(green1,0.25,{drawSVG:"0"})
            .to(line1,0.25,{scaleY:1},0);

        var anim2tl4 = new TimelineMax({repeat:-1,delay:6.6,repeatDelay:11.5});
        anim2tl4.set(point2,{opacity:0})
            .set(line2,{transformOrigin:"top center",scaleY:0})
            .to(point2,0.25,{opacity:1})
            .to(point2,0.25,{opacity:0})
            .to(line2,0.25,{scaleY:1},0);

        var anim2tl7 = new TimelineMax({repeat:-1,delay:3.7,repeatDelay:8.5});
        anim2tl7.set(green2,{drawSVG:"0%"})
            .fromTo(green2,3,{drawSVG:"100% 100%",ease:Linear.easeNone}, {drawSVG:"0% 100%",ease:Linear.easeNone},0)
            .to(green2,0.25,{opacity:0})
            .to(green2,0.25,{drawSVG:"0"});

        var anim2tl5 = new TimelineMax({repeat:-1,delay:9.8,repeatDelay:15});
        anim2tl5.set(text,{opacity:0})
            .to(text,0.15,{opacity:1})
            .to(text,2.85,{opacity:0,y:-65,onComplete:changeValue});
        anim2tl5.timeScale(1.5);

        function changeValue () {
            var val = Math.floor(Math.random()*(500-50+1)+50);
            var textNode = document.getElementById("XMLID_67_");
            textNode.textContent = "£"+val;
        }

        //Coin Animation Section 4
        var group1 = document.querySelector("#group1"),
            group2 = document.querySelector("#group2"),
            group3 = document.querySelector("#group3"),
            coinSVG = document.querySelector("#coin-svg");

        var anim3main = new TimelineMax({paused:true,onComplete:coinHover});
        anim3main.set(coinSVG,{transformOrigin:"center center",scale:0})
            .to(coinSVG,0.1,{opacity:1})
            .to(coinSVG,2,{scale:1});

        var anim3tl = new TimelineMax({repeat:-1,paused:true});
        anim3tl.to(group1,2,{y:-10,ease:Power1.easeInOut})
            .to(group1,2,{y:0,ease:Power1.easeInOut});
        anim3tl.timeScale(0.3);

        var anim3tl2 = new TimelineMax({repeat:-1,delay:1,paused:true});
        anim3tl2.to(group2,2,{y:10,ease:Power1.easeInOut})
            .to(group2,2,{y:0,ease:Power1.easeInOut});
        anim3tl2.timeScale(0.3);

        var anim3tl3 = new TimelineMax({repeat:-1,delay:1,paused:true});
        anim3tl3.to(group3,2,{y:-10,ease:Power1.easeInOut})
            .to(group3,2,{y:0,ease:Power1.easeInOut});
        anim3tl3.timeScale(0.3);

        function coinHover () {

            anim3tl.play();
            anim3tl2.play();
            anim3tl3.play();

        }

        var startStopAnim4 = new ScrollMagic.Scene({
            triggerElement: "#scrollto-section-4",
            duration:"100%"
        });

        startStopAnim4.addTo(controller);

        startStopAnim4.on("enter", function(event){
            anim3main.restart();
            anim3main.play();
        });

        startStopAnim4.on("leave", function(event){
            anim3main.pause(0);
        });

        //Castle Animation Section 6
        var cloud1 = document.querySelector("#cloud-1"),
            cloud2 = document.querySelector("#cloud-2"),
            cloud3 = document.querySelector("#cloud-3"),
            flag1 = document.querySelector("#flag-1"),
            flag2 = document.querySelector("#flag-2"),
            flag4 = document.querySelector("#flag-4");

        var anim4tl = new TimelineMax({repeat:-1});
        anim4tl.set([cloud1,cloud2,cloud3],{transformOrigin:"center center"})
            .set(cloud1,{x:500})
            .set(cloud2,{x:450})
            .set(cloud3,{x:200})
            .to([cloud1,cloud2,cloud3],20,{x:-500,ease:Linear.easeNone});

        var anim4tl2 = new TimelineMax({repeat:-1});
        anim4tl2.to(flag1,1.5,{morphSVG:flag4,ease:Linear.easeNone})
            .to(flag1,1.5,{morphSVG:flag2,ease:Linear.easeNone})
            .to(flag1,1.5,{morphSVG:flag1,ease:Linear.easeNone});

        var startStopAnim6 = new ScrollMagic.Scene({
            triggerElement: "#scrollto-section-6",
            duration:"100%"
        });

        startStopAnim6.addTo(controller);

        startStopAnim6.on("enter", function(event){
            anim4tl.restart();
            anim4tl2.restart();
            anim4tl.play();
            anim4tl2.play();
        });

        startStopAnim6.on("leave", function(event){
            anim4tl.pause(0);
            anim4tl2.pause(0);
        });

        //////////Animations Code End//////////

        $(window).resize(function () {

            $('.bullets-container').css('margin-right', $('#scrollto-section-1').css('margin-right'));

            if ($(window).width() < 769) {
                $('#input-early-access').attr('placeholder', 'Enter your email');
                $('#bottom-input-early-access').attr('placeholder', 'Enter your email');
            }
        });

        if ($(window).width() < 769) {
            $('#input-early-access').attr('placeholder', 'Enter your email');
            $('#bottom-input-early-access').attr('placeholder', 'Enter your email');
        }

        $('body').on('section-reached', function () {

            $('.bullets-container').css('margin-right', $('#scrollto-section-1').css('margin-right'));

            if ($('body').sectionScroll.activeSection[0] != undefined) {
                var section_title = $('body').sectionScroll.activeSection[0].id;
                if (section_title == "scrollto-section-1" || section_title == "scrollto-section-7") {
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

        $('.close_pop1').click(function () {
            $('#sign-up-ovrly').fadeOut(300, "linear");
        });

        $('#close_pop2').click(function () {
            $('#access-ovrly').fadeOut(300, "linear");
        });

        $('#popup-input-early-access-btn').click(function () {
            if (isEmail($('#popup-input-early-access').val())) {
                //call
                $('#popup-input-early-access').val('');
                $('#popup-input-early-access').removeClass('input-error');
                $('#access-ovrly').fadeOut(300, "linear");
                $('#sign-up-ovrly').fadeIn(300, "linear");
            } else {
                $('#popup-input-early-access').addClass('input-error');
            }
        });

        // $('.bottom-logo').click(function () {
        //     $("html, body").animate({scrollTop: 0}, "slow");
        // });

        $('#input-early-access-btn').click(function () {
            if (isEmail($('#input-early-access').val())) {
                //call
                addMailingListSubscription($('#input-early-access').val());
                $('#input-early-access').val('');
                $('#input-early-access').removeClass('input-error');
                $('#input-early-access-btn').removeClass('input-button-error');
                $('#sign-up-ovrly').fadeIn(300, "linear");
            } else {
                $('#input-early-access').addClass('input-error');
                $('#input-early-access-btn').addClass('input-button-error');
            }
        });

        $('#bottom-input-early-access-btn').click(function () {
            if (isEmail($('#bottom-input-early-access').val())) {
                //call
                addMailingListSubscription($('#bottom-input-early-access').val());
                $('#bottom-input-early-access').val('');
                $('#bottom-input-early-access').removeClass('input-error');
                $('#sign-up-ovrly').fadeIn(300, "linear");
            } else {
                $('#bottom-input-early-access').addClass('input-error');
            }
        });

        $('#top-early-access').click(function () {
            $('#access-ovrly').fadeIn(300, "linear");
        });

        function isEmail(email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        }

        function addMailingListSubscription(emailAddress) {

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("Successfully Added to Mailing List");
                }
            };

            var obj = {
                "email": emailAddress
            }

            var jsonString = JSON.stringify(obj);

            xmlhttp.open("POST", "http://ct-emails.azurewebsites.net/add", true);
            xmlhttp.setRequestHeader("Content-Type", "application/json");
            console.log(jsonString);
            xmlhttp.send(jsonString);
        }

        $('#contact-btn').click(function () {
            $('body').scrollTo('#scrollto-section-7', 500);
        });

    });

})(jQuery);
