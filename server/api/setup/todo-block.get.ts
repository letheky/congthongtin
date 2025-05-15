import { GET_TODO_BLOCK } from "../const";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;
  const res = await fetch(`${serverEndpoint}${GET_TODO_BLOCK}`);
  const data = await res.json();
  return data;
});