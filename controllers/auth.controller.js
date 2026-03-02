const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const Workspace = require("../models/Workspace.model");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { generateOTP } = require("../utils/generateOTP");
const { sendEmail } = require("../utils/sendEmail");
const { generateTokens } = require("../utils/generateTokens");
const cloudinary = require("../config/cloudinary");

const registerUser = asyncHandler(async (req, res) => {
    const { profile, workspace } = req.body;

    console.log(profile, workspace, req.file);

    if (!profile?.name || !profile?.email || !profile?.password || !workspace?.name) {
        throw new ApiError(400, "All fields are required");
    }

    let logoUrl = null;

    if (req.file) {
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
            folder: "TALENT SPHERE ASSETS",
        });

        logoUrl = cloudinaryResponse.secure_url;
    }

    const brand = {
        logoUrl,
        companyDomain: workspace.companyDomain,
    }

    console.log(profile, workspace, brand);

    const existingUser = await User.findOne({ email: profile.email });
    if (existingUser) throw new ApiError(400, "Email already exists");

    const existingWorkspace = await Workspace.findOne({ slug: workspace.slug });
    if (existingWorkspace) throw new ApiError(400, "Workspace already exists");

    const hashedPassword = await bcrypt.hash(profile.password, 10);
    const otp = generateOTP();

    const newWorkspace = await Workspace.create({
        name: workspace.name,
        slug: workspace.slug,
        country: workspace.country,
        brand,
        timezone: workspace.timezone,
        status: "pending",
        isTrial: true,
        trialStartDate: new Date(),
        trialEndDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    });

    await User.create({
        workspaceId: newWorkspace._id,
        name: profile.name,
        email: profile.email,
        password: profile.password,
        hashedPassword: hashedPassword,
        roles: "company_owner",
        status: "pending",
        emailVerificationOtp: otp,
        otpExpiry: Date.now() + 10 * 60 * 1000,
    });

    await sendEmail(profile.email, otp);

    return res
        .status(201)
        .json(new ApiResponse(201, null, "OTP is sent to your email"));
});

const verifyOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    const user = await User.findOne({ email }).populate("workspaceId");
    if (!user) throw new ApiError(404, "User not found");

    if (user.emailVerificationOtp !== otp)
        throw new ApiError(400, "Invalid OTP");

    if (user.otpExpiry < Date.now())
        throw new ApiError(400, "OTP expired");

    user.status = "active";
    user.isEmailVerified = true;
    user.emailVerificationOtp = null;
    user.otpExpiry = null;
    await user.save();

    user.workspaceId.status = "active";
    await user.workspaceId.save();

    const { accessToken, refreshToken } = await generateTokens(user._id);

    return res.status(200).json(
        new ApiResponse(200, {
            user,
            workspace: user.workspaceId,
            accessToken,
            refreshToken,
        }, "Email verified successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new ApiError(404, "User not found");

    if (user.status !== "active")
        throw new ApiError(403, "Verify your email first");

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) throw new ApiError(400, "Invalid credentials");

    const { accessToken, refreshToken } = await generateTokens(user._id);

    return res.status(200).json(
        new ApiResponse(200, {
            user,
            accessToken,
            refreshToken,
        }, "Login successful")
    );
});

const resendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.isEmailVerified) {
        throw new ApiError(400, "Email already verified");
    }

    // Generate new OTP
    const newOtp = generateOTP();

    user.emailVerificationOtp = newOtp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    await sendEmail(user.email, newOtp);

    return res.status(200).json(
        new ApiResponse(200, null, "OTP resent successfully")
    );
});

module.exports = { registerUser, verifyOtp, loginUser, resendOtp };
