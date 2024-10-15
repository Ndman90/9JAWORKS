import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
	acceptLinkupRequest,
	getLinkupRequests,
	getLinkupStatus,
	getUserLinkups,
	rejectLinkupRequest,
	removeLinkup,
	sendLinkupRequest,
} from "../controllers/linkup.controller.js";

const router = express.Router();

router.post("/request/:userId", protectRoute, sendLinkupRequest);
router.put("/accept/:requestId", protectRoute, acceptLinkupRequest);
router.put("/reject/:requestId", protectRoute, rejectLinkupRequest);
// Get all Linkup requests for the current user
router.get("/requests", protectRoute, getLinkupRequests);
// Get all connections for a user
router.get("/", protectRoute, getUserLinkups);
router.delete("/:userId", protectRoute, removeLinkup);
router.get("/status/:userId", protectRoute, getLinkupStatus);

export default router;
