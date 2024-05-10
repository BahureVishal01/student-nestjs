import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express'; // Import MulterModule
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { StudentsModule } from 'src/students/students.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key', // Set your JWT secret key
      signOptions: { expiresIn: '24h' }, // Adjust expiration as per your requirements
    }),
    MulterModule.register({
      dest: './uploads', // Set the destination directory for storing uploaded files
    }),
    StudentsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy], // Add JwtStrategy if applicable
  exports: [AuthService],
})
export class AuthModule {}
