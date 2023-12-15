import User from "../models/User.js";

export const deleteAccount = async (req, res) => {
  try {
    let id = req.user.id;
    const user = await User.findById(id);

    if (!user._id) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      succes: true,
      message: "Account deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      succes: false,
      message: "something went wrong",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, imgUrl } = req.body;

    let id = req.user.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    await User.findByIdAndUpdate(id, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      imgUrl: imgUrl,
    });

    return res.status(200).json({
      succes: true,
      message: "Account updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      succes: false,
      message: "something went wrong",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    let id = req.user.id;

    const user = await User.findById(id).select("firstName lastName imgUrl");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    return res.status(200).json({
      succes: true,
      user: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      succes: false,
      message: "something went wrong",
    });
  }
};
