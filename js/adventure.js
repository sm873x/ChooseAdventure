(function(ns) {
    'use strict';
    window.adventure = ns = (ns || {});

    var $storyArea = $('.story-list-view');
    var adventures = [];

    ns.initUI = function initUI() {
        console.log('initiating UI and start game');
        ns.$loginArea.hide();

        $.ajax({
                url: 'https://tiydc-coa-1.herokuapp.com/adventure',
                method: 'get',
                headers: {'Authorization': ns.token},
                dataType: 'json'
            })
            .done(function adventuresList(data) {
                adventures = data;
                $storyArea.show();
                console.log(adventures);

                addStories(adventures);
            } )
            .fail(ns.error);
        }

    function addStories(storyArr) {
        storyArr.forEach(function addStory(){
            $storyArea
                .append('<li class="story1">\
                            <h2>' + adventures[0].title + '</h2>\
                            <button data-id=1>Begin Story 1</button>\
                         </li>')
        })
    }

    ns.initGame = function initGame() {
        $storyArea.on( 'click', function chooseStory(e) {
            e.target.hide();
            ns.initStory();
        });
    };
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
