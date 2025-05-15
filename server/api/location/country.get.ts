import { GET_ALL_COUNTRY } from "../const";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;

  const res = await fetch(`${serverEndpoint}${GET_ALL_COUNTRY}`);
  const data = await res.json();
  return data;
})