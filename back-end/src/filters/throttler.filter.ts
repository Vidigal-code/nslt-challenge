import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ThrottlerException } from '@nestjs/throttler';

@Catch(ThrottlerException)
export class ThrottlerFilter implements ExceptionFilter {
    catch(exception: ThrottlerException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = exception.getStatus();

        response.status(status).json({
            statusCode: status,
            error: 'Too Many Requests',
            message: 'Request limit exceeded. Please try again in 1 minute.',
            timestamp: new Date().toISOString(),
            path: ctx.getRequest().url,
        });
    }
}
