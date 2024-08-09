import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Some required fields are missing",
    });
  }

  try {
    const userFound = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (userFound) {
      return res.status(409).json({
        message: "Username or email already exists!",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await new User({
      username,
      email,
      password: passwordHash,
    })
      .save()
      .then(async (user) => {
        const token = await createAccessToken(user._id);
        return res
          .status(200)
          .cookie("token", token, {
            secure: true,
            sameSite: "lax",
          })
          .json({
            message: "User was registered successfully",
            user: {
              id: user._id,
              username: user.username,
            },
          });
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

export async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: "Some required fields are missing",
    });
  }

  try {
    const userFound = await User.findOne({ username });

    if (!userFound) {
      return res.status(401).json({
        message: "Wrong credentials!",
      });
    }

    const passwordMatch = bcrypt.compare(password, userFound.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Wrong credentials!",
      });
    }

    const token = await createAccessToken(userFound._id);

    return res
      .status(200)
      .cookie("token", token, 
      {
        secure: true,
        httpOnly: true,
        // sameSite: "none",
      }
      )
      .json({
        message: "Login successful",
        user: {
          id: userFound._id,
          username: userFound.username,
        },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function logout(req, res) {
  try {
    return res
      .status(200)
      .cookie("token", "", {
        secure: true,
        sameSite: "none",
      })
      .json({
        message: "Logout successful",
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function profile(req, res) {
  const userFound = await User.findById(req.userId);

  if (!userFound) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    message: "Profile",
    user: {
      username: userFound.username,
      email: userFound.email,
    },
  });
}

export async function verifyToken(req, res) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userFound = await User.findById(decodedToken.id);

    if (!userFound) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    return res.status(200).json({
      message: "Token is valid",
      user: {
        id: userFound._id,
        username: userFound.username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
