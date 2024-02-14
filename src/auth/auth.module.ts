import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET_KEY } from 'contrants';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: '7d' },
    }),
    MulterModule.register({
      dest: './public',
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, CloudinaryService],
})
export class AuthModule {}
