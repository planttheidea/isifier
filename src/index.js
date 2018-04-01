/**
 * @constant {Object} is the namespace for all validity checks
 */
const is = Object.create({
  /**
   * @function addTest
   *
   * @description
   * add a new test to the is namespace
   *
   * @param {string} name the name of the new validation method
   * @param {function(...Array<any>): boolean} validator the method to test validation of
   */
  addTest(name, validator) {
    is[name] = validator;

    if (validator.length === 1) {
      is.all[name] = function() {
        for (let index = 0; index < arguments.length; index++) {
          if (!validator(arguments[index])) {
            return false;
          }
        }

        return true;
      };

      is.any[name] = function() {
        for (let index = 0; index < arguments.length; index++) {
          if (validator(arguments[index])) {
            return true;
          }
        }

        return false;
      };
    }
  }
});

is.all = {};
is.any = {};

export default is;
