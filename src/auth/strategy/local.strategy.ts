import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Student } from 'src/students/entities/student.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: true, 
    });
  }

  async validate(request:Request,email: string, password: string): Promise<Student> {
    if (!email || !password) {
        throw new UnauthorizedException('Email and password are required');
      }
    const user = await this.authService.validateStudent(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}