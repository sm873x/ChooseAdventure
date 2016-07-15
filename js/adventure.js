(function(ns) {
    'use strict';
    window.adventure = ns = (ns || {});

    var $storyArea = $('.story-list-view');
    var $actionsArea = $('.story-step-view');

    ns.initGame = function initGame() {
        $storyArea
            .show()
            .append('<li class="story1">\
                        <h2>Story 1</h2>\
                        <button data-id=1>Begin Story 1</button>\
                     </li>')
            .append('<li class="story2">\
                        <h2>Story 2</h2>\
                        <button data-id=2>Begin Story 2</button>\
                     </li>');
    }

    // ns.$storyArea.on( 'click', function chooseStory(e) {
    //     // if ( e.target.attr('data-id') === 1) {
    //         $actionsArea.show();
    //         ns.$storyArea.hide();
    //     // }
    //
    // })

    function gameStory(elem) {

    }
    // $.ajax({
    //     url: 'https://tiydc-coa-1.herokuapp.com/adventure',
    //     method: 'get',
    //     datType: 'json'
    // })
    // .done( displayStory($('.story-list-view ul')) )
    // .fail( handleFail(xhr, $storyArea) );
    //
    // function displayStory(elem) {
    //     //send token
    // }


})(window.adventure);
