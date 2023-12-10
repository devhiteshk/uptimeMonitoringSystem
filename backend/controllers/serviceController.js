import Project from "../models/Project.js";
import Service from "../models/Service.js";
import User from "./../models/User.js";

export const getAllProjects = async (req, res) => {
  try {
    const id = req.user.id;
    let projects = await User.findById(id)
      .select("projects")
      .populate("projects");

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
    const name = req.body.name;
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const project = await new Project({
      name: name,
      services: [],
      userId: user._id,
    });
    await project.save();

    user?.projects?.push(project._id);
    user.save();

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
    const { projectId, serviceName, url } = req.body;

    const id = req.user.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    const userProject = await User.find({
      projectId: projectId,
    });

    if (!userProject) {
      return res.status(404).json({
        success: false,
        message: "projectId is Invalid",
      });
    }

    const project = await Project.findById(projectId);

    const service = new Service({
      serviceName: serviceName,
      url: url,
      projectId: project._id,
    });

    service.save();
    project?.services?.push(service._id);
    project.save();

    res.status(200).json({
      success: true,
      message: "Service created Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "something went wrong",
    });
  }
};
