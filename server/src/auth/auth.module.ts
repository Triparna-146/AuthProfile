import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.schema';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  
  providers: [AuthResolver, AuthService],
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true, // makes env available throughout app
    // }),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }, // Token expiration time
    }),
  ],
  exports: [AuthService, JwtModule], 
})
export class AuthModule {}
