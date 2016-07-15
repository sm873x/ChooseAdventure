(function(ns) {
    'use strict';
    window.adventure = ns = (ns || {});

    var $storyArea = $('.story-list-view');
    ns.adventures = [];

    function addStories() {
        ns.adventures.forEach(story)
    }
    // $storyArea
    //         .show()
    //         .append('<li class="story1">\
    //                     <h2>Story 1</h2>\
    //                     <button data-id=1>Begin Story 1</button>\
    //                  </li>')
    //         .append('<li class="story2">\
    //                     <h2>Story 2</h2>\
    //                     <button data-id=2>Begin Story 2</button>\
    //                  </li>');

    ns.initGame = function initGame() {
        $storyArea.on( 'click', function chooseStory(e) {
            e.target.hide();
            ns.initStory();
        });
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
