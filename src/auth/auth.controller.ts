import { Controller, Post, Body, UploadedFile, UseInterceptors, Request, BadRequestException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { RegisterResponseDTO } from './dto/register-response.dto';
import { FileInterceptor } from '@nestjs/platform-express'; // Import FileInterceptor
import { File } from 'multer';
import { LoginResponseDTO } from './dto/login-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './decorators/public.decorator';
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('image')) // Specify the field name for the uploaded image
  async register(
    @Body() registerBody: RegisterRequestDto,
    @UploadedFile() imageFile: File, // Access uploaded image file
  ): Promise<RegisterResponseDTO> {
    try {
      return await this.authService.register(registerBody, imageFile);
    } catch (error) {
      // Handle any errors that occur during registration
      throw new BadRequestException('Registration failed', error.message);
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<LoginResponseDTO | BadRequestException> {
    try {
      console.log('authcontroller', req.user);
      return await this.authService.login(req.user);
    } catch (error) {
      // Handle any errors that occur during login
      throw new BadRequestException('Login failed', error.message);
    }
  }
}

