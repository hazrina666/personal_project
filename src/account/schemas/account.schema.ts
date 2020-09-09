import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

//  const AccountSchema = new mongoose.Schema({
//   username: String,
//   password: String,
//   email: String,
//   phone: Number,
//   product: String,
// });

export interface AccountSchema extends mongoose.Document {
  username: string;
  password: string;
  email: string;
  phone: number;
  product: string;
}

// @Schema()
// export class Account_ extends Document {
//   @Prop()
//   username: string;

//   @Prop()
//   password: string;

//   @Prop()
//   email: string;

//   @Prop()
//   phone: string;

//   @Prop()
//   number: number;
// }

// export const AccountSchema = SchemaFactory.createForClass(Account_);
