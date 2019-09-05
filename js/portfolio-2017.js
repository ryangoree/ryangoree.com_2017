/*~*~*~*~*~*~*~*~*~*~*
~*~*~ NAVIGATION ~*~*~
~*~*~*~*~*~*~*~*~*~*~*/

var keepScrollPos = false;

var navOpen = function() {
    return $('.mobile-nav-open').length > 0;
}

var navigate = function() {

    $('#spinner').removeClass('hidden');
    $('.mobile-nav a.active').removeClass('active');
    $('.page').removeClass('active');

    // If at the root directory and there is a hash
    if (window.location.pathname === '/' && window.location.hash !== '') {
        $('#spinner').addClass('hidden');
        $(window.location.hash).addClass('active');
        $('.mobile-nav a[href="/' + window.location.hash + '"]').addClass('active');
    }

    // If in a subdirectory and it matches one of the links 
    else if (/\/[^\/]*(?=\/)/.test(window.location.pathname)) {
        var hrefVal = window.location.pathname.match(/\/[^\/]*(?=\/)/)[0].replace('/', '/#');
        $('#spinner').addClass('hidden');
        $('.page').first().addClass('active');
        $('.mobile-nav a[href="' + hrefVal + '"]').addClass('active');
    }

    // If in the root directory and there is no hash
    else if (window.location.pathname === '/') {
        $('#spinner').addClass('hidden');
        $('.page').first().addClass('active');
        $('.mobile-nav li a').first().addClass('active');
    }

    else {
        $('#spinner').addClass('hidden');
        $('.page').first().addClass('active');
    }

    setTimeout(function() {
        $('.page:not(.active)').addClass('fixed');
    }, 250);
    setTimeout(function() {
        $('.page.active').removeClass('fixed');
    }, 250);

    if (!keepScrollPos) {
        $('body').scrollTop(0);
    } else {
        keepScrollPos = false;
    }
};

var toggleMobileNav = function() {
    if (navOpen()) {
        var scrollPos = $('.content').scrollTop();
        $('body').removeClass('mobile-nav-open');
        setTimeout(function() {
            $('.content').css({
                height: '',
                overflow: ''
            });
            $('body').scrollTop(scrollPos);
        }, 400);
    } else {
        var scrollPos = $('body').scrollTop();
        $('body').addClass('mobile-nav-open');
        $('.content').css({
            height: '100%',
            overflow: 'hidden'
        });
        $('.content').scrollTop(scrollPos);
    }

};

$(window).on('load', navigate)
    .on('hashchange', navigate);

$('.keep-scroll-pos').on('click', function() {
    keepScrollPos = true;
});

$('.mobile-nav-icon, .mobile-nav a').on('click', toggleMobileNav);

$('.content, .mobile-header').on('mousedown', function() {
    $('body').removeClass('mobile-nav-open');
});


/*~*~*~*~*~*~*~*~
~*~*~ FORMS ~*~*~
~*~*~*~*~*~*~*~*/

$('#quick-chat-email-toggle').on('change', function() {
    $('#quick-chat-email').addClass('active');
    $('#quick-chat-phone').removeClass('active');
});

$('#quick-chat-phone-toggle').on('change', function() {
    $('#quick-chat-phone').addClass('active');
    $('#quick-chat-email').removeClass('active');
});

$('#contact-email-toggle').on('change', function() {
    $('#contact-email').addClass('active');
    $('#contact-phone').removeClass('active');
});

$('#contact-phone-toggle').on('change', function() {
    $('#contact-phone').addClass('active');
    $('#contact-email').removeClass('active');
});

$('form[name=hgmailer]').each(function() {
    var form = $(this);
    $(this).find('.submit').on('click', function() {

        $(form).addClass('sending');

        var name = $(form).find('[name=name]').val();
        var email = $(form).find('[name=email]').val();
        var phone = $(form).find('[name=phone]').val();

        if (/\d/.test(name) || !/@.*\./.test(email) || /[a-zA-Z]/.test(phone)) {
            $(form).removeClass('sending');
            $(form).addClass('error');
            return;
        }


        var formData = 'recipient=ryan%40ryangoree.com'
            + '&subject=QUICK+CHAT+REQUEST'
            + '&name=' + encodeURIComponent(name)
            + '&response_type=' + $(form).find('[name=response_type]:checked').val()
            + '&email=' + encodeURIComponent(email)
            + '&phone=' + encodeURIComponent(phone)
            + '&message=' + encodeURIComponent($(form).find('[name=message]').val());

        // $.ajax({
        //     type: "POST",
        //     url: "http://www.ryangoree.com/cgi-sys/formmail.pl",
        //     data: formData,
        //     contentType: "text/html; charset=utf-8",
        //     success: function(data) {
        //         $(form).removeClass('sending');
        //         $(form).addClass('success');
        //     },
        //     failure: function(errMsg) {
        //         $(form).removeClass('sending');
        //         $(form).addClass('error');
        //     }
        // });

        
        $(form).removeClass('sending');
        $(form).addClass('success');

        return false;

    })
})