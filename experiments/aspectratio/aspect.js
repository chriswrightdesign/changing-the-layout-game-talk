/* euclidean GCD (feel free to use any other) */
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

     console.log('a b', [valueA, valueB]);
     return [valueA, valueB];
}

const bigRound = value => Math.floor(value / 50) * 50;

// these need to have potentially multiple configurations
const SHAPES = {
    SQUARE: [[1, 1], [3, 3]],
    RECTANGLE_SMALL_WIDE: [[3, 2], [4, 3]],
    RECTANGLE_WIDE: [[3, 1]],
    RECTANGLE_SMALL_TALL: [[2, 3], [3, 4]],
    RECTANGLE_TALL: [[1, 3]],
};

const findClassWithMatch = target => keyword =>
    target.classList.value
        .split(' ')
        .find(v => v.includes(keyword));

const replaceClass = target => (keyword, newClassName) => {
     const currentClassName = findClassWithMatch(target)(keyword);
     target.classList.remove(currentClassName);
     target.classList.add(newClassName);
}

const SHAPE_CLASS = {
    SQUARE: 'aspect-ratio--square',
    RECTANGLE_SMALL_WIDE: 'aspect-ratio--rectangle-small-wide',
    RECTANGLE_WIDE: 'aspect-ratio--rectangle-wide',
    RECTANGLE_SMALL_TALL: 'aspect-ratio--rectangle-small-tall',
    RECTANGLE_TALL: 'aspect-ratio-rectangle-tall'
};

const findShape = dimensions => {
    return Object.keys(SHAPES)
        .find(v => SHAPES[v]
            .find(shape => shape.every((s, index) =>
                dimensions[index] === s)));
}

const simplePipe = (func1, func2) => (...args) => func2(func1(...args));

const pipe = (...funcs) => funcs.reduce((simplePipe));

const calcRatioAndFindShape = pipe(ratio, findShape);


const setVariable = target => (varName, value) => {
    target.style.setProperty(varName, value);
}

const getVariable = target =>
    variableName => getComputedStyle(target).getPropertyValue(variableName);


if (typeof ResizeObserver !== 'undefined') {
const elementSizes = new ResizeObserver(r => r.forEach(reportSize));

const elementsToWatch = Array.from(document.querySelectorAll('.js-size-watcher'));

const reportSize = entry => {

    const {contentRect, target} = entry;
    const {width, height} = contentRect;

    const setTarget = setVariable(target);
    setTarget('--element-width', width);
    setTarget('--element-height', height);

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
