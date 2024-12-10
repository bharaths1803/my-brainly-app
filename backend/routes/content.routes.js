import express from "express";
import { addContent, deleteContent, getContents } from "../controllers/content.controller.js";
import protectRoute from "../middleware/protectRoute.js"


const router = express.Router();

router.post("/", protectRoute, addContent);
router.get("/", protectRoute, getContents);
router.delete("/", protectRoute, deleteContent);

export default router