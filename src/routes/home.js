import { sendResponseHtml } from "../lib/responses";

export const home = () => {
   return sendResponseHtml('A service for customizing shared URLs.');
}
