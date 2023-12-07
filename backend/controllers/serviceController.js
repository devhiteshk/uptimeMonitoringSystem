import User from "./../models/User.js";

export const getAllProjects = async (req, res) => {
  try {
    const id = req.user.id;
    let projects = await User.findById(id).select("projects");

    res.json({ succes: true, projects: projects });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      succes: false,
      message: "something went wrong",
    });
  }
};

export const createProject = async (req, res) => {
  try {
    const name = req.body;

    const id = req.user.id;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }
    user.projects.push({ name: name, service: [] });

    return res.status(200).json({
      success: true,
      message: "project created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "something went wrong",
    });
  }
};

export const createService = async (req, res) => {
  try {
    const { projectID, serviceName, url } = req.body;
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "something went wrong",
    });
  }
};
