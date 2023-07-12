import { Injectable } from '@nestjs/common';
import { GetUsersArgs } from './dto/get-users.args';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/user.model';
import * as argon2 from 'argon2';
import { OrderDirection } from '@/graphql/enum';
import { PaginatedUser } from './models/paginated-users.model';

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
    const user = this.userRepository.create({
      username: args.username,
      email: args.email,
      password: args.password,
    });

    return await this.userRepository.save(user);
  }

  public async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async findOneBy(args: FindOptionsWhere<User>): Promise<User> {
    return await this.userRepository.findOne({ where: args });
  }

  public async findAll(args?: GetUsersArgs): Promise<User[]> {
    const order: FindOptionsOrder<User> = {};

    if (User.canSortField(args.sortBy)) {
      if (args.sortDirection in OrderDirection) {
        order[args.sortBy] = args.sortDirection;
      } else {
        order[args.sortBy] = OrderDirection.asc;
      }
    }

    return await this.userRepository.find({
      skip: args ? args?.page * args.limit : undefined,
      take: args?.limit,
      order,
    });
  }

  public async paginate(args?: GetUsersArgs): Promise<PaginatedUser> {
    let query = this.userRepository.createQueryBuilder();

    if (args) {
      if (User.canSortField(args.sortBy)) {
        switch (args.sortDirection) {
          case OrderDirection.desc:
            query = query.orderBy(args.sortBy, 'DESC');
            break;
          default:
            query = query.orderBy(args.sortBy, 'ASC');
        }
      }

      query = query.skip((args.page - 1) * args.limit).take(args.limit);
    }

    const [result, total] = await query.getManyAndCount();

    return {
      data: result,
      total: total,
      current: args.page,
      limit: args.limit,
    };
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

  public async countAll(): Promise<number> {
    return await this.userRepository.count();
  }
}
