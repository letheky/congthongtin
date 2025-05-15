import { GET_ALL_EVENT_CATEGORY } from "../const";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;
  try {
    const res = await fetch(`${serverEndpoint}${GET_ALL_EVENT_CATEGORY}`);
    const data = await res.json();
    return data;
  }
  catch (error: unknown) {
    console.error("[Event categories Fetched Error]", error);

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
});