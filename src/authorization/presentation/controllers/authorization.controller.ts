import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from '../dtos/sign-in.dto';

@Controller()
export class AuthorizationController {
    @Post('sign-in')
    signIn(@Body() body: SignInDto) {}
}
