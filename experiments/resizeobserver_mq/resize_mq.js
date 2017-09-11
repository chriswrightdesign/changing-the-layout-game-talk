const targetContainer = document.querySelector('.js-size-watcher');

const targetComponent = document.querySelector('.js-size-target');

const toInt = value => parseInt(value, 10);

const setVariable = target => (varName, value) => {
    target.style.setProperty(varName, value);
}


const getComputedVariable = target => variableName => {
    const styles = getComputedStyle(targetComponent);
    const currentStyle = styles.getPropertyValue(variableName);
    return currentStyle;
}

const getVariable = targetElement =>
    variableName => getComputedStyle(targetElement).getPropertyValue(variableName);

const getMediaCondition = (width, queryMin, queryMax) => {

    const {clientWidth} = document.documentElement;

    return width >= toInt(queryMin) && width <= toInt(queryMin) ? width : (toInt(clientWidth) + toInt(queryMin));
}

const elementQuery = (target, size) => {
    const {width, height} = size;

    const variable = getComputedVariable(targetComponent);

    const queryClass = variable('--targetQueryClass').trim();

    const queryMin = variable('--targetQuerySizeMin');

    const queryMax = variable('--targetQuerySizeMax')

    const matchMq = getMediaCondition(width, queryMin, queryMax);

    if (window.matchMedia(`(min-width: ${matchMq}px)`).matches) {
        if(!target.classList.contains(queryClass)) {
            targetComponent.classList.add(queryClass);
        }
    } else {
        targetComponent.classList.remove(qClass);
    }
}



const reportSize = entry => {
    const {contentRect, target} = entry;
    const {width, height} = contentRect;
    elementQuery(target, {width, height});
}


const sizeWatcher = new ResizeObserver(entries => entries.forEach(reportSize));

sizeWatcher.observe(targetContainer);
