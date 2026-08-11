/**
 * Data sent from the frontend to the backend.
 * The backend will use these values to build the search query.
 */

export type SearchRequest = {

    /** Job title that the user is looking for */
    jobTitle: string;

    /** City that will be used as the search center */
    city: string;

    /** Search radius in kilometers */
    radius: number;
};