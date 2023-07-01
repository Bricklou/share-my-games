import { IsEmail, IsStrongPassword, Length } from 'class-validator';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import * as argon2 from 'argon2';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType({ description: 'user' })
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @IsEmail()
  @Column({ type: 'varchar', length: 100, unique: true })
  public email: string;

  @Field()
  @Length(3, 100)
  @Column({ type: 'varchar', length: 100, unique: true })
  public username: string;

  @Column()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  public password: string;

  @Field()
  @CreateDateColumn()
  public createdAt: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  public async hashPassword(): Promise<void> {
    this.password = await argon2.hash(this.password);
  }
}
