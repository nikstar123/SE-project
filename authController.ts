import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Sequelize } from "sequelize";
import { User } from "../../models/User";
import { Product } from "../../models/Product";

// Extend the Request interface to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Correctly configure Sequelize with the required dialect
export const sequelize: Sequelize = new Sequelize(
  "unitrade",
  "unitrade_user",
  "unitrade_password",
  {
    host: "localhost",
    dialect: "mysql", // Specify the dialect explicitly
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Create a new MySQL user
sequelize
  .query(
    "CREATE USER 'unitrade_user'@'localhost' IDENTIFIED BY 'unitrade_password';"
  )
  .then(() => {
    console.log("MySQL user created successfully.");
  })
  .catch((err) => {
    console.error("Unable to create MySQL user:", err);
  });

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password_hash });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (
      !user ||
      !(await bcrypt.compare(password, user.getDataValue("password_hash")))
    ) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.getDataValue("id") },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    await user.update({ last_login: new Date() });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "Failed to log in" });
  }
};
