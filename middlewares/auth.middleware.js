import jwt from "jsonwebtoken";
import { ACCESS_MATRIX, ROLES } from "../helpers/permissions.helper.js";

export const verifyAuthentication = (req, res, next) => {
    try {
        const token =
            req.cookies.token ||
            req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken;

        next();

    } catch (error) {

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }

        return res.status(500).json({ message: "Internal server error" });
    }
};


export const checkPermission = (action, resource) => {
    return (req, res, next) => {
        try {
            const user = req.user;

            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const rolePermissions = ACCESS_MATRIX[user.role];

            if (!rolePermissions) {
                return res.status(403).json({ message: "Forbidden" });
            }

            if (rolePermissions === "SUPER_ADMIN") {
                return next();
            }

            const resourcePermissions = rolePermissions[resource];

            if (resourcePermissions.includes(action)) {
                return next();
            }

            if (!resourcePermissions || !resourcePermissions.includes(action)) {
                return res.status(403).json({ message: "Forbidden" });
            }
            next();
        } catch (error) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}