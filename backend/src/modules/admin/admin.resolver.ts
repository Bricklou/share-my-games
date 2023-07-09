import { Resolver, Query } from '@nestjs/graphql';
import { StatsResponse } from './models/stats-response.model';
import { AdminService } from './admin.service';

@Resolver()
export class AdminResolver {
  public constructor(private readonly adminService: AdminService) {}

  @Query(() => StatsResponse)
  public async countAllStats(): Promise<StatsResponse> {
    return await this.adminService.countAllStats();
  }
}
