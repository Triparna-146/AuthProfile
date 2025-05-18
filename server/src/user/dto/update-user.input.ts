import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  fullName?: string;

  @Field({ nullable: true })
  age?: number;

  @Field({ nullable: true })
  gender?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  country?: string;

  @Field({ nullable: true })
  phoneNumber?: string;
}
