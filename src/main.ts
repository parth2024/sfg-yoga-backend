import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000','https://www.sfgyoga.in/admin/dashboard','https://www.sfgyoga.in'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // If you need to allow cookies or authorization headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
