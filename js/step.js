(function(ns) {
    'use strict';
    window.adventure = ns = (ns || {});

    var $actionsArea = $('.story-step-view');
    var $storyText = $('.story-text');
    var $option = $('.option');
    var $optButtonID = $('.data-option');
    var $optAtxt = $('.option-a');
    var $optBtxt = $('.option-b');
    var $optAstep;
    var $optBstep;

    //show first step story
    ns.initStory = function initStory() {
        $actionsArea.show();
        // console.log('first step', ns.firstStepID);

        $.ajax({
            url: 'https://tiydc-coa-1.herokuapp.com/step/' + ns.firstStepID,
            headers: {
                'Authorization': ns.token
            },
            method: 'get',
            dataType: 'json'
        })
        .done(function startStep(data) {
            $storyText.text(data.body);

            $optAtxt
                .text(data.option_a_text);
            $('.buttonA')
                .attr('data-option', 'a');

            $optBtxt
                .text(data.option_b_text);
            $('.buttonB')
                .attr('data-option', 'b');

            console.log(data);
        })
        .fail(ns.error);
    };

    $('.option').on('click', function chooseButton() {
        $.ajax({
            url: 'https://tiydc-coa-1.herokuapp.com/step/next',
            method: 'get',
            headers: {
                'Authorization': ns.token
            },
            dataType: 'json'

        })
        .done(function chooseStep(data) {
            // if ( this.$('.button').attr('data-option') === 'a') {
            //     console.log('aaaaaaaa');
            // };
            console.log('yesyes');
        })
        .fail(ns.error);
    });

})(window.adventure);
