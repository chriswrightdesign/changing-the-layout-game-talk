

const resizable = document.querySelector('.js-resizable');

const reporter = document.querySelector('.js-reporter');

const elementsToWatch = Array.from(document.querySelectorAll('.js-resizable'));

if (typeof ResizeObserver !== 'undefined') {

    const reportSize = entry => {
        const {contentRect, target} = entry;
        const {width, height} = contentRect;
        reporter.textContent = `${width.toFixed(1)}`;
    }
    const elementSizes = new ResizeObserver(r => r.forEach(reportSize));

    elementSizes.observe(resizable);
}
