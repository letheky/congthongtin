import { GET_POSITION_SERVICE } from "../const";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;

  try {
    const res = await fetch(`${serverEndpoint}${GET_POSITION_SERVICE}`);

    if (!res.ok) {
      throw createError({
        statusCode: res.status,
        statusMessage: `Failed to fetch position service: ${res.statusText}`,
      });
    }

    const data = await res.json();
    return data;
  } catch (error: unknown) {
    console.error("[Position Service Error]", error);

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
