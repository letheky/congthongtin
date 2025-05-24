import { GET_RESTAURANT } from "../const";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;
  const query = getQuery(event);

  // Build the query string for the external API
  let apiUrl = serverEndpoint + GET_RESTAURANT;

  // Manually build the query string
  if (Object.keys(query).length > 0) {
    const params = [];
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        const value = query[key];
        // Special handling for 'category' to not encode commas
        if (key === 'type') {
          params.push(`${key}=${value}`);
        } else {
          params.push(`${key}=${encodeURIComponent(String(value))}`);
        }
      }
    }
    apiUrl += '?' + params.join('&');
  }

  try {
    const res = await fetch(apiUrl);

    if (!res.ok) {
      throw new Error(`API returned status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch restaurants from external API'
    });
  }
});