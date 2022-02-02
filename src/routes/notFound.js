import { sendResponseHtml } from '../lib/responses'

export const notFound = (request) => {
   return sendResponseHtml(`Cannot <code>${request.method} ${new URL(request.url).pathname}</code>`, 404);
}
