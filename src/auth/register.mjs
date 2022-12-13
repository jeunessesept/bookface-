import User from "../../db/index.mjs";
import bcrypt from "bcrypt";

const userRegister = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ error: "invalid request" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default userRegister;
