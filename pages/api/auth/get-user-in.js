import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/ironOptions";
import { getUserIn } from "../../../services/user.server";

export default withIronSessionApiRoute(getUserInAPI, ironOptions);

async function getUserInAPI(req, res) {
  const user = await getUserIn(req.body);
  req.session.user = user;
  await req.session.save();
  res.json({ status: 200, user });
}
