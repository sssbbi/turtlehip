'use strict';

/* 모달팝업 */
var startPop = function() {
  var winW = $(window).width();
  if (winW > 1024) {
    $('.start_pop').draggable({
      handle: '.modal-header',
      containment: 'html'
    });
  }
}

/* loading image */
$(window).on('load', function(){
  $('.loading-image').fadeOut(300);
}); 


/* 모바일 네비게이션 */
var navMobile = {
  init: function () {
    this.nav_mobile_btn(); // 모바일네비 토글
    this.nav_mobile_active(); //활성화된 메뉴 열어두기
    this.nav_mobile_down(); //하위메뉴가 있는 항목 찾아서 addClass
    this.nav_mobile_action(); // 아코디언 메뉴
  },
  nav_mobile_btn: function () {
    var $navBtn = $('.nav-mobile__btn'),
      $navBg = $('.nav-mobile__bg'),
      $nav = $('.nav-mobile');
    var toggleNav = function () {
      $navBg.fadeToggle(200,"linear");
      $nav.toggleClass('active');
    };
    $navBtn.on('click', function () {
      toggleNav();
    });
    $navBg.on('click', function () {
      toggleNav();
    });
  },
  nav_mobile_active: function () {
    //활성화된 메뉴 열어두기(1depth)
    // $('.nav-mobile .depth-1 > .link.on').next('.nav-list--depth2').show();
    // $('.nav-mobile .depth-1 > .link.on').addClass('active');
    $('.nav-mobile .depth-1 > .link.on,.nav-mobile .depth-2 > .link.on').addClass('active').next().show();
  },
  nav_mobile_down: function () {
    // 하위메뉴가있는 메뉴에 드롭다운 표시를 위한 클래스 붙이기
    $('.nav-mobile .depth-1, .nav-mobile .depth-2').each(function () {
      if ($(this).children('').next().length > 0) {
        $(this).addClass('_down');
      } else {
        $(this).removeClass('_down');
      }
    });
  },
  nav_mobile_action: function () {
    var $depth1 = $('.nav-mobile .depth-1'),
      $depth2 = $('.nav-mobile .depth-2'),
      $depth2_list = $('.nav-mobile .nav-list--depth2'),
      // $depth3 = $('.nav-mobile .depth-3'),
      $depth3_list = $('.nav-mobile .nav-list--depth3');

    $depth1.children('.link').click(function () {
      if ($(this).next().length > 0) {
        if ($(this).next().css('display') === 'none') {
          $depth2.find('.link').removeClass('active');
          $depth1.children('.link').removeClass('active');
          $(this).addClass('active');
          $depth3_list.hide();
          $depth2.find('.link').removeClass('active');
          $depth2_list.slideUp(300);
          $(this).next().stop(false, true).slideDown(300);
        } else {
          $depth2.find('.link').removeClass('active');
          $(this).next().slideUp(200);
          $depth1.children('.link').removeClass('active');
        }
        return false;
      } else {
      }
    });

    $depth2.children('.link').click(function () {
      if ($(this).next().length > 0) {
        if ($(this).next().css('display') === 'none') {
          $depth3_list.find('.link').removeClass('active');
          $depth3_list.stop(false, true).slideUp(300);
          $(this).addClass('active');
          $(this).next().stop(false, true).slideDown(300);
        } else {
          $depth3_list.find('.link').removeClass('active');
          $(this).removeClass('active');
          $(this).next().stop(false, true).slideUp(300);
        }
        return false;
      } else {
      }
    });
  },
};

/**
 * qna
 * 아코디언
*/
var qnaFun = {
  init: function () {
    this.q();
  },
  q: function () {
    var qna = $(".qna"),
      header = qna.find(".qna-header"),
      header_a = qna.find(".qna-header a"),
      body = qna.find(".qna-body"),
      faq_chk = "";
    body.hide();

    header.on("click", function (event) {
      event.preventDefault();

      if ($(this).hasClass("select") == true) {
        $(this).removeClass("select");
        $(this).next().stop().hide();
      } else {
        $(body).stop().hide();
        $(header).removeClass("select");
        $(this).next().stop().show();
        $(this).addClass("select");
      }
    });
  }
};


/* Magnific 팝업 */
var magnificPop = {
  init: function () {
    this.ajax(); //ajax 팝업
  },
  ajax: function () {
    $('.popup-link').magnificPopup({
      type: 'ajax',
      closeOnBgClick: false,
      mainClass: 'mfp-fade',
      callbacks: {
        ajaxContentAdded: function () {
          var $content = $(this.content[0]);
          var $pop = $content.find('.popup-in-popup');
          var aURL = '';

          if ($pop.length > 0) {
            aURL = $pop.attr('href');

            $pop.on('click', function (e) {
              e.preventDefault();

              $.ajax({
                url: aURL,
                dataType: 'html',
                success: function (data) {
                  var item = '<div class="pop-in-pop">';
                  item += data;
                  item += '</div>';

                  /* HTML append */
                  $content.append(item);

                  /* 닫기 버튼 append */
                  $('.pop-in-pop').children().append('<div class="pop-in-close"><i class="xi-close"></i></div>');

                  /* 닫기 버튼 */
                  $('.pop-in-close').on('click', function(){
                    $('.pop-in-pop').remove();
                  });
                }
              });
            });
          }
        }
      }
    }, 500);
  },
};

function closePopup() {
  $.magnificPopup.close();
}


