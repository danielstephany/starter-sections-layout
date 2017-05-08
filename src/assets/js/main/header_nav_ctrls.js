'use strict';

header_nav_ctrls();

function header_nav_ctrls(){
	var breakpoint = 768;
	var slidetime = 400;
	var windowWidth = $(window).width();

	headerHoverEvent();
	headerClickEvent();
	navToggle();
	
	// headerHoverEvent handles the lodgic for the main navs hover states 
	function headerHoverEvent(){
		var toggle;
		var childList;
		$(".header-main-nav__item").hover(function(){
			if(windowWidth > breakpoint){
				toggle = $(this).children(".subnav-toggle");
				childList = toggle.siblings("ul");
				childList.stop().slideDown(slidetime);
			}
		}, function(){
			if(windowWidth > breakpoint){
				childList.stop().slideUp(slidetime);
				toggle.parents().removeClass('active');
			}
		});
	}

	// headerClickEvents handles the Click events for every level of menu (main-nav, subnav1, subnav2) if you add deaper navs rethink your UX.
	function headerClickEvent(){
		var toggle;
		var listItem;
		var container;
		var childList;
		$(".subnav-toggle").on("click", function(){
			toggle = $(this);
			listItem = toggle.parent("li");
			container = listItem.parent('ul');
			childList = toggle.siblings("ul");

			if (!listItem.hasClass("active")){
				if(!container.hasClass("header-main-nav")){
					container.css({"height": "auto"}); // allows the container to expand with its children.
				}
				//mobile nav event
				if(windowWidth <= breakpoint){ 
					//closes all open sumnav1 and subnav2
					if(container.hasClass("header-main-nav")){
						$(".header-main-nav .active").children("ul").stop().slideUp(slidetime);
						$(".header-main-nav .active").removeClass("active");
					//closes only the subnav2 contained within the same nav	
					} else {
						toggle.parent("li").siblings(".active").children('ul').stop().slideUp(slidetime);
						toggle.parent("li").siblings(".active").removeClass("active");
					}
				}
				//opens selected nav
				childList.stop().slideDown(slidetime);
				container.children('.active').removeClass("active");
				listItem.addClass("active");
			//closes selected nav
			} else {
				childList.stop().slideUp(slidetime);
				listItem.removeClass("active");
			}
		});
	}

	//navToggle handles the opening and closing of the nav drawer on mobile sizes.
	function navToggle(){
		var $body = $("body");
		var $header = $(".header");
		var $overlay = "<div class='nav-overlay'></div>";
		$(".nav-toggle").on("click", function(){
			toggleCtrl();
		});
		$(".nav-close-toggle").on("click", function(){
			toggleCtrl();
		});
		$(".header-nav-container").on("swipe right", function(){
			toggleCtrl();
		});
		$(document).on('click','.nav-overlay', function(){
			toggleCtrl();
		});
		function toggleCtrl(){
			if(!$body.hasClass("nav-active")){
				$header.append($overlay);
				setTimeout(function(){
					$body.addClass("nav-active");
				},20);
			} else {
				$body.removeClass("nav-active");
				// closing all navs
				$(".header-main-nav .active").children("ul").stop().slideUp(slidetime);
				$(".header-main-nav .active").removeClass("active");
				setTimeout(function(){
					$(".nav-overlay").remove();
				},300);
			}
		}
	}

	// sets the var used for activating or de-activating hover events, this also resets the nav drawer and all navs to closed states on resize.
	$(window).on("resize", function(){
		windowWidth = $(window).width();
		// closing all navs
		$(".header-main-nav .active").children("ul").stop().slideUp(slidetime);
		$(".header-main-nav .active").removeClass("active");
		$(".nav-overlay").remove();
		// closing nav mobile drawer
		$("body").removeClass("nav-active");
	});
}




