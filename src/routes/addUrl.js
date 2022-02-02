import { getJsonObjectFromString, isJsonEmpty } from '../lib/helpers';
import { responseEmptyVariablePassed, responseInvalidJsonPassed, responseKeyAdded, responseVariableNotPassed, sendResponseJson } from '../lib/responses';
import { handleDuplicateKey, handleFunctions, handleInvalidUrl } from '../lib/routeHelpers';

export const addUrl = async (request) => {
   let response;

   const requestData = getJsonObjectFromString(JSON.stringify(await request.json()));

   if (isJsonEmpty(requestData)) {
      response = responseInvalidJsonPassed();
   } else {
      const { alias, url } = requestData;
      if (alias && url) {
         if (alias !== '' && url !== '') {
            response = await handleFunctions([[handleDuplicateKey, [alias]], [handleInvalidUrl, [url]]]);
            if (response === undefined) {
               await URLS.put(alias, url);
               response = responseKeyAdded(alias, url);
            }
         } else {
            reponse = responseEmptyVariablePassed(['alias', 'url']);
         }
      } else {
         response = responseVariableNotPassed(['alias', 'url']);
      }
   }
   return sendResponseJson(response);
}
