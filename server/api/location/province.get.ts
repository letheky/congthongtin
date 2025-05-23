import { GET_ALL_PROVINCE } from "../const";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;
  const query = getQuery(event);

  // Build the query string for the external API
  let apiUrl = serverEndpoint + GET_ALL_PROVINCE;

  // If there are query parameters, append them to the API call
  if (Object.keys(query).length > 0) {
    apiUrl += '?' + new URLSearchParams(query as Record<string, string>).toString() + `page_size=${10000}`;
  }

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(`API returned status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch provinces from external API'
    });
  }
});