
/**
 * Sends a company search request to the backend.
 *
 * The frontend sends structured search parameters instead of
 * building a search string itself.
 *
 * The backend is responsible for:
 *  - converting the city into coordinates
 *  - finding nearby cities
 *  - generating search engine queries
 *  - enriching the results
 */

export async function searchCompanies(query: string) {

    const URL = "http://localhost:3000/search";

    const res = await fetch(
        `${URL}?q=${query}`
    );

    if (!res.ok) {
        throw new Error("Search failed");
    }

    const data = await res.json();

    console.log("API RESPONSE:", data);

    return Array.isArray(data) ? data : data.results;
}