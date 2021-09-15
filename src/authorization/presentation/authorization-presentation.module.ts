import { Module } from '@nestjs/common';
import { AuthorizationController } from './controllers/authorization.controller';
import { AuthorizationModule } from '../infrastructure/authorization.module';

@Module({
    imports: [AuthorizationModule],
    controllers: [AuthorizationController],
})
export class AuthorizationPresentationModule {}
