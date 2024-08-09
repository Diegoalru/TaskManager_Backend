import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
  verifyToken,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Private-Network", true);
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header("Access-Control-Max-Age", "86400");
  next();
});

router.post("/register", validateSchema(registerSchema), register);
router.get("/verify-token", verifyToken);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/profile", authRequired, profile);

export default router;
