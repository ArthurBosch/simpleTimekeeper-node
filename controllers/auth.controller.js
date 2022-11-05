import db from "../db/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

class AuthController {
  async createUser(req, res) {
    try {
      //password generation
      const { password, name, email } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      //save to db
      const newPerson = await db.query(
        `INSERT INTO person (name, email, passwordHash) values ($1, $2, $3) RETURNING *`,
        [name, email, hash]
      );

      //token generation
      const token = jwt.sign(
        {
          id: newPerson.rows[0].id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "5d",
        }
      );

      console.log(newPerson.rows[0]);

      const { passwordhash, ...userData } = newPerson.rows[0];
      res.setHeader("Referrer-Policy", "same-origin").json({
        ...userData,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error while signing up",
        error: error.message,
      });
    }
  }

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const user = await db.query(`SELECT * FROM person WHERE email = $1`, [
        email,
      ]);

      if (!user) {
        return res.status(500).json({
          success: false,
          message: "Email/user incorrect",
        });
      }

      const result = await bcrypt.compare(password, user.rows[0].passwordhash);

      if (!result) {
        return res.status(500).json({
          success: false,
          message: "Email/user incorrect",
        });
      }

      const token = jwt.sign(
        {
          id: user.rows[0].id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "5d",
        }
      );

      const { passwordhash, ...userToSend } = user.rows[0];

      res.json({
        userToSend,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Error while signing in",
        error: error.message,
      });
    }
  }

  async checkToken(req, res) {
    if (req.body.userId) {
      res.status(200).send({
        success: true,
      });
    } else {
      res.status(401).send({
        success: false,
        message: "token expired",
      });
    }
  }
}

export default new AuthController();
