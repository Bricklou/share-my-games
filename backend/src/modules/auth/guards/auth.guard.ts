import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '@/modules/auth/auth.service';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
import { format as stringFormat } from 'util';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger(AuthGuard.name);

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

    this.logger.debug(stringFormat('Auth guard request: %s\n', request.body));

    return !!user;
  }
}
