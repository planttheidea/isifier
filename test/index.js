// test
import test from 'ava';

// src
import is, {createInstance} from 'src/index';

test('if the only default properties on the object is "all" and "any"', (t) => {
  t.deepEqual(is, {
    all: {},
    any: {}
  });
});

test('if addTest will create a custom validator', (t) => {
  const validator = (value) => typeof value === 'string';

  is.addTest('string', validator);

  t.is(typeof is.string, 'function');

  t.true(is.string('foo'));
  t.false(is.string(123));
});

test('if addTest will create a custom validator for all and any', (t) => {
  const validator = (value) => typeof value === 'number';

  is.addTest('number', validator);

  t.is(typeof is.number, 'function');

  t.true(is.all.number(123, 456.78));
  t.false(is.all.number(123, 'foo'));

  t.true(is.any.number(123, 'foo'));
  t.false(is.any.number('foo', /bar/));
});

test('if addTest will not create a custom validator for all and any if the function is not unary', (t) => {
  const validator = (value, index) => index > 0 || value === 'foo';

  is.addTest('custom', validator);

  t.true(is.custom('foo', 0));
  t.true(is.custom('bar', 1));

  t.false(is.all.hasOwnProperty('custom'));
  t.false(is.any.hasOwnProperty('custom'));
});

test('if createInstance will create an isolated instance of the is object', (t) => {
  const instance = createInstance();

  t.is(typeof instance.addTest, 'function');
  t.true(instance.hasOwnProperty('all'));
  t.true(instance.hasOwnProperty('any'));

  t.not(instance, is);
});
