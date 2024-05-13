import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtGuard } from './auth/gaurds/jwt.gaurd';
import { Reflector } from '@nestjs/core';
import { HttpExceptionFilter } from './students/http-exception.filter';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import * as morgan from 'morgan';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);

  // app.useGlobalGuards(new JwtGuard(app.get(Reflector)));
  
  // Use process.env.PORT if available, otherwise default to 3000
  const port = process.env.PORT || 3000;
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalGuards(new JwtGuard(app.get(Reflector)));
  app.use(morgan('tiny'))
  await app.listen(port, ()=>{
    console.log(`server is listening on port ${port}`);
  });
}
bootstrap();

