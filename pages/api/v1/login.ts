import type { NextApiRequest, NextApiResponse } from "next";
import { login } from "../app/controller/authController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await login(req.body);
  if (response?.status === true) {
    return res.status(200).json(response);
  }
  if (response?.status === false) {
    return res.status(200).json(response);
  }
  return res.status(400).json(response);
}
