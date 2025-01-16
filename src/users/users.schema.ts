import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Gender } from "src/common/enum";

export type UsersDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop()
    fName: string;

    @Prop()
    lName: string;

    @Prop({ required: true })
    phone: string;

    @Prop()
    age: number;

    @Prop({ enum: Gender })
    gender: Gender;

    @Prop()
    city: string;

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}


export const UsersSchema =
    SchemaFactory.createForClass(User);