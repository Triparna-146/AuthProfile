import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupInput } from './dto/signup.input';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { LoginInput } from './dto/login.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupInput: SignupInput) {
    const { username, email, password } = signupInput;

    // 1. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Save to DB
    const newUser = await this.userService.createUser({
      username,
      email,
      password: hashedPassword,
    });

    return newUser;
  }

  async login(loginInput: LoginInput) {
    const { email, password } = loginInput;

    // 1. Find user by email
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid email or password');

    // 2. Compare password
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) throw new UnauthorizedException('Invalid email or password');

    // 3. Generate JWT token
    const payload = { userId: user._id };
    const token = this.jwtService.sign(payload,{
      secret: process.env.JWT_SECRET,
    });
    return { token, user };
  }
}
