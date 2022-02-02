import { getKeyFromUrl } from '../lib/helpers';
import { responseKeyDeleted, sendResponseJson } from '../lib/responses';
import { handleKeyNotExists } from '../lib/routeHelpers';

export const deleteUrl = async (request) => {
   // key: https://[HOST]/urls/key 
   const key = getKeyFromUrl(request.url);
   let response = await handleKeyNotExists(key);

   if (response === true) {
      await URLS.delete(key);
      response = responseKeyDeleted(key);
   }
   return sendResponseJson(response);
}
