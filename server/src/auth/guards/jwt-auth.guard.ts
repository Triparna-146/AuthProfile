import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = ctx.req.cookies['token']; 
    if (!token) {
      return false;
    }

    try {
      const payload = await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
  });

  const user = await this.userService.findById(payload.userId);

  ctx.req.user = user;
  return true;
} catch (err) {
  console.error('Error during guard verification:', err);
  return false;
}

  }
}
