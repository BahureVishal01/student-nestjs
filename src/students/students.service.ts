import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Student } from './entities/student.entity';
import { UUID } from 'crypto';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(Student) private studentRepostory:Repository<Student>,){}
    createStudent(student:Student): Promise<Student> {
         
       return this.studentRepostory.save(student)
    }

    findOneByEmail(email: string): Promise<Student | null> {
      return this.studentRepostory.findOneBy({ email });
    }

}