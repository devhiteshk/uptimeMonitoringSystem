import jwt from "jsonwebtoken";

export const jwtAuthGuard = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      return res.status(400).json({
        success: false,
        message: "Token is not provided",
      });
    }

    const decoded = jwt.verify(bearerToken.slice(7), process.env.JWT_SECRET);

    if (decoded) {
      // console.log("decoded token",decoded);
      req.user = decoded;
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Token Expired",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: true,
      message: "Malformed JWT",
    });
  }
};
