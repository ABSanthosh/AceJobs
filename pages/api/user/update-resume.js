import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/ironOptions";
import { upsertResume } from "../../../db/user.db";

export default withIronSessionApiRoute(async (req, res) => {
  const result = await upsertResume(req.body);
  res.json({ status: 200, result });
  
}, ironOptions);
