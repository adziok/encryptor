import { JwtPassportStrategy } from './jwt-passport.strategy';
import { HttpJwtStrategy } from './http-jwt.strategy';

export const strategies = [JwtPassportStrategy, HttpJwtStrategy];
