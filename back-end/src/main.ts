import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as https from 'https';
import * as fs from 'fs';
import 'src/config';
import { ThrottlerFilter } from './filters/throttler.filter';

const isHttps = process.env.HTTPS === 'true';
const PORT = process.env.PORT || 3000;
const API_FRONTEND = process.env.API_FRONTEND || 'http://localhost:5173';

async function bootstrap() {

    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new ThrottlerFilter());

    app.enableCors({
        origin: API_FRONTEND,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept, Authorization',
    });

    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", "'unsafe-inline'"],
                    objectSrc: ["'none'"],
                    upgradeInsecureRequests: [],
                },
            },
            frameguard: { action: 'deny' },
            hidePoweredBy: true,
            hsts: {
                maxAge: 31536000,
                includeSubDomains: true,
                preload: true,
            },
            ieNoOpen: true,
            noSniff: true,
            xssFilter: true
        }),
    );

    if (isHttps) {
        const httpsOptions = {
            key: fs.readFileSync('path/to/your/private-key.pem'),
            cert: fs.readFileSync('path/to/your/certificate.pem'),
        };
        https.createServer(httpsOptions, app.getHttpAdapter().getInstance()).listen(PORT, () => {
            console.log(`\n\u001b[34mHTTPS server running on https://localhost:${PORT} -> by https://github.com/Vidigal-code\u001b[39m`);
        });
    } else {
        await app.listen(PORT, () => {
            console.log(`\n\u001b[34mHTTP server running on http://localhost:${PORT} -> by https://github.com/Vidigal-code\u001b[39m`);
        });
    }
}

bootstrap();
