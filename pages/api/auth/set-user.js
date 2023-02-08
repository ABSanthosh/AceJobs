import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "../../../lib/ironOptions";
import { getUserIn } from "../../../db/user.db";

export default withIronSessionApiRoute(getUserInAPI, ironOptions);

async function getUserInAPI(req, res) {
//   try {
    console.log(req.body);
    req.session.user = req.body;
    await req.session.save();
    res.json({ status: 200, user: req.body });
//   } catch (e) {
//     res.json({ status: 400, message: e });
//   }
}
