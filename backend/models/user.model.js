import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    bannerImage: {
        type: String,
        default: "",
    },
    headline: {
        type: String,
        default: "9JAWORKS USER",
    },
    location: {
        type: String,
        default: "Nigeria",
    },
    about: {
        type: String,
        default: "",
    },
    skills: [String],
    experience: [
        {
            tiltle: String,
            company: String,
            startDate: Date,
            endDate: Date,
            description: String,
        },
    ],
    education: [
        {
            school: String,
            filedOfStudy: String,
            startYear: Number,
            endYear: Number,
        },
    ],
    connection: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User",
        },
    ],
},
{timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User;  