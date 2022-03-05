import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "../../app/controller/userController";
import { exchangeWallet, getWallet } from "../../app/controller/walletController";
import { apiResponse } from "../../app/_util";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = req.headers.token as string;
    const user = await getAuth(token);
    const method = req.method;
    if (!user) {
        res.status(404).json(apiResponse(false, "user not found", []));
        return;
    }
    switch (method) {
        case 'GET':
            let wallets = await getWallet(user);
            if (!wallets) {
                res.status(400).json(apiResponse(false, "wallet not found", []));
            }
            res.status(200).json(apiResponse(true, "", wallets));
            break;
        case 'POST':
            const body = { ...req.body, user };
            const response = await exchangeWallet(body);
            res.status(200).json(response);
            return;
            if (response?.status) {
                return res.status(200).json(apiResponse(true, "transaction successful", []));
            }
            return res.status(400).json(apiResponse(false, response?.message as string, response?.error));
        default:
            res.status(400).json(apiResponse(false, "method not allowed", []));
    }
}
