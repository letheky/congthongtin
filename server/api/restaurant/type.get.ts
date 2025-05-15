import { GET_RESTAURANT_TYPE } from "../const";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;
  const res = await fetch(`${serverEndpoint}${GET_RESTAURANT_TYPE}`);
  const data = await res.json();
  return data;
});