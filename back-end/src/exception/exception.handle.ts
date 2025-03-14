import {HttpException} from '@nestjs/common';

export class GenericException extends HttpException {
    constructor(message: string, statusCode: number) {
        super(message, statusCode);
    }
}

export function handleError(error: any, id?: string) {
    switch (error.status) {
        case 403:
            throw new GenericException('Forbidden: You do not have permission to perform this action', 403);
        case 404:
            if (id) {
                throw new GenericException(`Resource with ID ${id} not found`, 404);
            }
            throw new GenericException('Resource not found', 404);
        case 500:
            throw new GenericException('Internal Server Error: ' + error.message, 500);
        default:
            throw new GenericException('An unexpected error occurred: ' + error.message, 500);
    }
}

export function handleErrorStatusMessage(status: number, id?: string, message?: string) {
    switch (status) {
        case 403:
            throw new GenericException('Forbidden: You do not have permission to perform this action' + ' ' + message, 403);
        case 404:
            if (id) {
                throw new GenericException(`Resource with ID ${id} not found` + ' ' + message, 404);
            }
            throw new GenericException('Resource not found' + ' ' + message, 404);
        case 500:
            throw new GenericException('Internal Server Error: ' + ' ' + message, 500);
        default:
            throw new GenericException('An unexpected error occurred: ' + ' ' + message, 500);
    }
}

