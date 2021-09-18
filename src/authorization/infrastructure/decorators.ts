import {
    createParamDecorator,
    ExecutionContext,
    UseGuards,
} from '@nestjs/common';
import { HttpJwtStrategy } from './strategies/http-jwt.strategy';

export const Authenticated = () => UseGuards(HttpJwtStrategy);

export type ICurrentUser = {
    id: string;
};
export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): ICurrentUser => {
        return context.switchToHttp().getRequest().user;
    },
);
