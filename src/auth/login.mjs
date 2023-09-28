import User from "../../models/users.mjs";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

import { promisify } from "util";

const sign = promisify(JWT.sign);

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).send({ error: "user not found" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(403).send({ error: "wrong password" });
  }

  if (match) {
    try {
      const token = await sign({ user }, process.env.SECRET_JWT, {
        algorithm: "HS512",
        expiresIn: "1h",
      });
      

      res.cookie("access_token", token, {
        httpOnly: true,
      });
      // res.send({ token });
      // console.log({token})
      res.redirect('/dashboard')
    } catch (err) {
      return res.status(500).send({ error: "Cannot generate token" });
    }
  }
};

export default userLogin;
