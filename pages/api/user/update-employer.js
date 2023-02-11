import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/ironOptions";
import { updateUser, upsertEmployer } from "../../../db/user.db";

export default withIronSessionApiRoute(async (req, res) => {
  const result = await upsertEmployer(req.body);
  const user = await updateUser({
    uid: req.body.uid,
    isEmployer: true,
  });
  req.session.user = user;
  await req.session.save();

  res.json({ status: 200, result });
}, ironOptions);
