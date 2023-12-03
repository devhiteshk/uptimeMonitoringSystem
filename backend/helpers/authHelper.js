import jwt from "jsonwebtoken";

export const generateToken = (id, email, role) => {
  return jwt.sign(
    {
      id: id,
      email,
      role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1days" }
  );
};
