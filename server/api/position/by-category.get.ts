import { GET_POSITION } from "../const";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const serverEndpoint = config.public.serverEndpoint;
  const query = getQuery(event);

  let apiUrl = serverEndpoint + GET_POSITION;

  // Manually build the query string
  if (Object.keys(query).length > 0) {
    const params = [];
    for (const key in query) {
      if (Object.prototype.hasOwnProperty.call(query, key)) {
        const value = query[key];
        // Special handling for 'category' to not encode commas
        if (key === 'category') {
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
    console.error("Error fetching events:", error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch events from external API'
    });
  }
});