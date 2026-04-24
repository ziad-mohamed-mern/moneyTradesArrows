const BASE_URL = 'https://arrows.runasp.net';

/**
 * Fetch a paginated list of news
 * @param {number} pageNumber 
 * @param {number} pageSize 
 */
export async function getNews(pageNumber = 1, pageSize = 10) {
  try {
    const res = await fetch(`${BASE_URL}/api/News?pageNumber=${pageNumber}&pageSize=${pageSize}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('API Fetch Error (getNews):', error);
    return { data: [], totalCount: 0 };
  }
}

/**
 * Fetch a single news item by ID
 * @param {string|number} id 
 */
export async function getNewsById(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/News/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('API Fetch Error (getNewsById):', error);
    return null;
  }
}
