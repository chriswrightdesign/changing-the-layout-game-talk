(function(){
    'use strict';

    const select = selector => document.querySelector(selector);

    const grid = select('.js-grid');

    const addItem = () => {
        const div = document.createElement('div');
        div.className = 'l-grid__item grey';
        const item = document.createTextNode('item');
        div.appendChild(item);
        grid.appendChild(div);
    }

    const removeItem = () => {
        grid.removeChild(grid.lastChild);
        console.log('remove');
    }

    const keyMap = {
        39: addItem,
        37: removeItem,
        default: () => console.log('default')
    };

    const keyEvents = e => {
        const key = keyMap[e.keyCode] || keyMap.default;
        key();
    }

    window.addEventListener('keydown', keyEvents, false);


})();
