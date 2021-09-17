import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';
import { AuthorizationFacade } from '../../infrastructure/authorization.facade';
import { SignInResponseDto } from '../dtos/sign-in-response.dto';

@Controller()
export class AuthorizationController {
    constructor(private authorizationFacade: AuthorizationFacade) {}

    @Get()
    test() {
        return { test: 'Siema' };
    }

    @Post('sign-in')
    async signIn(@Body() body: SignInDto): Promise<SignInResponseDto> {
        return {
            authToken: await this.authorizationFacade.signIn(
                body.email,
                body.password,
            ),
        };
    }
}
