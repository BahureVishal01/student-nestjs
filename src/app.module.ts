import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Student } from './students/entities/student.entity';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/gaurds/jwt.gaurd';
console.log(process.env.DB_PORT)
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
     imports: [ConfigModule],
     useFactory:async (ConfigService:ConfigService)=>({
      type:'mysql',
      host: ConfigService.get<string>('DB_HOST'),
      port: ConfigService.get<number>('DB_PORT'),
      database: ConfigService.get<string>('DB_NAME'),
      password: ConfigService.get<string>('DB_PASSWORD'),
      username: ConfigService.get<string>('DB_USER'),
      entities: [Student],
      synchronize:true
     }),
     inject:[ConfigService]
    }),
    StudentsModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService,  {
    provide: APP_GUARD,
    useClass: JwtGuard,
  },],
})
export class AppModule {}
