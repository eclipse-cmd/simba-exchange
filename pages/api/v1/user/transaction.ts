import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "../../app/controller/userController";
import { addTransaction, getTransaction } from "../../app/controller/transactionController";
import { apiResponse } from "../../app/_util";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = req.headers.token as string;
    const user = await getAuth(token);
    const method = req.method;
    switch (method) {
        case 'GET':
            const perPage = 10;
            const page = req.query.page ? req.query.page : 0;

            let transactions = await getTransaction(perPage, page, user);
            res.status(200).json(apiResponse(true, "", transactions));
            break;
        case 'POST':
            if (!user) {
                res.status(404).json(apiResponse(false, "user not found", []));
                return;
            }
            const body = { ...req.body, user };
            const response = await addTransaction(body);
            if (response?.status) {
                return res.status(200).json(apiResponse(true, "transaction successful", []));
            }
            return res.status(400).json(apiResponse(false, response?.message as string, response?.error));
        default:
            res.status(400).json(apiResponse(false, "method not allowed", []));
    }
}
