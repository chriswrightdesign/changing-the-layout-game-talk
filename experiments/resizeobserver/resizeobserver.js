

const resizable = document.querySelector('.js-resizable');

const reporter = document.querySelector('.js-reporter');

// watching

const elementSizes = new ResizeObserver(r => r.forEach(reportSize));

const elementsToWatch = Array.from(document.querySelectorAll('.js-resizable'));

const reportSize = entry => {
    const {contentRect, target} = entry;
    const {width, height} = contentRect;
    reporter.textContent = `${width.toFixed(1)}`;
}

elementSizes.observe(resizable);
