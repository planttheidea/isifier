import is from '../src';

document.body.style.backgroundColor = '#1d1d1d';
document.body.style.color = '#d5d5d5';
document.body.style.margin = 0;
document.body.style.padding = 0;

const div = document.createElement('div');

div.textContent = 'Check the console for details.';

document.body.appendChild(div);

console.log(is);

const createIsType = (type) => (value) => typeof value === type;

is.addTest('string', createIsType('string'));

console.log(is.string('foo'));

is.addTest('number', createIsType('number'));

console.log(is.number(123));

is.addTest('plainArray', (value) => !!value && value.constructor === Array);

console.log(is.plainArray([]));

is.addTest('plainObject', (value) => !!value && value.constructor === Object);

console.log(is.plainObject({}));

is.addTest('date', (value) => value instanceof Date);

console.log(is.date(new Date()));

is.addTest('error', (value) => value instanceof Error);

console.log(is.error(new Error()));

is.addTest('array', Array.isArray);

console.log(is.array([]));

is.addTest('equal', (value1, value2) => value1 === value2);

console.log(is.equal('foo', 'foo'));

console.log(is);
