import jwt from "jsonwebtoken";
import { User as UserType } from "types";
import dbConnect from "../../config/database";
import { User } from "../model";

dbConnect();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const
    //get auth
    getAuth = async (token: string) => {
        let verify = null;
        try {
            verify = jwt.verify(token, JWT_SECRET) as any;
        } catch (error: any) {
            return false;
        }

        if (verify) {
            return await User.findOne({ _id: verify.id }).exec();
        } else {
            return false;
        }
    },

    //get all user
    getUser = async (user:UserType) => {
        try {
            const  users = await User.find({_id: {$ne: user._id}});
            return users
        } catch (error: any) {
            return error;
        }
    }

    
