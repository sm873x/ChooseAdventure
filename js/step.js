(function(ns) {
    'use strict';
    window.adventure = ns = (ns || {});

    var $actionsArea = $('.story-step-view');
    var $storyText = $('.story-text');
    var $optAtxt = $('.option-a');
    var $optBtxt = $('.option-b');

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
            $optAtxt.text(data.option_a_text);
            $optBtxt.text(data.option_b_text);

            ns.AstepID = data.option_a_step_id;
            ns.BstepID = data.option_b_step_id;

            console.log(data);
        })
        .fail(ns.error);
    };

    $('.option').on('click', function chooseOpt() {
        $.ajax({
            url: 'https://tiydc-coa-1.herokuapp.com/step/next',
            method: 'get',
            headers: {
                'Authorization': ns.token
            },

        });
    });

})(window.adventure);
