import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/ironOptions";
import { upsertVideoResume } from "../../../db/user.db";

export default withIronSessionApiRoute(async (req, res) => {
  const result = await upsertVideoResume(req.body);
  res.json({ status: 200, result });
  
}, ironOptions);
