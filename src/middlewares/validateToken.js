import { verifyAccessToken } from "../libs/jwt.js";

export async function authRequired(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  await verifyAccessToken(token)
    .then((payload) => {
      req.userId = payload.id;
      next();
    })
    .catch((error) => {
      return res.status(401).json({
        message: "Invalid token",
      });
    });
}
