import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@ObjectType()
@Schema()
export class User {

   @Field(() => ID)  
  _id: string;

  @Field()
  @Prop({ required: true, unique: true })
  username: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;


  @Field({ nullable: true })
  @Prop()
  fullName?: string;

  @Field({ nullable: true })
  @Prop()
  age?: number;

  @Field({ nullable: true })
  @Prop()
  gender?: string;

  @Field({ nullable: true })
  @Prop()
  bio?: string;

  @Field({ nullable: true })
  @Prop()
  city?: string;

  @Field({ nullable: true })
  @Prop()
  country?: string;

  @Field({ nullable: true })
  @Prop()
  phoneNumber?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
