import { sendResponseHtml } from "../lib/responses";

export const home = () => {
   return sendResponseHtml('A private service that shortens an URL, and redirects to the original URL.');
}
