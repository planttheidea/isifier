import is from '../src';

console.log(is.string('foo'));
console.log(is.number(123));

console.log(is.plainArray([]));
console.log(is.plainObject({}));

console.log(is.date(new Date()));
console.log(is.error(new Error()));

console.log(is.array([]));

is.addTest('equal', (value1, value2) => value1 === value2);

console.log(is.equal('foo', 'foo'));

console.log(is);

document.body.style.backgroundColor = '#1d1d1d';
document.body.style.color = '#d5d5d5';
document.body.style.margin = 0;
document.body.style.padding = 0;

const div = document.createElement('div');

div.textContent = 'Check the console for details.';

document.body.appendChild(div);
