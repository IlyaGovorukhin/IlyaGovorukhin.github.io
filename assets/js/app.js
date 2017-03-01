'use strict';

$(document).ready(function () {

    'use strict';
    // resizeBlur

    model.resizeBlur();

    //.preloader
    var url = $('.Buttton_point').hasClass('about_block1'),
        url1 = $('.Buttton_point').hasClass('conteiner--works_blog-block');
    if (url) {
        $('.preloder').css('background-image', 'url("assets/img/bg2.jpg"');
    }
    if (url1) {
        $('.preloder').css('background-image', 'url("assets/img/night_prel_bg.jpg"');
    }

    $('body').find('*').not('.preloder').addClass('div_hide');
    var imgs = [],
        vids = [];
    var contentReady = $.Deferred();
    $('*').map(function (k, v) {
        var risaz = window.innerWidth;
        var bg = $(v).css('background-image'),
            img = $(v).is('img'),
            vid = $(v).is('source');
        if (img) {
            if ($(v).attr('src')) {
                imgs.push($(v).attr('src'));
            }
        }
        if (vid) {
            if ($(v).attr('src')) {
                vids.push($(v).attr('src'));
            }
        }
        if (bg != 'none') {
            var path = bg.replace('url("', "").replace('")', "");
            var path = path.replace('url(', "").replace(')', "");
            imgs.push(path);
        }
    });
    var cost = 0;
    vids.map(function (k) {
        var image = $('<video>', {
            attr: {
                src: k
            }
        });
        image.load(function () {
            cost++;
            setprocent(cost);
        });
    });
    imgs.map(function (k) {
        var image = $('<img>', {
            attr: {
                src: k
            }
        });
        image.load(function () {
            cost++;
            setprocent(cost);
        });
    });
    function setprocent(v) {
        var procent = Math.ceil(v * 100 / imgs.length);
        $('#deepPink-rectangle3').text(procent);
        if (procent >= 100) {
            $('.preloder').addClass('div_hide');
            $('body').find('*').not('.preloder').removeClass('div_hide');
            contentReady.resolve();
            contentReady.done(function () {
                $('.preloder').addClass('div_hide');
                $('body').find('*').not('.preloder').removeClass('div_hide');
                //addgradient
                $('.conteiner--works_star').css({
                    'background': 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%,rgba(0,0,0,0) 100%)'
                });
            });
        }
    }
});

var sendEmail = function () {

    var initInside = function initInside() {
        _setUpListners();
    };

    var _setUpListners = function _setUpListners() {
        $('.Pull').on('click', _sendform);
        $('.conteiner_center-up--input').on('click', setwith);
        // $('.Clin').on('click', _clinform)

    };
    // function _clinform(e) {
    //     e.preventDefault();
    // }

    function setwith(e) {
        validation.setWhit($(this));
    }

    function _sendform(e) {
        e.preventDefault();
        var form = $('.conteiner_center-up--form');
        if (validation.init(form)) {
            _sendAjax(form);
        }
    }

    function _sendAjax(form) {
        var data = _JSON$stringify(form.serializeArray());
        $.ajax({
            type: "POST",
            url: "assets/js/send.php",
            data: data,
            cache: false,
            success: function success(s) {
                console.log(s);
            }

        });
        return false;
    }
    return {
        init: initInside

    };
}();

sendEmail.init();

var validation = function () {
    function _setRed(e) {
        e.css({
            'background-color': '#ea5d5d'
        });
    }
    function _setWhit(e) {
        e.css({
            'background-color': '#fff'
        });
    }
    function _validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    var initInside = function initInside(form) {

        var elem = form.find('input, textarea'),
            valid = true,
            massage = void 0;

        elem.map(function (k, e) {
            var elem = $(e);
            if (elem.val() == 0) {
                _setRed(elem);
                valid = false;
                massage = 'Вы не заполнили все поля';
            }

            if (elem.attr('type') == "email") {
                if (!_validateEmail(elem.val())) {
                    _setRed(elem);
                    valid = false;
                    massage = 'email не корректный';
                }
            }
        });
        if (massage !== 0) {
            modalWindow.modalMassag(massage);
        }

        return valid;
    };

    return {
        init: initInside,
        setRed: _setRed,
        setWhit: _setWhit
    };
}();

var modalWindow = function () {

    var initInside = function initInside() {
        _setUpListners();
    };
    function _showMassag(msg) {
        $('.modal').css({
            'display': 'block'
        });
        $('.modal_center-text').text(msg);
    }

    var _setUpListners = function _setUpListners() {
        $('.modal_center-button').on('click', _hideMasseg);
    };

    function _hideMasseg(e) {
        e.preventDefault();

        $('.modal').css({
            'display': 'none'
        });
        $('.modal_center-text').text('');
    }

    return {
        init: initInside,
        modalMassag: _showMassag
    };
}();
modalWindow.init();

