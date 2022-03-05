import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from 'next/server';
import { apiResponse } from "../../app/_util";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function middleware(req: NextRequest) {
    const token = req.headers.get('token');

    if (token) {
        try {
            jwt.verify(token, JWT_SECRET);
        } catch (error) {
            const body = JSON.stringify(apiResponse(false, "authentication failed", error));
            return new Response(body, {
                status: 401
            });
        }
        console.log("Route is protected");
        return NextResponse.next();
    }

    const body = JSON.stringify(apiResponse(false, "auth token not found", []));
    return new Response(body, {
        status: 400
    });
}