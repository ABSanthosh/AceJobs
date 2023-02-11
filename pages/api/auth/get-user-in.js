import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/ironOptions";
import { addUser, fetchUserById, getUserIn } from "../../../db/user.db";

export default withIronSessionApiRoute(getUserInAPI, ironOptions);

async function getUserInAPI(req, res) {
  try {
    await addUser(req.body);
  } catch (_) {}

  await getUserIn(req.body);
  const user = fetchUserById(req.body.uid);
  req.session.user = user;
  await req.session.save();
  res.json({ status: 200, user });
  // } catch (e) {
  //   res.json({ status: 400, message: e });
  // }
}
