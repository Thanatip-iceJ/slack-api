import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(8000, () => console.log('Server is running on port', 8000));
}
bootstrap();
