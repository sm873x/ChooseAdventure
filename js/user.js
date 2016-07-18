(function(ns) {
    'use strict';
    window.adventure = ns = (ns || {});

    ns.$loginArea = $('.login-view');
    var $loginForm = $('.login');
    var $loginName = $('#login-name');

    $loginForm.on( 'submit', function loginGame(e) {
        console.log('logged in');
        e.preventDefault();

        var username = $loginName.val();
        ns.login(username)
            .done( ns.initUI )
            .fail( ns.error );
    });

    /**
     * Login to start game with username and save token and user-id data.
     * @param  {string} username Name of user playing game
     * @return {promise} jQuery XHR object (with promise method on it)
     */
    ns.login = function login(username) {
        if (!username) {
            alert('Please enter your name to start adventure');

            var def = $.Deferred();
            def.reject('You don\'t have a name? Really?');
            return def.promise();

            console.log('no name');
        }

        return $.ajax({
            url: 'https://tiydc-coa-1.herokuapp.com/users/login',
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            data: JSON.stringify({ 'name': username }),
            dataType: 'json'
            })
            .done(function getTokenID(data) {
                ns.token = data.token;
                ns.userID = data.id;
                console.log('Token and ID saved', ns.token, ns.userID);
            });
    };

    /**
     * Displays error messages depending on status code of callback functions
     * @param  {json} jQuery XHR object Data of callback function
     * @return {void}   
     */
    ns.error = function handleFail(xhr) {
        if ( 400 >= xhr.status < 500 ) {
            $(this).text('Hmmm...what did you do?');
        } else if ( xhr.status >= 500){
            $(this).text('Ruh roh, looks like we\'re having problems. Check back later please');
        }
    };

})(window.adventure);
