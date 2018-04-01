/**
 * @function createInstance
 *
 * @description
 * create a new isifier instance
 *
 * @returns {Object} the isifier instance
 */
export const createInstance = () => {
  /**
   * @constant {Object} is the namespace for all validity checks
   */
  const is = Object.create({
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

  return is;
};

export default createInstance();
