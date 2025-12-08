import { Errors } from '../shared/errors';

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
            throw new CustomError(message || Errors.FORBIDDEN, 403);
        case 404:
            throw new CustomError(message || Errors.NOT_FOUND, 404);
        case 500:
            throw new CustomError(message || Errors.INTERNAL_ERROR, 500);
        default:
            throw new CustomError(message || Errors.BAD_REQUEST, statusCode);
    }
};
