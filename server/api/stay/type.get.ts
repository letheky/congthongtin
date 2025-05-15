import { GET_STAY_TYPE } from "../const";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;
  try {
    const res = await fetch(`${serverEndpoint}${GET_STAY_TYPE}`);
    const data = await res.json();
    return data;
  }
  catch (error: unknown) {
    console.error("[Stay Type Fetched Error]", error);

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