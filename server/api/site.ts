export default defineEventHandler(async (event) => {
  //Get server endpoint from .env
  const config = useRuntimeConfig(event);
  const serverEndpoint = config.public.serverEndpoint;

  //Get lang from query
  const query = getQuery(event); 
  const lang = query.lang;

  //Fetch data from server
  const response = await fetch(`${serverEndpoint}/Site?lang=${lang}`);
  const data = await response.json();
  return data;
});
