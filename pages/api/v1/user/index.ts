import type { NextApiRequest, NextApiResponse } from "next";
import { apiResponse } from "pages/api/app/_util";
import { getAuth, getUser } from "../../app/controller/userController";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = req.headers.token as string;
    const user = await getAuth(token);
    const response = await getUser(user);
    if (response) {
        return res.status(200).json(apiResponse(true, '', response));
    }
    return res.status(400).json(apiResponse(false, response.message ?? 'an error occured', []));
}
