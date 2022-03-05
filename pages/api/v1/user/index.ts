import type { NextApiRequest, NextApiResponse } from "next";
import { apiResponse } from "pages/api/app/_util";
import { getAuth, getUser } from "../../app/controller/userController";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const response = await getUser();
    if (response) {
        return res.status(200).json(apiResponse(true, '', response));
    }
    return res.status(400).json(apiResponse(false, response.message ?? 'an error occured', []));
}
