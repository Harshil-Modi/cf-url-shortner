/**
 * Returns string of the array with a conjuction
 * 
 * i.e. 
 * if the given array is ['a', 'b', 'c'] then the function
 * will return `a, b and c`
 * @param {Array} arr array which is to be converted in to string
 * @returns {String}
 */
export const arrayWithConjuctionAsString = (arr) => {
   let arrayInString = '';
   if (Array.isArray(arr)) {
      for (let i = 0; i < arr.length; ++i) {
         arrayInString += arr[i] + (
            (i == arr.length - 2) ? ' and ' :
               (i == arr.length - 1) ? '' : ', '
         );
      }
   } else {
      arrayInString = arr;
   }
   return arrayInString;
}

/**
 * Returns key from the `url`
 * @param {String} url URL string from which the 'key' is obtained
 * @returns {String} key from the `url`
 * 
 * i.e if the URL is 'https://workers.dev/urls/key/of/the/url',
 * then this function will return _`key/of/the/url`_
 */
export const getKeyFromUrl = (url) => {
   let { pathname } = new URL(url);
   pathname = pathname.split('/');
   let key = '';
   for (let i = 0; i < pathname.length; ++i) {
      if (i > 1) {
         // (i> 2) is to remove '/' from the begining
         key += ((i > 2) ? '/' : '') + pathname[i];
      }
   }
   return key;
}

/**
 * Returns JSON Object from the string
 * @param {String} str
 * @returns {Object} JSON Object 
 */
export const getJsonObjectFromString = (str) => {
   return (str && str === '' ? {} : JSON.parse(str));
}

/**
 * Checks whether the given JSON object is empty or not
 * @param {Object} json JSON object
 * @returns {boolean}
 */
export const isJsonEmpty = (json) => {
   return json && (Object.keys(json).length === 0) && (Object.getPrototypeOf(json) === Object.prototype);
}
