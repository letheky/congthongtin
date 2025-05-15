import { GET_TRAVEL_UNIT } from "../const";

export default defineEventHandler(async (event)=>{
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;

  const id = getRouterParam(event, 'id');
  const res = await fetch(`${serverEndpoint}${GET_TRAVEL_UNIT}${id}`);
  const data = await res.json();
  return data;
})