import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(data: Partial<User>): Promise<User> {
    const newUser = new this.userModel(data);
    return await newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email })
  }

  async findById(id: string): Promise<User | null> {
    return await this.userModel.findById(id);
  }

async updateUser(userId: string, updateData: any): Promise<User | null> {
  return this.userModel.findByIdAndUpdate(userId, updateData, { new: true });
}

}
