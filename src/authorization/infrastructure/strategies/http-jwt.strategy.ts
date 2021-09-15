import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class HttpJwtStrategy extends AuthGuard('jwt') {
    getRequest(context: ExecutionContext) {
        return context.switchToHttp().getRequest();
    }

    handleRequest(err: any, user: any) {
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
