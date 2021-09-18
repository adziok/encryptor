import {
    Inject,
    Injectable,
    InternalServerErrorException,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthorizationConfigService } from '../services/authorization-config.service';
import { AuthorizationService } from '../../application/authorization.service';

@Injectable()
export class JwtPassportStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(JwtPassportStrategy.name);

    constructor(
        private configService: AuthorizationConfigService,
        private authorizationService: AuthorizationService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.jwtSecret,
            ignoreExpiration: false,
        });
    }

    public async validate(payload: { email: string }) {
        try {
            return await this.authorizationService.findAuthorizationByEmail(
                payload.email,
            );
        } catch (error) {
            this.logger.error(error.message);
            throw new UnauthorizedException();
        }
    }
}
