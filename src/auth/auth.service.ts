import { BadRequestException, Injectable } from '@nestjs/common';
import { StudentsService } from 'src/students/students.service';
import { RegisterRequestDto } from './dto/register-request.dto';
import { AccessToken } from './types/AccessToken';
import { Student } from 'src/students/entities/student.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { File } from 'multer';
@Injectable()
export class AuthService {
  constructor(
    private readonly studentService: StudentsService,
    private readonly jwtService: JwtService,
  ) {}

  async register(student: RegisterRequestDto, imageFile: File): Promise<AccessToken> {
    const existingUser = await this.studentService.findOneByEmail(student.email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
     if(!imageFile){
      throw new BadRequestException('Please provide image')
     }
    const hashedPassword = await bcrypt.hash(student.password, 10);
    const newUser: Student = { ...student, password: hashedPassword, image: imageFile.originalname }; // Store image filename in the user object
    const data = await this.studentService.createStudent(newUser);

    const payload = { email: data.email, id: data.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  //////// login section ///////

  async validateStudent(email: string, password: string): Promise<Student> {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
  }
    const student: Student = await this.studentService.findOneByEmail(email);
    if (!student) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, student.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
   
    return student;
  }

  async login(student: Student): Promise<AccessToken> {
    console.log("login", student)
    const payload = { email: student.email, id: student.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
