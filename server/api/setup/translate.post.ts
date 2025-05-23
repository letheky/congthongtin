import { GET_WEBSITE_LANGUAGE_TRANSLATE } from "../const";
import type { TranslateBody } from "~/types/translateBody";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;

  const body = await readBody<TranslateBody>(event);
  try {
    const res = await fetch(`${serverEndpoint}${GET_WEBSITE_LANGUAGE_TRANSLATE}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  }
  catch (error: unknown) {
    console.error("[Setup Language Fetched Error]", error);

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