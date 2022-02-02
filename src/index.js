import Router from './lib/router';
import { addUrl } from './routes/addUrl';
import { deleteUrl } from './routes/deleteUrl';
import { editUrl } from './routes/editUrl';
import { getAllUrls } from './routes/getAllUrls';
import { getUrl } from './routes/getUrl';
import { home } from './routes/home';
import { notFound } from './routes/notFound';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const router = new Router();

  router.get('/', () => home());
  router.get('/urls/?', () => getAllUrls(request));
  router.get('/urls/.+', () => getUrl(request));
  router.post('/urls/?', () => addUrl(request));
  router.post('/urls/.+', () => editUrl(request));
  router.delete('/urls/.+', () => deleteUrl(request));
  router.all((request) => notFound(request));

  return await router.route(request);
}
