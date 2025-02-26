/**
 * Custom error class for handling API errors.
 * This class extends the built-in `Error` class and adds additional properties
 * for status code and response data, which are useful for API error handling.
 */
export class ApiException extends Error {
    /**
     * The HTTP status code associated with the error.
     * @type {number}
     */
    statusCode: number;

    /**
     * The data returned from the API response.
     * Can contain additional details or error information.
     * @type {any}
     */
    responseData: any;

    /**
     * Creates an instance of the ApiException class.
     *
     * @param {string} message - The error message to be passed to the Error constructor.
     * @param {number} statusCode - The HTTP status code returned by the API.
     * @param {any} [responseData=null] - Additional data from the API response (optional).
     */
    constructor(message: string, statusCode: number, responseData: any = null) {
        super(message);
        this.name = 'ApiException';
        this.statusCode = statusCode;
        this.responseData = responseData;
    }
}
