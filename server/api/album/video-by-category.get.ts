import { GET_VIDEO_ALBUM_LIST } from "../const";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;
  const query = getQuery(event);

  // Build the query string for the external API
  let apiUrl = serverEndpoint + GET_VIDEO_ALBUM_LIST;

  // If there are query parameters, append them to the API call
  if (Object.keys(query).length > 0) {
    apiUrl += '?' + new URLSearchParams(query as Record<string, string>).toString();
  }

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(`API returned status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch articles from external API'
    });
  }
});