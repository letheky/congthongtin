import { GET_WEBSITE_PRIVACY_POLICY } from "../const";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;
  try {
    const res = await fetch(`${serverEndpoint}${GET_WEBSITE_PRIVACY_POLICY}`);
    const data = await res.json();
    return data;
  }
  catch (error: unknown) {
    console.error("[Setup Privacy-Policy Fetched Error]", error);

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