import { getJsonObjectFromString, getKeyFromUrl, isJsonEmpty } from "../lib/helpers";
import { responseInvalidJsonPassed, responseValueUpdated, responseVariableNotPassed, sendResponseJson } from "../lib/responses";
import { handleFunctions, handleInvalidUrl, handleKeyNotExists } from "../lib/routeHelpers";

export const editUrl = async (request) => {

   // key: https://[HOST]/urls/key 
   const key = getKeyFromUrl(request.url);
   // url: variable data sent with the request, which contains new value for the 'key'
   const requestData = getJsonObjectFromString(JSON.stringify(await request.json()));
   
   let response;
   console.info(`\n\n\n\nisJsonEmpty(requestData)(): ${isJsonEmpty(requestData)}\n\n\n\n`)
   if (isJsonEmpty(requestData)) {
      response = responseInvalidJsonPassed();
   } else {
      const { url } = requestData;
      if (url) {
         response = await handleFunctions([[handleKeyNotExists, [key]], [handleInvalidUrl, [url]]]);
         if (response === undefined) {
            await URLS.put(key, url);
            response = responseValueUpdated(key, url);
         }
      } else {
         response = responseVariableNotPassed(['url']);
      }
   }
   return sendResponseJson(response);
}
