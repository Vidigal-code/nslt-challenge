export class CustomError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;

        Object.setPrototypeOf(this, CustomError.prototype);
    }
}

export const throwCustomError = (message: string, statusCode: number): never => {
    switch (statusCode) {
        case 403:
            throw new CustomError(message || 'Forbidden: You do not have permission to access this resource.', 403);
        case 404:
            throw new CustomError(message || 'Not Found: The requested resource could not be found.', 404);
        case 500:
            throw new CustomError(message || 'Internal Server Error: An unexpected error occurred on the server.', 500);
        default:
            throw new CustomError(message || 'An error occurred.', statusCode);
    }
};
