const targetContainer = document.querySelector('.js-size-watcher');

const targetComponent = document.querySelector('.js-size-target');

const toInt = value => parseInt(value, 10);

const getVariable = targetElement =>
    variableName => getComputedStyle(targetElement).getPropertyValue(variableName);

const matchesMediaCondition = (width, queryMin, queryMax) => {
    const matchesMin = width >= toInt(queryMin);
    const matchesMax = width <= toInt(queryMax);
    return matchesMin && matchesMax;
}

/**
 * This version will only let you add a single query,
 * but with a bit of tweaking you could make it accept
 * any number of queries
 */

const containerQuery = (target, size) => {
    const {width, height} = size;

    const variable = getVariable(targetComponent);

    const queryClass = variable('--targetQueryClass').trim();

    const queryMin = variable('--targetQuerySizeMin');

    const queryMax = variable('--targetQuerySizeMax');

    const matchMq = matchesMediaCondition(width, queryMin, queryMax);

    const action = matchMq && !target.classList.contains(queryClass) ? 'add' : 'remove';

    targetComponent.classList[action](queryClass);
}

const reportSize = entry => {
    const {contentRect, target} = entry;
    const {width, height} = contentRect;
    containerQuery(target, {width, height});
}

const sizeWatcher = new ResizeObserver(entries => entries.forEach(reportSize));

sizeWatcher.observe(targetContainer);
