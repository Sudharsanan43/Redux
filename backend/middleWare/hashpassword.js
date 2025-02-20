import bcrypt from "bcryptjs";

const hashPassword = async (req, res, next) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ error: "Password is required" });
    }
    const salt = await bcrypt.genSalt(10);

    req.body.password = await bcrypt.hash(req.body.password, salt);

    next();
  } catch (error) {
    res.status(500).json({ error: "Error hashing password" });
  }
};

export default hashPassword;