var ratings = {
  init: function () {
    this.active();
  },
  active: function () {
    var $ratings = $('.ratings-star').not('.readonly'),
      selectedIndex = undefined;

    $ratings.find('.star').on({
      mouseover: function () {
        var $this = $(this),
          point = $(this).attr('data-value');

        $ratings.find('.star').removeClass('on');
        $this.addClass('on').prevAll().addClass('on');
      },
      mouseleave: function () {
        $ratings.find('.star').removeClass('on');

        if (selectedIndex != undefined) {
          $ratings.find('.star').eq(selectedIndex).addClass('on').prevAll().addClass('on');
        }
      },
      click: function () {
        var $this = $(this),
          $input = $('#ratings-score');

        $this.addClass('on').prevAll().addClass('on');
        selectedIndex = $this.index();
        $input.val($this.attr('data-value'));

        // if ($this.attr('data-value') == 1) {
        //   $txt.text('1점');
        // } else if ($this.attr('data-value') == 2) {
        //   $txt.text('2점');
        // } else if ($this.attr('data-value') == 3) {
        //   $txt.text('3점');
        // } else if ($this.attr('data-value') == 4) {
        //   $txt.text('4점');
        // } else if ($this.attr('data-value') == 5) {
        //   $txt.text('5점');
        // }
      },
    });
  },
};


$(document).on('mouseover', function () {
  magnificPop.init();
});

$(document).ready(function () {
  /* Navigation Active */
  $('.nav, .nav-mobile').navActive({
    depth1: '.depth-1',
    depth2: '.depth-2',
    depth3: '.depth-3',
    activeClass: 'on',
    callback: function () {
      // console.log('callback function');
    },
  });

  /* HEADER GNB Drop */
  $('.header').navDrop({
    type: 'each', // 기본값 udnefiend, 선언하지 않거나 없는 값을 선언할 경우 콘솔창에 경고문구 출력
    background: true, // 기본값 true, 배경 엘리먼트가 없을 경우 콘솔창에 경고문구 출력
    backgroundClass: '.nav__bg', // 기본값 .nav__bg
    backgroundAutoColor: false, // 기본값 false, depth2의 배경색을 자동으로 적용
    effect: 'slide', // 기본값 fade, 옵션값은 fade, slide
    delay: 300, // 출력시 delay
    callback: function () {}, // 콜백 함수
  });

  navMobile.init();
  qnaFun.init();
  startPop();
  ratings.init();

  var wowJS = new WOW().init(); 

  /*
    File Upload
    이벤트 버블링 방지를 위해 on('change') 형태로 변경함.
  */
  $('.file-box').find('input[type=file]').on('change', function(){
    var tmp = $(this).val().replace(/^.*\\/, "");
    $(this).parents('.file-box').find('.file-box__text').text(tmp);
    $(this).parents('.file-box').find('.file-box__text').addClass('on');
  });

  /* Bullet List */
  $('.bullet-list').each(function () {
    if ($(this).hasClass('bullet-list--decimal')) {
      $(this).children('.item').each(function (index) {
        $(this).prepend('<span class="decimal-number">' + (index + 1) + '</span>');
      });
    }

    $(this).addClass('bullet-type--js');
  });
  
  /*
  min-width지정 rowscroll
  */
  $('.row-scrollwrap').each(function () {
    var $rowScrollTxtWidth = $(this).data('show'),
      $rowScrollTxt = $(this).find('.row-scrollwrap__txt');
      
    // 가로스크롤 영역 min-width지정
    var $gutter = 40; // $container-gutter-width (_var.scss)
    if ($(window).width() < $rowScrollTxtWidth + $gutter) { 
      $(this).find('.row-scrollwrap__content').css('min-width', $rowScrollTxtWidth);
      $rowScrollTxt.show();
    }
  });

  /* scrollbar js */
  $('.scrollbar-inner').scrollbar();
  // $('.scrollbar-outer').scrollbar();
  // $('.scrollbar-light').scrollbar();

  /* Resizing Check */
  var resizing = resizingCheck({
    breakpoints: {
      414: function () {
        // console.log('414 < width < 768');
      },
      768: function () {
        // console.log('768 < width < 1024');
      },
      1024: function () {
        // console.log('1024 < width < 1200');
      },
      1200: function () {
        // console.log('1200 < width');
      },
    },
  });
});


$('.header .search-mobile__btn').on('click', function(){
  if ($('.header .search-box').css('display') == 'none') {
    $('.header .search-box').fadeIn(200);
    $(this).addClass('active');
  } else {
    $('.header .search-box').hide();
    $(this).removeClass('active');
  }
});

var wowrap = $('.wowrap');
$(wowrap).each(function () {
  $(this).find('.wow').each(function (index) {
    var eq = index / 8 + 's';
    $(this).attr('data-wow-delay', eq);
  });
  $(this).find('.animated').each(function (index) {
    var eq = index * 250;
    $(this).attr('data-id', 'delay-' + eq);
  });
});


$(document).ready(function(){
  var now = new Date(), 
   nowHours = now.getHours(),
   nowMin = now.getMinutes(),
   nowSec = now.getSeconds(),
   nowDay = now.getDay(); // 월 = 1, 화 = 2, 수 = 3, 목 = 4, 금 = 5, 토 = 6, 일 = 0
      
  console.log(nowDay);

  if ( nowHours > 0 && nowHours < 15 && nowDay < 5) {
    $('.nav .depth-1--today').addClass('active');
  } else {
    $('.nav .depth-1--today').removeClass('active');
  }
});
