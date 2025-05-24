import { GET_STAY } from "../const";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;

  const id = getRouterParam(event, 'id');
  try {

    const res = await fetch(`${serverEndpoint}${GET_STAY}${id}/rate/`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(await readBody(event)),
    });
    const data = await res.json();
    return data;
  }
  catch (error: unknown) {
    console.error("[Stay Rate Posted Error]", error);

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