var buttonAnim = function () {

    var initInside = function initInside() {
        _setUpListners();
    };

    var _setUpListners = function _setUpListners() {
        $('.conteiner_works-humburger').on('click', _bAnim);
    };

    function _bAnim(e) {
        document.getElementById("humburger_line1").classList.toggle("movelineOne");
        document.getElementById("humburger_line2").classList.toggle("movelineTwo");
        document.getElementById("humburger_line3").classList.toggle("movelineThree");
    }
    return {
        init: initInside
    };
}();

buttonAnim.init();

var vies = {
    //paralax
    paralax: function paralax(x, y) {
        $('.paralax_paralax-lear').map(function (k, v) {
            $(v).css({
                'top': window.innerHeight / 2 * (k / 100) + 'px',
                'transform': 'translate3d(' + x * (k / 100) + 'px, ' + y * (k / 100) + 'px, 0 )'
            });
        });
    },
    //paralaxSize
    paralaxSize: function paralaxSize(x, y, z) {
        $('.paralax_paralax-lear').css({
            'width': x + 'px',
            'height': y + 'px',
            'margin-left': '-' + z + 'px'
        });
    },
    //flip
    flipAdd: function flipAdd() {
        model.isFlipped = false;
        $('.fliper').addClass('flip-go');
        $('.conteiner_welcom').text('Назад');
    },
    flipRem: function flipRem() {
        model.isFlipped = true;
        $('.fliper').removeClass('flip-go');
        $('.conteiner_welcom').text('Авторизоваться');
    },
    //scroll
    scroll_paralax: function scroll_paralax(e) {
        $('.paralax_paralax-lear--works').map(function (v, k) {
            $('.conteiner--works_img').css({
                'transform': 'translate3d( 0,' + -e * (v * 3) + '%' + ' ,0)'
            });
            if (v <= 3) {
                var a = v + 3 - (v + v) + 1;
                $(k).css({
                    'transform': 'translate3d( 0,' + e * (a / 3) + '%' + ' ,0)'
                });
            } else if (v == 6) {
                $(k).css({
                    'transform': 'translate3d( 0,' + -e * (v * 1.5) + '%' + ' ,0)'
                });
            } else {
                $(k).css({
                    'transform': 'translate3d( 0,' + -e * v + '%' + ' ,0)'
                });
            }
        });
    },
    //slider
    slider: {
        up: function up(x, y) {
            y.css({
                'top': '-100%'
            });
            x.animate({
                'top': '100%'
            }, 200);
            y.animate({
                'top': '0'
            }, 200);
            x.removeClass('active');
            y.addClass('active');
        },
        down: function down(x, y) {
            y.css({
                'top': '100%'
            });
            x.animate({
                'top': '-100%'
            }, 200);
            y.animate({
                'top': '0'
            }, 200);
            x.removeClass('active');
            y.addClass('active');
        },
        upText: function upText(x, y) {
            x.css({
                'display': 'inline-block'
            });
            y.css({
                'display': 'none'
            });
        },
        animateImg: function animateImg(e) {
            $('.slider_block2-up--box').children().css({
                'opacity': '0'
            }).attr('src', e).animate({
                'opacity': '1'
            }, 500);
        }
    },
    //ButtomDown
    ButtomDown: function ButtomDown(e) {

        $('html, body').animate({
            'scrollTop': $('.Buttton_point').position().top
        }, 500);
    },

    ButtomUp: function ButtomUp(e) {
        $('html, body').animate({
            'scrollTop': 0
        }, 500);
    },
    resizeBlur: function resizeBlur(x, y) {
        if (x <= 900) {
            $('.positin_blur-ofset').css({
                'background-size': 900 + 'px' + ' ' + 'auto',
                'background-position-y': '45%'
            });
        } else {
            $('.positin_blur-ofset').css({
                'background-size': x + 'px' + ' ' + 'auto',
                'background-position-y': 41.7 + y + '%'
            });
        }
    },
    //scroll_svg
    scroll_svg: function scroll_svg() {

        $('.skills__item--svg').map(function (i, e) {

            $(e).find(':last-child').animate({
                'stroke-dashoffset': '0'
            }, 1500);
            //204 408
        });
    },
    //menuButton
    menuButton: function menuButton() {
        $('.conteiner--works-menu-center').toggleClass('visibl');
        $('.footerwork').toggleClass('displayNone');
        $('.conteiner_wrapper').toggleClass('overHeight');
        $('.nave-menu__linkundefined').toggleClass('textanim');
        $('.conteiner--works-menu').toggleClass('animside');
    }

}; // - ПредставленияF
var model = {
    //paralax
    paralax: function paralax(e) {
        var y = window.innerHeight / 2 - e.pageY;
        var x = window.innerWidth / 2 - e.pageX;
        vies.paralax(x, y);
    },
    //paralaxSize
    paralaxSize: function paralaxSize() {
        var _wWidth = $(window).innerWidth() + 500, _wHeight = $(window).innerHeight(), _speed = 1 / 100, _halfWidth = $(window).innerWidth() / 2, maxShiftX = $('.paralax_paralax-lear').length - 1 * _speed * 100, widthWider = _wWidth + maxShiftX * 2, _halfWidth = widthWider / 2;
        vies.paralaxSize(widthWider, _wHeight, _halfWidth);
    },
    //flip
    isFlipped: true,
    flip: function flip(e) {
        e.preventDefault();
        if (model.isFlipped) {
            vies.flipAdd();
        } else {
            vies.flipRem();
        }
    },
    //scroll
    scroll_paralax: function scroll_paralax(e) {
        var minusTop = e / 90;

        vies.scroll_paralax(minusTop);
    },
    //scroll_svg
    scroll_svg: function scroll_svg(e) {
        if ($('.svgblock').length) {
            var svgOffset = $('.svgblock').offset().top,
                svgHeight = $('.svgblock').height() / 2,
                point = svgOffset - svgHeight;
            if (e > point) {
                vies.scroll_svg();
            }
        }
    },
    //slider
    counter: 2,
    slider: function slider(e) {
        var rqActive = $('.slider_block-up--up.active'),
            item = $('.slider_block-up--up'),
            itemText = $('.slider_block-centr'),
            rqActiveTwo = $('.tap2.active'),
            itemTwo = $('.tap2'),
            imgsrc = item.eq(model.counter).find('img').attr('src');
        //animateImg
        vies.slider.animateImg(imgsrc);
        //circl counter
        model.counter++;
        model.counter = model.NexCount(model.counter, item.length);

        //mini slider
        vies.slider.down(rqActive, item.eq(model.counter));
        vies.slider.up(rqActiveTwo, itemTwo.eq(model.counter - 2));

        //big slider
        var dod = model.NexCountText(model.counter, itemText.length);
        vies.slider.upText(itemText.eq(model.counter), itemText.eq(dod));

        model.sliderTitlesAnimation(itemText.eq(model.counter));
    },
    //circl counter
    NexCount: function NexCount(fistCount, secondCount) {
        var count = fistCount >= secondCount ? 0 : fistCount;
        return count;
    },
    // circl dod
    NexCountText: function NexCountText(fistCount, secondCount) {
        var count = fistCount >= secondCount ? 0 : fistCount - 1;
        var count2 = count < 0 ? secondCount - 1 : count;
        return count2;
    },
    sliderTitlesAnimation: function sliderTitlesAnimation(e) {
        var world = $(e).children().first().text().split(' '),
            world2 = $(world).map(function (dl, del) {
                if (del.length > 0) {
                    return del;
                }
            });
        $(e).children().first().html('');
        $(world2).each(function (l, el) {
            var letter = el.split('');
            var arrleter = '';
            $(letter).each(function (l1, e2) {
                arrleter += '<span class="char char--' + l1 + '">' + e2 + '</span>';
            });
            var newWord = '<span class="word">' + ' ' + arrleter + '</span>';
            $(e).children().first().append(newWord);
        });
    },
    //ButtomDown
    ButtomDown: function ButtomDown(e) {
        vies.ButtomDown(e);
    },
    //ButtomUp
    ButtomUp: function ButtomUp(e) {
        vies.ButtomUp(e);
    },
    //resiz
    resizeBlur: function resizeBlur() {
        var pozwidth = $('.pageform').width(),
            pros = ($('.pageform').width() - $('.positin_blur-ofset').width()) / 200;
        vies.resizeBlur(pozwidth, pros);
    },
    // menuButton
    menuButton: function menuButton() {
        vies.menuButton();
    }

}; // - Модель
var controller = {
    //paralax
    paralax: function paralax() {
        $(window).on('mousemove', function (e) {
            model.paralax(e);
        });
        //paralaxSize
        $(window).on('resize', function () {
            model.paralaxSize();
        });
    },
    //flip
    flip: function flip() {
        $('.conteiner_welcom, .welcome-nav__item--Back').on('click', function (e) {
            model.flip(e);
        });
    },
    //scroll
    scroll_paralax: function scroll_paralax() {
        $(window).on('scroll', function () {
            var scrollTop = $(window).scrollTop();
            model.scroll_paralax(scrollTop);
            model.scroll_svg(scrollTop);
        });
    },
    // slider
    slider: function slider() {
        $('.slider_block-down--button').on('click', function (e) {
            e.preventDefault();
            model.slider(e);
        });
    },
    // buttomDown
    buttomDown: function buttomDown() {
        $('#Layer_1').on('click', function (e) {
            e.preventDefault();
            model.ButtomDown(e);
        });
        $('.pageform-arrow').on('click', function (e) {
            e.preventDefault();
            model.ButtomUp(e);
        });
    },
    //resiz
    resizeBlur: function resizeBlur() {
        $(window).resize(function () {
            model.resizeBlur();
        });
    },
    menuButton: function menuButton() {
        $('.conteiner_works-humburger').on('click', function (e) {

            model.menuButton();
        });
    }

}; // - Контроллер
controller.resizeBlur();
controller.buttomDown();
controller.slider();
controller.scroll_paralax();
controller.paralax();
controller.flip();
controller.menuButton();

