(function(){
    'use strict';

    const query = selector => document.querySelector(selector);

    if (typeof ResizeObserver !== 'undefined') {

        const setVariable = target => (varName, value) => {
            target.style.setProperty(varName, value);
        }

        const reportSize = entry => {
            const {contentRect, target} = entry;
            const {width, height} = contentRect;

            const setTarget = setVariable(target);
            setTarget('--element-width', width);
            setTarget('--element-height', height);
        }

        const elementSizes = new ResizeObserver(v => v.forEach(reportSize));

        const elementsToWatch = Array.from(document.querySelectorAll('.js-size-watcher'));

        elementsToWatch.forEach(element => {
            elementSizes.observe(element);
        });


    }

})();
