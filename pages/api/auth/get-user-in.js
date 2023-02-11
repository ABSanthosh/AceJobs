import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/ironOptions";
import { addUser, getUserIn } from "../../../db/user.db";

export default withIronSessionApiRoute(getUserInAPI, ironOptions);

async function getUserInAPI(req, res) {
  // try {/
  const addedUser = await addUser(req.body);
  const user = await getUserIn(req.body);
  req.session.user = user;
  await req.session.save();
  res.json({ status: 200, addedUser, user });
  // } catch (e) {
  //   res.json({ status: 400, message: e });
  // }
}
