import { sendLinkupAcceptedEmail } from "../emails/emailHandlers.js";
import LinkupRequest from "../models/linkupRequest.model.js";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

export const sendLinkupRequest = async (req, res) => {
	try {
		const { userId } = req.params;
		const senderId = req.user._id;

		if (senderId.toString() === userId) {
			return res.status(400).json({ message: "You can't send a request to yourself" });
		}

		if (req.user.linkups.includes(userId)) {
			return res.status(400).json({ message: "You are already Linkedup" });
		}

		const existingRequest = await LinkupRequest.findOne({
			sender: senderId,
			recipient: userId,
			status: "pending",
		});

		if (existingRequest) {
			return res.status(400).json({ message: "A linkup request already exists" });
		}

		const newRequest = new LinkupRequest({
			sender: senderId,
			recipient: userId,
		});

		await newRequest.save();

		res.status(201).json({ message: "Linkup request sent successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

export const acceptLinkupRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const userId = req.user._id;

		const request = await LinkupRequest.findById(requestId)
			.populate("sender", "name email username")
			.populate("recipient", "name username");

		if (!request) {
			return res.status(404).json({ message: "Linkup request not found" });
		}

		// check if the req is for the current user
		if (request.recipient._id.toString() !== userId.toString()) {
			return res.status(403).json({ message: "Not authorized to accept this request" });
		}

		if (request.status !== "pending") {
			return res.status(400).json({ message: "This request has already been processed" });
		}

		request.status = "accepted";
		await request.save();

		// if im your friend then ur also my friend ;)
		await User.findByIdAndUpdate(request.sender._id, { $addToSet: { linkups: userId } });
		await User.findByIdAndUpdate(userId, { $addToSet: { linkups: request.sender._id } });

		const notification = new Notification({
			recipient: request.sender._id,
			type: "linkupAccepted",
			relatedUser: userId,
		});

		await notification.save();

		res.json({ message: "Linkup accepted successfully" });

		const senderEmail = request.sender.email;
		const senderName = request.sender.name;
		const recipientName = request.recipient.name;
		const profileUrl = process.env.CLIENT_URL + "/profile/" + request.recipient.username;

		try {
			await sendLinkupAcceptedEmail(senderEmail, senderName, recipientName, profileUrl);
		} catch (error) {
			console.error("Error in sendLinkupAcceptedEmail:", error);
		}
	} catch (error) {
		console.error("Error in acceptLinkupRequest controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const rejectLinkupRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const userId = req.user._id;

		const request = await LinkupRequest.findById(requestId);

		if (request.recipient.toString() !== userId.toString()) {
			return res.status(403).json({ message: "Not authorized to reject this request" });
		}

		if (request.status !== "pending") {
			return res.status(400).json({ message: "This request has already been processed" });
		}

		request.status = "rejected";
		await request.save();

		res.json({ message: "Linkup request rejected" });
	} catch (error) {
		console.error("Error in rejectLinkupRequest controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getLinkupRequests = async (req, res) => {
	try {
		const userId = req.user._id;

		const requests = await LinkupRequest.find({ recipient: userId, status: "pending" }).populate(
			"sender",
			"name username profilePicture headline linkupss"
		);

		res.json(requests);
	} catch (error) {
		console.error("Error in getLinkupRequests controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getUserLinkups = async (req, res) => {
	try {
		const userId = req.user._id;

		const user = await User.findById(userId).populate(
			"Linkups",
			"name username profilePicture headline linkups"
		);

		res.json(user.linkups);
	} catch (error) {
		console.error("Error in getUserLinkups controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const removeLinkup = async (req, res) => {
	try {
		const myId = req.user._id;
		const { userId } = req.params;

		await User.findByIdAndUpdate(myId, { $pull: { linkups: userId } });
		await User.findByIdAndUpdate(userId, { $pull: { linkups: myId } });

		res.json({ message: "Linkup removed successfully" });
	} catch (error) {
		console.error("Error in removeLinkup controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getLinkupStatus = async (req, res) => {
	try {
		const targetUserId = req.params.userId;
		const currentUserId = req.user._id;

		const currentUser = req.user;
		if (currentUser.connections.includes(targetUserId)) {
			return res.json({ status: "linkedup" });
		}

		const pendingRequest = await LinkupRequest.findOne({
			$or: [
				{ sender: currentUserId, recipient: targetUserId },
				{ sender: targetUserId, recipient: currentUserId },
			],
			status: "pending",
		});

		if (pendingRequest) {
			if (pendingRequest.sender.toString() === currentUserId.toString()) {
				return res.json({ status: "pending" });
			} else {
				return res.json({ status: "received", requestId: pendingRequest._id });
			}
		}

		// if no linkup or pending req found
		res.json({ status: "not_linkedup" });
	} catch (error) {
		console.error("Error in getLinkupStatus controller:", error);
		res.status(500).json({ message: "Server error" });
	}
};
