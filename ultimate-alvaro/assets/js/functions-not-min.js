(function($,name){$[name+"Defaults"]={framerate:1000/60,group:/.{0,2}/g};$.fn[name]=function(options,callback){if(typeof options!='object')callback=options,options={};return this.each(function(){var el=$(this),conf=$.extend({},$[name+"Defaults"],options);el.queue("fx",function(next){animateNode(this,conf,typeof callback=='function'?function(){callback.call(el[0]);next();}:next);el.show();});});};function chunk(text,conf){return text.match(conf.group);}
function timeout(callback,conf){setTimeout(callback,conf.framerate);}
function animateNode(element,conf,callback){var pieces=[];if(element.nodeType==1&&element.hasChildNodes()){while(element.hasChildNodes())
pieces.push(element.removeChild(element.firstChild));timeout(function childStep(){if(pieces.length){var piece=pieces.shift();animateNode(piece,conf,childStep);element.appendChild(piece);}else
callback();},conf);}else if(element.nodeType==3){pieces=chunk(element.data,conf);element.data="";(function addText(){element.data+=pieces.shift();timeout(pieces.length?addText:callback,conf);})();}else
timeout(callback,conf);}})(jQuery,"typewriter");


// remap jQuery to $
(function($){
	
function blockHeight (){
	var windowHeight = $(window).height();
	$(".block").css("min-height",windowHeight);
}
function moveBackground () {
	$('.parallax').each(function(){
		var $bgobj = $(this); 
		var $window = $(window);
		$(window).scroll(function() {
			var yPos = -( ($window.scrollTop() - $bgobj.offset().top) / -2);
			var coords = '50% '+ yPos + 'px';
			$bgobj.css({ backgroundPosition: coords });
		});
	});
}
function moveText () {
		var $bgobj = $('.home-head'); 
		var $window = $(window);
		var pad = $window.height()/2;
		var yPos = ( ($window.scrollTop() - $('#home').offset().top) /2 -60);
		$('.home-head').css({ paddingTop: pad, top: yPos });
		$window.scroll(function() {
			yPos = ( ($window.scrollTop() - $('#home').offset().top) /2 -60);
			var coords = yPos + 'px';
			$('.home-head').css({ top: coords });
		});
}
function scrollToAnchor(id){
    var divId = $("#" + id);
    $('html,body').animate({scrollTop: divId.offset().top},'300');
}

$(document).ready( function() {
	moveBackground ();
	moveText ();
	blockHeight ();
	// Nav scroll 
	var sections = [];
	$('.eb-nav a').each(function(){    
		var section = $(this.hash).offset()
		sections.push({
			'link':$(this).parent(),
			'top' : $(this.hash).offset().top,
			'bottom' : $(this.hash).offset().top + $(this.hash).outerHeight()
		});
	});

	$('.eb-nav a').click(function(e) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop: $(this.hash).offset().top
		}, 500);
	});

	var winWidth = $(window).width();
	var winHight = $(window).height();
	var pHeight = $("#demos .wrapper").innerHeight();
	if ( winHight > pHeight ) {
		$("#demos .wrapper").css("padding-top", (winHight - pHeight) /2);
	};
	var pHeight2 = $("#buy .wrapper").innerHeight();
	if ( winHight > pHeight2 ) {
		$("#buy .wrapper").css("padding-top", (winHight - pHeight2) /2);
	};
    
	$(window).scroll(function(){   
		for(var i = 0; i < sections.length; i++)
			if($(window).scrollTop() >= sections[i].top &&
			   $(window).scrollTop() <= sections[i].bottom){
				sections[i].link.addClass('selected')
					.siblings().removeClass('selected');
			}
	});
		
	$(document).keyup(function(event) {
		var navSelected = $(".eb-nav li.selected a");
		if (event.keyCode == 38 || event.keyCode == 37) { 
			var prevSection = navSelected.parent("li").prev("li");
			if ($(prevSection).length > 0) { 
				var prevLink = prevSection.children("a").attr("href");
				$('html,body').animate({
					scrollTop: $(prevLink).offset().top
				}, 500);
			};
		};
		if (event.keyCode == 39 || event.keyCode == 40) { 
			var nextSection = navSelected.parent("li").next("li");
			if ($(nextSection).length > 0) { 
				var nextLink = nextSection.children("a").attr("href");
				$('html,body').animate({
					scrollTop: $(nextLink).offset().top
				}, 500);
			};
		} ;
	});
		
	var stickyNavTop = $('header').offset().top; 
	var stickyNav = function(){  
	var scrollTop = $(window).scrollTop();  
	if (scrollTop > stickyNavTop) {   
		$('header').addClass('sticky');  
	} else {  
		$('header').removeClass('sticky');   
	} 
	};
  // scroll body to 0px on click
	$(".top").click(function (event) {
		event.preventDefault();
		$('body,html').animate({ scrollTop: 0 }, 800);
	});
	
	$(".icon").addClass("off");
	
	stickyNav();  
  
	$(window).scroll(function() {  
		stickyNav();  
		
		// Show and hide to top icon	
		var y 			= $(window).scrollTop();
		var h 			= $(window).height();
		var h2 			= h/2 + h/3;
		var eleTop 		= $('.top');
		if (y > 700)	{ eleTop.fadeIn(1000); } 
		else 			{ eleTop.fadeOut(400); };
		
		// Show and hide to course images
		$(".icon").each(function(){
			var eleIcon 	= $(this);
			var hIcon 	= eleIcon.offset().top;
			if (y > (hIcon - h2)){  eleIcon.removeClass("officon"); } 
			else 		{ eleIcon.addClass("officon"); };
		});
		
		// Show and hide to course images
		$(".img").each(function(){
			var eleImg 	= $(this);
			var hImg 	= eleImg.offset().top;
			if (y > (hImg - h2)){  eleImg.removeClass("offimg"); } 
			else 		{ eleImg.addClass("offimg"); };
		});
		/*
		var eleHead 	= $(".home-head");
		var hHead 		= eleHead.offset().top;
		if (y > hHead)	{ eleHead.addClass("off"); } 
		else 			{ eleHead.removeClass("off"); };
		*/	
	});  
	
	$("#skype").on("click", function(e) {
		event.preventDefault();
	   $(this).text("skype-name: elationbase").addClass("clicked");
	});
	
	$("#paypal").on("click", function(e) {
		event.preventDefault();
	   $(this).text("email: elationbase@gmail.com").addClass("clicked");
	});
	
	$(".toContact").on("click", function(e) {
		event.preventDefault();
	   scrollToAnchor("contactForm");
	});
	
	
    $("#submit_btn").click(function() { 
        //get input field values
        var user_name       = $('input[name=name]').val(); 
        var user_email      = $('input[name=email]').val();
        var user_message    = $('textarea[name=message]').val();
        
        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if(user_name==""){ 
            $('input[name=name]').css('border-color','red'); 
            proceed = false;
        }
        if(user_email==""){ 
            $('input[name=email]').css('border-color','red'); 
            proceed = false;
        }
        if(user_message=="") {  
            $('textarea[name=message]').css('border-color','red'); 
            proceed = false;
        }

        //everything looks good! proceed...
        if(proceed) 
        {
            //data to be sent to server
            post_data = {'userName':user_name, 'userEmail':user_email, 'userMessage':user_message};
            
            //Ajax post data to server
            $.post('contact_me.php', post_data, function(response){  

                //load json data from server and output message     
				if(response.type == 'error')
				{
					output = '<div class="error">'+response.text+'</div>';
				}else{
				    output = '<div class="success">'+response.text+'</div>';
					
					//reset values in all input fields
					$('#contact_form input').val(''); 
					$('#contact_form textarea').val(''); 
				}
				
				$("#result").hide().html(output).slideDown();
            }, 'json');
			
        }
    });
    
    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form input, #contact_form textarea").keyup(function() { 
        $("#contact_form input, #contact_form textarea").css('border-color',''); 
        $("#result").slideUp();
    });
	
	//$("#changelog-box .eb-modal-data").load("/elation-advance-touch/assets/docs/changelog.txt"); 
	
	
	// EB MODAL 
	$(".eb-modal").on("click", this, function (event){
		event.preventDefault();
		var target = $(this).attr("href"); console.log(target);
		var title = $(this).attr("title"); console.log(title);
		$(target + " .eb-modal-title span").empty().append(title);
		$(".eb-modal-fade").fadeIn(400);
		$(target).fadeIn(400);
		$("body").addClass("ebmodal-on");
		var titleH = $(target + " .eb-modal-title").innerHeight();
		$(target + " .eb-modal-data").css("padding-bottom", titleH + 40);
	});
	$(".eb-modal-title .icon, .eb-modal-fade").on("click", this, function (event){
		event.preventDefault();
		$(".eb-modal-fade").fadeOut(400);
		$(".eb-modal-box").fadeOut(400);
		$("body").removeClass("ebmodal-on");
	});
	
	$(document).keyup(function(event) {
		if ( $("body").hasClass("ebmodal-on") ) {
			if (event.keyCode == 27) { 
				$(".eb-modal-fade").fadeOut(400);
				$(".eb-modal-box").fadeOut(400);
				$("body").removeClass("ebmodal-on");
			} 
		}
	});
	
});  
	

	
	$(window).load(function() {
		$(".home-head hgroup").typewriter({framerate: 120});
	});
	
	$(window).resize(function() {
		 blockHeight ();
	});
	
	

})(window.jQuery);