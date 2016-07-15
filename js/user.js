(function(ns) {
    'use strict';
    window.adventure = ns = (ns || {});

    var $loginArea = $('.login-view');
    var $loginForm = $('.login');
    var $loginName = $('#login-name');
    var $storyArea = $('.story-list-view');
    // var $actionsArea = $('.story-step-view');
    var userID;
    var token;

    $loginForm.on( 'submit', function loginGame(e) {
        console.log('logged in');
        e.preventDefault();

        var username = $loginName.val();
        ns.login(username)
            .done( initUI )
            .fail(function loginFail(xhr) {
                ns.error(xhr, $loginArea);
            });
    });

    ns.login = function login(username) {
        if (!username) {
            var def = $.Deferred();
            def.reject('You don\'t have a name? Really?');
            return def.promise();
        }

        return $.ajax({
            url: 'https://tiydc-coa-1.herokuapp.com/users/login',
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({ 'name': username }),
            dataType: 'json'
        })
        .done(function getTokenID(data) {
            token = data.token;
            userID = data.id;
            console.log('Token and ID saved', data.token, data.id);
        });
    };

    function initUI() {
        console.log('initiating UI');
        $loginArea.hide();
        $storyArea.show();
        // $actionsArea.show();

        $storyArea
            .append('<li>\
                        <h2>Story 1</h2>\
                        <button data-id=1>Begin Story 1</button>\
                     </li>')
            .append('<li>\
                        <h2>Story 2</h2>\
                        <button data-id=2>Begin Story 2</button>\
                     </li>');
    }

    ns.error = function handleFail(xhr, elem) {
        if ( 400 >= xhr.status < 500 ) {
            elem.text('Hmmm...what did you do?');
        } else if ( xhr.status >= 500){
            elem.text('Ruh roh, looks like we\'re having problems. Check back later please');
        }
    };

})(window.adventure);
