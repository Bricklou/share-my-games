import { Component, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import dashboardQuery from './dashboard.graphql';
import { AuthService } from '@app/modules/shared/services/auth/auth.service';
import { User } from '@app/modules/shared/interfaces/user';

interface DashboardStats {
  users: number;
  roles: number;

  games: number;
  creators: number;
  tags: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnDestroy {
  private statsQuerySub: Subscription;
  private authSub: Subscription;

  protected stats?: DashboardStats;
  protected user?: User;

  public constructor(private apollo: Apollo, authService: AuthService) {
    this.user = authService.userValue;

    this.authSub = authService.user.subscribe((user) => {
      this.user = user;
    });

    this.statsQuerySub = this.apollo
      .query<{ countAllStats: DashboardStats }>({
        query: dashboardQuery,
      })
      .subscribe((result) => {
        this.stats = result.data.countAllStats;
      });
  }

  public ngOnDestroy(): void {
    this.statsQuerySub.unsubscribe();
    this.authSub.unsubscribe();
  }
}
