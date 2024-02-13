import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create')
  createUser(@Body() data: Prisma.UserCreateInput) {
    return this.authService.createUser(data);
  }

  @Post('login')
  login(@Body() data: { username: string; password: string }) {
    return this.authService.login(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  getMe(@Request() req) {
    return this.authService.getAuth(req);
  }

  @UseGuards(AuthGuard)
  @Patch()
  editProfile(@Req() req, @Body() data: Prisma.UserUpdateInput) {
    return this.authService.updateUser(req, data);
  }
}
