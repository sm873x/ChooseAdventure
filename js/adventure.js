(function(ns) {
    'use strict';
    window.adventure = ns = (ns || {});

    var $storyArea = $('.story-list-view');
    var adventures = [];
    var chosenStory = {};

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
        storyArr.forEach(function addStory(story){
            $storyArea
                .find('ul')
                .append('<li class="aStory">\
                            <h2>' + story.title + '</h2>\
                            <button class="storyButton" data-id=' + story.id + '>Begin ' + story.title + '</button>\
                         </li>')
        });
    }

    $storyArea.on( 'click', '.storyButton', function chooseStory() {
            var id = $(this).attr('data-id');
                console.log(id);

            // $.ajax({
            //     url:
            // });

            $storyArea.hide();
            ns.initStory();
        });

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
