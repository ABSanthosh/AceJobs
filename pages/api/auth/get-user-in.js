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
  console.log(user);
  console.log(req.body);
  req.session.user = req.body;
  await req.session.save();
  res.json({ status: 200, user: req.body });
  // } catch (e) {
  //   res.json({ status: 400, message: e });
  // }
}
