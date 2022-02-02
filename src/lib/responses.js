import { arrayWithConjuctionAsString } from './helpers';

/**
 * Returns `{object}` to be send when the passed key is not exist
 * @returns {Object}
 */
export const responseKeyNotExists = (key) => { return { message: `Key ${key} doesn't exists`, status: 400 } }

/**
 * Returns `{object}` to be send when trying to insert data for existing key
 * @returns {Object}
 */
export const responseInsertOnExistingKey = (key) => { return { message: `Trying to add a new value for existing key '${key}'`, status: 200 } }

/**
 * Returns `{object}` to be send on invalid URL passed
 * @returns {Object}
 */
export const responseInvalidUrl = () => { return { message: 'Invalid URL passed', status: 400 } }

/**
 * Returns `{object}` to be send on empty body passed
 * @returns {Object}
 */
export const responseInvalidJsonPassed = () => { return { message: 'Body can not be empty', status: 400 } }

/**
 * Retruns `{object}` to be send as a successful inserting of the `key`
 * @param {String} key Key or alias name of the
 * @param {String} value Value of the `key`
 * @returns {Object} 
 */
export const responseKeyAdded = (key, value) => { return { message: `Key '${key}' with value '${value}' added successfully`, status: 201 } }

/**
 * Retruns `{object}` to be send as a successful updation of the `key`
 * @param {String} key Key for which the value has been changed
 * @param {String} newValue Value that replaced older value for the `key`
 * @returns {Object} 
 */
export const responseValueUpdated = (key, newValue) => { return { message: `'${key}' is updated to '${newValue}'`, status: 201 } }

/**
 * Retruns `{object}` to be send as a successful deletion of the `key`
 * @param {String} key Key which is deleted from the KV storage
 * @returns {Object} 
 */
export const responseKeyDeleted = (key) => { return { message: `Key '${key}' removed`, status: 200 } }

/**
 * Returns response to be send if variable(s) passed in the request are empty
 * @param {Array|String} names Name of variable(s) 
 * @returns {Object} response object
 */
export const responseEmptyVariablePassed = (names) => {
   let varListAsString = names;
   if (Array.isArray(names)) {
      varListAsString = arrayWithConjuctionAsString(names);
   }
   return { message: `${varListAsString} can not be empty`, status: 400 }
}

/**
 * Returns response to be send if variable(s) not passed in the request
 * @param {Array|String} names Name of variable(s) 
 * @returns {Object} response object
 */
export const responseVariableNotPassed = (names) => {
   let varListAsString = '';
   if (Array.isArray(names)) {
      varListAsString = arrayWithConjuctionAsString(names);
      varListAsString = ((names.length > 1) ? `Variables ${varListAsString} are` : `Variable ${varListAsString} is`);
   } else {
      varListAsString = `Variable ${names} is`;
   }
   return { message: `${varListAsString} not present`, status: 400 }
}

/**
 * Returns `{Response}` object 
 * @param {Object} response data to be send as a response
 * @returns {Response}
 */
export const sendResponseJson = (response, status = 200) => {
   return new Response(JSON.stringify(response), {
      headers: { 'content-type': 'application/json' },
      status: response.status ? response.status : status
   });
}

/**
 * Returns HTML text 
 * @param {String} response HTML data to be send as a response
 * @param {number} statusCode status code of the response
 * @returns {Response}
 */
export const sendResponseHtml = (response, statusCode = 200) => {
   return new Response(response, {
      headers: { 'content-type': 'text/html' },
      status: statusCode
   });
}
