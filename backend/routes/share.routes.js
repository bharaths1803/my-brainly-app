import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getBrain, shareBrain } from "../controllers/share.controller.js";


const router = express.Router();

router.post("/", protectRoute, shareBrain)
router.get("/:hash", getBrain);

export default router