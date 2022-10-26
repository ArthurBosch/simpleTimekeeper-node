import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(token);
      req.body.userId = decoded.id;
      next();
    } catch (err) {
      return res.status(403).json({
        message: "User is not authorized for such action",
        token: token,
      });
    }
  } else {
    return res.status(400).json({
      message: "Did not recieve token",
    });
  }
};
