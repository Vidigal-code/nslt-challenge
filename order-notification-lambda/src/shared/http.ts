import { Errors } from './errors';

export const ok = (payload: Record<string, any>, statusCode = 200) => ({
    statusCode,
    body: JSON.stringify(payload),
});

export const handleLambdaError = (error: any) => {
    const statusCode = error?.statusCode || 500;
    const message = error?.message || Errors.INTERNAL_ERROR;
    return {
        statusCode,
        body: JSON.stringify({
            success: false,
            error: message,
        }),
    };
};

