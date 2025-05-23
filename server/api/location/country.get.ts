import { GET_ALL_COUNTRY } from "../const";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;

  try {
    const res = await fetch(`${serverEndpoint}${GET_ALL_COUNTRY}?page_size=${10000}`);
    const data = await res.json();
    return data;
  }
  catch (error: unknown) {
    console.error("[Location Country Fetched Error]", error);

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