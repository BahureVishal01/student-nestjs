import { UUID } from 'crypto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'student' })
export class Student {
  @PrimaryGeneratedColumn()
  id?: UUID;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  @Column({nullable:true})
  image: string;
}