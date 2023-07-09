import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { StatsResponse } from './models/stats-response.model';

@Injectable()
export class AdminService {
  public constructor(private userService: UserService) {}

  public async countAllStats(): Promise<StatsResponse> {
    return {
      users: await this.userService.countAll(),
      roles: 0,
      games: 0,
      creators: 0,
      tags: 0,
    };
  }
}
