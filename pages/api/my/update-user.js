import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/ironOptions";
import { updateUser } from "../../../db/user.db";

export default withIronSessionApiRoute(async (req, res) => {
  //   try {
  const user = await updateUser(req.body);
  req.session.user = user;
  await req.session.save();
  res.json({ status: 200, user });
  //   } catch (e) {
  // res.json({ status: 400, message: e });
  //   }
}, ironOptions);
