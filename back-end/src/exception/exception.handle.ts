import { HttpException } from '@nestjs/common';
import { Errors } from 'src/shared/errors';

export class GenericException extends HttpException {
    constructor(message: string, statusCode: number) {
        super(message, statusCode);
    }
}

export function handleError(error: any, id?: string) {
    switch (error.status) {
        case 403:
            throw new GenericException(Errors.FORBIDDEN, 403);
        case 404:
            if (id) {
                throw new GenericException(`${Errors.NOT_FOUND} with ID ${id}`, 404);
            }
            throw new GenericException(Errors.NOT_FOUND, 404);
        case 500:
            throw new GenericException(Errors.INTERNAL_ERROR_PREFIX + error.message, 500);
        default:
            throw new GenericException(Errors.UNEXPECTED_ERROR_PREFIX + error.message, 500);
    }
}

export function handleErrorMessageCustom(status: number, message?: string, id?: string) {
    switch (status) {
        case 403:
            throw new GenericException(`${Errors.FORBIDDEN} ${message || ''}`.trim(), 403);
        case 404:
            if (id) {
                throw new GenericException(`${Errors.NOT_FOUND} with ID ${id} ${message || ''}`.trim(), 404);
            }
            throw new GenericException(`${Errors.NOT_FOUND} ${message || ''}`.trim(), 404);
        case 500:
            throw new GenericException(Errors.INTERNAL_ERROR_PREFIX + (message || ''), 500);
        default:
            throw new GenericException(Errors.UNEXPECTED_ERROR_PREFIX + (message || ''), 500);
    }
}

