import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { User, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import * as fs from 'fs/promises';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private cloudinary: CloudinaryService,
  ) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      const { password } = data;
      const hashedPw = await bcrypt.hash(password, 12);
      data.password = hashedPw;
      const res = await this.prisma.user.create({
        data: data,
      });
      return res;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async login(data: { username: string; password: string }) {
    try {
      const { username, password } = data;
      const existedUser = await this.prisma.user.findFirst({
        where: { username: username },
      });
      if (!existedUser) {
        throw new UnauthorizedException(
          'Invalid Credentials, Please login agian.',
        );
      }
      const isMatch = await bcrypt.compare(password, existedUser.password);
      if (!isMatch) {
        throw new UnauthorizedException(
          'Invalid Credentials, Please login agian.',
        );
      }
      const payload = { userId: existedUser.id };
      const token = await this.jwt.signAsync(payload);
      delete existedUser.password;
      return { user: existedUser, token };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
  async getAuth(req): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: req.user.userId },
      });
      delete user.password;
      return user;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async updateUser(req, data, file): Promise<User> {
    try {
      console.log('REQQQ', req.file);
      console.log('FILEEE', file);
      const foundUser = await this.prisma.user.findUnique({
        where: { id: req.user.userId },
      });
      if (!foundUser) {
        throw new NotFoundException("User doesn't exist...");
      }
      if (req.file) {
        const img = await this.cloudinary.uploadImage(req.file.path);
        console.log(img);
        data.img = img['url'];
      }
      Object.assign(foundUser, data);
      const user = await this.prisma.user.update({
        data: foundUser,
        where: { id: req.user.userId },
      });
      return user;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    } finally {
      if (req.file) {
        await fs.unlink(req.file.path);
      }
    }
  }
}
