import { Router } from "express";
import { getResponse } from "../controllers/ai.controllers.js";

const router = Router();

router.post("/get-response",getResponse)

export default router;