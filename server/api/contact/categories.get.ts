import { GET_ALL_CONTACT_CATEGORY } from "../const";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;
  const res = await fetch(`${serverEndpoint}${GET_ALL_CONTACT_CATEGORY}`);
  const data = await res.json();
  return data;
});