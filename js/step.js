(function(ns) {
    'use strict';
    window.adventure = ns = (ns || {});

    var $actionsArea = $('.story-step-view');
    var $storyText = $('.story-text');
    var $option = $('.option');
    var $buttonA = $('.buttonA');
    var $buttonB = $('.buttonB');
    var $optAtxt = $('.option-a');
    var $optBtxt = $('.option-b');
    var $theEnd = $('.story-end');

    ns.initStory = function initStory() {
        $actionsArea.show();

        $.ajax({
            url: 'https://tiydc-coa-1.herokuapp.com/step/' + ns.firstStepID,
            headers: { 'Authorization': ns.token },
            method: 'get',
            dataType: 'json'
        })
        .done(function startStep(data) {
            ns.nextStep(data);
        })
        .fail( ns.error );
    }

    $option.on('click', function chooseButton(e) {

        if ( $buttonA.attr('data-option') === 'a') {
            chooseOptA();
            console.log('a chosen');
        } else {
            chooseOptB();
            console.log('b chosen');
        }
    });

    function chooseOptA() {
        $.ajax({
            url: 'https://tiydc-coa-1.herokuapp.com/step/' + ns.optAstep,
            method: 'get',
            headers: { 'Authorization': ns.token },
            dataType: 'json'
        })
        .done(function nextStepOptions(data) {
            ns.nextStep(data);
        })
        .fail( ns.error );
    }

    function chooseOptB() {
        $.ajax({
            url: 'https://tiydc-coa-1.herokuapp.com/step/' + ns.optBstep,
            method: 'get',
            headers: { 'Authorization': ns.token },
            dataType: 'json'
        })
        .done(function nextStepOptions(data) {
            ns.nextStep(data);
        })
        .fail( ns.error );
    }

    ns.nextStep = function getStepData(data) {
        ns.theEnd = data.termination;
        ns.optAstep = data.option_a_step_id;
        ns.optBstep = data.option_b_step_id;

        $storyText.text(data.body);
        console.log(data);

        endStory(data);
    }

    function endStory(data) {
        if (ns.theEnd === false) {
            $optAtxt.text(data.option_a_text);
            $buttonA.attr('data-option', 'a');

            $optBtxt.text(data.option_b_text);
            $buttonB.attr('data-option', 'b');
        } else {
            $option.hide();
            $theEnd.show();
            console.log('end game');
        }
    }

})(window.adventure);
