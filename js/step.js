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
    var $tryAgain = $('.tryAgain');

    /**
     * Initiate chosen adventure and load next step
     * @return {void}
     */
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
    };

    $option.on('click', function chooseButton() {
        if ( $buttonA.attr('data-option') === 'a') {
            chooseOpt(ns.optAstep);
            console.log('a chosen');
        } else {
            chooseOpt(ns.optBstep);
            console.log('b chosen');
        }
    });

    /**
     * Assign variables to next step data and change story text
     * @param  {xhr} data jQuery XHR object
     * @return {void}
     */
    ns.nextStep = function getStepData(data) {
        ns.theEnd = data.termination;
        ns.optAstep = data.option_a_step_id;
        ns.optBstep = data.option_b_step_id;

        $storyText.text(data.body);
        console.log(data);

        storyLoc(data);
    };

    $('.tryAgain').on( 'click', function goBack() {
        $option.show();
        $theEnd.hide();
        $tryAgain.hide();

        goBackOne()
            .done(function reloadStep(data) {
                $storyText.text(data.body);

                ns.theEnd = data.termination;
                ns.optAstep = data.option_a_step_id;
                ns.optBstep = data.option_b_step_id;
            })
            .fail( ns.error );

        console.log('tried again');
    });

    /**
     * Choose option A or B with step id
     * @param  {String} option Step id
     * @return {void}
     */
    function chooseOpt(option) {
        $.ajax({
            url: 'https://tiydc-coa-1.herokuapp.com/step/' + option,
            method: 'get',
            headers: { 'Authorization': ns.token },
            dataType: 'json'
        })
        .done(function nextStepOptions(data) {
            ns.nextStep(data);
        })
        .fail( ns.error );
    }

    /**
     * Determine if the story continues or ends.
     * If adventure continues then it will load new story text and new options.
     * If adventure ends, it will show The End with option to redo the last step.
     * @param  {jquery} data XHR object
     * @return {number} ns.lastStepID The ID number of the last step taken before end was reached
     */
    function storyLoc(data) {
        if (ns.theEnd === false) {
            $optAtxt.text(data.option_a_text);
            $buttonA.attr('data-option', 'a');

            $optBtxt.text(data.option_b_text);
            $buttonB.attr('data-option', 'b');
        } else {
            $option.hide();
            $theEnd.show();
            $tryAgain.show();
            console.log('end game');
        }

        return ns.lastStepID = (data.id)-1;
    }

    /**
     * Once story ends, callback function for data from last step.
     * @return {json} jQuery XHR object
     */
    function goBackOne() {
        return $.ajax({
            url: 'https://tiydc-coa-1.herokuapp.com/step/' + ns.lastStepID,
            method: 'get',
            headers: { 'Authorization': ns.token },
            dataType: 'json'
        });
    }
})(window.adventure);
