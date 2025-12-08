import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DashboardController } from '../http/dashboard.controller';
import { DashboardService } from '../../application/use-cases/dashboard.service';
import { DatabaseModule } from "../../../database/database.module";
import { GetDashboardHandler } from '../../application/handlers/get-dashboard.handler';

@Module({
    imports: [DatabaseModule, CqrsModule],
    controllers: [DashboardController],
    providers: [DashboardService, GetDashboardHandler],
})
export class DashboardModule {}