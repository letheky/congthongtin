import { GET_TRAVEL_UNIT_SERVICE } from "../const";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;
  const res = await fetch(`${serverEndpoint}${GET_TRAVEL_UNIT_SERVICE}`);
  const data = await res.json();
  return data;
});