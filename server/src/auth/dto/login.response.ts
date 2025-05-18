import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/user.schema';

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}
