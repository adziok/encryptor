import { UseGuards } from '@nestjs/common';
import { HttpJwtStrategy } from './strategies/http-jwt.strategy';

export const Authenticated = () => UseGuards(HttpJwtStrategy);
