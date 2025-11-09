import { Router } from "express";

const router = Router();

router.post("/register",getResponse)
router.post("/login",getResponse)
router.post("/logout",getResponse)

export default router;