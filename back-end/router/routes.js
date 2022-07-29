import { Router } from "express";
import { userController } from "../controllers/userController.js";
const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Find documention for this api in my read me",
    Link: "https://github.com/mustafabin/express-jwt-lesson",
  });
});

router.post("/register", userController.create);
router.post("/login", userController.login);
router.get("/profile", userController.profile);

export default router;
