import { GET_TRIP } from "../const";

export default defineEventHandler(async (event)=>{
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;

  const id = getRouterParam(event, 'id');
  const res = await fetch(`${serverEndpoint}${GET_TRIP}${id}`);
  const data = await res.json();
  return data;
})