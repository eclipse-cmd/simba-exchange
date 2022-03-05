import type { NextApiRequest, NextApiResponse } from 'next';
import { exchange_rate } from "../app/_util";

export default async function handler(
    _: NextApiRequest,
    res: NextApiResponse
) {
    const rates = exchange_rate();
    res.status(200).json(
        {
            status: true,
            message: "",
            data: {
                "base": "EUR",
                "date": "2022-03-04",
                "rates": {
                    "USD": rates.USD,
                    "NGN": rates.NGN
                }
            }
        });
}
