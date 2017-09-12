
const widthEditor = document.querySelector('.js-width-editor');
const heightEditor = document.querySelector('.js-height-editor');

const demoTarget = document.querySelector('.js-size-watcher');


/*
    Some greatest common divisor calculation I found from stackOverflow
 */

function gcd(x, y) {
     if (y > x) {
          temp = x;
          x = y;
          y = temp;
     }

     while(y !== 0) {
          const m = x % y;
          x = y;
          y = m;
     }
     return x;
}

const ratio = (x, y) => {
     var c = gcd(x, y);
     const valueA = x / c;
     const valueB = y / c;

     return [valueA, valueB];
}

const bigRound = value => Math.floor(value / 50) * 50;

/**
 * This is where we define what ratios are a specific shape.
 * It's a list of paired numbers like '4:3'
 */

const SHAPES = {
    SQUARE: [[1, 1], [3, 3]],
    RECTANGLE_SMALL_WIDE: [[3, 2], [4, 3], [6, 5]],
    RECTANGLE_WIDE: [[3, 1], [5, 3], [2, 1]],
    RECTANGLE_SMALL_TALL: [[2, 3], [3, 4], [5, 4]],
    RECTANGLE_TALL: [[1, 3], [3, 5]],
    EXTREME_NARROW_WIDE: [[5, 1], [6, 1], [7, 1], [4, 1]]
};

const findClassWithMatch = target => keyword =>
    target.classList.value
        .split(' ')
        .find(v => v.includes(keyword));

const replaceClass = target => (keyword, newClassName) => {
    // some janky class replacement I threw together
     const currentClassName = findClassWithMatch(target)(keyword);
     target.classList.remove(currentClassName);
     target.classList.add(newClassName);
}

/*
 * This is our class name dictionary based on shape
 */

const SHAPE_CLASS = {
    SQUARE: 'aspect-ratio--square',
    RECTANGLE_SMALL_WIDE: 'aspect-ratio--rectangle-small-wide',
    RECTANGLE_WIDE: 'aspect-ratio--rectangle-wide',
    RECTANGLE_SMALL_TALL: 'aspect-ratio--rectangle-small-tall',
    RECTANGLE_TALL: 'aspect-ratio--rectangle-tall',
    EXTREME_NARROW_WIDE: 'aspect-ratio--rectangle-narrow-wide'
};

/**
 * This is the code to find the first match in the shape dictionary
 */
const findShape = dimensions => {
    console.log('dimension', dimensions);
    return Object.keys(SHAPES)
        .find(v => SHAPES[v]
            .find(shape => shape.every((s, index) =>
                dimensions[index] === s)));
}

const simplePipe = (func1, func2) => (...args) => func2(func1(...args));

const pipe = (...funcs) => funcs.reduce((simplePipe));

const calcRatioAndFindShape = pipe(ratio, findShape);


if (typeof ResizeObserver !== 'undefined') {

    const elementSizes = new ResizeObserver(r => r.forEach(reportSize));

    const elementsToWatch = Array.from(document.querySelectorAll('.js-size-watcher'));

    const reportSize = entry => {

        const {contentRect, target} = entry;
        const {width, height} = contentRect;

        const ratio = calcRatioAndFindShape(bigRound(width), bigRound(height));

        if (SHAPE_CLASS[ratio]) {
            console.log('item has new ratio', ratio);
            replaceClass(target)('aspect-ratio', SHAPE_CLASS[ratio]);
        }

    }

    elementsToWatch.forEach(element => {
        console.log('watching element', element);
        elementSizes.observe(element);
    });
}


const adjustSize = dimension => e => {
    demoTarget.style[dimension] = `${e.target.value}px`;
}

heightEditor.addEventListener('change', adjustSize('height'), false);
widthEditor.addEventListener('change', adjustSize('width'), false);
