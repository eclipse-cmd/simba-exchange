import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { UserInput } from "types";
import dbConnect from "../../config/database";
import userRegistrationListener from "../events/userRegistrationListener";
import { User } from "../model";
import { apiResponse } from "../_util";

dbConnect();
const JWT_SECRET = process.env.JWT_SECRET as string;

export const
    //register method
    login = async (data: UserInput) => {
        const { email, password } = data;
        try {
            const user = await User.findOne({ email }).select('+password').lean();
            if (!user) {
                return apiResponse(false, "incorrect login credentials", []);
            }

            const valid = await argon2.verify(user.password, password);
            if (valid) {
                const token = jwt.sign({ id: user._id, username: user.email, type: 'user' }, JWT_SECRET, { expiresIn: '10h' });
                return apiResponse(true, "", {
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        created_at: user.created_at,
                        updated_at: user.updated_at,
                    },
                    token
                });
            } else {
                return apiResponse(false, "incorrect password", []);
            }
        } catch (error) {
            return apiResponse(undefined, "an error occured, please try again later", [error]);
        }
    },

    //register method
    register = async (data: UserInput) => {
        const { name, email, password, password_confirmation } = data;
        if (!name || !email || !password || !password_confirmation) {
            return apiResponse(false, "validation failed", {
                error: "all inputs field are required"
            });
        }
        
        if (password != password_confirmation) {
            return apiResponse(false, "password do not match", []);
        }

        const user = await User.find({ email }).exec();
        if (user.length > 0) {
            return apiResponse(false, "email already exist", []);
        }

        const hashedPassword = await argon2.hash(password);
        try {
            const user = await User.create({
                name,
                email,
                password: hashedPassword
            });
            if (!user) {
                return apiResponse(false, "registration failed", []);
            }

            await userRegistrationListener(user._id);
            const token = jwt.sign({ id: user._id, email: user.email, type: 'user' }, JWT_SECRET, { expiresIn: '10h' });
            return apiResponse(true, "user register", {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    created_at: user.created_at,
                    updated_at: user.updated_at,
                },
                token
            });

        } catch (error) {
            console.log(error);
        }
    };
