import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

type JwtPayload = Record<string, any>;

@Injectable()
export class JwtService {
    constructor(private jwtService: NestJwtService) {}

    signPayload(payload: JwtPayload): string {
        return this.jwtService.sign(payload);
    }
}
