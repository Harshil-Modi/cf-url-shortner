import { getKeyFromUrl } from "../lib/helpers";
import { notFound } from "./notFound";

export const getUrl = async (request) => {
   /**
    * This route redirects to the url the key points to
    * i.e. if key-value is linkedin-https://linkedin.com
    * then [PROTOCOL]://[HOST]/urls/linkedin will redirects to https://linkedin.com
    */
   const requestedUrl = getKeyFromUrl(request.url);

   // value of the key
   const redirectingUrl = await URLS.get(requestedUrl);

   if (redirectingUrl) {
      // requested key found
      return Response.redirect(redirectingUrl, 301);
   } else {
      // requested key not found
      return notFound(request);
   }
}
