const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { ApiError } = require("./ApiError");

const generateTokens = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    const accessToken = jwt.sign(
        { id: user._id, workspaceId: user.workspaceId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    return { accessToken, refreshToken };
};

module.exports = { generateTokens };