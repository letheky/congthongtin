import { GET_WEBSITE_BANNER } from "../const";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;
  const res = await fetch(`${serverEndpoint}${GET_WEBSITE_BANNER}`);
  const data = await res.json();
  return data;
});