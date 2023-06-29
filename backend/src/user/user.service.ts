import { Injectable } from '@nestjs/common';
import { GetUsersArgs } from './dto/get-users.args';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.model';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Create a new user in the database
   *
   * Note: This method will hash the user's password before saving it to the database
   *
   * @param args The user's information
   * @returns The newly created user
   */
  public async create(
    args: Pick<User, 'username' | 'email' | 'password'>,
  ): Promise<User> {
    const user = new User();
    user.username = args.username;
    user.email = args.email;
    user.password = await this.hashPassword(args.password);

    return await this.userRepository.save(user);
  }

  public async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async findOneBy(args: FindOptionsWhere<User>): Promise<User> {
    return await this.userRepository.findOne({ where: args });
  }

  public async findAll(args?: GetUsersArgs): Promise<User[]> {
    return await this.userRepository.find({
      skip: args?.skip,
      take: args?.take,
    });
  }

  public async remove(id: number): Promise<boolean> {
    const user = await this.findOne(id);

    if (!user) {
      return false;
    }

    await this.userRepository.remove(user);
    return true;
  }

  public async comparePassword(user: User, password: string): Promise<boolean> {
    return await argon2.verify(user.password, password);
  }

  private async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }
}
