import { GET_TOUR } from "../const";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;

  const id = getRouterParam(event, 'id');
  try {
    const res = await fetch(`${serverEndpoint}${GET_TOUR}${id}`);
    const data = await res.json();
    return data;
  }
  catch (error: unknown) {
    console.error("[Tour Detail Fetched Error]", error);

    if (error instanceof Error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Unknown error occurred",
    });
  }
})