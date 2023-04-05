import { NextApiRequest, NextApiResponse } from "next";
import pgConnect from "../../pgConfig";

//select data from postgres
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === "POST") {
      const data = await pgConnect.query(req.body);
      res.status(200).json(data.rows);
    }
    else {
      res.status(400).json({ error: "bad request method" });
    }
  } catch (err) {
    res.status(500).json({ error: "failed to load data from postgress" });
  }
}
