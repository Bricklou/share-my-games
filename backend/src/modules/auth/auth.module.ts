import { Module, forwardRef } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from '@m/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
