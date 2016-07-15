(function(ns) {
    'use strict';
    window.adventure = ns = (ns || {});

    var $actionsArea = $('.story-step-view');
    var $storyText = $('.story-text');

    //show first step story
    ns.initStory = function initStory() {
        $actionsArea.show();
    }


})(window.adventure);
