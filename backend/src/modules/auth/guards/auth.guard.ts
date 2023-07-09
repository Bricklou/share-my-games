import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '@/modules/auth/auth.service';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private authService: AuthService) {}
  public canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req: request }: { req: Request } = ctx.getContext();

    return this.validateRequest(request);
  }

  private async validateRequest(request: Request): Promise<boolean> {
    const user = await this.authService.restoreSessionFromRequest(request);
    request.user = user;
    return !!user;
  }
}
