import ('./../scss/index.scss') // The page is now styled

function dispatch () {
  let url;
  let searchbox = $('#searchbox');
  let searchval = searchbox.val();
  if (searchval !== '') {
    url = 'http://www.google.com/search?q=site:qcyoung.com/%20' + searchval;
    if (navigator.userAgent.indexOf('iPad') > -1 || navigator.userAgent.indexOf('iPhone') > -1) {
      location.href = url;
    } else {
      window.open(url, '_blank');
    }
  }
  return false;
}

$(function () {
  /**
   * plugins list
   * @type {
   *   jquery:[nicescroll,slidebars,animsition,Bootstrap Auto-Hiding Navbar,pace]
   * }
   */
  const windowHeight = $(window).height();
  const windowWidth = $(window).width();
  const imgWidth = windowWidth * 0.8;
  const imgHeight = windowHeight * 0.8;
  const footerHeight = $('footer').outerHeight();
  let documentHeight = $(document).height();
  let egglayer;  // 彩蛋框
  let imgZoom;  // 图片层
  let gPushed = false;  // keydown 状态
  let mobileWidth = 768;
  let miniDeviceWidth = 1024;
  let keyValue = {
    '/?' : 191,
    'g'  : 71,
    'a'  : 65,
    'c'  : 67,
    't'  : 84,
    's'  : 83
  };

  let consoleInfo = {
    info: '%c卧槽，你居然敢点开控制台看我的代码，这下我的屎代码无所遁形了 T _ T',
    logo: '         _.-.  \n' + '       ,\'/ //\\ \n' + '      /// // /)\n' + '     /// // //|\n' + '    /// // /// \n' + '   /// // ///  \n' + '  (`: // ///   \n' + '   `;`: ///    \n' + '   / /  `\'      \n' + '  / /\n' + ' (_/  \n'
  };
  window.console && console.info && console.info(consoleInfo.logo); console.info(consoleInfo.info, 'color:#03a9f4');

  // tooltip初始化
  $('[data-toggle="tooltip"]').tooltip();

  document.onkeydown = function (e) {
    if (!($(':focus').prop('tagName') === 'INPUT') && !($(':focus').prop('tagName') === 'TEXTAREA')) {
      e = e || window.event;
      if (e.keyCode === keyValue['/?'] && e.shiftKey) {
        if ($('.layui-layer-shade').length > 0) {
          return false;
        } else {
          eggFun();
        }
        gPushed = false;
      } else if (e.keyCode === keyValue['g']) {
        gPushed = true;
      } else if (e.keyCode === keyValue['a']) {
        if (gPushed) {
          location.href = '/archives';
        }
        gPushed = false;
      } else if (e.keyCode === keyValue['c']) {
        if (gPushed) {
          location.href = '/categories';
        }
        gPushed = false;
      } else if (e.keyCode === keyValue['t']) {
        if (gPushed) {
          location.href = '/tags';
        }
        gPushed = false;
      } else if (e.keyCode === keyValue['s']) {
        if (gPushed) {
          $('#searchbox').focus();
          $('#searchbox').val('');
        }
        gPushed = false;
        return false;
      } else {
        gPushed = false;
      }
    }
  };

  $('.welcome').on('click', function (event) {
    eggFun();
  });
  $(document).delegate('.egg-close', 'click', function () {
    layer.close(egglayer);
  });

  navRender();
  lazyLoadImg();

  if (windowWidth > mobileWidth && $('.index-context').length) {
    let bgImg = new Image();
    bgImg.onload = function () {
      let wallPaper = 'url(' + bgImg.src + ')';
      $('.element-img').css('background-image', wallPaper);
      $('body').animate({'opacity': 1}, 500);
    };
    bgImg.onerror = function () {
      $('body').animate({'opacity': 1}, 500);
    };
    bgImg.src = 'http://qcyoung.qiniudn.com/qcyoung/TKL/wall-' + Math.ceil(Math.random() * 557) + '.jpg';
    // bgImg.src = 'https://ww2.sinaimg.cn/large/006tNbRwly1fd6izqbqtmj31hc0zfqe0.jpg';
  } else {
    $('body').animate({'opacity': 1}, 500);
  }

  $('.navbar-toggle').on('click', function () {
    let sideImgs = $('.sb-slidebar').find('img');
    if (sideImgs[0].src) {
      return false;
    }
    sideImgs.each(function (index, el) {
      $(el).attr('src', $(el).attr('data-src'));
    });
  });

  $('.post-article').delegate('.img_replaced', 'click', function (event) {
    let imgSrc = $(event.target).attr('data-src');
    imgZoom = layer.open({
      type: 1,
      title: false,
      // skin: 'layui-layer-demo', // 样式类名
      closeBtn: false, // 不显示关闭按钮
      shadeClose: true, // 开启遮罩关闭
      area: [windowWidth, windowHeight],
      content: '<img class="img-zoom" src="' + imgSrc + '" width="' + imgWidth + '" height="' + imgHeight + '"/>'
    });
  });

  $(document).delegate('.img-zoom', 'click', function () {
    layer.close(imgZoom);
  });

  // 微信Window
  $('#navigation .weixin,.social .weixin').on('click', function () {
    layer.open({
      type: 1,
      title: false,
      skin: 'layui-layer-demo', // 样式类名
      closeBtn: false, // 不显示关闭按钮
      shift: 2,
      shadeClose: true, // 开启遮罩关闭
      area: [windowWidth, windowHeight],
      content: '<img src="http://qcyoung.qiniudn.com/qcyoung/yangzj1992QRcode.jpg" width="200px" height="200px"/>'
    });
  });

  // 微信Window
  $('.reward').on('click', function () {
    layer.open({
      type: 1,
      title: false,
      skin: 'layui-layer-demo', // 样式类名
      closeBtn: false, // 不显示关闭按钮
      shift: 2,
      shadeClose: true, // 开启遮罩关闭
      area: [windowWidth, windowHeight],
      content: '<img src="http://qcyoung.qiniudn.com/qcyoung/wxpay.jpg" width="200px" height="200px"/><img src="http://qcyoung.qiniudn.com/qcyoung/alipay.jpg" width="200px" height="200px"/>'
    });
  });

  let scrollclick;

  $('.fa-arrow-up').on('click', function () {
    scrollclick = true;
    $('html, body').stop().animate({ scrollTop: 0 }, 800, function () {
      scrollclick = false;
    });
    return false;
  });

  $('.fa-arrow-down').on('click', function () {
    scrollclick = true;
    $('html, body').stop().animate({ scrollTop: documentHeight }, 800, function () {
      scrollclick = false;
    });
    return false;
  });

  $('.fa-music').on('click', function () {
    window.open('http://qcyoung.xyz/yPlayer/');
  });
  // Slidebars off-canvas menu
  $.slidebars();

  function eggFun () {
    if (windowWidth < miniDeviceWidth) {
      return false;
    }
    egglayer = layer.open({
      type: 1,
      title: false,
      skin: 'layui-layer-demo', // 样式类名
      closeBtn: false, // 不显示关闭按钮
      shift: 5,
      shadeClose: true, // 开启遮罩关闭
      area: [windowWidth, windowHeight],
      content: '<div class="egg-tips"><div class="egg-header"><span>彩蛋指南（仿 Github —— 通过这些快捷键可以让你更快访问页面哦），按下「?」键同样呼出</span><span class="egg-close"><i class="fa fa-close" style="padding-right:5px;"></i></span> </div><div class="egg-helps"><table class="keyboard-map"><tbody><tr><th></th><th>快捷方式说明</th></tr><tr><td class="keys"><kbd>?</kbd></td><td>打开彩蛋说明</td></tr><tr><td class="keys"><kbd>g</kbd><kbd>s</kbd></td><td>定焦到搜索框</td></tr><tr><td class="keys"><kbd>g</kbd><kbd>a</kbd></td><td>打开归档页</td></tr><tr><td class="keys"><kbd>g</kbd><kbd>c</kbd></td><td>打开目录页</td></tr><tr><td class="keys"><kbd>g</kbd><kbd>t</kbd></td><td>打开标签页</td></tr></tbody></table></div></div>'
    });
  }

  // 渲染导航栏样式
  function navRender () {
    if ($(document).scrollTop() > 10) {
      $('.lightnav .navbar-inner').addClass('lightnav-alt');
    } else {
      $('.lightnav .navbar-inner').removeClass('lightnav-alt');
    }
  }

  function lazyLoadImg () {
    let postImgs = $('.post-content').find('img');
    let nowimg;
    if (postImgs.length) {
      for (let j = 0; j < postImgs.length; j++) {
        if (postImgs[j].getBoundingClientRect().bottom <= windowHeight) {
          nowimg = j;
        } else {
          break;
        }
      }
      if (!$(postImgs[nowimg]).hasClass('img_replaced')) {
        $(postImgs[nowimg]).attr('src', $(postImgs[nowimg]).attr('data-src')).addClass('img_replaced');
      }
    }
  }

  function scrollSpy () {
    let scrollTop = $(window).scrollTop();
    if ($('#toc').length) {
      documentHeight = $(document).height();
      let tocHeight = $('.toc').outerHeight(); // 目录高度
      let duoshuoMark = $('.duoshuo').offset().top; // 评论栏位置
      let heads = $('.post-article').find('h1,h2,h3,h4,h5');
      let nowtoc = 0;
      for (let i = 0; i < heads.length; i++) {
        if (heads[i].getBoundingClientRect().top <= 50) {
          nowtoc = i;
        } else {
          break;
        }
      }
      let tocs = $('.toc').find('a');
      $(tocs).removeClass('toc-active');
      $(tocs[nowtoc]).addClass('toc-active');
      let tocScroll = tocs[nowtoc].offsetTop;
      if (tocScroll > windowHeight / 2) {
        $('#toc').scrollTop(tocScroll - windowHeight / 2);
      }
      if (tocHeight > windowHeight - footerHeight - 100) {
        if (scrollTop > duoshuoMark - windowHeight) {
          $('#toc').css({
            'position': 'absolute',
            'top': duoshuoMark - tocHeight
          });
        } else {
          $('#toc').css({
            'position': 'fixed',
            'top': '50px'
          });
        }
      }
      lazyLoadImg();
    }
    navRender();
  }

  function showPanel () {
    let scrollTopNum;
    let returnTop;
    // 获取当前垂直位移值
    if (!scrollclick) {
      scrollTopNum = $(document).scrollTop();
      // 获取浏览器当前高度
      returnTop = $('div.control-panel');
      // 滚动条垂直距离大于0时显示，反之隐藏
      (scrollTopNum > 240) ? returnTop.fadeIn('fast') : returnTop.fadeOut('fast');
    }
  }

  function throttle (delay, atleast) {
    // 节流
    let timer = null;
    let previous = null;
    return function () {
      let now = +new Date();
      if (!previous) previous = now;
      if (atleast && now - previous > atleast) {
        scrollSpy();
        showPanel();
        previous = now;
        clearTimeout(timer);
      } else {
        clearTimeout(timer);
        timer = setTimeout(function () {
          scrollSpy();
          showPanel();
          previous = null;
        }, delay);
      }
    };
  };

  window.onscroll = throttle(200, 500);

  $('#toc').niceScroll({
    smoothscroll: true, // scroll with ease movement
    autohidemode: true,
    zindex: '100', // change z-index for scrollbar div
    scrollspeed: 60, // scrolling speed
    mousescrollstep: 40, // mouse scrolling speed
    gesturezoom: false, // 上缩放框激活时，间距输出/输入
    horizrailenabled: false, // 管理水平滚动
    cursorcolor: '#151515',
    boxzoom: false, // enable zoom for box content
    cursorborder: '0px solid #202020',
    cursorborderradius: '8px',
    cursorwidth: 4, // 9
    enablemousewheel: true,
    background: 'rgba(255,255,255,0.7)'
  });

  // Functionailty constraints for mobile(wall opacity covering layer)
  if (!Modernizr.touch) {
    jQuery(function ($) {
      // Hero & page-header fade-in effect
      let divs = $('.herofade');
      $(window).on('scroll', function () {
        let st = $(this).scrollTop();
        divs.css({
          'margin-top': -(st / 0) + 'px',
          opacity: 0.7 - st / 1600
        });
      });
    });
  }

  // autohide navbar on scroll
  $('div.navbar-fixed-top').autoHidingNavbar({
    animationDuration: 400,
    hideOffset: 0 // Hides the navbar after scrolling . auto means the navbar's height.
  });

  /*!
   * IE10 viewport hack for Surface/desktop Windows 8 bug
   * Copyright 2014 Twitter, Inc.
   * Licensed under the Creative Commons Attribution 3.0 Unported License. For
   * details, see http://creativecommons.org/licenses/by/3.0/.
   */
  // See the Getting Started docs for more information:
  // http://getbootstrap.com/getting-started/#support-ie10-width
  if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    let msViewportStyle = document.createElement('style');
    msViewportStyle.appendChild(
      document.createTextNode(
        '@-ms-viewport{width:auto!important}'
      )
    );
    document.querySelector('head').appendChild(msViewportStyle);
  }

  $('.logo').hover(function () {
    $(this).find('#white-logo').css('display', 'none');
    $(this).find('#brown-logo').css('display', 'block');
  }, function () {
    $(this).find('#brown-logo').css('display', 'none');
    $(this).find('#white-logo').css('display', 'block');
  });
}(jQuery)); // End "use strict"
