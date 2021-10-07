(function($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    $(".sidebar").toggleClass("shake");
    $(".sidebar").toggleClass("animated");

    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() < 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

  const navicon = $("a.navbar-brand").hasClass("prevent")
  if(navicon == false){
    $("a.navbar-brand").attr("href","../../index.html")
    
      //kc
  const likc = document.createElement("li")
  likc.classList.add("nav-item")
  likc.setAttribute("role","presentation")

  const kca = document.createElement("a")
  kca.classList.add("nav-link")
  kca.classList.add("active")
  kca.href = "../../komikcast/index.html"
  likc.appendChild(kca)

  const kcimg = document.createElement("img")
  kcimg.src="../assets/img/kc.png"
  kcimg.style.width = "64px"
  kca.appendChild(kcimg)

  
  const kcspan = document.createElement("span")
  kcspan.innerText = "KomikCast"
  kca.appendChild(kcspan)

  //kc end

  //md start
 
  const limd = document.createElement("li")
  limd.classList.add("nav-item")
  limd.setAttribute("role","presentation")

  const mda = document.createElement("a")
  mda.classList.add("nav-link")
  mda.href = "../../Mangadex/index.html"
  limd.appendChild(mda)

  const mdimg = document.createElement("img")
  mdimg.src="../assets/img/MD.png"
  mdimg.style.width = "64px"
  mda.appendChild(mdimg)

  
  const mdspan = document.createElement("span")
  mdspan.innerText = "MangaDex"
  mda.appendChild(mdspan)

  //md end
  const accordionSidebar = document.getElementById("accordionSidebar")
  accordionSidebar.appendChild(likc)
  accordionSidebar.appendChild(limd)
  console.log("kc module setted")
  }else{

      //kc
  const likc = document.createElement("li")
  likc.classList.add("nav-item")
  likc.setAttribute("role","presentation")

  const kca = document.createElement("a")
  kca.classList.add("nav-link")
  kca.classList.add("active")
  kca.href = "../komikcast/index.html"
  likc.appendChild(kca)

  const kcimg = document.createElement("img")
  kcimg.src="assets/img/kc.png"
  kcimg.style.width = "64px"
  kca.appendChild(kcimg)

  const kcspan = document.createElement("span")
  kcspan.innerText = "KomikCast"
  kca.appendChild(kcspan)

  //kc end

  //md start

  //md start
 
  const limd = document.createElement("li")
  limd.classList.add("nav-item")
  limd.setAttribute("role","presentation")

  const mda = document.createElement("a")
  mda.classList.add("nav-link")
  mda.href = "../Mangadex/index.html"
  limd.appendChild(mda)

  const mdimg = document.createElement("img")
  mdimg.src="assets/img/MD.png"
  mdimg.style.width = "64px"
  mda.appendChild(mdimg)

  
  const mdspan = document.createElement("span")
  mdspan.innerText = "MangaDex"
  mda.appendChild(mdspan)

  //md end
  const accordionSidebar = document.getElementById("accordionSidebar")
  accordionSidebar.appendChild(likc)
  accordionSidebar.appendChild(limd)
  console.log("kc module setted")

  //md end

  }
  console.log(navicon)




  // <li class="nav-item" role="presentation"><a class="nav-link active" href=""><img src="assets/img/OD.png" width="64px"><span>Otakudesu</span></a></li>

})(jQuery); // End of use strict
