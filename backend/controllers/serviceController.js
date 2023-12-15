import { initializeService } from "../loggService/loggService.js";
import MonitorLog from "../models/MonitorLog.js";
import Project from "../models/Project.js";
import Service from "../models/Service.js";
import User from "./../models/User.js";

export const getAllProjects = async (req, res) => {
  try {
    const id = req.user.id;
    let projects = await User.findById(id)
      .select("projects")
      .populate("projects");

    res.json({ succes: true, user: projects });
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

    const service = await new Service({
      serviceName: serviceName,
      url: url,
      projectId: project._id,
    });

    await service.save();
    await project?.services?.push(service._id);
    await project.save();

    await initializeService(service);

    return res.status(200).json({
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

export const getAllServices = async (req, res) => {
  try {
    const projectId = req.body.projectId;

    const id = req.user.id;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "projectId is Invalid",
      });
    }

    const services = await Project.findById(projectId)
      .select("name")
      .select("services")
      .populate("services");

    res.status(200).json({
      success: true,
      project: services,
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "something went wrong",
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const serviceId = req.body.serviceId;
    const projectId = req.body.projectId;

    const project = await Project.findById(projectId);
    const service = await Service.findById(serviceId);

    for (const ser of service?.monitorLogs) {
      await MonitorLog.findByIdAndDelete(ser);
    }

    await Service.findByIdAndDelete(serviceId);

    project.services = project.services.filter((id) => id != serviceId);

    await project.save();

    res.status(200).json({
      success: true,
      message: "service deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "something went wrong",
    });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const projectId = req.body.projectId;
    const project = await Project.findById(projectId);

    for (const item of project?.services) {
      const service = await Service.findById(item);

      if (service)
        for (const ser of service?.monitorLogs) {
          console.log(ser);
          await MonitorLog.findByIdAndDelete(ser);
        }

      await Service.findByIdAndDelete(item);
    }

    await Project.findByIdAndDelete(projectId);

    res.status(200).json({
      success: true,
      message: "project deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      success: false,
      message: "something went wrong",
    });
  }
};
