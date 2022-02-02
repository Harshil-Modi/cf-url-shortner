import { responseInsertOnExistingKey, responseInvalidUrl, responseKeyNotExists } from './responses';

/**
 * Checks whether `url` is a valid URL or not
 * @param {String} url Value for which to check
 * @returns {(true|Object)} Returns `true` for valid URL, `Object` otherwise
 */
export const handleInvalidUrl = (url) => {
   try {
      new URL(url);
      return true;
   } catch (e) {
      return responseInvalidUrl();
   }
}

/**
 * Checks whether `key` exists or not in KV storage. Similar to `!handleDuplicateKey(key)`, but different response object
 * @param {String} key Value for which to check
 * @returns {(true|Object)} Returns `true` if 'key' exists, `Object` otherwise
 * 
 */
export const handleKeyNotExists = async (key) => {
   const value = await URLS.get(key);
   return value ? true : responseKeyNotExists(key);
}

/**
 * Checks whether `key` exists or not in KV storage. Similar to `!handleKeyNotExists(key)`, but different response object
 * @param {String} key Value for which to check
 * @returns {(true|Object)} Returns `true` if 'key' does not exists, `Object` otherwise
 * 
 */
export const handleDuplicateKey = async (key) => {
   return (await handleKeyNotExists(key)) === true ? responseInsertOnExistingKey(key) : true;
}

/**
 * Returns response from functions
 * @param {Array} functionsToHandle 
 * @returns {(undefined|Object)} Returns `undefined` if no errors are found by callback functions, `Object` otherwise
 * 
 * Pass array of callback methods and their parameters like 
 * 
 * `[[fun1, [fun1_param1, fun1_param2, ...]], [fun2, [fun2_param1, fun2_param2, ...]], ...]`
 */
export const handleFunctions = async (functionsToHandle) => {
   let response;
   for (var i = 0; i < functionsToHandle.length; ++i) {
      response = await functionsToHandle[i][0].apply(this, functionsToHandle[i][1]);
      // 'true' means no acknowledge to the requester
      if (response !== true) {
         break;
      }
      // undefining the response, because there is no error or in other words object is not returned by any callback functions
      response = undefined;
   }
   return response;
}
