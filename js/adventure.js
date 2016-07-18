(function(ns) {
    'use strict';
    window.adventure = ns = (ns || {});

    var $storyArea = $('.story-list-view');
    var adventures = [];
    var adventureID;

    /**
     * Initialize UI to start game with list of available adventure options
     * @return {void}
     */
    ns.initUI = function initUI() {
        console.log('initiating UI and start game');
        ns.$loginArea.hide();

        $.ajax({
                url: 'https://tiydc-coa-1.herokuapp.com/adventure',
                method: 'get',
                headers: { 'Authorization': ns.token },
                dataType: 'json'
            })
            .done(function adventuresList(data) {
                adventures = data;
                $storyArea.show();
                console.log(adventures);

                addStories(adventures);
            } )
            .fail( ns.error );
        };

    $storyArea.on( 'click', '.storyButton', function chooseStory() {
        adventureID = $(this).attr('data-id');
        console.log('adventureID', adventureID);

        $.ajax({
            url: 'https://tiydc-coa-1.herokuapp.com/adventure/' + adventureID,
            method: 'get',
            headers: { 'Authorization': ns.token },
            dataType: 'json'
        })
        .done(function(data){
            ns.firstStepID = data.first_step_id;
            ns.initStory();
            console.log('adv xhr', data);
            console.log('first step', ns.firstStepID);
        })
        .fail( ns.error );

        $storyArea.hide();
    });

    /**
     * List every story and include title and button to play that adventure.
     * @param {array} storyArr Array that keeps list of all available stories
     */
    function addStories(storyArr) {
        storyArr.forEach(function addStory(story){
            $storyArea
                .find('ul')
                .append('<li class="aStory">\
                            <h2>' + story.title + '</h2>\
                            <button class="storyButton" data-id=' + story.id + '>\
                            Begin ' + story.title + '</button>\
                         </li>');
        });
    }

})(window.adventure);
