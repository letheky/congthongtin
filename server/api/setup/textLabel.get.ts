import { GET_WEBSITE_TEXT_LABEL } from "../const";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;

  try {
    const res = await fetch(`${serverEndpoint}${GET_WEBSITE_TEXT_LABEL}`);

    if (!res.ok) {
      throw createError({
        statusCode: res.status,
        statusMessage: `Failed to fetch text labels: ${res.statusText}`,
      });
    }

    const data = await res.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: unknown) {
    console.error("[Setup text label Fetched Error]", error);

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
