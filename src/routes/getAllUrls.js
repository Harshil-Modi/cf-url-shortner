import { sendResponseJson } from "../lib/responses";

export const getAllUrls = async (request) => {
   const urlsList = await URLS.list();
   const urls = urlsList['keys'];
   const hostOrigin = new URL(request.url).origin;

   let urlsVals = [];
   for (const alias of urls) {
      urlsVals.push({
         alias: alias['name'],
         url: await URLS.get(alias['name']),
         'sharable-url': `${hostOrigin}/urls/${alias['name']}`
      });
   }
   return sendResponseJson(urlsVals);
}
